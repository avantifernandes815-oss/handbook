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
  const pracUrl = id => '/practical/' + encodeURIComponent(id);
  const hasPractical = c => (c.components || []).includes('practical');
  let data = null, me = null, myPage = null;

  async function load() { data = await api('/api/certs'); me = data.me; return data; }

  // ---------- navigation ----------
  function addNav() {
    const btn = (page, iconName, label, extra = '') => '<button class="navitem" data-cert-page="' + page + '"><i data-lucide="' + iconName + '" aria-hidden="true"></i>' + label + extra + '</button>';
    side.insertAdjacentHTML('beforeend', btn('certifications', 'award', 'Certifications', '<span class="cx-new">New</span>'));
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
    if (hasPractical(c) && (p.components || {}).quiz === 'passed') {
      const pr = p.practical, u = pracUrl(c.id);
      if (!pr || pr.status === 'draft') return {key: 'practical', chip: 'go', label: 'Quiz passed · practical due Day 10', ico: 'go', action: 'Open practical', url: u};
      if (pr.status === 'submitted') return {key: 'submitted', chip: 'go', label: 'Practical submitted · live review next', ico: 'go', action: 'View practical', url: u};
      if (pr.status === 'failed') return {key: 'pretake', chip: 'warn', label: 'Practical retake', ico: 'go', action: 'Open practical', url: u};
    }
    if (p.inProgress) return {key: 'resume', chip: 'go', label: 'In progress', ico: 'go', action: 'Resume quiz'};
    if (p.status === 'failed') {
      if (p.attemptsUsed >= p.maxAttempts) return {key: 'max', chip: 'warn', label: 'Talk to your manager', ico: 'go'};
      if (!p.retakeUnlocked) return {key: 'coaching', chip: 'go', label: 'Retake after coaching', ico: 'go'};
      return {key: 'retake', chip: 'go', label: 'Retake ready', ico: 'go', action: 'Start retake'};
    }
    if (p.lockedUntil) return {key: 'lock', chip: 'warn', label: 'Opens ' + new Date(p.lockedUntil).toLocaleString([], {weekday: 'short', hour: 'numeric', minute: '2-digit'}), ico: 'go'};
    if (hasPractical(c)) return {key: 'ready', chip: 'go', label: 'Ready to start', ico: 'go', action: 'Start ' + c.id, url: pracUrl(c.id)};
    return {key: 'ready', chip: 'go', label: 'Ready to start', ico: 'go', action: 'Start quiz'};
  }
  const formatOf = c => {
    const parts = (c.components || []).map(x => ({quiz: 'Quiz', roleplay: 'live roleplay', practical: 'practical'}[x] || x));
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
    const html = '<section class="cx-card cx-day" aria-labelledby="cx-today"><div class="cx-head"><div><div class="cx-tag">CERTIFICATION DAY</div><h2 id="cx-today">Today’s certifications</h2><p>Take these after the session. Quizzes pass at 80%.' + (certs.some(hasPractical) ? ' Written practicals are due Day 10.' : '') + '</p></div><button class="cx-link" data-cert-page="certifications">View my progress →</button></div><div class="cx-rows">' + rows + '</div></section>';
    (intro || label).insertAdjacentHTML('afterend', html);
    icons();
  }

  // ---------- rep: my path ----------
  function renderPath() {
    setActive('certifications');
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
    main.innerHTML = '<div class="label">CERTIFICATIONS</div><h1>Your path</h1><p>Only you and your managers can see this page.</p>' +
      '<section class="cx-card cx-sum"><div class="cx-bar"><div class="cx-bar-l"><span>' + passed + ' of ' + tracked.length + ' certifications passed</span><span>Senior SDR path</span></div><div class="cx-track"><i style="width:' + Math.round(passed / Math.max(1, tracked.length) * 100) + '%"></i></div></div>' +
      '<div class="cx-badges" aria-label="Foundation badges">' + data.certs.filter(c => c.track === 'foundation').map(c => '<div class="cx-badge' + (data.progress[c.id]?.status === 'passed' ? ' on' : '') + '" title="' + esc(c.name) + '">' + esc(c.id) + '</div>').join('') + '</div></section>' +
      groups.map(([track, title, note]) => '<section class="cx-group"><div class="cx-group-h"><h2>' + title + '</h2><span>' + note + '</span></div><div class="cx-grid2">' + data.certs.filter(c => c.track === track).map(tile).join('') + '</div></section>').join('') +
      '<section class="cx-group"><div class="cx-group-h"><h2>Junior AE track</h2><span>Your next step after Senior SDR</span></div><div class="cx-grid2"><div class="cx-tile locked"><div class="cx-ico off">AE</div><div class="cx-body"><b>Verticals, product, Competitor L2, discovery</b><small>Bite-sized certifications</small><span class="cx-chip off">Unlocks when you reach Senior SDR</span></div></div></div></section>' +
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
      (a.kind === 'review' ? '<a class="cx-btn" href="/review/' + encodeURIComponent(a.cert) + '?rep=' + encodeURIComponent(a.email) + '" target="_top">Start live review</a>' : '') + '</div>').join('');
    main.innerHTML = '<div class="label">MANAGER VIEW</div><h1>Team progress</h1><p>' + t.totals.reps + (t.totals.reps === 1 ? ' rep' : ' reps') + ' · updated live from certification results</p>' +
      '<div class="cx-tiles4">' +
        '<div class="cx-stat"><span>Practicals to review</span><b>' + t.tiles.reviews + '</b></div>' +
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
        t.rows.map(r => '<tr><th scope="row">' + esc(r.name) + (r.role !== 'rep' ? '<small>' + esc(r.role) + '</small>' : '') + '</th>' + r.cells.map(c => '<td><span class="cx-cell ' + c + '" aria-label="' + word[c] + '">' + mark[c] + '</span></td>').join('') + '</tr>').join('') +
        '</tbody></table></div></section>' +
      (me.role === 'admin' ? '<section class="cx-panel" id="cx-people"><h2>People</h2><p class="cx-sub">Admin only. Managers see everything here except this panel.</p><div class="cx-people"><p class="cx-empty">Loading…</p></div>' +
        '<form class="cx-form" id="cx-add"><input type="email" required placeholder="name@company.com" aria-label="Email"><select aria-label="Role"><option value="rep">Rep</option><option value="manager">Manager</option></select><button class="cx-btn" type="submit">Save</button></form><p class="cx-msg" aria-live="polite"></p></section>' : '');
    icons();
    if (me.role === 'admin') loadPeople(t.certs);
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
        (u.role === 'admin' ? '<span class="cx-chip go">Admin</span>' : '<select data-email="' + esc(u.email) + '" aria-label="Role for ' + esc(u.email) + '"><option value="rep"' + (u.role === 'rep' ? ' selected' : '') + '>Rep</option><option value="manager"' + (u.role === 'manager' ? ' selected' : '') + '>Manager</option></select>') +
        certs.filter(c => c.status === 'active').map(c => '<button class="cx-btn ghost" data-cx-reset="' + esc(u.email) + '" data-cert="' + esc(c.id) + '" title="Clear this person’s ' + esc(c.id) + ' progress so they can test it again">Reset ' + esc(c.id) + '</button>').join('') + '</span></div>').join('');
      box.querySelectorAll('select').forEach(s => s.onchange = async () => { try { await api('/api/admin/users', {email: s.dataset.email, role: s.value}); msg.textContent = 'Saved.'; } catch (e) { msg.textContent = e.message; } });
    };
    try { draw(await api('/api/admin/users')); } catch (e) { box.textContent = e.message; }
    main.querySelector('#cx-add').onsubmit = async e => {
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
  load().then(() => {
    addNav();
    new MutationObserver(() => { decorateDay(); track(); }).observe(main, {childList: true});
    const hash = new URLSearchParams(location.hash.slice(1)).get('page');
    if (hash) openPage(hash); else { decorateDay(); track(); }
  }).catch(() => {});
})();
