// Certifications add-on for the SDR Handbook.
// Adds the Certifications tab, the manager Team Progress view, certification blocks on
// onboarding days, deep links (#page=...) and training-visit tracking.
(() => {
  const shell = document.querySelector('#momence-preview .shell');
  if (!shell) return;
  const main = shell.querySelector('main'), side = shell.querySelector('aside');
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
  const icons = () => { if (globalThis.lucide) lucide.createIcons(); };
  const api = async (path, body) => {
    const r = await fetch(path, body ? {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(body)} : {});
    const data = await r.json().catch(() => ({}));
    if (!r.ok) throw Object.assign(new Error(data.message || 'Something went wrong.'), data);
    return data;
  };
  const pct = s => s == null ? '' : ' · ' + Math.round(s * 100) + '%';
  const quizUrl = id => '/quiz/' + encodeURIComponent(id);
const ROLE_NAMES = {sdr: 'SDR', senior_sdr: 'Senior SDR', manager: 'Manager', admin: 'Admin'};
  const second = c => ['written', 'practical', 'roleplay'].find(x => (c.components || []).includes(x));
  const pracUrl = (id, c) => '/' + (c ? second(c) : 'practical') + '/' + encodeURIComponent(id);
  const hasPractical = c => !!second(c);
  let data = null, me = null, myPage = null;

  async function load() { data = await api('/api/certs'); me = data.me; return data; }

  // ---------- navigation ----------
  function addNav() {
    const btn = (page, iconName, label, extra = '') => '<button class="navitem" data-cert-page="' + page + '"><i data-lucide="' + iconName + '" aria-hidden="true"></i>' + label + extra + '</button>';
    // Sits under Onboarding, above Book of Business.
    const book = side.querySelector('[data-page="book"]');
    if (book) book.insertAdjacentHTML('beforebegin', btn('certifications', 'award', 'Certifications'));
    else side.insertAdjacentHTML('beforeend', btn('certifications', 'award', 'Certifications'));
    if (me.role === 'manager' || me.role === 'admin')
      side.insertAdjacentHTML('beforeend', '<div class="label cx-nav-label">Managers</div>' + btn('team', 'users-round', 'Team Progress'));
    icons();
  }
  function setActive(page) {
    myPage = page;
    side.querySelectorAll('.navitem').forEach(b => b.classList.toggle('active', b.dataset.certPage === page));
  }
  shell.addEventListener('click', e => { const b = e.target.closest('button'); if (b && b.dataset.page) setActive(null); }, true);
  shell.addEventListener('click', e => {
    const b = e.target.closest('[data-cert-page]');
    if (b) { e.preventDefault(); openPage(b.dataset.certPage); return; }
    const u = e.target.closest('[data-cx-unlock]');
    if (u) unlock(u);
    const rs = e.target.closest('[data-cx-reset]');
    if (rs) reset(rs);
  });
  function openPage(page) {
    if (page === 'certifications') return renderPath();
    if (page === 'team') return renderTeam();
    // A handbook page: let the handbook render it.
    const tmp = document.createElement('button'); tmp.dataset.page = page; tmp.hidden = true; main.appendChild(tmp); tmp.click(); tmp.remove();
  }

  // ---------- status helpers ----------
  function certState(c) {
    const p = data.progress[c.id] || {};
    const prereqOk = (c.prerequisites || []).every(id => data.progress[id]?.status === 'passed');
    if (p.status === 'passed') return {key: 'passed', chip: 'ok', label: 'Passed' + pct(p.lastScore), ico: 'done'};
    if (c.status !== 'active') {
      if (c.track === 'foundation') return {key: 'upcoming', chip: 'off', label: c.day ? 'Upcoming · Day ' + c.day : 'Coming soon', ico: 'off'};
      if (!prereqOk) return {key: 'locked', chip: 'off', label: 'Locked · pass the one before', ico: 'off', locked: true};
      return {key: 'soon', chip: 'off', label: 'Coming soon', ico: 'off'};
    }
    if (!prereqOk) return {key: 'locked', chip: 'off', label: 'Locked · pass the one before', ico: 'off', locked: true};
    if ((c.components || []).length === 1 && c.components[0] === 'roleplay' && c.track !== 'foundation') {
      // Roleplay-only (the CC7 capstone): book it once the cert before it is passed.
      const rp = p.roleplay, ru = '/roleplay/' + encodeURIComponent(c.id), w = c.track === 'junior_ae' ? 'mock demo' : 'capstone', W = w.charAt(0).toUpperCase() + w.slice(1);
      if (!rp) return {key: 'book', chip: 'go', label: 'Ready · book your ' + w, ico: 'go', action: 'Book your ' + w, url: ru};
      if (rp.status === 'submitted') return {key: 'rp', chip: 'go', label: W + ' booked' + (rp.booking?.date ? ' · ' + new Date(rp.booking.date + 'T12:00:00Z').toLocaleDateString('en-US', {weekday: 'short', month: 'short', day: 'numeric', timeZone: 'UTC'}) : ''), ico: 'go', action: 'View ' + w, url: ru};
      if (rp.status === 'started') return {key: 'rp', chip: 'go', label: W + ' in progress', ico: 'go', action: 'View ' + w, url: ru};
      if (rp.status === 'failed') return p.retakeUnlocked ? {key: 'rpretake', chip: 'warn', label: 'Retake open · book it', ico: 'go', action: 'Book your retake', url: ru} : {key: 'coaching', chip: 'warn', label: 'Retake after coaching', ico: 'go', action: 'See your scorecard', url: ru};
    }
    if ((c.components || []).includes('training')) {
      const comps = p.components || {}, rp = p.roleplay, tu = '/training/' + encodeURIComponent(c.id), ru = '/roleplay/' + encodeURIComponent(c.id);
      if (comps.training !== 'passed') return {key: 'training', chip: 'go', label: p.training ? 'Training in progress' : 'Ready to start', ico: 'go', action: p.training ? 'Continue training' : 'Start training', url: tu};
      if (comps.quiz !== 'passed' && !p.inProgress && p.status !== 'failed' && !p.lockedUntil) return {key: 'ready', chip: 'go', label: 'Training done · quiz next', ico: 'go', action: 'Start quiz'};
      if (comps.quiz === 'passed') {
        if (!rp) return {key: 'book', chip: 'go', label: 'Quiz passed · book your roleplay', ico: 'go', action: 'Book your roleplay', url: ru};
        if (rp.status === 'submitted') return {key: 'rp', chip: 'go', label: 'Roleplay booked' + (rp.booking?.date ? ' · ' + new Date(rp.booking.date + 'T12:00:00Z').toLocaleDateString('en-US', {weekday: 'short', month: 'short', day: 'numeric', timeZone: 'UTC'}) : ''), ico: 'go', action: 'View roleplay', url: ru};
        if (rp.status === 'started') return {key: 'rp', chip: 'go', label: 'Roleplay in progress', ico: 'go', action: 'View roleplay', url: ru};
        if (rp.status === 'failed') return p.retakeUnlocked ? {key: 'rpretake', chip: 'warn', label: 'Retake open · book it', ico: 'go', action: 'Book your retake', url: ru} : {key: 'coaching', chip: 'warn', label: 'Roleplay retake after coaching', ico: 'go', action: 'See your scorecard', url: ru};
      }
    }
    if (second(c) === 'written' && !p.inProgress) {
      const comps = p.components || {}, parts = c.components || [];
      const done = parts.filter(x => comps[x] === 'passed').length;
      const waiting = comps.written === 'submitted' ? ' · written sent' : '';
      return {key: 'multi', chip: done ? 'go' : 'go', label: done + ' of ' + parts.length + ' parts passed' + waiting, ico: 'go', action: done ? 'Open ' + c.id : 'Start ' + c.id, url: pracUrl(c.id, c)};
    }
    if (second(c) === 'roleplay' && (p.components || {}).quiz === 'passed') {
      const rp = p.roleplay, u = pracUrl(c.id, c);
      if (!rp) return {key: 'lead', chip: 'go', label: 'Quiz passed · send your roleplay lead', ico: 'go', action: 'Pick your lead', url: u};
      if (rp.status === 'submitted' || rp.status === 'started') return {key: 'rp', chip: 'go', label: 'Lead sent · roleplay Day ' + (c.day || 8), ico: 'go', action: 'View roleplay', url: u};
      if (rp.status === 'failed') return {key: 'rpretake', chip: 'warn', label: 'Roleplay retake', ico: 'go', action: 'Open roleplay', url: u};
    }
    if (second(c) === 'practical' && (p.components || {}).quiz === 'passed') {
      const pr = p.practical, u = pracUrl(c.id, c);
      if (!pr || pr.status === 'draft') return {key: 'practical', chip: 'go', label: 'Quiz passed · practical due Day 10', ico: 'go', action: 'Open practical', url: u};
      if (pr.status === 'submitted') return {key: 'submitted', chip: 'go', label: 'Practical submitted · live review next', ico: 'go', action: 'View practical', url: u};
      if (pr.status === 'failed') return {key: 'pretake', chip: 'warn', label: 'Practical retake', ico: 'go', action: 'Open practical', url: u};
    }
    if (p.inProgress) return {key: 'resume', chip: 'go', label: 'In progress', ico: 'go', action: 'Resume quiz'};
    if (p.status === 'failed') {
      if (p.attemptsUsed >= p.maxAttempts) return {key: 'max', chip: 'warn', label: 'Talk to your manager', ico: 'go'};
      if (p.retakeAt) return {key: 'wait', chip: 'warn', label: 'Retake opens ' + new Date(p.retakeAt).toLocaleString([], {weekday: 'short', hour: 'numeric', minute: '2-digit'}) + ' · review the training', ico: 'go', action: 'Review the training', url: '/training/' + encodeURIComponent(c.id)};
      if (!p.retakeUnlocked) return {key: 'coaching', chip: 'go', label: 'Retake after coaching', ico: 'go'};
      return {key: 'retake', chip: 'go', label: 'Retake ready', ico: 'go', action: 'Start retake'};
    }
    if (p.lockedUntil) return {key: 'lock', chip: 'warn', label: 'Opens ' + new Date(p.lockedUntil).toLocaleString([], {weekday: 'short', hour: 'numeric', minute: '2-digit'}), ico: 'go'};
    if (hasPractical(c)) return {key: 'ready', chip: 'go', label: 'Ready to start', ico: 'go', action: 'Start ' + c.id, url: pracUrl(c.id, c)};
    return {key: 'ready', chip: 'go', label: 'Ready to start', ico: 'go', action: 'Start quiz'};
  }
  const formatOf = c => {
    const parts = (c.components || []).map(x => ({training: 'Training', quiz: 'quiz', roleplay: 'live roleplay', practical: 'practical'}[x] || x));
    return parts.join(' + ').replace(/^./, s => s.toUpperCase()) + (c.day ? ' · Day ' + c.day : '');
  };

  // ---------- onboarding day block ----------
  function decorateDay() {
    const label = [...main.querySelectorAll('.label')].find(l => /^DAY \d{2} \/ 10$/.test(l.textContent.trim()));
    if (!label || main.querySelector('.cx-day')) return;
    const day = Number(label.textContent.trim().slice(4, 6));
    const certs = data.certs.filter(c => c.day === day && c.track === 'foundation');
    if (!certs.length) return;
    const rows = certs.map(c => {
      const s = certState(c);
      const right = s.action ? '<a class="cx-btn" href="' + (s.url || quizUrl(c.id)) + '" target="_top">' + s.action + '</a>' : '<span class="cx-chip ' + s.chip + '">' + esc(s.label) + '</span>';
      const iconHtml = s.key === 'passed' ? '<i data-lucide="check" aria-hidden="true"></i>' : esc(c.id);
      return '<div class="cx-row' + (s.action ? ' focus' : c.status !== 'active' ? ' muted' : '') + '"><div class="cx-ico ' + (s.key === 'passed' ? 'ok' : s.ico) + '">' + iconHtml + '</div><div class="cx-body"><b>' + esc(c.id + ' · ' + c.name) + '</b><small>' + esc(c.status === 'active' ? formatOf(c) : 'Not open yet') + '</small></div>' + right + '</div>';
    }).join('');
    const intro = label.parentElement.querySelector('h1 + p') || label.nextElementSibling;
    const html = '<section class="cx-card cx-day" aria-labelledby="cx-today"><div class="cx-head"><div><div class="cx-tag">CERTIFICATION DAY</div><h2 id="cx-today">Today’s certifications</h2><p>Take these after the session. Quizzes pass at 80%.' + (certs.some(c => second(c) === 'practical') ? ' Written practicals are due Day 10.' : '') + (certs.some(c => (c.components || []).includes('roleplay')) ? ' Roleplays are live with your manager.' : '') + (certs.some(c => second(c) === 'written') ? ' The written Piper fix is on the ' + certs.find(c => second(c) === 'written').id + ' page.' : '') + '</p></div><button class="cx-link" data-cert-page="certifications">View my progress →</button></div><div class="cx-rows">' + rows + '</div></section>';
    (intro || label).insertAdjacentHTML('afterend', html);
    icons();
  }

  // ---------- rep: my path ----------
  // ---------- manager / user view toggle ----------
  const isMgr = () => me && (me.role === 'manager' || me.role === 'admin');
  const getView = () => { try { return localStorage.getItem('cx-view') === 'user' ? 'user' : 'manager'; } catch { return 'manager'; } };
  const setView = v => { try { localStorage.setItem('cx-view', v); } catch {} };
  const titleRow = view => '<div class="label">CERTIFICATIONS</div><div class="cx-titlerow"><h1>Your path</h1>' + (isMgr()
    ? '<div class="cx-toggle" role="tablist" aria-label="Certification view"><button role="tab" data-cx-view="manager" aria-selected="' + (view === 'manager') + '"' + (view === 'manager' ? ' class="on"' : '') + '>Manager view</button><button role="tab" data-cx-view="user" aria-selected="' + (view === 'user') + '"' + (view === 'user' ? ' class="on"' : '') + '>User view</button></div>'
    : '') + '</div>';
  shell.addEventListener('click', e => {
    const v = e.target.closest('[data-cx-view]');
    if (v) { setView(v.dataset.cxView); renderPath(); return; }
    const o = e.target.closest('[data-cx-cert]');
    if (o) { e.preventDefault(); renderCertContent(o.dataset.cxCert); return; }
    const t = e.target.closest('[data-cx-tab]');
    if (t) { main.querySelectorAll('[data-cx-tab]').forEach(x => { x.classList.toggle('on', x === t); x.setAttribute('aria-selected', x === t); }); main.querySelectorAll('[data-cx-pane]').forEach(p => p.hidden = p.dataset.cxPane !== t.dataset.cxTab); return; }
    const f = e.target.closest('[data-cx-sec]');
    if (f) { main.querySelectorAll('[data-cx-sec]').forEach(x => x.classList.toggle('go', x === f)); main.querySelectorAll('[data-cx-sec]').forEach(x => x.classList.toggle('off', x !== f)); main.querySelectorAll('.cx-q').forEach(q => q.hidden = f.dataset.cxSec !== 'all' && q.dataset.sec !== f.dataset.cxSec); return; }
    if (e.target.closest('[data-cx-reset-preview]')) resetPreview(e.target.closest('[data-cx-reset-preview]'));
  });
  async function resetPreview(b) {
    if (b.dataset.armed !== '1') { b.dataset.armed = '1'; b.textContent = 'Click again to clear everything'; return; }
    b.disabled = true; b.textContent = 'Resetting…';
    try { await api('/api/me/reset-preview', {}); await load(); renderPath(); }
    catch (x) { b.disabled = false; b.textContent = x.message; }
  }

  function renderCatalog() {
    const live = c => c.status === 'active';
    const meta = c => {
      const parts = (c.components || []).map(x => ({training: 'Training', quiz: 'quiz', roleplay: 'live roleplay', practical: 'written practical', written: 'written'}[x] || x)).join(' + ').replace(/^./, m => m.toUpperCase());
      return parts + (c.day ? ' · Day ' + c.day : '');
    };
    const tile = c => {
      const inner = '<div class="cx-ico ' + (live(c) ? 'done' : 'off') + '">' + esc(c.id) + '</div><div class="cx-body"><b>' + esc(c.name) + '</b><small>' + esc(meta(c)) + '</small><span class="cx-chip ' + (live(c) ? 'ok' : 'off') + '">' + (live(c) ? 'Live' : 'Not built yet') + '</span>' + (live(c) ? '<span class="cx-more">View content →</span>' : '') + '</div>';
      return live(c) ? '<a class="cx-tile" href="#" data-cx-cert="' + esc(c.id) + '">' + inner + '</a>' : '<div class="cx-tile locked">' + inner + '</div>';
    };
    const groups = [['foundation', 'Foundation', 'Onboarding · Required to go live'], ['cold_calling', 'Cold Calling track', 'Taken in order'], ['skills', 'Skills', 'Before applying for Senior SDR'], ['junior_ae', 'Junior AE track', 'Opens at Senior SDR · suggested order']];
    main.innerHTML = titleRow('manager') + '<p>Manager view · What every certification tests, with answers and scoring keys. Reps never see this view.</p>' +
      groups.filter(([track]) => data.certs.some(c => c.track === track)).map(([track, title, note]) => '<section class="cx-group"><div class="cx-group-h"><h2>' + title + '</h2><span>' + note + '</span></div><div class="cx-grid2">' + data.certs.filter(c => c.track === track).map(tile).join('') + '</div></section>').join('');
    icons(); main.scrollTop = 0; window.scrollTo(0, 0);
  }

  async function renderCertContent(id) {
    setActive('certifications');
    main.innerHTML = '<p class="cx-empty">Loading…</p>';
    let d;
    try { d = await api('/api/manage/cert/' + encodeURIComponent(id)); } catch (x) { main.innerHTML = '<p>' + esc(x.message) + '</p>'; return; }
    const c = d.cert, comps = c.components || [];
    const pr = d.practical, rp = d.roleplay;
    const what = comps.map(x => ({training: 'training page', quiz: 'quiz', roleplay: rp && rp.mode === 'rapid' ? 'rapid-fire opener roleplay the rep books with their manager' : rp && rp.mode === 'situation' ? 'confirmation-call roleplay' : 'live roleplay on the rep’s own lead', practical: 'written practical', written: 'written Piper fix'}[x] || x));
    const unlock = (c.prerequisites || []).length ? 'After ' + c.prerequisites.join(', ') + ' is passed' : 'Open from the start';
    const rules = [
      ['Parts', what.join(', then ').replace(/^./, m => m.toUpperCase())],
      ['Unlocks', unlock],
      c.questions ? ['Quiz', c.questions + ' of ' + d.questions.length + ' questions, at least 2 from each section, shuffled'] : null,
      c.seconds ? ['Timing', c.seconds + ' seconds per question'] : null,
      ['Pass mark', Math.round((c.passMark || .8) * 100) + '% on the quiz' + ((pr || rp) ? ' · scored parts need an average of 3+ with every must-pass met' : '')],
      ['Leaving the tab', 'First time: warning · Second time: attempt voided, locked ' + d.lockHours + ' hours'],
      ['Retakes', c.track === 'foundation' ? 'Day 10, then Monday · a third fail goes to performance management' : 'After a coaching session with their manager · no attempt limit'],
      d.training ? ['Training', d.training.format === 'steps' ? d.training.steps.length + ' short steps, one per screen, each with a quick check. Done before the quiz unlocks' : 'A ' + d.training.sections.filter(x => x.title).length + '-part training page, done before the quiz unlocks'] : null,
      c.day ? ['Onboarding day', 'Day ' + c.day] : null
    ].filter(Boolean);
    const rulesHtml = '<section class="cx-panel">' + rules.map(r => '<div class="cx-rule"><span>' + esc(r[0]) + '</span><strong>' + esc(r[1]) + '</strong></div>').join('') + '</section>';
    const q = x => '<div class="cx-q" data-sec="' + esc(x.section) + '"><div class="cx-q-h"><span>' + esc(x.id + ' · Section ' + x.section + ' · ' + x.topic) + '</span>' + (x.source ? '<small>' + esc(x.source) + '</small>' : '') + '</div>' +
      (x.scenario ? '<p class="cx-q-sc">' + esc(x.scenario) + '</p>' : '') + '<p class="cx-q-p">' + esc(x.prompt) + '</p>' +
      x.options.map(o => '<div class="cx-opt' + (o.id === x.correct ? ' right' : '') + '"><b>' + esc(o.id) + '</b><span>' + esc(o.text) + '</span>' + (o.id === x.correct ? '<em>Correct</em>' : '') + '</div>').join('') +
      (x.reveal ? '<div class="cx-q-rev"><b>Shown to reps who get it right:</b> ' + esc(x.reveal) + '</div>' : '') + '</div>';
    const bankHtml = d.questions.length ? '<div class="cx-secs">' + ['all', ...d.sections].map((sct, i) => '<button class="cx-chip ' + (i ? 'off' : 'go') + '" data-cx-sec="' + esc(sct) + '">' + (sct === 'all' ? 'All ' + d.questions.length : 'Section ' + esc(sct) + ' · ' + d.questions.filter(x => x.section === sct).length) + '</button>').join('') + '</div>' + d.questions.map(q).join('') : '<p class="cx-empty">No quiz questions yet.</p>';
    const crit = (list, label) => '<div class="cx-k">' + label + '</div>' + list.map(k => '<div class="cx-rule"><span><b>' + esc(k.name) + '</b><br><small>' + esc(k.hint || '') + '</small></span></div>').join('');
    let keys = '';
    if (rp) {
      keys += '<section class="cx-panel"><h2>' + (rp.title ? esc(rp.title) : rp.mode === 'situation' ? 'Confirmation roleplay' : rp.mode === 'rapid' ? 'Rapid-fire opener roleplay' : 'Live roleplay') + '</h2>' + (rp.setup ? '<p class="cx-sub"><b>What the rep is told:</b> ' + esc(rp.setup) + '</p>' : '<p class="cx-sub">The rep brings their own pre-vetted lead. You play it using one of the hidden cards below.</p>') +
        crit(rp.criteria, 'SCORED 1–4 · PASS WITH AN AVERAGE OF 3+') + '<div class="cx-k">MUST-PASS · ALL REQUIRED</div><ul class="cx-ul">' + rp.musts.map(m => '<li>' + esc(m.name) + '</li>').join('') + '</ul>' + (rp.maxDq != null ? '<p class="cx-sub" style="font-size:13px">At most ' + rp.maxDq + ' ' + esc(rp.dqLabel || 'don’t-book card') + ' per roleplay. The ' + esc((rp.musts.find(m => m.auto) || {}).name || 'call') + ' must-pass is set from the rep’s call on each lead.</p>' : '') + '</section>' +
        (rp.quickFacts ? '<section class="cx-panel"><h2>Quick facts on the run page</h2><p class="cx-sub">Shown next to the stance card for the lead’s current software.</p>' + Object.entries(rp.quickFacts).map(([n, rows]) => '<div class="cx-k" style="margin-top:12px">' + esc(n) + '</div><ul class="cx-ul">' + rows.map(r => '<li><b>' + esc(r[0]) + ':</b> ' + esc(r[1]) + '</li>').join('') + '</ul>').join('') + '</section>' : '') +
        '<div class="cx-grid2">' + rp.cards.map(k => '<div class="cx-hidden"><div class="cx-k" style="color:var(--purple)">HIDDEN · REP NEVER SEES THIS</div><b>' + esc(k.title) + '</b>' +
          (k.brief ? '<p><b>Rep is told:</b> ' + esc(k.brief) + '</p>' : '') + (k.rows ? k.rows.map(r => '<p><b>' + esc(r[0]) + ':</b> ' + esc(r[1]) + '</p>').join('') + '<p><b>Right call:</b> ' + esc((rp.callChips || {book: 'Book it', nobook: 'Don’t book'})[k.call]) + '. ' + esc(k.callNote || (k.call === 'book' ? '' : 'Close politely.')) + '</p>' : '<p><b>You play:</b> ' + esc(k.answer) + '</p>') + (k.next ? '<p><b>Then:</b> ' + esc(k.next) + '</p>' : '') + (k.brushoff ? '<p><b>Brush-off:</b> ' + esc(k.brushoff) + '</p>' : '') + (k.thread ? '<p><b>Thread to find:</b> ' + esc(k.thread) + '</p>' : '') + (k.objection ? '<p><b>Objection:</b> ' + esc(k.objection) + '</p>' : '') + (k.yes ? '<p><b>What a yes looks like:</b> ' + esc(k.yes) + '</p>' : '') + '</div>').join('') + '</div>';
    }
    if (pr) {
      keys += '<section class="cx-panel"><h2>' + esc(pr.title) + '</h2>' + (pr.brief ? '<p class="cx-sub">' + esc(pr.brief) + '</p>' : '') + (pr.jobs ? '<p class="cx-sub"><b>Lists they build:</b> ' + esc(pr.jobs.join(' · ')) + '</p>' : '') +
        crit(pr.criteria, 'SCORED 1–4 · PASS WITH AN AVERAGE OF 3+') + '<div class="cx-k">MUST-PASS</div><ul class="cx-ul"><li>' + esc(pr.must) + '</li></ul></section>' +
        (pr.key ? '<section class="cx-panel cx-keybox"><div class="cx-k" style="color:var(--purple)">ANSWER KEY · MANAGERS ONLY · ' + pr.key.length + ' PLANTED PROBLEMS</div><ol>' + pr.key.map(k => '<li><b>' + esc(k.issue) + '</b> ' + esc(k.fix) + '</li>').join('') + '</ol></section>' : '');
    }
    const T = d.training, tbl = x => '<div class="cx-scroll"><table class="cx-ttbl"><tr>' + x.head.map(h => '<th>' + esc(h) + '</th>').join('') + '</tr>' + x.rows.map(r => '<tr>' + r.map(c => '<td>' + esc(c) + '</td>').join('') + '</tr>').join('') + '</table></div>';
    const tHead = x => '<div class="cx-k" style="color:var(--purple);margin-top:22px">' + esc(x.label || '') + '</div>' + (x.title ? '<h2 class="cx-th">' + esc(x.title) + '</h2>' : '') + (x.body ? '<p class="cx-sub" style="font-size:13px">' + esc(x.body) + '</p>' : '');
    const stepsHtml = T && T.format === 'steps' ? T.steps.map((x, k) => '<div class="cx-k" style="color:var(--purple);margin-top:22px">STEP ' + (k + 1) + '</div><h2 class="cx-th">' + esc(x.title) + '</h2><p class="cx-sub" style="font-size:13px"><b>' + esc(x.why) + '</b> ' + esc(x.idea) + '</p><p class="cx-sub" style="font-size:13px"><b>Try saying:</b> ' + esc(x.say) + '</p>' +
      '<div class="cx-hidden" style="margin-top:10px"><p><b>Done well:</b> ' + esc(x.good.text) + ' <small>(' + esc(x.good.source) + ')</small>' + (x.good.clip ? ' <a style="color:var(--purple);font-weight:700;text-decoration:none" href="' + esc(x.good.clip.src) + '" target="_blank">Watch clip →</a>' : '') + '</p><p><b>Missed:</b> ' + esc(x.missed.text) + ' <small>(' + esc(x.missed.source) + ')</small>' + (x.missed.clip ? ' <a style="color:var(--purple);font-weight:700;text-decoration:none" href="' + esc(x.missed.clip.src) + '" target="_blank">Watch clip →</a>' : '') + '</p><p><b>Quick check:</b> ' + esc(x.check.prompt) + '<br>Answer: <b>' + esc(x.check.options[x.check.answer]) + '</b>. ' + esc(x.check.why) + '</p></div>').join('') : '';
    const trainHtml = !T ? '' : '<p class="cx-sub" style="font-size:13px">What reps work through before the quiz unlocks. The try-it exercises are shown with their answers.' + ' <a style="color:var(--purple);font-weight:700;text-decoration:none" href="/training/' + encodeURIComponent(c.id) + '" target="_top">Open the page as a rep sees it →</a></p>' + stepsHtml + T.sections.map(x => {
      if (x.type === 'why' && x.quote) return tHead(x) + '<div class="cx-panel" style="margin:0"><b>' + esc(x.quote) + '</b></div>';
      if (x.type === 'tabs') return tHead(x) + x.items.map(it => '<div class="cx-k" style="margin-top:12px">' + esc(it.name) + '</div>' + tbl({head: ['', ''], rows: it.rows})).join('');
      if (x.type === 'cards') return tHead(x) + tbl({head: ['Check', 'When', 'Sounds like'], rows: x.items.map(k => [k.title, k.sub, k.quote])}) + (x.after ? '<p class="cx-sub" style="font-size:13px;margin-top:8px">' + esc(x.after) + '</p>' : '');
      if (x.type === 'note') return tHead(x) + '<div class="cx-hidden" style="margin-top:12px"><div class="cx-k" style="color:var(--purple);margin:0 0 6px">' + esc(x.tryLabel || 'TRY IT') + ' · MODEL NOTE</div><p><small>' + esc(x.setup) + '</small><br>' + esc(x.excerpt) + '</p>' + x.fields.map(f => '<p><b>' + esc(f.label) + '</b><br>' + esc(f.model) + '</p>').join('') + '</div>';
      if (x.type === 'why') return tHead(x) + '<div class="cx-panel" style="margin:0"><b>' + esc(x.stat.big) + ' · ' + esc(x.stat.line) + '</b><br><small>' + esc(x.stat.sub) + '</small></div>';
      if (x.type === 'stats') return tHead(x) + '<div class="cx-panel" style="margin:0">' + x.stats.map(st => '<b>' + esc(st.big) + ' · ' + esc(st.line) + '</b> <small>' + esc(st.sub) + '</small>').join('<br>') + '</div>';
      if (x.type === 'table') return tHead(x) + tbl(x) + (x.after ? '<p class="cx-sub" style="font-size:13px;margin-top:8px">' + esc(x.after) + '</p>' : '');
      if (x.type === 'build') return '<div class="cx-hidden" style="margin-top:12px"><div class="cx-k" style="color:var(--purple);margin:0 0 6px">' + esc(x.label) + '</div><p>' + esc(x.prompt) + '</p><p><b>Right order:</b> ' + x.parts.map((p, i) => (i + 1) + ' ' + esc(p)).join(' · ') + '</p>' + x.decoys.map(dc => '<p><b>Decoy:</b> ' + esc(dc.text) + ' — ' + esc(dc.why) + '</p>').join('') + '</div>';
      if (x.type === 'pickup') return (x.title ? tHead(x) : '') + '<div class="cx-hidden" style="margin-top:12px"><div class="cx-k" style="color:var(--purple);margin:0 0 6px">' + esc(x.tryLabel || x.label) + '</div>' + x.cards.map(k => '<p><b>' + esc(k.line) + '</b>' + (k.setup ? ' <small>(' + esc(k.setup) + ')</small>' : '') + '<br>Answer: <b>' + esc(k.answer) + '</b>. ' + esc(k.why) + (k.layer ? '<br><small>Next layer: ' + esc(k.layer) + '</small>' : '') + '</p>').join('') + '</div>';
      if (x.type === 'write') return tHead(x) + tbl(x) + '<div class="cx-hidden" style="margin-top:12px"><div class="cx-k" style="color:var(--purple);margin:0 0 6px">TRY IT · WRITE PART 3 · STRONG EXAMPLES</div>' + x.notes.map(n => '<p><small>' + esc(n.note) + '</small><br>' + esc(n.example) + '</p>').join('') + '</div>';
      if (x.type === 'killers') return tHead(x) + tbl({head: ['Habit', 'Why it hurts', 'Instead'], rows: x.items});
      if (x.type === 'text') return tHead(x);
      if (x.type === 'application') return tHead(x) + '<ul class="cx-ul">' + x.slots.map(sl => '<li><b>' + esc(sl.type) + ':</b> ' + esc(sl.hint) + '</li>').join('') + '</ul><p class="cx-sub" style="font-size:13px;margin-top:8px">These ' + (x.unit || 'openers') + ' carry over into the roleplay, so you’ll see them on the run page.</p>';
      return '';
    }).join('');
    const tabs = [['rules', 'Rules & format'], T ? ['training', 'Training page'] : null, d.questions.length ? ['bank', 'Quiz questions (' + d.questions.length + ')'] : null, keys ? ['keys', rp && pr ? 'Scorecards & keys' : rp ? 'Scorecard & cards' : 'Rubric & key'] : null].filter(Boolean);
    const groupName = {foundation: 'FOUNDATION', cold_calling: 'COLD CALLING', skills: 'SKILLS', junior_ae: 'JUNIOR AE TRACK'}[c.track] || '';
    main.innerHTML = '<button class="cx-link" data-cert-page="certifications">← All certifications</button><div class="label" style="margin-top:14px">' + groupName + ' · MANAGER VIEW</div>' +
      '<div class="cx-titlerow"><h1>' + esc(c.id + ' · ' + c.name) + '</h1><span class="cx-chip ok">Live' + (c.day ? ' · Day ' + c.day : '') + '</span></div><p>' + esc(c.summary || '') + '</p>' +
      '<div class="cx-tabs" role="tablist">' + tabs.map((t, i) => '<button role="tab" data-cx-tab="' + t[0] + '" aria-selected="' + !i + '"' + (i ? '' : ' class="on"') + '>' + esc(t[1]) + '</button>').join('') + '</div>' +
      '<div data-cx-pane="rules">' + rulesHtml + '</div>' + (T ? '<div data-cx-pane="training" hidden>' + trainHtml + '</div>' : '') + (d.questions.length ? '<div data-cx-pane="bank" hidden>' + bankHtml + '</div>' : '') + (keys ? '<div data-cx-pane="keys" hidden>' + keys + '</div>' : '');
    icons(); main.scrollTop = 0; window.scrollTo(0, 0);
  }

  // Junior AE track: real cert tiles once any exist; locked until a manager marks the SDR Senior SDR.
  function juniorAe() {
    const open = ['senior_sdr', 'manager', 'admin'].includes(me.level), list = data.certs.filter(c => c.track === 'junior_ae');
    const head = '<section class="cx-group"><div class="cx-group-h"><h2>Junior AE track</h2><span>' + (open ? (me.level === 'senior_sdr' ? 'Unlocked · you’re a Senior SDR' : 'Unlocked') : 'Your next step after Senior SDR') + '</span></div><div class="cx-grid2">';
    if (!list.length) return head + '<div class="cx-tile' + (open ? '' : ' locked') + '"><div class="cx-ico ' + (open ? 'go' : 'off') + '">AE</div><div class="cx-body"><b>Verticals, product, Competitor L2, discovery</b><small>Bite-sized certifications</small><span class="cx-chip ' + (open ? 'ok">Unlocked · first certifications coming soon' : 'off">Unlocks when your manager marks you Senior SDR') + '</span></div></div></div></section>';
    const tile = c => {
      if (!open) return '<div class="cx-tile locked"><div class="cx-ico off">' + esc(c.id) + '</div><div class="cx-body"><b>' + esc(c.name) + '</b><small>' + esc(formatOf(c)) + '</small><span class="cx-chip off">Unlocks at Senior SDR</span></div></div>';
      const s = certState(c);
      const inner = '<div class="cx-ico ' + s.ico + '">' + esc(c.id) + '</div><div class="cx-body"><b>' + esc(c.name) + '</b><small>' + esc(formatOf(c)) + '</small><span class="cx-chip ' + s.chip + '">' + esc(s.label) + '</span></div>';
      return s.action ? '<a class="cx-tile focus" href="' + (s.url || quizUrl(c.id)) + '" target="_top">' + inner + '</a>' : '<div class="cx-tile' + (s.locked ? ' locked' : '') + '">' + inner + '</div>';
    };
    return head + list.map(tile).join('') + '</div></section>';
  }

  function renderPath() {
    setActive('certifications');
    const view = isMgr() ? getView() : 'user';
    if (view === 'manager') return renderCatalog();
    const tracked = data.certs.filter(c => ['foundation', 'cold_calling', 'skills'].includes(c.track));
    const passed = tracked.filter(c => data.progress[c.id]?.status === 'passed').length;
    const groups = [
      ['foundation', 'Foundation', 'Onboarding · Required to go live'],
      ['cold_calling', 'Cold Calling track', 'Taken in order'],
      ['skills', 'Skills', 'Before applying for Senior SDR']
    ];
    const tile = c => {
      const s = certState(c);
      const inner = '<div class="cx-ico ' + s.ico + '">' + esc(c.id) + '</div><div class="cx-body"><b>' + esc(c.name) + '</b><small>' + esc(formatOf(c)) + '</small><span class="cx-chip ' + s.chip + '">' + esc(s.label) + '</span></div>';
      return s.action ? '<a class="cx-tile focus" href="' + (s.url || quizUrl(c.id)) + '" target="_top">' + inner + '</a>' : '<div class="cx-tile' + (s.locked ? ' locked' : '') + '">' + inner + '</div>';
    };
    const count = track => { const list = data.certs.filter(c => c.track === track); return list.filter(c => data.progress[c.id]?.status === 'passed').length + ' / ' + list.length; };
    const lb = data.certs.find(c => c.id === 'LB');
    main.innerHTML = titleRow('user') + (isMgr()
        ? '<div class="cx-preview"><span><b>You’re seeing what a rep sees.</b> Anything you take here is saved to your own record only, and you never appear on Team Progress.</span><button class="cx-btn ghost" data-cx-reset-preview>Reset my preview</button></div>'
        : '<p>Only you and your managers can see this page.</p>') +
      '<section class="cx-card cx-sum"><div class="cx-bar"><div class="cx-bar-l"><span>' + passed + ' of ' + tracked.length + ' certifications passed</span><span>Senior SDR path</span></div><div class="cx-track"><i style="width:' + Math.round(passed / Math.max(1, tracked.length) * 100) + '%"></i></div></div>' +
      '<div class="cx-badges" aria-label="Foundation badges">' + data.certs.filter(c => c.track === 'foundation').map(c => '<div class="cx-badge' + (data.progress[c.id]?.status === 'passed' ? ' on' : '') + '" title="' + esc(c.name) + '">' + esc(c.id) + '</div>').join('') + '</div></section>' +
      groups.map(([track, title, note]) => '<section class="cx-group"><div class="cx-group-h"><h2>' + title + '</h2><span>' + note + '</span></div><div class="cx-grid2">' + data.certs.filter(c => c.track === track).map(tile).join('') + '</div></section>').join('') +
      juniorAe() +
      '<section class="cx-elig"><h2>Senior SDR eligibility</h2><p>Promotion also depends on performance. Your manager confirms that part.</p><div class="cx-grid2">' +
      '<div><span>Foundation</span><strong>' + count('foundation') + '</strong></div><div><span>Cold Calling track</span><strong>' + count('cold_calling') + '</strong></div>' +
      '<div><span>List Building</span><strong>' + (lb && data.progress.LB?.status === 'passed' ? 'Passed' : 'Not started') + '</strong></div><div><span>3 months at quota after ramp</span><strong>Manager confirms</strong></div></div></section>';
    icons(); main.scrollTop = 0; window.scrollTo(0, 0);
  }

  // ---------- manager: team progress ----------
  async function renderTeam() {
    setActive('team');
    main.innerHTML = '<div class="label">MANAGER VIEW</div><h1>Team progress</h1><p class="cx-empty">Loading…</p>';
    let t;
    try { t = await api('/api/team'); } catch (e) { main.innerHTML = '<div class="label">MANAGER VIEW</div><h1>Team progress</h1><p>' + esc(e.message) + '</p>'; return; }
    const legend = [['p', '✓', 'Passed'], ['i', '•', 'In progress'], ['f', '✕', 'Not passed yet'], ['n', '–', 'Not started']];
    const mark = {p: '✓', i: '•', f: '✕', n: '–'}, word = {p: 'Passed', i: 'In progress', f: 'Not passed yet', n: 'Not started'};
    const att = t.attention.map(a => '<div class="cx-att' + (a.kind === 'leave' ? ' leave' : '') + '"><span><strong>' + esc(a.name) + '</strong> ' + esc(a.text) + '</span>' +
      (a.kind === 'coach' ? '<button class="cx-btn ghost" data-cx-unlock="' + esc(a.email) + '" data-cert="' + esc(a.cert) + '">Mark coached &amp; unlock</button>' : '') +
      (a.kind === 'review' ? '<a class="cx-btn" href="' + esc(a.url || ('/review/' + encodeURIComponent(a.cert) + '?rep=' + encodeURIComponent(a.email))) + '" target="_top">' + (a.cert === 'F2' ? 'Start live review' : 'Review it') + '</a>' : '') +
      (a.kind === 'roleplay' ? '<a class="cx-btn" href="' + esc(a.url || ('/roleplay-run/' + encodeURIComponent(a.cert) + '?rep=' + encodeURIComponent(a.email))) + '" target="_top">Run roleplay</a>' : '') + '</div>').join('');
    main.innerHTML = '<div class="label">MANAGER VIEW</div><h1>Team progress</h1><p>' + t.totals.reps + (t.totals.reps === 1 ? ' rep' : ' reps') + ' · updated live from certification results</p>' +
      '<div class="cx-tiles4">' +
        '<div class="cx-stat"><span>Practicals &amp; roleplays to run</span><b>' + t.tiles.reviews + '</b></div>' +
        '<div class="cx-stat"><span>Retakes waiting on coaching</span><b>' + t.tiles.coaching + '</b></div>' +
        '<div class="cx-stat"><span>Left-tab flags this week</span><b style="color:#8a5610">' + t.tiles.leaves + '</b></div>' +
        '<div class="cx-stat"><span>Eligible for Senior SDR review</span><b>' + t.tiles.eligible + '</b></div></div>' +
      '<div class="cx-grid2" style="margin-bottom:22px">' +
        '<section class="cx-panel" style="margin:0"><div class="cx-ph"><i class="cx-dot" style="background:#e6f4ec;color:#1f7a4d"><i data-lucide="trending-up" aria-hidden="true"></i></i><h2>Leaning in</h2></div><p class="cx-sub">Most growth activity in the last 30 days</p>' +
          (t.leaders.length ? t.leaders.map(l => '<div class="cx-lead"><strong>' + esc(l.name) + '</strong><span>' + l.passed + (l.passed === 1 ? ' cert' : ' certs') + ' passed · ' + l.visits + (l.visits === 1 ? ' training visit' : ' training visits') + '</span></div><div class="cx-mini"><i style="width:' + l.pct + '%"></i></div>').join('') : '<p class="cx-empty">No activity in the last 30 days yet.</p>') + '</section>' +
        '<section class="cx-panel" style="margin:0"><div class="cx-ph"><i class="cx-dot" style="background:#fdf0dc;color:#8a5610"><i data-lucide="clock" aria-hidden="true"></i></i><h2>Gone quiet</h2></div><p class="cx-sub">Longest since any certification activity</p>' +
          (t.quiet.length ? t.quiet.map(q => '<div class="cx-quiet"><div><strong>' + esc(q.name) + '</strong><small>' + esc(q.detail) + '</small></div><em>' + (q.days == null ? 'No activity yet' : q.days + (q.days === 1 ? ' day' : ' days')) + '</em></div>').join('') : '<p class="cx-empty">Everyone has been active in the last few days.</p>') + '</section>' +
      '</div>' +
      '<section class="cx-panel"><h2>Needs your attention</h2><p class="cx-sub">Practicals ready to review, results waiting on coaching, and left-tab flags from the last 7 days</p>' + (att || '<p class="cx-empty">Nothing needs you right now.</p>') + '</section>' +
      '<section class="cx-panel"><div class="cx-group-h"><h2>Every rep, every cert</h2><div class="cx-legend">' + legend.map(l => '<span><span class="cx-cell ' + l[0] + '" style="width:22px;height:22px;font-size:12px">' + l[1] + '</span> ' + l[2] + '</span>').join('') + '</div></div>' +
        '<div class="cx-scroll"><table class="cx-table"><thead><tr><th style="text-align:left">Rep</th>' + t.certs.map(c => '<th scope="col"><span class="cx-tip" tabindex="0">' + esc(c.id) + '<span class="cx-tipbox" role="tooltip"><strong>' + esc(c.name) + '</strong>' + esc(c.summary || '') + (c.status !== 'active' ? ' Not open yet.' : '') + '</span></span></th>').join('') + '</tr></thead><tbody>' +
        t.rows.map(r => '<tr><th scope="row">' + esc(r.name) + (r.level === 'senior_sdr' ? '<small>Senior SDR</small>' : r.role !== 'rep' ? '<small>' + esc(r.role) + '</small>' : '') + '</th>' + r.cells.map(c => '<td><span class="cx-cell ' + c + '" aria-label="' + word[c] + '">' + mark[c] + '</span></td>').join('') + '</tr>').join('') +
        '</tbody></table></div></section>' +
      '<section class="cx-panel" id="cx-people"><h2>People</h2><p class="cx-sub">' + (me.role === 'admin' ? 'Set each person’s role. Marking someone Senior SDR unlocks the Junior AE track for them.' : 'Switch your SDRs between SDR and Senior SDR. Senior SDR unlocks the Junior AE track. Only the admin can add people or change managers.') + '</p><div class="cx-people"><p class="cx-empty">Loading…</p></div>' +
        (me.role === 'admin' ? '<form class="cx-form" id="cx-add"><input type="email" required placeholder="name@company.com" aria-label="Email"><select aria-label="Role"><option value="sdr">SDR</option><option value="senior_sdr">Senior SDR</option><option value="manager">Manager</option></select><button class="cx-btn" type="submit">Save</button></form>' : '') + '<p class="cx-msg" aria-live="polite"></p></section>';
    icons();
    loadPeople(t.certs);
  }
  async function unlock(b) {
    b.disabled = true; b.textContent = 'Unlocking…';
    try { await api('/api/team/unlock', {email: b.dataset.cxUnlock, cert: b.dataset.cert}); b.textContent = 'Retake unlocked'; }
    catch (e) { b.disabled = false; b.textContent = e.message; }
  }
  async function loadPeople(certs) {
    const box = main.querySelector('.cx-people'), msg = main.querySelector('.cx-msg');
    const draw = list => {
      box.innerHTML = list.users.map(u => '<div class="cx-person"><span>' + esc(u.email) + '</span><span style="display:flex;gap:8px;align-items:center">' +
        (u.role === 'admin' || (me.role !== 'admin' && u.role === 'manager') || u.email === me.email ? '<span class="cx-chip go">' + esc(ROLE_NAMES[u.role] || u.role) + '</span>' : '<select data-email="' + esc(u.email) + '" aria-label="Role for ' + esc(u.email) + '">' + (me.role === 'admin' ? ['sdr', 'senior_sdr', 'manager'] : ['sdr', 'senior_sdr']).map(r => '<option value="' + r + '"' + (u.role === r ? ' selected' : '') + '>' + ROLE_NAMES[r] + '</option>').join('') + '</select>') +
        (me.role !== 'admin' ? '' : certs.filter(c => c.status === 'active').map(c => '<button class="cx-btn ghost" data-cx-reset="' + esc(u.email) + '" data-cert="' + esc(c.id) + '" title="Clear this person’s ' + esc(c.id) + ' progress so they can test it again">Reset ' + esc(c.id) + '</button>').join('')) + '</span></div>').join('');
      box.querySelectorAll('select').forEach(s => s.onchange = async () => { try { await api('/api/admin/users', {email: s.dataset.email, role: s.value}); msg.textContent = 'Saved.'; } catch (e) { msg.textContent = e.message; } });
    };
    try { draw(await api('/api/admin/users')); } catch (e) { box.textContent = e.message; }
    const add = main.querySelector('#cx-add'); if (!add) return;
    add.onsubmit = async e => {
      e.preventDefault();
      const f = e.target;
      try { draw(await api('/api/admin/users', {email: f.querySelector('input').value, role: f.querySelector('select').value})); msg.textContent = 'Saved.'; f.reset(); }
      catch (err) { msg.textContent = err.message; }
    };
  }
  async function reset(b) {
    b.disabled = true;
    try { await api('/api/admin/reset', {email: b.dataset.cxReset, cert: b.dataset.cert}); b.textContent = b.dataset.cert + ' reset'; await load(); }
    catch (e) { b.textContent = e.message; }
  }

  // ---------- training-visit tracking ----------
  const seen = new Map();
  let trackTimer = null;
  function track() {
    clearTimeout(trackTimer);
    trackTimer = setTimeout(() => {
      const h1 = main.querySelector('h1'); if (!h1) return;
      const ref = (myPage ? myPage + ':' : '') + h1.textContent.trim().slice(0, 100);
      if (Date.now() - (seen.get(ref) || 0) < 5 * 60e3) return;
      seen.set(ref, Date.now());
      fetch('/api/activity', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({kind: 'page_view', ref})}).catch(() => {});
    }, 1200);
  }

  // ---------- boot ----------
  function askName() {
    if (me.name) return;
    const wrap = document.createElement('div');
    wrap.className = 'cx-name-overlay';
    wrap.innerHTML = '<form class="cx-name" role="dialog" aria-modal="true" aria-labelledby="cx-name-h"><div class="cx-tag">WELCOME</div><h2 id="cx-name-h">What should we call you?</h2><p>Your name shows on your certifications and on Team Progress for your managers.</p>' +
      '<div class="cx-name-row"><label>First name<input name="first" autocomplete="given-name" required maxlength="40"></label><label>Last name<input name="last" autocomplete="family-name" required maxlength="40"></label></div>' +
      '<p class="cx-name-err" role="alert"></p><button class="cx-btn" type="submit">Save and continue</button></form>';
    document.body.appendChild(wrap);
    const f = wrap.querySelector('form'), err = wrap.querySelector('.cx-name-err');
    f.first.focus();
    f.onsubmit = async e => {
      e.preventDefault();
      const btn = f.querySelector('button'); btn.disabled = true; err.textContent = '';
      try { const r = await api('/api/me', {firstName: f.first.value, lastName: f.last.value}); me.name = r.name; data.me = r; wrap.remove(); }
      catch (x) { err.textContent = x.message; btn.disabled = false; }
    };
  }

  load().then(() => {
    askName();
    addNav();
    new MutationObserver(() => { decorateDay(); track(); }).observe(main, {childList: true});
    const hash = new URLSearchParams(location.hash.slice(1)).get('page');
    if (hash) openPage(hash); else { decorateDay(); track(); }
  }).catch(() => {});
})();
