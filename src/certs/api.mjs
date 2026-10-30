// Certification API: quiz engine, progress, team view and admin tools.
// Everything here runs server-side. Correct answers never leave the server
// until a quiz is finished, and even then only as reveals for questions the rep got right.
import bankF1 from './bank-f1.json' with {type: 'json'};
import bankF2 from './bank-f2.json' with {type: 'json'};
import bankF3 from './bank-f3.json' with {type: 'json'};
import bankF4 from './bank-f4.json' with {type: 'json'};
import {PIPER_F4, F4_ROLEPLAY} from './f4-content.mjs';
import bankCC1 from './bank-cc1.json' with {type: 'json'};
import {CC1_TRAINING, CC1_ROLEPLAY} from './cc1-content.mjs';
import bankCC2 from './bank-cc2.json' with {type: 'json'};
import {CC2_TRAINING, CC2_ROLEPLAY} from './cc2-content.mjs';
import bankCC3 from './bank-cc3.json' with {type: 'json'};
import {CC3_TRAINING, CC3_ROLEPLAY} from './cc3-content.mjs';
import bankCC4 from './bank-cc4.json' with {type: 'json'};
import {CC4_TRAINING, CC4_ROLEPLAY} from './cc4-content.mjs';
import bankCC5 from './bank-cc5.json' with {type: 'json'};
import {CC5_TRAINING, CC5_ROLEPLAY} from './cc5-content.mjs';
import bankCC6 from './bank-cc6.json' with {type: 'json'};
import {CC6_TRAINING, CC6_ROLEPLAY} from './cc6-content.mjs';
import bankJA1 from './bank-ja1.json' with {type: 'json'};
import {JA1_TRAINING} from './ja1-content.mjs';
import bankJA2 from './bank-ja2.json' with {type: 'json'};
import {JA2_TRAINING} from './ja2-content.mjs';
import bankJA3 from './bank-ja3.json' with {type: 'json'};
import {JA3_TRAINING} from './ja3-content.mjs';
import bankJA4 from './bank-ja4.json' with {type: 'json'};
import {JA4_TRAINING} from './ja4-content.mjs';
import bankJA5 from './bank-ja5.json' with {type: 'json'};
import {JA5_TRAINING} from './ja5-content.mjs';
import bankJA6 from './bank-ja6.json' with {type: 'json'};
import {JA6_TRAINING} from './ja6-content.mjs';
import bankJA7 from './bank-ja7.json' with {type: 'json'};
import {JA7_TRAINING} from './ja7-content.mjs';
import bankJA8 from './bank-ja8.json' with {type: 'json'};
import {JA8_TRAINING} from './ja8-content.mjs';
import {CC7_ROLEPLAY} from './cc7-content.mjs';
import {JA9_ROLEPLAY} from './ja9-content.mjs';

const BANKS = {F1: bankF1, F2: bankF2, F3: bankF3, F4: bankF4, CC1: bankCC1, CC2: bankCC2, CC3: bankCC3, CC4: bankCC4, CC5: bankCC5, CC6: bankCC6, JAE1: bankJA1, JAE2: bankJA2, JAE3: bankJA3, JAE4: bankJA4, JAE5: bankJA5, JAE6: bankJA6, JAE7: bankJA7, JAE8: bankJA8};
export const TRAININGS = {CC1: CC1_TRAINING, CC2: CC2_TRAINING, CC3: CC3_TRAINING, CC4: CC4_TRAINING, CC5: CC5_TRAINING, CC6: CC6_TRAINING, JAE1: JA1_TRAINING, JAE2: JA2_TRAINING, JAE3: JA3_TRAINING, JAE4: JA4_TRAINING, JAE5: JA5_TRAINING, JAE6: JA6_TRAINING, JAE7: JA7_TRAINING, JAE8: JA8_TRAINING};
// Default entry fields for training applications and rapid roleplays (CC1 shape).
const DEFAULT_FIELDS = [{key: 'business', label: 'Business', kind: 'input', required: true}, {key: 'note', label: 'SDR Additional Note', kind: 'input', required: true}, {key: 'opener', label: 'Your opener', kind: 'textarea', required: true, optionalFor: ['Cold']}];
const cleanEntry = (fields, raw, type) => { const o = {type}; for (const f of fields) { let v = clip(raw?.[f.key], f.kind === 'textarea' ? 1200 : 600).trim(); if (f.kind === 'select' && v && !f.options.includes(v)) v = ''; o[f.key] = v; } return o; };
const entryMissing = (fields, e, minText) => fields.filter(f => f.required && !(f.optionalFor || []).includes(e.type)).find(f => !e[f.key] || (f.kind === 'textarea' && e[f.key].length < (minText || 20)));
const GRACE_MS = 4000;          // network slack on top of each question's time limit
const LOCK_HOURS = 24;          // lockout after a second tab-leave
const MAX_ATTEMPTS = 3;         // failed attempts before a performance conversation
const NUM = {2: 'two', 3: 'three', 4: 'four', 5: 'five'};
const REVIEW_LABELS = {'day-1': 'Day 1 · The SDR Job', 'day-2': 'Day 2 · Who We Sell To & Why', 'day-3': 'Day 3 · Owning Your Book of Business', 'day-4': 'Day 4 · Pre-Vetting Workshop', 'day-5': 'Day 5 · Cold Calling Fundamentals', 'day-6': 'Day 6 · Controlling the Conversation', 'day-7': 'Day 7 · Working Smarter at Scale', 'day-8': 'Day 8 · From Yes to Meeting Held', 'meetings': 'Meetings & AE Handoff', 'sal': 'Qualification & SALs', 'book': 'Book of Business', 'statuses': 'Lead Statuses & CRM', '/training/CC1': 'CC1 · Openers training', '/training/CC2': 'CC2 · Elevator Pitch training', '/training/JAE1': 'JAE1 · Core Product training', '/training/JAE2': 'JAE2 · Plans and Quoting training', '/training/JAE3': 'JAE3 · Payments and Card Fees training', '/training/JAE4': 'JAE4 · Migration and Onboarding training', '/training/JAE5': 'JAE5 · Main Competitors training', '/training/JAE6': 'JAE6 · Contract and Close training', '/training/JAE7': 'JAE7 · AI Agent training', '/training/JAE8': 'JAE8 · Sandler Selling training'};
// Foundation certs allow three attempts; the self-paced tracks have no limit (a retake opens after coaching).
// Junior AE track: no manager coaching gate. A failed quiz locks for 24 hours, then the rep retakes it on their own.
const RETAKE_WAIT_HOURS = {junior_ae: 24, bonus: 24};
async function retakeAt(env, email, cert) {
  const h = RETAKE_WAIT_HOURS[cert?.track];
  if (!h) return null;
  const r = await env.DB.prepare("SELECT MAX(finished_at) f FROM quiz_attempts WHERE user_email=? AND cert_id=? AND status='failed'").bind(email, cert.id).first();
  if (!r?.f) return null;
  const at = new Date(Date.parse(r.f) + h * 3600e3).toISOString();
  return at > nowIso() ? at : null;
}
const maxFor = (cert) => (cert?.track || 'foundation') === 'foundation' ? MAX_ATTEMPTS : 999;

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
  },
  F4: PIPER_F4
};
const pracComponent = (def) => def.component || 'practical';

// Live roleplays. The rep brings their own pre-vetted lead; the manager plays it with a hidden card.
export const ROLEPLAYS = {
  F4: F4_ROLEPLAY,
  CC1: CC1_ROLEPLAY,
  CC2: CC2_ROLEPLAY,
  CC3: CC3_ROLEPLAY,
  CC4: CC4_ROLEPLAY,
  CC5: CC5_ROLEPLAY,
  CC6: CC6_ROLEPLAY,
  CC7: CC7_ROLEPLAY,
  JAE9: JA9_ROLEPLAY,
  F3: {
    mode: 'lead',
    criteria: [
      {id: 'open', name: 'Open and earn attention', hint: 'Sounded human, gave a clear reason for calling, earned the next 30 seconds.'},
      {id: 'relevance', name: 'Created relevance', hint: 'Used something specific to this business, not a generic platform pitch.'},
      {id: 'discovery', name: 'Discovery and following the thread', hint: 'Asked a few good questions and chased what the prospect said.'},
      {id: 'resistance', name: 'Handled resistance', hint: 'Read it right, lowered resistance and kept it moving. One good question can earn a 4.'},
      {id: 'ask', name: 'Asked for the meeting', hint: 'Direct, a specific time, at the right moment.'},
      {id: 'conversational', name: 'Conversational execution', hint: 'Sounded like a person and knew what to do next.'}
    ],
    musts: [
      {id: 'asked', name: 'Asked for the meeting'},
      {id: 'accurate', name: 'Made no inaccurate claims about Momence or a competitor'},
      {id: 'noargue', name: 'Never argued with the prospect'}
    ],
    cards: [
      {id: 'rushed', title: 'Card 1 · The rushed owner', answer: 'Clipped, between classes. “Yeah, who’s this?”', brushoff: '“I don’t have time for sales calls.”', thread: 'Your front desk spends half the morning answering texts about bookings.', objection: '“Our software works just fine.”', yes: 'They get to the point fast, ask about the admin around your software, and ask for a specific time.'},
      {id: 'talker', title: 'Card 2 · The friendly talker', answer: 'Warm and chatty. You tell stories about the studio and drift off topic.', brushoff: '“Can you just send me some info?”', thread: 'Buried in a story: your early-morning classes lose a few people every week to no-shows.', objection: '“We don’t have the bandwidth to switch right now.”', yes: 'They steer you back, follow the no-show thread and ask directly, without overselling.'},
      {id: 'frontdesk', title: 'Card 3 · The owner posing as the front desk', answer: '“Front desk, what’s this regarding?” Don’t say you’re the owner until they stop pitching and ask a good question, or ask for the owner by name.', brushoff: '“The owner isn’t really interested in software calls.”', thread: 'You just hired a second instructor and the schedule is getting messy.', objection: '“I’ve migrated before. It was a nightmare.”', yes: 'They don’t pitch the “front desk,” notice how much you know, and connect value to managing more staff.'},
      {id: 'burned', title: 'Card 4 · The burned switcher', answer: 'Polite but guarded.', brushoff: '“Not a priority right now.”', thread: 'You still chase failed payments by hand every month.', objection: '“Last time we switched, we lost half our client history.”', yes: 'They acknowledge it, make clear they’re not there to uproot anything, stay curious about payments and keep the pressure low.'},
      {id: 'happy', title: 'Card 5 · Happy, and busy', answer: 'Upbeat and friendly.', brushoff: '“Bad timing. We’re launching a new schedule this month.”', thread: 'You like your software, but clients complain the booking app is clunky.', objection: '“We’re happy with our current software.”', yes: 'They don’t argue, use the clunky-app thread, and ask for a specific time that works around your launch.'},
      {id: 'price', title: 'Card 6 · Price first', answer: 'Direct and numbers-minded.', brushoff: '“How much is it? We won’t pay more than we do now.” Ask this before any discovery.', thread: 'Your evening classes have waitlists and you’re turning people away.', objection: '“I don’t see why I’d pay to switch.”', yes: 'They don’t get pulled into pricing, say that’s what the meeting is for, and tie value to the waitlists.'}
    ]
  }
};
// A rep's lead-code prefix comes from their email: first.last@ → FL; single word → first two letters.
export function codePrefix(email) {
  const parts = String(email || '').split('@')[0].split(/[._-]+/).map(p => p.replace(/[^a-z]/gi, '')).filter(Boolean);
  if (!parts.length) return 'XX';
  return (parts.length > 1 ? parts[0][0] + parts[parts.length - 1][0] : parts[0].slice(0, 2)).toUpperCase();
}
const SECOND = {written: '/written/', practical: '/practical/', roleplay: '/roleplay/'};
const secondComponent = (components) => ['written', 'practical', 'roleplay'].find(c => components.includes(c)) || null;

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
  const row = await env.DB.prepare("SELECT email, name, role, level, active FROM users WHERE email=?").bind(user.email).first();
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
// Certs that need a role, not just earlier certs. The Junior AE track opens once a manager marks the SDR Senior SDR.
const TRACK_ROLES = {junior_ae: ['senior_sdr']};
const roleKey = (u) => !u ? 'sdr' : u.role === 'rep' ? (u.level === 'senior_sdr' ? 'senior_sdr' : 'sdr') : u.role;
async function missingFor(env, email, cert) {
  const out = [];
  for (const pre of parse(cert.prerequisites, [])) {
    const x = await env.DB.prepare("SELECT status FROM cert_progress WHERE user_email=? AND cert_id=?").bind(email, pre).first();
    if (x?.status !== 'passed') out.push(pre);
  }
  const need = TRACK_ROLES[cert.track];
  if (need) {
    const u = await env.DB.prepare("SELECT role, level FROM users WHERE email=?").bind(email).first();
    const k = roleKey(u);
    // Managers previewing the path are treated like an SDR, so they see exactly what a rep sees.
    if (!need.includes(k)) out.push('Senior SDR');
  }
  return out;
}
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
  const rps = (await env.DB.prepare("SELECT cert_id, attempt_no, status, content FROM roleplay_leads WHERE user_email=? ORDER BY attempt_no DESC").bind(me.email).all()).results;
  const trains = (await env.DB.prepare("SELECT cert_id, completed_at FROM training_progress WHERE user_email=?").bind(me.email).all()).results;
  const progress = {};
  for (const c of certs) {
    const p = rows.find(r => r.cert_id === c.id);
    const l = last.find(r => r.cert_id === c.id);
    const lock = locks.find(r => r.cert_id === c.id);
    progress[c.id] = {
      status: p?.status || 'not_started', attemptsUsed: p?.attempts_used || 0, retakeUnlocked: p ? !!p.retake_unlocked : true,
      passedAt: p?.passed_at || null, lastScore: l ? l.score : null, inProgress: !!open.find(o => o.cert_id === c.id),
      lockedUntil: lock?.l && lock.l > nowIso() ? lock.l : null, maxAttempts: maxFor(c),
      retakeAt: RETAKE_WAIT_HOURS[c.track] && p?.status === 'failed' ? await retakeAt(env, me.email, c) : null,
      training: (() => { const x = trains.find(r => r.cert_id === c.id); return x ? {completed: !!x.completed_at} : null; })(),
      components: parse(p?.components, {}),
      practical: (() => { const x = pracs.find(r => r.cert_id === c.id); return x ? {status: x.status, attemptNo: x.attempt_no} : null; })(),
      roleplay: (() => { const x = rps.find(r => r.cert_id === c.id); return x ? {status: x.status, attemptNo: x.attempt_no, booking: parse(x.content, {}).booking || null} : null; })()
    };
  }
  return {me: {email: me.email, name: me.name, role: me.role, level: roleKey(me)}, certs, progress};
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
      passed || RETAKE_WAIT_HOURS[cert.track] ? ', attempts_used=attempts_used+1' : ', attempts_used=attempts_used+1, retake_unlocked=0')
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
  const missQ = await missingFor(env, me.email, cert);
  if (missQ.length) return fail('prerequisite', `Pass ${missQ[0]} first.`, 409);
  const p = await getProgress(env, me.email, certId);
  if (parse(p.components, {}).quiz === 'passed' || p.status === 'passed') return fail('passed', 'You’ve already passed this quiz.', 409);
  if (parse(cert.components, []).includes('training') && parse(p.components, {}).training !== 'passed') return fail('training', 'Finish the training page first.', 409);
  if (p.attempts_used >= maxFor(cert)) return fail('max_attempts', 'Talk to your manager about next steps for this certification.', 409);
  if (!p.retake_unlocked) return fail('needs_coaching', 'Your retake opens after a coaching session with your manager.', 409);
  const lock = await lockedUntil(env, me.email, certId);
  if (lock) return json({error: 'locked', message: 'This quiz is locked after leaving the tab twice.', lockedUntil: lock}, 409);
  const wait = await retakeAt(env, me.email, cert);
  if (wait) return json({error: 'locked', message: 'Your retake opens 24 hours after your last attempt. Review the training in the meantime.', lockedUntil: wait}, 409);
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
  const cert = await env.DB.prepare("SELECT id, name, pass_mark, components, track FROM certifications WHERE id=?").bind(attempt.cert_id).first();
  const p = await env.DB.prepare("SELECT attempts_used FROM cert_progress WHERE user_email=? AND cert_id=?").bind(attempt.user_email, attempt.cert_id).first();
  const missed = new Map();
  for (const a of answers.filter(a => !a.is_correct)) if (!missed.has(a.topic)) missed.set(a.topic, {topic: a.topic, review: a.review_link, label: REVIEW_LABELS[a.review_link] || a.review_link});
  return {
    certId: attempt.cert_id, certName: cert.name, status: attempt.status, hasPractical: !!secondComponent(parse(cert.components, [])), next: secondComponent(parse(cert.components, [])), mode: ROLEPLAYS[attempt.cert_id]?.mode || null, attemptNo: attempt.attempt_no, attemptsUsed: p?.attempts_used || 0, maxAttempts: maxFor(cert), selfRetake: !!RETAKE_WAIT_HOURS[cert.track], retakeAt: await retakeAt(env, attempt.user_email, cert),
    correct: attempt.correct_count, total: answers.length, score: attempt.score, passMark: cert.pass_mark,
    reveals: answers.filter(a => a.is_correct && a.reveal).map(a => ({topic: a.topic, question: a.prompt, text: a.reveal})),
    review: [...missed.values()]
  };
}


// ---------- written practicals ----------
const clip = (v, n = 4000) => String(v ?? '').slice(0, n);
function cleanContent(def, raw) {
  if (def.kind === 'piper') {
    const note = {};
    for (const f of def.noteFields) note[f.id] = clip(raw?.note?.[f.id]);
    const changes = (Array.isArray(raw?.changes) ? raw.changes : []).slice(0, 30).map(x => clip(x, 600));
    return {note, email: clip(raw?.email, 6000), plan: clip(raw?.plan, 2000), changes};
  }
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
  if (def.kind === 'piper') {
    for (const f of def.noteFields) if (!c.note[f.id].trim()) out.push(f.label);
    if (!c.email.trim()) out.push('The email');
    if (!c.plan.trim()) out.push('The confirmation plan');
    if (c.changes.filter(x => x.trim()).length < 3) out.push('At least three changes, each with why');
    return out;
  }
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
async function practicalState(env, email, certId, forManager) {
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
    def: def.kind === 'piper'
      ? {kind: 'piper', title: def.title, brief: def.brief, sampleHeader: def.sampleHeader, transcript: def.transcript, noteFields: def.noteFields, draft: def.draft, criteria: def.criteria, must: def.must, key: forManager ? def.key : undefined}
      : {title: def.title, jobs: def.jobs, criteria: def.criteria, must: def.must},
    rpStatus: await (async () => { const r = await env.DB.prepare("SELECT status FROM roleplay_leads WHERE user_email=? AND cert_id=? ORDER BY attempt_no DESC LIMIT 1").bind(email, certId).first(); return r ? r.status : null; })(),
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
      componentUpdate(env, cert, prog, me.email, {[pracComponent(def)]: 'draft'}, t)
    ]);
    row = await latestPractical(env, me.email, certId);
  } else {
    await env.DB.prepare("UPDATE practical_submissions SET content=?, updated_at=? WHERE id=?").bind(JSON.stringify(content), t, row.id).run();
  }
  if (submit) {
    const prog = await getProgress(env, me.email, certId);
    await env.DB.batch([
      env.DB.prepare("UPDATE practical_submissions SET status='submitted', submitted_at=?, updated_at=? WHERE id=?").bind(t, t, row.id),
      componentUpdate(env, cert, prog, me.email, {[pracComponent(def)]: 'submitted'}, t),
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
    componentUpdate(env, cert, prog, email, {[pracComponent(def)]: passed ? 'passed' : 'failed'}, t)
  ]);
  await audit(env, me.email, 'review_practical', `${email}:${certId}`, {attempt: row.attempt_no, average, mustPass: body.mustPass, passed});
  return json(await practicalState(env, email, certId, true));
}


// ---------- live roleplays ----------
const rpScoreView = (r) => !r ? null : ({criteria: parse(r.criteria, {}), musts: parse(r.must_pass, {}), average: r.average, result: r.result, notes: r.coaching_notes, scoredAt: r.created_at, scorer: r.scorer_email});
async function roleplayState(env, email, certId, forManager) {
  const cert = await env.DB.prepare("SELECT * FROM certifications WHERE id=?").bind(certId).first();
  const def = ROLEPLAYS[certId];
  if (!cert || !def || cert.status !== 'active') return null;
  const p = await getProgress(env, email, certId);
  const user = await env.DB.prepare("SELECT email, name FROM users WHERE email=?").bind(email).first();
  const leads = (await env.DB.prepare("SELECT * FROM roleplay_leads WHERE user_email=? AND cert_id=? ORDER BY attempt_no DESC").bind(email, certId).all()).results;
  const scores = (await env.DB.prepare("SELECT * FROM roleplay_scores WHERE user_email=? AND cert_id=? AND result IN ('passed','failed') ORDER BY attempt_no DESC").bind(email, certId).all()).results;
  const quiz = await env.DB.prepare("SELECT score, status FROM quiz_attempts WHERE user_email=? AND cert_id=? AND status IN ('passed','failed') ORDER BY finished_at DESC LIMIT 1").bind(email, certId).first();
  const cur = leads[0];
  const view = (l) => !l ? null : {
    attemptNo: l.attempt_no, status: l.status, business: l.business, link: l.link, code: l.code, leadStatus: l.lead_status, note: l.note,
    submittedAt: l.submitted_at, startedAt: l.started_at,
    ...(def.mode === 'rapid' ? (() => { const c = parse(l.content, {}); const draws = c.draws || def.slots.map(() => null); return {
      leads: c.leads || [], booking: c.booking || null, drawn: draws.filter(Boolean).length, calls: forManager ? (c.calls || def.slots.map(() => null)) : null,
      draws: forManager ? draws.map(id => id ? def.cards.find(x => x.id === id) || null : null) : null}; })() : {}),
    card: forManager && l.card_id ? def.cards.find(c => c.id === l.card_id) || null : null,
    brief: def.mode === 'situation' && l.card_id ? (def.cards.find(c => c.id === l.card_id) || {}).brief || null : null,
    score: rpScoreView(scores.find(x => x.attempt_no === l.attempt_no))
  };
  return {
    cert: {id: cert.id, name: cert.name, day: cert.onboarding_day, components: parse(cert.components, [])},
    missingPrereqs: await missingFor(env, email, cert),
    rep: {email, name: user?.name || email.split('@')[0], codePrefix: codePrefix(email)},
    def: {mode: def.mode || 'lead', business: def.business || null, setup: def.setup || null, slots: def.slots || null, leadFields: def.mode === 'rapid' ? (def.leadFields || DEFAULT_FIELDS) : null, prepNote: def.prepNote || null, distinct: def.distinct || null, distinctMin: def.distinctMin || null, callMust: def.callMust || null, maxDq: def.maxDq ?? null, callPrompt: def.callPrompt || null, callLabels: def.callLabels || null, callChips: def.callChips || null, minutes: def.minutes || 15, copy: def.copy || null, quickFacts: forManager ? (def.quickFacts || null) : null, factsKey: def.factsKey || null, criteria: def.criteria, musts: def.musts},
    progress: {status: p.status, components: parse(p.components, {})},
    quiz: quiz ? {status: quiz.status, score: quiz.score} : null,
    current: view(cur), history: leads.slice(1).map(view),
    attemptsUsed: leads.filter(l => ['passed', 'failed'].includes(l.status)).length, maxAttempts: maxFor(cert),
    retakeUnlocked: !!p.retake_unlocked,
    ...(def.mode === 'rapid' ? {
      managers: (await env.DB.prepare("SELECT email, name FROM users WHERE active=1 AND role IN ('manager','admin') ORDER BY COALESCE(name, email)").all()).results.map(u => ({email: u.email, name: u.name || u.email.split('@')[0]})),
      openers: parse((await env.DB.prepare("SELECT content FROM training_progress WHERE user_email=? AND cert_id=?").bind(email, certId).first())?.content, {}).openers || []
    } : {})
  };
}
async function submitRoleplayLead(env, me, certId, body) {
  const cert = await env.DB.prepare("SELECT * FROM certifications WHERE id=?").bind(certId).first();
  if (!cert || !ROLEPLAYS[certId] || cert.status !== 'active') return fail('not_available', 'This roleplay isn’t open yet.', 404);
  if (ROLEPLAYS[certId].mode === 'rapid') return submitRapid(env, me, cert, body);
  if (ROLEPLAYS[certId].mode === 'situation') return fail('no_lead', 'There’s nothing to submit for this roleplay. Your manager starts it with you.', 409);
  const business = String(body.business || '').trim().slice(0, 200);
  const link = String(body.link || '').trim().slice(0, 500);
  const num = String(body.codeNum || '');
  const leadStatus = String(body.leadStatus || '');
  if (!business) return fail('business', 'Add the business name.');
  if (!['1', '2'].includes(num)) return fail('code', 'Pick your 1 or 2 code.');
  if (!['New', 'Recycled', 'Attempting'].includes(leadStatus)) return fail('status', 'The lead has to be New, Recycled or Attempting.');
  if (body.own !== true) return fail('own', 'Confirm the lead is in your own Book.');
  const code = codePrefix(me.email) + num;
  const note = String(body.note || '').trim().slice(0, 1000) || null;
  const t = nowIso();
  const cur = await env.DB.prepare("SELECT * FROM roleplay_leads WHERE user_email=? AND cert_id=? ORDER BY attempt_no DESC LIMIT 1").bind(me.email, certId).first();
  if (cur && cur.status === 'started') return fail('started', 'Your manager has started the roleplay, so the lead is locked.', 409);
  if (cur && cur.status === 'passed') return fail('passed', 'You’ve already passed this roleplay.', 409);
  if (cur && cur.status === 'submitted') {
    await env.DB.prepare("UPDATE roleplay_leads SET business=?, link=?, code=?, lead_status=?, note=?, updated_at=? WHERE id=?").bind(business, link || null, code, leadStatus, note, t, cur.id).run();
  } else {
    const used = (await env.DB.prepare("SELECT COUNT(*) n FROM roleplay_leads WHERE user_email=? AND cert_id=? AND status IN ('passed','failed')").bind(me.email, certId).first()).n;
    if (used >= MAX_ATTEMPTS) return fail('max_attempts', 'Talk to your manager about next steps for this certification.', 409);
    const prog = await getProgress(env, me.email, certId);
    await env.DB.batch([
      env.DB.prepare("INSERT INTO roleplay_leads (id, user_email, cert_id, attempt_no, status, business, link, code, lead_status, note, submitted_at, updated_at) VALUES (?,?,?,?, 'submitted', ?,?,?,?,?,?,?)")
        .bind(crypto.randomUUID(), me.email, certId, (cur?.attempt_no || 0) + 1, business, link || null, code, leadStatus, note, t, t),
      componentUpdate(env, cert, prog, me.email, {roleplay: 'submitted'}, t),
      env.DB.prepare("INSERT INTO activity_events (user_email, kind, ref, occurred_at) VALUES (?, 'roleplay_lead', ?, ?)").bind(me.email, certId, t)
    ]);
  }
  return json(await roleplayState(env, me.email, certId, false));
}
// ---------- training pages (self-paced tracks) ----------
const fmtTime = (hm) => { const [h, mi] = String(hm).split(':').map(Number); if (!Number.isFinite(h)) return hm; return ((h + 11) % 12 + 1) + ':' + String(mi || 0).padStart(2, '0') + ' ' + (h < 12 ? 'AM' : 'PM'); };
async function trainingState(env, email, certId) {
  const cert = await env.DB.prepare("SELECT * FROM certifications WHERE id=?").bind(certId).first();
  const def = TRAININGS[certId];
  if (!cert || !def || cert.status !== 'active') return null;
  const row = await env.DB.prepare("SELECT * FROM training_progress WHERE user_email=? AND cert_id=?").bind(email, certId).first();
  const p = await getProgress(env, email, certId);
  const prereqs = await missingFor(env, email, cert);
  return {
    cert: {id: cert.id, name: cert.name, track: cert.track, components: parse(cert.components, [])}, def,
    content: parse(row?.content, {}), completedAt: row?.completed_at || null, missingPrereqs: prereqs,
    progress: {status: p.status, components: parse(p.components, {}), retakeUnlocked: !!p.retake_unlocked}
  };
}
async function saveTraining(env, me, certId, body) {
  const st = await trainingState(env, me.email, certId);
  if (!st) return fail('not_available', 'This training isn’t open yet.', 404);
  if (st.missingPrereqs.length) return fail('prerequisite', `Pass ${st.missingPrereqs.join(', ')} first.`, 409);
  const app = st.def.sections.find(x => x.type === 'application');
  const raw = Array.isArray(body.content?.openers) ? body.content.openers : [];
  const fields = app?.fields || DEFAULT_FIELDS;
  const openers = (app?.slots || []).map((slot, i) => cleanEntry(fields, raw[i], slot.type));
  const content = {openers};
  // Step-format trainings (Junior AE track) keep each quick-check answer so the rep can pick up where they left off.
  const steps = st.def.format === 'steps' ? st.def.steps : null;
  if (steps) {
    const raw = Array.isArray(body.content?.checks) ? body.content.checks : [];
    content.checks = steps.map((s, i) => { const v = raw[i]; return Number.isInteger(v) && v >= 0 && v < s.check.options.length ? v : null; });
  }
  const t = nowIso();
  const complete = !!body.complete;
  if (complete && steps && content.checks.some(v => v === null)) return json({error: 'incomplete', message: 'Answer the quick check on every step first.'}, 400);
  if (complete) {
    const bad = openers.findIndex(o => entryMissing(fields, o, app?.textMin));
    if (bad >= 0) { const f = entryMissing(fields, openers[bad], app?.textMin); return json({error: 'incomplete', message: `Finish ${app?.fields ? 'lead' : 'opener'} ${bad + 1}: ${f.kind === 'textarea' ? 'write the full ' + f.label.replace(/^Your /, '').toLowerCase() : 'add the ' + f.label.toLowerCase()}.`, index: bad}, 400); }
    if (app?.distinct) { const n = new Set(openers.map(o => o[app.distinct])).size; if (n < (app.distinctMin || openers.length)) return json({error: 'distinct', message: `Pick ${app.distinctMin} different ${app.distinct === 'vertical' ? 'verticals' : app.distinct + 's'}.`}, 400); }
  }
  const done = st.completedAt || (complete ? t : null);
  const stmts = [env.DB.prepare("INSERT INTO training_progress (user_email, cert_id, content, completed_at, updated_at) VALUES (?,?,?,?,?) ON CONFLICT(user_email, cert_id) DO UPDATE SET content=excluded.content, completed_at=COALESCE(training_progress.completed_at, excluded.completed_at), updated_at=excluded.updated_at").bind(me.email, certId, JSON.stringify(content), done, t)];
  if (complete && !st.completedAt) {
    const cert = await env.DB.prepare("SELECT * FROM certifications WHERE id=?").bind(certId).first();
    const prog = await getProgress(env, me.email, certId);
    stmts.push(componentUpdate(env, cert, prog, me.email, {training: 'passed'}, t));
    stmts.push(env.DB.prepare("INSERT INTO activity_events (user_email, kind, ref, occurred_at) VALUES (?, 'training_done', ?, ?)").bind(me.email, certId, t));
  }
  await env.DB.batch(stmts);
  return json(await trainingState(env, me.email, certId));
}
async function submitRapid(env, me, cert, body) {
  const def = ROLEPLAYS[cert.id];
  const p = await getProgress(env, me.email, cert.id);
  if (parse(cert.components, []).includes('quiz') && parse(p.components, {}).quiz !== 'passed') return fail('quiz', 'Pass the quiz before you book your roleplay.', 409);
  const missPre = await missingFor(env, me.email, cert);
  if (missPre.length) return fail('prerequisite', `Pass ${missPre.join(', ')} first.`, 409);
  const raw = Array.isArray(body.leads) ? body.leads : [];
  const fields = def.leadFields || DEFAULT_FIELDS;
  const leads = def.slots.map((type, i) => { const e = cleanEntry(fields, raw[i], type); if (type === 'Cold') e.opener = ''; return e; });
  const miss = leads.findIndex(l => entryMissing(fields, l));
  if (miss >= 0) { const f = entryMissing(fields, leads[miss]); return json({error: 'leads', message: `${/^Lead \d$/.test(leads[miss].type) ? leads[miss].type : 'Lead ' + (miss + 1) + ' (' + leads[miss].type + ')'} needs ${f.kind === 'textarea' ? 'your ' + f.label.replace(/^Your /, '').toLowerCase() : 'the ' + f.label.toLowerCase()}.`, index: miss}, 400); }
  if (def.distinct && new Set(leads.map(l => l[def.distinct])).size < (def.distinctMin || leads.length)) return json({error: 'distinct', message: `Your ${NUM[def.slots.length] || def.slots.length} leads need at least ${def.distinctMin} different ${def.distinct === 'vertical' ? 'verticals' : def.distinct + 's'}.`}, 400);
  const b = body.booking || {};
  const manager = await env.DB.prepare("SELECT email, name FROM users WHERE email=? AND role IN ('manager','admin') AND active=1").bind(String(b.manager || '').toLowerCase()).first();
  if (!manager) return fail('booking', 'Pick the manager you booked with.');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(b.date || '')) || isNaN(Date.parse(b.date))) return fail('booking', 'Add the date you booked.');
  if (!/^\d{2}:\d{2}$/.test(String(b.time || ''))) return fail('booking', 'Add the time you booked.');
  const booking = {manager: manager.email, managerName: manager.name || manager.email.split('@')[0], date: b.date, time: b.time};
  const t = nowIso();
  const cur = await env.DB.prepare("SELECT * FROM roleplay_leads WHERE user_email=? AND cert_id=? ORDER BY attempt_no DESC LIMIT 1").bind(me.email, cert.id).first();
  if (cur && cur.status === 'started') return fail('started', 'Your manager has started the roleplay, so your leads are locked.', 409);
  if (cur && cur.status === 'passed') return fail('passed', 'You’ve already passed this roleplay.', 409);
  if (cur && cur.status === 'failed' && !p.retake_unlocked) return fail('needs_coaching', 'Your retake opens after a coaching session with your manager.', 409);
  const content = JSON.stringify({leads, booking, draws: def.slots.map(() => null)});
  if (cur && cur.status === 'submitted') {
    await env.DB.prepare("UPDATE roleplay_leads SET business=?, content=?, updated_at=? WHERE id=?").bind(leads[0].business, content, t, cur.id).run();
  } else {
    await env.DB.batch([
      env.DB.prepare("INSERT INTO roleplay_leads (id, user_email, cert_id, attempt_no, status, business, code, lead_status, content, submitted_at, updated_at) VALUES (?,?,?,?, 'submitted', ?, '-', '-', ?,?,?)")
        .bind(crypto.randomUUID(), me.email, cert.id, (cur?.attempt_no || 0) + 1, leads[0].business, content, t, t),
      componentUpdate(env, cert, p, me.email, {roleplay: 'submitted'}, t),
      env.DB.prepare("INSERT INTO activity_events (user_email, kind, ref, occurred_at) VALUES (?, 'roleplay_booked', ?, ?)").bind(me.email, cert.id, t)
    ]);
  }
  return json(await roleplayState(env, me.email, cert.id, false));
}
async function runRoleplay(env, me, certId, email, body) {
  const cert = await env.DB.prepare("SELECT * FROM certifications WHERE id=?").bind(certId).first();
  const def = ROLEPLAYS[certId];
  if (!cert || !def) return fail('not_found', 'Unknown roleplay.', 404);
  const cur = await env.DB.prepare("SELECT * FROM roleplay_leads WHERE user_email=? AND cert_id=? ORDER BY attempt_no DESC LIMIT 1").bind(email, certId).first();
  const t = nowIso();
  if (body.action === 'start' && def.mode === 'situation') {
    if (cur && ['started', 'passed'].includes(cur.status)) return fail('not_ready', cur.status === 'passed' ? 'This roleplay is already passed.' : 'This roleplay is already in progress.', 409);
    const used = (await env.DB.prepare("SELECT COUNT(*) n FROM roleplay_leads WHERE user_email=? AND cert_id=? AND status IN ('passed','failed')").bind(email, certId).first()).n;
    if (used >= MAX_ATTEMPTS) return fail('max_attempts', 'All attempts used.', 409);
    if (!(await env.DB.prepare("SELECT 1 FROM users WHERE email=?").bind(email).first())) return fail('not_found', 'That rep hasn’t signed in yet.', 404);
    const usedCards = (await env.DB.prepare("SELECT card_id FROM roleplay_leads WHERE user_email=? AND cert_id=? AND card_id IS NOT NULL").bind(email, certId).all()).results.map(r => r.card_id);
    const pool = def.cards.filter(c => !usedCards.includes(c.id));
    const from = pool.length ? pool : def.cards;
    const pick = from[crypto.getRandomValues(new Uint32Array(1))[0] % from.length];
    const prog = await getProgress(env, email, certId);
    await env.DB.batch([
      env.DB.prepare("INSERT INTO roleplay_leads (id, user_email, cert_id, attempt_no, status, business, code, lead_status, card_id, manager_email, submitted_at, started_at, updated_at) VALUES (?,?,?,?, 'started', ?, '-', '-', ?,?,?,?,?)")
        .bind(crypto.randomUUID(), email, certId, (cur?.attempt_no || 0) + 1, def.business, pick.id, me.email, t, t, t),
      componentUpdate(env, cert, prog, email, {roleplay: 'started'}, t)
    ]);
    await audit(env, me.email, 'start_roleplay', `${email}:${certId}`, {card: pick.id});
    return json(await roleplayState(env, email, certId, true));
  }
  if (body.action === 'draw' && def.mode === 'rapid') {
    if (!cur || !['submitted', 'started'].includes(cur.status)) return fail('not_ready', 'There’s nothing booked to run.', 409);
    const c = parse(cur.content, {}); const draws = c.draws || def.slots.map(() => null);
    const i = Number(body.index);
    if (!Number.isInteger(i) || i < 0 || i >= def.slots.length) return fail('bad_request', 'Pick a lead.');
    if (draws[i]) return fail('drawn', 'That lead already has a card.', 409);
    const dqUsed = draws.filter(id => def.cards.find(x => x.id === id)?.dq).length;
    const pool = def.cards.filter(x => !draws.includes(x.id) && !(def.maxDq != null && x.dq && dqUsed >= def.maxDq));
    const pick = pool[crypto.getRandomValues(new Uint32Array(1))[0] % pool.length];
    draws[i] = pick.id;
    const stmts = [env.DB.prepare("UPDATE roleplay_leads SET status='started', content=?, manager_email=COALESCE(manager_email, ?), started_at=COALESCE(started_at, ?), updated_at=? WHERE id=?").bind(JSON.stringify({...c, draws}), me.email, t, t, cur.id)];
    if (cur.status === 'submitted') { const prog = await getProgress(env, email, certId); stmts.push(componentUpdate(env, cert, prog, email, {roleplay: 'started'}, t)); }
    await env.DB.batch(stmts);
    await audit(env, me.email, 'draw_card', `${email}:${certId}`, {attempt: cur.attempt_no, lead: i, card: pick.id});
    return json(await roleplayState(env, email, certId, true));
  }
  if (body.action === 'call' && def.mode === 'rapid' && def.callMust) {
    if (!cur || cur.status !== 'started') return fail('not_started', 'Draw a card before recording their call.', 409);
    const c = parse(cur.content, {}); const draws = c.draws || [];
    const i = Number(body.index);
    if (!Number.isInteger(i) || i < 0 || i >= def.slots.length || !draws[i]) return fail('bad_request', 'Draw a card for that lead first.');
    if (!['book', 'nobook'].includes(body.value)) return fail('bad_request', 'Pick what they did.');
    const calls = c.calls || def.slots.map(() => null); calls[i] = body.value;
    await env.DB.prepare("UPDATE roleplay_leads SET content=?, updated_at=? WHERE id=?").bind(JSON.stringify({...c, calls}), t, cur.id).run();
    return json(await roleplayState(env, email, certId, true));
  }
  if (body.action === 'start') {
    if (!cur || cur.status !== 'submitted') return fail('not_ready', 'There’s no lead waiting for a roleplay.', 409);
    const usedCards = (await env.DB.prepare("SELECT card_id FROM roleplay_leads WHERE user_email=? AND cert_id=? AND card_id IS NOT NULL").bind(email, certId).all()).results.map(r => r.card_id);
    const pool = def.cards.filter(c => !usedCards.includes(c.id));
    const pick = (pool.length ? pool : def.cards)[crypto.getRandomValues(new Uint32Array(1))[0] % (pool.length || def.cards.length)];
    await env.DB.prepare("UPDATE roleplay_leads SET status='started', card_id=?, manager_email=?, started_at=?, updated_at=? WHERE id=? AND status='submitted'").bind(pick.id, me.email, t, t, cur.id).run();
    await audit(env, me.email, 'start_roleplay', `${email}:${certId}`, {attempt: cur.attempt_no, card: pick.id});
    return json(await roleplayState(env, email, certId, true));
  }
  if (body.action === 'score') {
    if (!cur || cur.status !== 'started') return fail('not_started', 'Start the roleplay before scoring it.', 409);
    if (def.mode === 'rapid' && (parse(cur.content, {}).draws || []).filter(Boolean).length < def.slots.length) return fail('draws', 'Draw a card for every lead before scoring.', 409);
    const scores = {};
    for (const c of def.criteria) {
      const v = Number(body.scores?.[c.id]);
      if (!Number.isInteger(v) || v < 1 || v > 4) return fail('scores', 'Score every moment from 1 to 4.');
      scores[c.id] = v;
    }
    const musts = {};
    if (def.callMust) {
      const c = parse(cur.content, {}), calls = c.calls || [];
      if (def.slots.some((_, i) => !calls[i])) return fail('calls', 'Record their call for every lead before scoring.', 409);
      musts[def.callMust] = (c.draws || []).every((id, i) => (def.cards.find(x => x.id === id) || {}).call === calls[i]);
    }
    for (const m of def.musts) {
      if (m.auto) continue;
      if (typeof body.musts?.[m.id] !== 'boolean') return fail('musts', 'Answer every must-pass.');
      musts[m.id] = body.musts[m.id];
    }
    const notes = String(body.notes || '').trim().slice(0, 4000);
    if (!notes) return fail('notes', 'Coaching notes are required.');
    const average = Math.round(Object.values(scores).reduce((a, b) => a + b, 0) / def.criteria.length * 100) / 100;
    const passed = average >= 3 && Object.values(musts).every(Boolean);
    const prog = await getProgress(env, email, certId);
    await env.DB.batch([
      env.DB.prepare("INSERT INTO roleplay_scores (id, user_email, cert_id, attempt_no, scorer_email, persona_card_id, criteria, must_pass, average, result, coaching_notes, created_at, shared_at) VALUES (?,?,?,?,?, NULL, ?,?,?,?,?,?,?)")
        .bind(crypto.randomUUID(), email, certId, cur.attempt_no, me.email, JSON.stringify(scores), JSON.stringify(musts), average, passed ? 'passed' : 'failed', notes, t, t),
      env.DB.prepare("UPDATE roleplay_leads SET status=?, scored_at=?, updated_at=? WHERE id=?").bind(passed ? 'passed' : 'failed', t, t, cur.id),
      componentUpdate(env, cert, prog, email, {roleplay: passed ? 'passed' : 'failed'}, t, !passed && def.mode === 'rapid' ? ', retake_unlocked=0' : '')
    ]);
    await audit(env, me.email, 'score_roleplay', `${email}:${certId}`, {attempt: cur.attempt_no, average, passed});
    return json(await roleplayState(env, email, certId, true));
  }
  return fail('bad_request', 'Unknown action.');
}

// ---------- team view ----------
async function team(env) {
  // Managers and admins preview the path in user view; their own records never count here.
  const users = (await env.DB.prepare("SELECT email, name, role, level FROM users WHERE active=1 AND role='rep' ORDER BY COALESCE(name, email)").all()).results;
  const certs = await certCatalog(env);
  const progress = (await env.DB.prepare("SELECT * FROM cert_progress").all()).results;
  const lastScores = (await env.DB.prepare("SELECT user_email, cert_id, score FROM quiz_attempts WHERE status IN ('passed','failed') ORDER BY finished_at DESC").all()).results;
  const weekAgo = new Date(Date.now() - 7 * 864e5).toISOString(), monthAgo = new Date(Date.now() - 30 * 864e5).toISOString();
  const leaves = (await env.DB.prepare("SELECT e.user_email, e.outcome, e.duration_ms, e.occurred_at, a.cert_id FROM integrity_events e JOIN quiz_attempts a ON a.id=e.attempt_id WHERE e.occurred_at>=? ORDER BY e.occurred_at DESC").bind(weekAgo).all()).results;
  const visits = (await env.DB.prepare("SELECT user_email, COUNT(*) n FROM activity_events WHERE kind='page_view' AND occurred_at>=? GROUP BY user_email").bind(monthAgo).all()).results;
  const rpRows = (await env.DB.prepare("SELECT user_email, cert_id, attempt_no, status, submitted_at, content FROM roleplay_leads ORDER BY attempt_no DESC").all()).results;
  const pracRows = (await env.DB.prepare("SELECT user_email, cert_id, attempt_no, status, submitted_at FROM practical_submissions ORDER BY attempt_no DESC").all()).results;
  const lastSeen = (await env.DB.prepare("SELECT user_email, MAX(t) t FROM (SELECT user_email, occurred_at t FROM activity_events UNION ALL SELECT user_email, started_at t FROM quiz_attempts) GROUP BY user_email").all()).results;

  const rows = users.map(u => ({
    email: u.email, name: u.name || u.email.split('@')[0], role: u.role, level: roleKey(u),
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
    if (r.status === 'submitted') attention.push({kind: 'review', url: (PRACTICALS[r.cert_id]?.kind === 'piper' ? '/written-review/' : '/review/') + r.cert_id + '?rep=' + encodeURIComponent(u.email), email: u.email, name: u.name, cert: r.cert_id, at: r.submitted_at, text: `submitted the ${r.cert_id} ${PRACTICALS[r.cert_id]?.kind === 'piper' ? 'written Piper fix' : 'practical'}${r.attempt_no > 1 ? ' (attempt ' + r.attempt_no + ')' : ''} · ready for a live review`});
    else if (r.status === 'failed') attention.push(pracUsed(r.user_email, r.cert_id) >= MAX_ATTEMPTS
      ? {kind: 'max', email: u.email, name: u.name, cert: r.cert_id, text: `has used all ${MAX_ATTEMPTS} attempts on the ${r.cert_id} practical · time for a performance conversation`}
      : {kind: 'retake', email: u.email, name: u.name, cert: r.cert_id, text: `didn’t pass the ${r.cert_id} practical · retake on the Foundation schedule`});
  }
  const latestRp = new Map();
  for (const r of rpRows) { const k = r.user_email + ':' + r.cert_id; if (!latestRp.has(k)) latestRp.set(k, r); }
  const rpUsed = (email, cert) => rpRows.filter(r => r.user_email === email && r.cert_id === cert && ['passed', 'failed'].includes(r.status)).length;
  for (const r of latestRp.values()) {
    const u = rows.find(x => x.email === r.user_email); if (!u) continue;
    if (ROLEPLAYS[r.cert_id]?.mode === 'rapid') continue;
    if (r.status === 'submitted' || r.status === 'started') attention.push({kind: 'roleplay', url: '/roleplay-run/' + r.cert_id + '?rep=' + encodeURIComponent(u.email), email: u.email, name: u.name, cert: r.cert_id, at: r.submitted_at, text: r.status === 'started' ? `has an ${r.cert_id} roleplay in progress · finish scoring it` : `sent their ${r.cert_id} roleplay lead${r.attempt_no > 1 ? ' (attempt ' + r.attempt_no + ')' : ''} · ready to run`});
    else if (r.status === 'failed' && ROLEPLAYS[r.cert_id]?.mode !== 'situation') attention.push(rpUsed(r.user_email, r.cert_id) >= MAX_ATTEMPTS
      ? {kind: 'max', email: u.email, name: u.name, cert: r.cert_id, text: `has used all ${MAX_ATTEMPTS} attempts on the ${r.cert_id} roleplay · time for a performance conversation`}
      : {kind: 'retake', email: u.email, name: u.name, cert: r.cert_id, text: `didn’t pass the ${r.cert_id} roleplay · retake on the Foundation schedule with a new card`});
  }
  for (const c of certs.filter(c => c.status === 'active' && ROLEPLAYS[c.id]?.mode === 'situation')) {
    for (const u of rows.filter(r => r.role === 'rep')) {
      const preOk = (c.prerequisites || []).every(pre => progress.find(x => x.user_email === u.email && x.cert_id === pre)?.status === 'passed');
      const last = latestRp.get(u.email + ':' + c.id);
      if (!preOk || (last && last.status !== 'failed')) continue;
      if (last && rpUsed(u.email, c.id) >= MAX_ATTEMPTS) continue;
      attention.push({kind: 'roleplay', url: '/roleplay-run/' + c.id + '?rep=' + encodeURIComponent(u.email), email: u.email, name: u.name, cert: c.id, text: last ? `is due an ${c.id} confirmation roleplay retake · new situation` : `is ready for the ${c.id} confirmation roleplay`});
    }
  }
  // Self-paced roleplays: the rep books the time with their manager once training and the quiz are done.
  const fmtBooking = b => { if (!b?.date) return 'not booked yet'; const d = new Date(b.date + 'T12:00:00Z'); return 'booked ' + d.toLocaleDateString('en-US', {weekday: 'short', month: 'short', day: 'numeric', timeZone: 'UTC'}) + (b.time ? ' at ' + fmtTime(b.time) : ''); };
  for (const c of certs.filter(c => c.status === 'active' && ROLEPLAYS[c.id]?.mode === 'rapid')) {
    for (const u of rows) {
      const p = progress.find(x => x.user_email === u.email && x.cert_id === c.id); if (!p) continue;
      const comps = parse(p.components, {}); const last = latestRp.get(u.email + ':' + c.id);
      const needsQuiz = (c.components || []).includes('quiz');
      if ((needsQuiz ? comps.quiz !== 'passed' : !(c.prerequisites || []).every(pre => progress.find(x => x.user_email === u.email && x.cert_id === pre)?.status === 'passed')) || last?.status === 'passed') continue;
      if (last && ['submitted', 'started'].includes(last.status)) {
        const bk = parse(last.content, {}).booking;
        attention.push({kind: 'roleplay', url: '/roleplay-run/' + c.id + '?rep=' + encodeURIComponent(u.email), email: u.email, name: u.name, cert: c.id, at: last.submitted_at, booked: bk || null, text: last.status === 'started' ? `has a ${c.id} roleplay in progress · finish scoring it` : `is ready for the ${c.id} roleplay · ${fmtBooking(bk)}`});
      } else if (last && last.status === 'failed') {
        if (!p.retake_unlocked) attention.push({kind: 'coach', email: u.email, name: u.name, cert: c.id, text: `didn’t pass the ${c.id} roleplay · coaching needed before they rebook`});
      } else attention.push({kind: 'waiting', email: u.email, name: u.name, cert: c.id, text: `is ready for the ${c.id} roleplay · not booked yet`});
    }
  }
  for (const p of progress.filter(p => p.status === 'failed' && parse(p.components, {}).quiz === 'failed')) {
    const u = rows.find(r => r.email === p.user_email); if (!u) continue;
    const s = lastScores.find(x => x.user_email === p.user_email && x.cert_id === p.cert_id);
    if (p.attempts_used >= maxFor(certs.find(c => c.id === p.cert_id))) attention.push({kind: 'max', email: u.email, name: u.name, cert: p.cert_id, text: `has used all ${MAX_ATTEMPTS} attempts on ${p.cert_id} · time for a performance conversation`});
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
    tiles: {reviews: attention.filter(a => a.kind === 'review' || a.kind === 'roleplay').length, coaching: attention.filter(a => a.kind === 'coach').length, leaves: leaves.length, eligible: allIds.length ? eligible : 0},
    totals: {reps: rows.filter(r => r.role === 'rep').length}
  };
}

// ---------- manager view: what each certification covers ----------
async function certContent(env, certId) {
  const c = (await certCatalog(env)).find(x => x.id === certId);
  if (!c) return null;
  const bank = BANKS[certId];
  const questions = bank ? bank.questions.map(q => ({id: q.id, section: q.section, kind: q.kind, topic: q.topic, prompt: q.prompt, scenario: q.scenario || null, options: q.options, correct: q.correct, reveal: q.reveal || null, source: q.source || null})) : [];
  const sections = [...new Set(questions.map(q => q.section))].sort();
  const pd = PRACTICALS[certId], rp = ROLEPLAYS[certId];
  const practical = !pd ? null : {kind: pd.kind || 'lists', component: pracComponent(pd), title: pd.title, brief: pd.brief || null, jobs: pd.jobs || null, criteria: pd.criteria, must: pd.must, key: pd.key || null};
  const roleplay = !rp ? null : {title: rp.title || null, maxDq: rp.maxDq ?? null, dqLabel: rp.dqLabel || null, callChips: rp.callChips || null, quickFacts: rp.quickFacts || null, mode: rp.mode || 'lead', business: rp.business || null, setup: rp.setup || null, slots: rp.slots || null, criteria: rp.criteria, musts: rp.musts, cards: rp.cards};
  const training = TRAININGS[certId] || null;
  return {cert: c, questions, sections, practical, roleplay, training, maxAttempts: maxFor(c), lockHours: LOCK_HOURS};
}
async function resetOwn(env, email) {
  const ids = (await env.DB.prepare("SELECT id FROM quiz_attempts WHERE user_email=?").bind(email).all()).results.map(r => r.id);
  const stmts = [];
  for (const id of ids) {
    stmts.push(env.DB.prepare("DELETE FROM quiz_answers WHERE attempt_id=?").bind(id));
    stmts.push(env.DB.prepare("DELETE FROM integrity_events WHERE attempt_id=?").bind(id));
  }
  stmts.push(env.DB.prepare("DELETE FROM quiz_attempts WHERE user_email=?").bind(email));
  for (const t of ['cert_progress', 'practical_submissions', 'roleplay_leads', 'roleplay_scores', 'retake_unlocks', 'training_progress']) stmts.push(env.DB.prepare(`DELETE FROM ${t} WHERE user_email=?`).bind(email));
  await env.DB.batch(stmts);
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

  if (path === '/api/me' && method === 'POST') {
    const clean = v => String(v || '').trim().replace(/\s+/g, ' ').slice(0, 40);
    const first = clean(body.firstName), last = clean(body.lastName);
    if (!first || !last) return fail('name', 'Add your first and last name.');
    if (!/^[\p{L}][\p{L}' .-]*$/u.test(first) || !/^[\p{L}][\p{L}' .-]*$/u.test(last)) return fail('name', 'Use letters only in your name.');
    await env.DB.prepare("UPDATE users SET name=? WHERE email=?").bind(first + ' ' + last, me.email).run();
    return json({email: me.email, name: first + ' ' + last, role: me.role});
  }
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
      cert: {id: cert.id, name: cert.name, summary: cert.summary, status: cert.status, track: cert.track, selfRetake: !!RETAKE_WAIT_HOURS[cert.track], questions: cert.questions_per_attempt, seconds: cert.seconds_per_question, passMark: cert.pass_mark},
      progress: {status: p.status, quizPassed: parse(p.components, {}).quiz === 'passed', hasPractical: !!secondComponent(parse(cert.components, [])), next: secondComponent(parse(cert.components, [])), attemptsUsed: p.attempts_used, retakeUnlocked: !!p.retake_unlocked, maxAttempts: maxFor(cert), needsTraining: parse(cert.components, []).includes('training') && parse(p.components, {}).training !== 'passed', lockedUntil: await lockedUntil(env, me.email, m[1]), retakeAt: await retakeAt(env, me.email, cert)},
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

  if ((m = /^\/api\/training\/([A-Z0-9]{1,6})$/.exec(path))) {
    if (method === 'POST') return saveTraining(env, me, m[1], body);
    const st = await trainingState(env, me.email, m[1]);
    return st ? json({...st, canPreview: isManager(me)}) : fail('not_available', 'This training isn’t open yet.', 404);
  }
  if ((m = /^\/api\/roleplay\/([A-Z0-9]{1,6})$/.exec(path))) {
    if (method === 'POST') return submitRoleplayLead(env, me, m[1], body);
    const st = await roleplayState(env, me.email, m[1], false);
    return st ? json(st) : fail('not_available', 'This roleplay isn’t open yet.', 404);
  }

  // ----- managers (and admin) -----
  if ((m = /^\/api\/roleplay-run\/([A-Z0-9]{1,6})$/.exec(path))) {
    if (!isManager(me)) return fail('forbidden', 'Managers only.', 403);
    const email = String(method === 'POST' ? body.email : url.searchParams.get('rep') || '').toLowerCase();
    if (!email) return fail('bad_request', 'Pick a rep.');
    if (method === 'POST') return runRoleplay(env, me, m[1], email, body);
    const st = await roleplayState(env, email, m[1], true);
    return st ? json(st) : fail('not_available', 'This roleplay isn’t open yet.', 404);
  }
  if ((m = /^\/api\/review\/([A-Z0-9]{1,6})$/.exec(path))) {
    if (!isManager(me)) return fail('forbidden', 'Managers only.', 403);
    const email = String(method === 'POST' ? body.email : url.searchParams.get('rep') || '').toLowerCase();
    if (!email) return fail('bad_request', 'Pick a rep.');
    if (method === 'POST') return reviewPractical(env, me, m[1], email, body);
    const st = await practicalState(env, email, m[1], true);
    return st ? json(st) : fail('not_available', 'This practical isn’t open yet.', 404);
  }
  if (path === '/api/me/reset-preview' && method === 'POST') {
    if (!isManager(me)) return fail('forbidden', 'Managers only.', 403);
    await resetOwn(env, me.email);
    await audit(env, me.email, 'reset_preview', me.email);
    return json({ok: true});
  }
  const mc = path.match(/^\/api\/manage\/cert\/([A-Z0-9]{1,6})$/);
  if (mc) {
    if (!isManager(me)) return fail('forbidden', 'Managers only.', 403);
    const out = await certContent(env, mc[1]);
    return out ? json(out) : fail('not_found', 'No such certification.', 404);
  }
  if (path === '/api/team') { if (!isManager(me)) return fail('forbidden', 'Managers only.', 403); return json(await team(env)); }
  if (path === '/api/team/unlock' && method === 'POST') {
    if (!isManager(me)) return fail('forbidden', 'Managers only.', 403);
    const email = String(body.email || '').toLowerCase(), cert = String(body.cert || '');
    const p = await env.DB.prepare("SELECT * FROM cert_progress WHERE user_email=? AND cert_id=?").bind(email, cert).first();
    if (!p || p.status !== 'failed') return fail('not_needed', 'Nothing to unlock.', 409);
    const uc = await env.DB.prepare("SELECT track FROM certifications WHERE id=?").bind(cert).first();
    if (p.attempts_used >= maxFor(uc)) return fail('max_attempts', 'All attempts used.', 409);
    await env.DB.batch([
      env.DB.prepare("UPDATE cert_progress SET retake_unlocked=1, updated_at=? WHERE user_email=? AND cert_id=?").bind(nowIso(), email, cert),
      env.DB.prepare("INSERT INTO retake_unlocks (user_email, cert_id, coached_by, coached_at, note) VALUES (?,?,?,?,?)").bind(email, cert, me.email, nowIso(), String(body.note || '').slice(0, 1000) || null)
    ]);
    await audit(env, me.email, 'unlock_retake', `${email}:${cert}`);
    return json({ok: true});
  }

  // ----- admin only: people, resets, question bank -----
  if (path === '/api/admin/users') {
    // Roles shown to people: SDR, Senior SDR, Manager (admin is the configured owner).
    // Stored as role='rep' + level for SDRs, so older data and checks keep working.
    if (!isManager(me)) return fail('forbidden', 'Managers only.', 403);
    if (method === 'POST') {
      const email = String(body.email || '').trim().toLowerCase();
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return fail('bad_email', 'Enter a valid email.');
      if (email === me.email) return fail('self', 'You can’t change your own role.');
      const want = body.role === 'rep' ? 'sdr' : body.role;
      if (!['sdr', 'senior_sdr', 'manager'].includes(want)) return fail('bad_role', 'Pick SDR, Senior SDR or Manager.');
      const cur = await env.DB.prepare("SELECT role FROM users WHERE email=?").bind(email).first();
      if (!isAdmin(me)) {
        if (!cur) return fail('forbidden', 'Only an admin can add people.', 403);
        if (cur.role !== 'rep' || want === 'manager') return fail('forbidden', 'Managers can switch people between SDR and Senior SDR only.', 403);
      }
      if (cur?.role === 'admin') return fail('forbidden', 'The admin role can’t be changed here.', 403);
      const role = want === 'manager' ? 'manager' : 'rep', level = want === 'senior_sdr' ? 'senior_sdr' : 'sdr';
      await env.DB.prepare("INSERT INTO users (email, name, role, level, created_at) VALUES (?,?,?,?,?) ON CONFLICT(email) DO UPDATE SET role=excluded.role, level=excluded.level, name=COALESCE(excluded.name, users.name), active=1")
        .bind(email, body.name ? String(body.name).slice(0, 80) : null, role, level, nowIso()).run();
      await audit(env, me.email, 'set_role', email, {role: want});
    }
    const list = (await env.DB.prepare("SELECT email, name, role, level, active FROM users ORDER BY role, email").all()).results;
    return json({users: list.map(u => ({email: u.email, name: u.name, active: u.active, role: roleKey(u)})), canAdd: isAdmin(me)});
  }
  if (path === '/api/admin/reset' && method === 'POST') {
    if (!isAdmin(me)) return fail('forbidden', 'Admin only.', 403);
    const email = String(body.email || '').toLowerCase(), cert = String(body.cert || '');
    await env.DB.batch([
      env.DB.prepare("DELETE FROM cert_progress WHERE user_email=? AND cert_id=?").bind(email, cert),
      env.DB.prepare("DELETE FROM practical_submissions WHERE user_email=? AND cert_id=?").bind(email, cert),
      env.DB.prepare("DELETE FROM roleplay_leads WHERE user_email=? AND cert_id=?").bind(email, cert),
      env.DB.prepare("DELETE FROM roleplay_scores WHERE user_email=? AND cert_id=?").bind(email, cert),
      env.DB.prepare("DELETE FROM training_progress WHERE user_email=? AND cert_id=?").bind(email, cert),
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
