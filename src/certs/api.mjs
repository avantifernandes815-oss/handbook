// Certification API: quiz engine, progress, team view and admin tools.
// Everything here runs server-side. Correct answers never leave the server
// until a quiz is finished, and even then only as reveals for questions the rep got right.
import bankF1 from './bank-f1.json' with {type: 'json'};
import bankF2 from './bank-f2.json' with {type: 'json'};

const BANKS = {F1: bankF1, F2: bankF2};
const GRACE_MS = 4000;          // network slack on top of each question's time limit
const LOCK_HOURS = 24;          // lockout after a second tab-leave
const MAX_ATTEMPTS = 3;         // failed attempts before a performance conversation
const REVIEW_LABELS = {'day-1': 'Day 1 · The SDR Job', 'day-2': 'Day 2 · Who We Sell To & Why', 'day-3': 'Day 3 · Owning Your Book of Business', 'day-4': 'Day 4 · Pre-Vetting Workshop', 'sal': 'Qualification & SALs', 'book': 'Book of Business', 'statuses': 'Lead Statuses & CRM'};

// Written practicals. Scored live by a manager, 1–4 per area; pass = average 3+ and the must-pass met.
export const PRACTICALS = {
  F2: {
    title: 'Lists, then prospects',
    jobs: ['Find low-hanging fruit', 'Build a pre-vetting list', 'Identify Unqualified accounts', 'Build today’s call list'],
    listFields: ['why', 'filters', 'type', 'plan'],
    prospectFields: ['fit', 'persona', 'context', 'worth', 'priority', 'problem', 'channel'],
    criteria: [
      {id: 'purpose', name: 'List purpose', hint: 'Each list has a real reason to exist, and the filters match the job.'},
      {id: 'mechanics', name: 'List mechanics', hint: 'The active or static choice fits how the list will be used.'},
      {id: 'judgment', name: 'Prospect judgment', hint: 'The fit and worth-pursuing calls hold up with the information they had.'},
      {id: 'priority', name: 'Prioritization', hint: 'The priority call follows the statuses, the clock and the codes.'},
      {id: 'relevance', name: 'Relevance', hint: 'The problem is about their business, not about our product.'},
      {id: 'next', name: 'Next action', hint: 'The channel and strategy follow from what they know.'}
    ],
    must: 'Every list and prospect stayed out of another SDR’s Book, a Nurture cooling period, a Customer and an open Opportunity'
  }
};

const json = (data, status = 200) => new Response(JSON.stringify(data), {status, headers: {'Content-Type': 'application/json', 'Cache-Control': 'private, no-store'}});
const fail = (code, message, status = 400) => json({error: code, message}, status);
const nowIso = () => new Date().toISOString();
const parse = (s, d) => { try { return s ? JSON.parse(s) : d; } catch { return d; } };

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const r = crypto.getRandomValues(new Uint32Array(1))[0] % (i + 1);
    [a[i], a[r]] = [a[r], a[i]];
  }
  return a;
}

// ---------- users & roles ----------
export async function ensureUser(env, user) {
  const role = user.admin ? 'admin' : null;
  await env.DB.prepare("INSERT OR IGNORE INTO users (email, role, created_at) VALUES (?, ?, ?)").bind(user.email, role || 'rep', nowIso()).run();
  if (role) await env.DB.prepare("UPDATE users SET role='admin' WHERE email=? AND role!='admin'").bind(user.email).run();
  const row = await env.DB.prepare("SELECT email, name, role, active FROM users WHERE email=?").bind(user.email).first();
  // Only the configured owner can hold the admin role.
  if (row.role === 'admin' && !user.admin) { await env.DB.prepare("UPDATE users SET role='rep' WHERE email=?").bind(user.email).run(); row.role = 'rep'; }
  return row;
}
const isManager = (me) => me.role === 'manager' || me.role === 'admin';
const isAdmin = (me) => me.role === 'admin';

async function audit(env, actor, action, target, details) {
  await env.DB.prepare("INSERT INTO audit_log (actor_email, action, target, details, at) VALUES (?,?,?,?,?)").bind(actor, action, target || null, details ? JSON.stringify(details) : null, nowIso()).run();
}

// ---------- question bank ----------
const fingerprint = (q) => JSON.stringify([q.section, q.kind, q.topic, q.prompt, q.options, q.correct, q.reveal || null, q.review || null]);

export async function syncBank(env, certId) {
  const bank = BANKS[certId];
  if (!bank) return {added: 0, updated: 0, retired: 0};
  const existing = (await env.DB.prepare("SELECT * FROM questions WHERE cert_id=? AND status='active'").bind(certId).all()).results;
  const byId = new Map(existing.map(r => [r.id, r]));
  const stmts = []; let added = 0, updated = 0, retired = 0;
  for (const q of bank.questions) {
    const cur = byId.get(q.id);
    const fresh = {section: q.section, kind: q.kind, topic: q.topic, prompt: q.prompt, options: q.options, correct: q.correct, reveal: q.reveal, review: q.review};
    if (cur) {
      const curShape = {section: cur.section, kind: cur.kind, topic: cur.topic, prompt: cur.prompt, options: parse(cur.options, []), correct: cur.correct, reveal: cur.reveal, review: cur.review_link};
      byId.delete(q.id);
      if (fingerprint(curShape) === fingerprint(fresh)) continue;
      stmts.push(env.DB.prepare("UPDATE questions SET status='retired' WHERE id=? AND version=?").bind(cur.id, cur.version));
      updated++;
    } else added++;
    const version = cur ? cur.version + 1 : ((await env.DB.prepare("SELECT MAX(version) v FROM questions WHERE id=?").bind(q.id).first())?.v || 0) + 1;
    stmts.push(env.DB.prepare("INSERT INTO questions (id, version, cert_id, section, kind, topic, prompt, options, correct, reveal, review_link, source, status, created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?, 'active', ?)")
      .bind(q.id, version, certId, q.section, q.kind, q.topic, q.prompt, JSON.stringify(q.options), q.correct, q.reveal || null, q.review || null, q.source || null, nowIso()));
  }
  for (const gone of byId.values()) { stmts.push(env.DB.prepare("UPDATE questions SET status='retired' WHERE id=? AND version=?").bind(gone.id, gone.version)); retired++; }
  if (stmts.length) await env.DB.batch(stmts);
  return {added, updated, retired};
}

async function activeQuestions(env, certId) {
  let rows = (await env.DB.prepare("SELECT * FROM questions WHERE cert_id=? AND status='active'").bind(certId).all()).results;
  if (!rows.length && BANKS[certId]) { await syncBank(env, certId); rows = (await env.DB.prepare("SELECT * FROM questions WHERE cert_id=? AND status='active'").bind(certId).all()).results; }
  return rows;
}

// Pick N questions with at least `minPer` from every section, then fill at random.
function buildPlan(rows, total, minPer) {
  const bySection = {};
  for (const r of rows) (bySection[r.section] ||= []).push(r);
  const chosen = [];
  for (const list of Object.values(bySection)) chosen.push(...shuffle(list).slice(0, minPer || 0));
  const rest = shuffle(rows.filter(r => !chosen.includes(r)));
  while (chosen.length < Math.min(total, rows.length)) chosen.push(rest.shift());
  return shuffle(chosen).map(r => ({id: r.id, v: r.version, order: shuffle(parse(r.options, []).map(o => o.id))}));
}

// ---------- progress ----------
async function getProgress(env, email, certId) {
  await env.DB.prepare("INSERT OR IGNORE INTO cert_progress (user_email, cert_id, updated_at) VALUES (?,?,?)").bind(email, certId, nowIso()).run();
  return env.DB.prepare("SELECT * FROM cert_progress WHERE user_email=? AND cert_id=?").bind(email, certId).first();
}
// Merge one component result into cert_progress and recompute the overall status.
function overall(required, comps) {
  if (required.every(c => comps[c] === 'passed')) return 'passed';
  if (Object.values(comps).includes('failed')) return 'failed';
  return Object.keys(comps).length ? 'in_progress' : 'not_started';
}
function componentUpdate(env, cert, prog, email, patch, t, extraSql = '', extraArgs = []) {
  const comps = {...parse(prog?.components, {}), ...patch};
  const status = overall(parse(cert.components, ['quiz']), comps);
  return env.DB.prepare(`UPDATE cert_progress SET status=?, components=?, passed_at=CASE WHEN ?='passed' THEN COALESCE(passed_at, ?) ELSE passed_at END, updated_at=?${extraSql} WHERE user_email=? AND cert_id=?`)
    .bind(status, JSON.stringify(comps), status, t, t, ...extraArgs, email, cert.id);
}

async function lockedUntil(env, email, certId) {
  const r = await env.DB.prepare("SELECT MAX(locked_until) l FROM quiz_attempts WHERE user_email=? AND cert_id=? AND status='voided'").bind(email, certId).first();
  return r?.l && r.l > nowIso() ? r.l : null;
}

async function certCatalog(env) {
  return (await env.DB.prepare("SELECT * FROM certifications WHERE status!='retired' ORDER BY sort_order").all()).results.map(c => ({
    id: c.id, track: c.track, name: c.name, summary: c.summary, status: c.status, prerequisites: parse(c.prerequisites, []),
    components: parse(c.components, []), passMark: c.pass_mark, questions: c.questions_per_attempt, seconds: c.seconds_per_question, day: c.onboarding_day
  }));
}

async function myCerts(env, me) {
  const certs = await certCatalog(env);
  const rows = (await env.DB.prepare("SELECT * FROM cert_progress WHERE user_email=?").bind(me.email).all()).results;
  const open = (await env.DB.prepare("SELECT id, cert_id FROM quiz_attempts WHERE user_email=? AND status='in_progress'").bind(me.email).all()).results;
  const last = (await env.DB.prepare("SELECT cert_id, score, status, finished_at FROM quiz_attempts WHERE user_email=? AND status IN ('passed','failed') ORDER BY finished_at DESC").bind(me.email).all()).results;
  const locks = (await env.DB.prepare("SELECT cert_id, MAX(locked_until) l FROM quiz_attempts WHERE user_email=? AND status='voided' GROUP BY cert_id").bind(me.email).all()).results;
  const pracs = (await env.DB.prepare("SELECT cert_id, attempt_no, status FROM practical_submissions WHERE user_email=? ORDER BY attempt_no DESC").bind(me.email).all()).results;
  const progress = {};
  for (const c of certs) {
    const p = rows.find(r => r.cert_id === c.id);
    const l = last.find(r => r.cert_id === c.id);
    const lock = locks.find(r => r.cert_id === c.id);
    progress[c.id] = {
      status: p?.status || 'not_started', attemptsUsed: p?.attempts_used || 0, retakeUnlocked: p ? !!p.retake_unlocked : true,
      passedAt: p?.passed_at || null, lastScore: l ? l.score : null, inProgress: !!open.find(o => o.cert_id === c.id),
      lockedUntil: lock?.l && lock.l > nowIso() ? lock.l : null, maxAttempts: MAX_ATTEMPTS,
      components: parse(p?.components, {}),
      practical: (() => { const x = pracs.find(r => r.cert_id === c.id); return x ? {status: x.status, attemptNo: x.attempt_no} : null; })()
    };
  }
  return {me: {email: me.email, name: me.name, role: me.role}, certs, progress};
}

// ---------- quiz engine ----------
async function currentQuestion(env, attempt, cert) {
  const plan = parse(attempt.question_plan, []);
  const limitMs = (cert.seconds_per_question || 45) * 1000;
  // Questions whose time ran out while the rep was away are recorded as timed out.
  while (attempt.status === 'in_progress' && attempt.question_started_at && Date.now() - Date.parse(attempt.question_started_at) > limitMs + GRACE_MS) {
    attempt = await recordAnswer(env, attempt, cert, attempt.current_index, null, true);
  }
  if (attempt.status !== 'in_progress') return {done: true, attemptId: attempt.id, status: attempt.status};
  if (!attempt.question_started_at) {
    attempt.question_started_at = nowIso();
    await env.DB.prepare("UPDATE quiz_attempts SET question_started_at=? WHERE id=?").bind(attempt.question_started_at, attempt.id).run();
  }
  const item = plan[attempt.current_index];
  const q = await env.DB.prepare("SELECT * FROM questions WHERE id=? AND version=?").bind(item.id, item.v).first();
  const opts = parse(q.options, []);
  const elapsed = Date.now() - Date.parse(attempt.question_started_at);
  return {
    done: false, attemptId: attempt.id, position: attempt.current_index, total: plan.length,
    secondsLeft: Math.max(0, Math.ceil((limitMs - elapsed) / 1000)), seconds: limitMs / 1000, tabLeaves: attempt.tab_leaves,
    question: {prompt: q.prompt, options: item.order.map(id => ({id, text: opts.find(o => o.id === id)?.text || ''}))}
  };
}

async function recordAnswer(env, attempt, cert, position, choice, timedOut) {
  const plan = parse(attempt.question_plan, []);
  const item = plan[position];
  const q = await env.DB.prepare("SELECT correct FROM questions WHERE id=? AND version=?").bind(item.id, item.v).first();
  const elapsed = attempt.question_started_at ? Date.now() - Date.parse(attempt.question_started_at) : null;
  const correct = !timedOut && choice === q.correct ? 1 : 0;
  const next = position + 1;
  const stmts = [
    env.DB.prepare("INSERT OR REPLACE INTO quiz_answers (attempt_id, position, question_id, question_version, option_order, chosen, is_correct, timed_out, time_taken_ms, answered_at) VALUES (?,?,?,?,?,?,?,?,?,?)")
      .bind(attempt.id, position, item.id, item.v, JSON.stringify(item.order), timedOut ? null : choice, correct, timedOut ? 1 : 0, elapsed, nowIso()),
    env.DB.prepare("UPDATE quiz_attempts SET current_index=?, question_started_at=NULL WHERE id=?").bind(next, attempt.id)
  ];
  await env.DB.batch(stmts);
  attempt = {...attempt, current_index: next, question_started_at: null};
  if (next >= plan.length) attempt = await finishAttempt(env, attempt, cert);
  return attempt;
}

async function finishAttempt(env, attempt, cert) {
  const r = await env.DB.prepare("SELECT COUNT(*) n, SUM(is_correct) c FROM quiz_answers WHERE attempt_id=?").bind(attempt.id).first();
  const total = parse(attempt.question_plan, []).length;
  const score = total ? (r.c || 0) / total : 0;
  const passed = score >= cert.pass_mark;
  const t = nowIso();
  const prog = await getProgress(env, attempt.user_email, attempt.cert_id);
  await env.DB.batch([
    env.DB.prepare("UPDATE quiz_attempts SET status=?, score=?, correct_count=?, finished_at=? WHERE id=?").bind(passed ? 'passed' : 'failed', score, r.c || 0, t, attempt.id),
    componentUpdate(env, cert, prog, attempt.user_email, {quiz: passed ? 'passed' : 'failed'}, t,
      passed ? ', attempts_used=attempts_used+1' : ', attempts_used=attempts_used+1, retake_unlocked=0')
  ]);
  return {...attempt, status: passed ? 'passed' : 'failed', score};
}

async function loadAttempt(env, me, id) {
  const attempt = await env.DB.prepare("SELECT * FROM quiz_attempts WHERE id=?").bind(id).first();
  if (!attempt || attempt.user_email !== me.email) return null;
  const cert = await env.DB.prepare("SELECT * FROM certifications WHERE id=?").bind(attempt.cert_id).first();
  return {attempt, cert};
}

async function startQuiz(env, me, certId) {
  const cert = await env.DB.prepare("SELECT * FROM certifications WHERE id=?").bind(certId).first();
  if (!cert || cert.status !== 'active' || !parse(cert.components, []).includes('quiz')) return fail('not_available', 'This certification isn’t open yet.', 404);
  const open = await env.DB.prepare("SELECT * FROM quiz_attempts WHERE user_email=? AND cert_id=? AND status='in_progress'").bind(me.email, certId).first();
  if (open) return json(await currentQuestion(env, open, cert));
  for (const pre of parse(cert.prerequisites, [])) {
    const p = await env.DB.prepare("SELECT status FROM cert_progress WHERE user_email=? AND cert_id=?").bind(me.email, pre).first();
    if (p?.status !== 'passed') return fail('prerequisite', `Pass ${pre} first.`, 409);
  }
  const p = await getProgress(env, me.email, certId);
  if (parse(p.components, {}).quiz === 'passed' || p.status === 'passed') return fail('passed', 'You’ve already passed this quiz.', 409);
  if (p.attempts_used >= MAX_ATTEMPTS) return fail('max_attempts', 'Talk to your manager about next steps for this certification.', 409);
  if (!p.retake_unlocked) return fail('needs_coaching', 'Your retake opens after a coaching session with your manager.', 409);
  const lock = await lockedUntil(env, me.email, certId);
  if (lock) return json({error: 'locked', message: 'This quiz is locked after leaving the tab twice.', lockedUntil: lock}, 409);
  const rows = await activeQuestions(env, certId);
  if (!rows.length) return fail('no_questions', 'This quiz has no questions yet.', 500);
  const plan = buildPlan(rows, cert.questions_per_attempt || 15, cert.min_per_section || 0);
  const n = await env.DB.prepare("SELECT COUNT(*) n FROM quiz_attempts WHERE user_email=? AND cert_id=?").bind(me.email, certId).first();
  const attempt = {id: crypto.randomUUID(), user_email: me.email, cert_id: certId, attempt_no: (n?.n || 0) + 1, status: 'in_progress', question_plan: JSON.stringify(plan), current_index: 0, question_started_at: null, tab_leaves: 0};
  const t = nowIso();
  await env.DB.batch([
    env.DB.prepare("INSERT INTO quiz_attempts (id, user_email, cert_id, attempt_no, status, question_plan, current_index, tab_leaves, started_at) VALUES (?,?,?,?, 'in_progress', ?, 0, 0, ?)").bind(attempt.id, me.email, certId, attempt.attempt_no, attempt.question_plan, t),
    env.DB.prepare("UPDATE cert_progress SET status=CASE WHEN status='not_started' THEN 'in_progress' ELSE status END, updated_at=? WHERE user_email=? AND cert_id=?").bind(t, me.email, certId),
    env.DB.prepare("INSERT INTO activity_events (user_email, kind, ref, occurred_at) VALUES (?, 'quiz_start', ?, ?)").bind(me.email, certId, t)
  ]);
  return json(await currentQuestion(env, attempt, cert));
}

async function result(env, attempt) {
  const answers = (await env.DB.prepare("SELECT a.position, a.is_correct, q.topic, q.prompt, q.reveal, q.review_link FROM quiz_answers a JOIN questions q ON q.id=a.question_id AND q.version=a.question_version WHERE a.attempt_id=? ORDER BY a.position").bind(attempt.id).all()).results;
  const cert = await env.DB.prepare("SELECT name, pass_mark, components FROM certifications WHERE id=?").bind(attempt.cert_id).first();
  const p = await env.DB.prepare("SELECT attempts_used FROM cert_progress WHERE user_email=? AND cert_id=?").bind(attempt.user_email, attempt.cert_id).first();
  const missed = new Map();
  for (const a of answers.filter(a => !a.is_correct)) if (!missed.has(a.topic)) missed.set(a.topic, {topic: a.topic, review: a.review_link, label: REVIEW_LABELS[a.review_link] || a.review_link});
  return {
    certId: attempt.cert_id, certName: cert.name, status: attempt.status, hasPractical: parse(cert.components, []).includes('practical'), attemptNo: attempt.attempt_no, attemptsUsed: p?.attempts_used || 0, maxAttempts: MAX_ATTEMPTS,
    correct: attempt.correct_count, total: answers.length, score: attempt.score, passMark: cert.pass_mark,
    reveals: answers.filter(a => a.is_correct && a.reveal).map(a => ({topic: a.topic, question: a.prompt, text: a.reveal})),
    review: [...missed.values()]
  };
}


// ---------- written practicals ----------
const clip = (v, n = 4000) => String(v ?? '').slice(0, n);
function cleanContent(def, raw) {
  const lists = Array.from({length: 3}, (_, i) => {
    const l = (raw?.lists || [])[i] || {};
    return {job: clip(l.job, 200), why: clip(l.why), filters: clip(l.filters), type: ['active', 'static'].includes(l.type) ? l.type : '', plan: clip(l.plan)};
  });
  const prospects = Array.from({length: 3}, (_, i) => {
    const x = (raw?.prospects || [])[i] || {};
    const o = {name: clip(x.name, 200), link: clip(x.link, 500)};
    for (const f of def.prospectFields) o[f] = clip(x[f]);
    return o;
  });
  return {lists, prospects};
}
function missingParts(def, c) {
  const out = [];
  c.lists.forEach((l, i) => {
    const jobOk = i < 2 ? def.jobs.includes(l.job) : l.job.trim();
    if (!jobOk || def.listFields.some(f => !String(l[f]).trim())) out.push('List ' + (i + 1));
  });
  if (c.lists[0].job && c.lists[0].job === c.lists[1].job) out.push('Lists 1 and 2 need different jobs');
  c.prospects.forEach((x, i) => { if (!x.name.trim() || def.prospectFields.some(f => !x[f].trim())) out.push('Prospect ' + (i + 1)); });
  return out;
}
const pracView = (row) => !row ? null : ({
  id: row.id, attemptNo: row.attempt_no, status: row.status, content: parse(row.content, {}), updatedAt: row.updated_at, submittedAt: row.submitted_at,
  review: ['passed', 'failed'].includes(row.status) ? {scores: parse(row.scores, {}), mustPass: !!row.must_pass, average: row.average, notes: row.notes, reviewedAt: row.reviewed_at, reviewer: row.reviewer_email} : null
});
async function latestPractical(env, email, certId) {
  return env.DB.prepare("SELECT * FROM practical_submissions WHERE user_email=? AND cert_id=? ORDER BY attempt_no DESC LIMIT 1").bind(email, certId).first();
}
async function practicalState(env, email, certId) {
  const cert = await env.DB.prepare("SELECT * FROM certifications WHERE id=?").bind(certId).first();
  const def = PRACTICALS[certId];
  if (!cert || !def || cert.status !== 'active') return null;
  const p = await getProgress(env, email, certId);
  const user = await env.DB.prepare("SELECT email, name FROM users WHERE email=?").bind(email).first();
  const rows = (await env.DB.prepare("SELECT * FROM practical_submissions WHERE user_email=? AND cert_id=? ORDER BY attempt_no DESC").bind(email, certId).all()).results;
  const quiz = await env.DB.prepare("SELECT score, status FROM quiz_attempts WHERE user_email=? AND cert_id=? AND status IN ('passed','failed') ORDER BY finished_at DESC LIMIT 1").bind(email, certId).first();
  return {
    cert: {id: cert.id, name: cert.name, day: cert.onboarding_day, status: cert.status},
    rep: {email, name: user?.name || email.split('@')[0]},
    def: {title: def.title, jobs: def.jobs, criteria: def.criteria, must: def.must},
    progress: {status: p.status, components: parse(p.components, {}), quizAttemptsUsed: p.attempts_used, retakeUnlocked: !!p.retake_unlocked},
    quiz: quiz ? {status: quiz.status, score: quiz.score} : null,
    current: pracView(rows[0]), history: rows.slice(1).map(pracView), attemptsUsed: rows.filter(r => ['passed', 'failed'].includes(r.status)).length, maxAttempts: MAX_ATTEMPTS
  };
}
async function savePractical(env, me, certId, raw, submit) {
  const cert = await env.DB.prepare("SELECT * FROM certifications WHERE id=?").bind(certId).first();
  const def = PRACTICALS[certId];
  if (!cert || !def || cert.status !== 'active') return fail('not_available', 'This practical isn’t open yet.', 404);
  let row = await latestPractical(env, me.email, certId);
  const t = nowIso();
  if (row && ['submitted', 'passed'].includes(row.status)) return fail('locked', row.status === 'passed' ? 'You’ve already passed this practical.' : 'You’ve submitted this. Your manager will go through it with you live.', 409);
  if (row && row.status === 'failed') {
    const used = (await env.DB.prepare("SELECT COUNT(*) n FROM practical_submissions WHERE user_email=? AND cert_id=? AND status IN ('passed','failed')").bind(me.email, certId).first()).n;
    if (used >= MAX_ATTEMPTS) return fail('max_attempts', 'Talk to your manager about next steps for this certification.', 409);
    row = null;
  }
  const content = cleanContent(def, raw);
  if (submit) {
    const missing = missingParts(def, content);
    if (missing.length) return json({error: 'incomplete', message: 'Finish every part before you submit.', missing}, 422);
  }
  if (!row) {
    const n = (await env.DB.prepare("SELECT COALESCE(MAX(attempt_no),0) n FROM practical_submissions WHERE user_email=? AND cert_id=?").bind(me.email, certId).first()).n;
    const prog = await getProgress(env, me.email, certId);
    await env.DB.batch([
      env.DB.prepare("INSERT INTO practical_submissions (id, user_email, cert_id, attempt_no, status, content, created_at, updated_at) VALUES (?,?,?,?, 'draft', ?, ?, ?)").bind(crypto.randomUUID(), me.email, certId, n + 1, JSON.stringify(content), t, t),
      componentUpdate(env, cert, prog, me.email, {practical: 'draft'}, t)
    ]);
    row = await latestPractical(env, me.email, certId);
  } else {
    await env.DB.prepare("UPDATE practical_submissions SET content=?, updated_at=? WHERE id=?").bind(JSON.stringify(content), t, row.id).run();
  }
  if (submit) {
    const prog = await getProgress(env, me.email, certId);
    await env.DB.batch([
      env.DB.prepare("UPDATE practical_submissions SET status='submitted', submitted_at=?, updated_at=? WHERE id=?").bind(t, t, row.id),
      componentUpdate(env, cert, prog, me.email, {practical: 'submitted'}, t),
      env.DB.prepare("INSERT INTO activity_events (user_email, kind, ref, occurred_at) VALUES (?, 'practical_submit', ?, ?)").bind(me.email, certId, t)
    ]);
  }
  return json(await practicalState(env, me.email, certId));
}
async function reviewPractical(env, me, certId, email, body) {
  const cert = await env.DB.prepare("SELECT * FROM certifications WHERE id=?").bind(certId).first();
  const def = PRACTICALS[certId];
  if (!cert || !def) return fail('not_found', 'Unknown practical.', 404);
  const row = await latestPractical(env, email, certId);
  if (!row || row.status !== 'submitted') return fail('not_ready', 'There’s no submitted practical waiting for review.', 409);
  const scores = {};
  for (const c of def.criteria) {
    const v = Number(body.scores?.[c.id]);
    if (!Number.isInteger(v) || v < 1 || v > 4) return fail('scores', 'Score every area from 1 to 4.');
    scores[c.id] = v;
  }
  if (typeof body.mustPass !== 'boolean') return fail('must_pass', 'Answer the must-pass.');
  const notes = String(body.notes || '').trim().slice(0, 4000);
  if (!notes) return fail('notes', 'Coaching notes are required.');
  const average = Math.round(Object.values(scores).reduce((a, b) => a + b, 0) / def.criteria.length * 100) / 100;
  const passed = body.mustPass && average >= 3;
  const t = nowIso();
  const prog = await getProgress(env, email, certId);
  await env.DB.batch([
    env.DB.prepare("UPDATE practical_submissions SET status=?, reviewer_email=?, scores=?, must_pass=?, average=?, notes=?, reviewed_at=?, updated_at=? WHERE id=?")
      .bind(passed ? 'passed' : 'failed', me.email, JSON.stringify(scores), body.mustPass ? 1 : 0, average, notes, t, t, row.id),
    componentUpdate(env, cert, prog, email, {practical: passed ? 'passed' : 'failed'}, t)
  ]);
  await audit(env, me.email, 'review_practical', `${email}:${certId}`, {attempt: row.attempt_no, average, mustPass: body.mustPass, passed});
  return json(await practicalState(env, email, certId));
}

// ---------- team view ----------
async function team(env) {
  const users = (await env.DB.prepare("SELECT email, name, role FROM users WHERE active=1 ORDER BY role='rep' DESC, COALESCE(name, email)").all()).results;
  const certs = await certCatalog(env);
  const progress = (await env.DB.prepare("SELECT * FROM cert_progress").all()).results;
  const lastScores = (await env.DB.prepare("SELECT user_email, cert_id, score FROM quiz_attempts WHERE status IN ('passed','failed') ORDER BY finished_at DESC").all()).results;
  const weekAgo = new Date(Date.now() - 7 * 864e5).toISOString(), monthAgo = new Date(Date.now() - 30 * 864e5).toISOString();
  const leaves = (await env.DB.prepare("SELECT e.user_email, e.outcome, e.duration_ms, e.occurred_at, a.cert_id FROM integrity_events e JOIN quiz_attempts a ON a.id=e.attempt_id WHERE e.occurred_at>=? ORDER BY e.occurred_at DESC").bind(weekAgo).all()).results;
  const visits = (await env.DB.prepare("SELECT user_email, COUNT(*) n FROM activity_events WHERE kind='page_view' AND occurred_at>=? GROUP BY user_email").bind(monthAgo).all()).results;
  const pracRows = (await env.DB.prepare("SELECT user_email, cert_id, attempt_no, status, submitted_at FROM practical_submissions ORDER BY attempt_no DESC").all()).results;
  const lastSeen = (await env.DB.prepare("SELECT user_email, MAX(t) t FROM (SELECT user_email, occurred_at t FROM activity_events UNION ALL SELECT user_email, started_at t FROM quiz_attempts) GROUP BY user_email").all()).results;

  const rows = users.map(u => ({
    email: u.email, name: u.name || u.email.split('@')[0], role: u.role,
    cells: certs.map(c => {
      const p = progress.find(x => x.user_email === u.email && x.cert_id === c.id);
      return p?.status === 'passed' ? 'p' : p?.status === 'failed' ? 'f' : p?.status === 'in_progress' ? 'i' : 'n';
    })
  }));
  const attention = [];
  const latestPrac = new Map();
  for (const r of pracRows) { const k = r.user_email + ':' + r.cert_id; if (!latestPrac.has(k)) latestPrac.set(k, r); }
  const pracUsed = (email, cert) => pracRows.filter(r => r.user_email === email && r.cert_id === cert && ['passed', 'failed'].includes(r.status)).length;
  for (const r of latestPrac.values()) {
    const u = rows.find(x => x.email === r.user_email); if (!u) continue;
    if (r.status === 'submitted') attention.push({kind: 'review', email: u.email, name: u.name, cert: r.cert_id, at: r.submitted_at, text: `submitted the ${r.cert_id} practical${r.attempt_no > 1 ? ' (attempt ' + r.attempt_no + ')' : ''} · ready for a live review`});
    else if (r.status === 'failed') attention.push(pracUsed(r.user_email, r.cert_id) >= MAX_ATTEMPTS
      ? {kind: 'max', email: u.email, name: u.name, cert: r.cert_id, text: `has used all ${MAX_ATTEMPTS} attempts on the ${r.cert_id} practical · time for a performance conversation`}
      : {kind: 'retake', email: u.email, name: u.name, cert: r.cert_id, text: `didn’t pass the ${r.cert_id} practical · retake on the Foundation schedule`});
  }
  for (const p of progress.filter(p => p.status === 'failed' && parse(p.components, {}).quiz === 'failed')) {
    const u = rows.find(r => r.email === p.user_email); if (!u) continue;
    const s = lastScores.find(x => x.user_email === p.user_email && x.cert_id === p.cert_id);
    if (p.attempts_used >= MAX_ATTEMPTS) attention.push({kind: 'max', email: u.email, name: u.name, cert: p.cert_id, text: `has used all ${MAX_ATTEMPTS} attempts on ${p.cert_id} · time for a performance conversation`});
    else if (!p.retake_unlocked) attention.push({kind: 'coach', email: u.email, name: u.name, cert: p.cert_id, text: `didn’t pass the ${p.cert_id} quiz${s ? ' (' + Math.round(s.score * 100) + '%)' : ''} · coaching needed before retake`});
  }
  for (const l of leaves) {
    const u = rows.find(r => r.email === l.user_email); if (!u) continue;
    attention.push({kind: 'leave', email: u.email, name: u.name, cert: l.cert_id, at: l.occurred_at, text: `left the tab during the ${l.cert_id} quiz · ${l.outcome === 'voided' ? 'second time, attempt ended and locked 24h' : 'first warning'}${l.duration_ms ? ' · ' + Math.round(l.duration_ms / 1000) + ' sec' : ''}`});
  }
  const growth = rows.map(r => {
    const passed = progress.filter(p => p.user_email === r.email && p.status === 'passed' && p.passed_at >= monthAgo).length;
    const optional = 0; // optional competitor modules arrive with the Senior SDR track
    const v = visits.find(x => x.user_email === r.email)?.n || 0;
    return {name: r.name, email: r.email, passed, optional, visits: v, score: passed * 30 + optional * 20 + Math.min(v, 40)};
  });
  const maxScore = Math.max(1, ...growth.map(g => g.score));
  const leaders = growth.filter(g => g.score > 0).sort((a, b) => b.score - a.score).slice(0, 3).map(g => ({...g, pct: Math.round(g.score / maxScore * 100)}));
  const quiet = rows.filter(r => r.role === 'rep').map(r => {
    const seen = lastSeen.find(x => x.user_email === r.email)?.t;
    const days = seen ? Math.floor((Date.now() - Date.parse(seen)) / 864e5) : null;
    const nextCert = certs.find((c, i) => c.status === 'active' && r.cells[i] !== 'p');
    return {name: r.name, email: r.email, days, detail: nextCert ? `${nextCert.id} ${r.cells[certs.indexOf(nextCert)] === 'n' ? 'not started' : 'in progress'}` : 'Active certs complete'};
  }).filter(q => q.days === null || q.days >= 3).sort((a, b) => (b.days ?? 999) - (a.days ?? 999)).slice(0, 3);
  const allIds = certs.map(c => c.id);
  const eligible = rows.filter(r => r.cells.every((c, i) => c === 'p' || !['foundation', 'cold_calling', 'skills'].includes(certs[i].track))).length;
  return {
    certs: certs.map(c => ({id: c.id, name: c.name, summary: c.summary, status: c.status})), rows, attention, leaders, quiet,
    tiles: {reviews: attention.filter(a => a.kind === 'review').length, coaching: attention.filter(a => a.kind === 'coach').length, leaves: leaves.length, eligible: allIds.length ? eligible : 0},
    totals: {reps: rows.filter(r => r.role === 'rep').length}
  };
}

// ---------- router ----------
export async function handleApi(request, env, user) {
  const url = new URL(request.url), path = url.pathname, method = request.method;
  if (method !== 'GET' && method !== 'HEAD') {
    const origin = request.headers.get('Origin');
    if (origin && origin !== url.origin) return fail('forbidden', 'Cross-site request blocked.', 403);
  }
  const me = await ensureUser(env, user);
  if (!me.active) return fail('inactive', 'Your access is paused.', 403);
  const body = method === 'POST' ? await request.json().catch(() => ({})) : {};
  let m;

  if (path === '/api/me') return json({email: me.email, name: me.name, role: me.role});
  if (path === '/api/certs') return json(await myCerts(env, me));
  if (path === '/api/activity' && method === 'POST') {
    const kind = String(body.kind || '').slice(0, 40), ref = String(body.ref || '').slice(0, 120);
    if (kind) await env.DB.prepare("INSERT INTO activity_events (user_email, kind, ref, occurred_at) VALUES (?,?,?,?)").bind(me.email, kind, ref, nowIso()).run();
    return json({ok: true});
  }
  if ((m = /^\/api\/quiz\/([A-Z0-9]{1,6})\/start$/.exec(path)) && method === 'POST') return startQuiz(env, me, m[1]);
  if ((m = /^\/api\/quiz\/([A-Z0-9]{1,6})\/state$/.exec(path))) {
    const open = await env.DB.prepare("SELECT * FROM quiz_attempts WHERE user_email=? AND cert_id=? AND status='in_progress'").bind(me.email, m[1]).first();
    const cert = await env.DB.prepare("SELECT * FROM certifications WHERE id=?").bind(m[1]).first();
    if (!cert) return fail('not_found', 'Unknown certification.', 404);
    const p = await getProgress(env, me.email, m[1]);
    return json({
      cert: {id: cert.id, name: cert.name, summary: cert.summary, status: cert.status, questions: cert.questions_per_attempt, seconds: cert.seconds_per_question, passMark: cert.pass_mark},
      progress: {status: p.status, quizPassed: parse(p.components, {}).quiz === 'passed', hasPractical: parse(cert.components, []).includes('practical'), attemptsUsed: p.attempts_used, retakeUnlocked: !!p.retake_unlocked, maxAttempts: MAX_ATTEMPTS, lockedUntil: await lockedUntil(env, me.email, m[1])},
      openAttempt: open ? open.id : null
    });
  }
  if ((m = /^\/api\/attempt\/([0-9a-f-]{36})\/(question|answer|leave|result)$/.exec(path))) {
    const loaded = await loadAttempt(env, me, m[1]);
    if (!loaded) return fail('not_found', 'Attempt not found.', 404);
    const {attempt, cert} = loaded;
    if (m[2] === 'question') return json(await currentQuestion(env, attempt, cert));
    if (m[2] === 'answer' && method === 'POST') {
      if (attempt.status !== 'in_progress') return json({done: true, attemptId: attempt.id, status: attempt.status});
      if (Number(body.position) !== attempt.current_index) return json(await currentQuestion(env, attempt, cert));
      const elapsed = attempt.question_started_at ? Date.now() - Date.parse(attempt.question_started_at) : 0;
      const late = elapsed > (cert.seconds_per_question || 45) * 1000 + GRACE_MS;
      const choice = typeof body.choice === 'string' && /^[A-D]$/.test(body.choice) ? body.choice : null;
      const after = await recordAnswer(env, attempt, cert, attempt.current_index, choice, late || !choice);
      return json(after.status === 'in_progress' ? await currentQuestion(env, after, cert) : {done: true, attemptId: after.id, status: after.status});
    }
    if (m[2] === 'leave' && method === 'POST') {
      if (attempt.status !== 'in_progress') return json({status: attempt.status});
      const leaves = attempt.tab_leaves + 1, t = nowIso();
      const kind = body.kind === 'fullscreen_exit' ? 'fullscreen_exit' : 'tab_leave';
      const duration = Number.isFinite(body.durationMs) ? Math.max(0, Math.round(body.durationMs)) : null;
      if (leaves >= 2) {
        const until = new Date(Date.now() + LOCK_HOURS * 3600e3).toISOString();
        await env.DB.batch([
          env.DB.prepare("UPDATE quiz_attempts SET tab_leaves=?, status='voided', finished_at=?, locked_until=? WHERE id=?").bind(leaves, t, until, attempt.id),
          env.DB.prepare("INSERT INTO integrity_events (attempt_id, user_email, kind, duration_ms, outcome, occurred_at) VALUES (?,?,?,?, 'voided', ?)").bind(attempt.id, me.email, kind, duration, t),
          env.DB.prepare("UPDATE cert_progress SET status=CASE WHEN status='in_progress' THEN 'not_started' ELSE status END, updated_at=? WHERE user_email=? AND cert_id=?").bind(t, me.email, attempt.cert_id)
        ]);
        return json({status: 'voided', lockedUntil: until});
      }
      await env.DB.batch([
        env.DB.prepare("UPDATE quiz_attempts SET tab_leaves=? WHERE id=?").bind(leaves, attempt.id),
        env.DB.prepare("INSERT INTO integrity_events (attempt_id, user_email, kind, duration_ms, outcome, occurred_at) VALUES (?,?,?,?, 'warning', ?)").bind(attempt.id, me.email, kind, duration, t)
      ]);
      return json({status: 'warning', tabLeaves: leaves, durationMs: duration, at: t});
    }
    if (m[2] === 'result') {
      if (!['passed', 'failed'].includes(attempt.status)) return fail('not_finished', 'This attempt isn’t finished.', 409);
      return json(await result(env, attempt));
    }
  }

  if ((m = /^\/api\/practical\/([A-Z0-9]{1,6})$/.exec(path))) {
    if (method === 'POST') return savePractical(env, me, m[1], body.content, !!body.submit);
    const st = await practicalState(env, me.email, m[1]);
    return st ? json(st) : fail('not_available', 'This practical isn’t open yet.', 404);
  }

  // ----- managers (and admin) -----
  if ((m = /^\/api\/review\/([A-Z0-9]{1,6})$/.exec(path))) {
    if (!isManager(me)) return fail('forbidden', 'Managers only.', 403);
    const email = String(method === 'POST' ? body.email : url.searchParams.get('rep') || '').toLowerCase();
    if (!email) return fail('bad_request', 'Pick a rep.');
    if (method === 'POST') return reviewPractical(env, me, m[1], email, body);
    const st = await practicalState(env, email, m[1]);
    return st ? json(st) : fail('not_available', 'This practical isn’t open yet.', 404);
  }
  if (path === '/api/team') { if (!isManager(me)) return fail('forbidden', 'Managers only.', 403); return json(await team(env)); }
  if (path === '/api/team/unlock' && method === 'POST') {
    if (!isManager(me)) return fail('forbidden', 'Managers only.', 403);
    const email = String(body.email || '').toLowerCase(), cert = String(body.cert || '');
    const p = await env.DB.prepare("SELECT * FROM cert_progress WHERE user_email=? AND cert_id=?").bind(email, cert).first();
    if (!p || p.status !== 'failed') return fail('not_needed', 'Nothing to unlock.', 409);
    if (p.attempts_used >= MAX_ATTEMPTS) return fail('max_attempts', 'All attempts used.', 409);
    await env.DB.batch([
      env.DB.prepare("UPDATE cert_progress SET retake_unlocked=1, updated_at=? WHERE user_email=? AND cert_id=?").bind(nowIso(), email, cert),
      env.DB.prepare("INSERT INTO retake_unlocks (user_email, cert_id, coached_by, coached_at, note) VALUES (?,?,?,?,?)").bind(email, cert, me.email, nowIso(), String(body.note || '').slice(0, 1000) || null)
    ]);
    await audit(env, me.email, 'unlock_retake', `${email}:${cert}`);
    return json({ok: true});
  }

  // ----- admin only: people, resets, question bank -----
  if (path === '/api/admin/users') {
    if (!isAdmin(me)) return fail('forbidden', 'Admin only.', 403);
    if (method === 'POST') {
      const email = String(body.email || '').trim().toLowerCase();
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return fail('bad_email', 'Enter a valid email.');
      const role = ['manager', 'rep'].includes(body.role) ? body.role : 'rep';
      if (email === me.email) return fail('self', 'You can’t change your own role.');
      await env.DB.prepare("INSERT INTO users (email, name, role, created_at) VALUES (?,?,?,?) ON CONFLICT(email) DO UPDATE SET role=excluded.role, name=COALESCE(excluded.name, users.name), active=1")
        .bind(email, body.name ? String(body.name).slice(0, 80) : null, role, nowIso()).run();
      await audit(env, me.email, 'set_role', email, {role});
    }
    return json({users: (await env.DB.prepare("SELECT email, name, role, active FROM users ORDER BY role, email").all()).results});
  }
  if (path === '/api/admin/reset' && method === 'POST') {
    if (!isAdmin(me)) return fail('forbidden', 'Admin only.', 403);
    const email = String(body.email || '').toLowerCase(), cert = String(body.cert || '');
    await env.DB.batch([
      env.DB.prepare("DELETE FROM cert_progress WHERE user_email=? AND cert_id=?").bind(email, cert),
      env.DB.prepare("DELETE FROM practical_submissions WHERE user_email=? AND cert_id=?").bind(email, cert),
      env.DB.prepare("UPDATE quiz_attempts SET status='voided', locked_until=NULL WHERE user_email=? AND cert_id=? AND status='in_progress'").bind(email, cert),
      env.DB.prepare("UPDATE quiz_attempts SET locked_until=NULL WHERE user_email=? AND cert_id=?").bind(email, cert)
    ]);
    await audit(env, me.email, 'reset_progress', `${email}:${cert}`);
    return json({ok: true});
  }
  if (path === '/api/admin/sync-bank' && method === 'POST') {
    if (!isAdmin(me)) return fail('forbidden', 'Admin only.', 403);
    const out = {};
    for (const id of Object.keys(BANKS)) out[id] = await syncBank(env, id);
    await audit(env, me.email, 'sync_bank', null, out);
    return json(out);
  }
  return fail('not_found', 'Not found.', 404);
}
