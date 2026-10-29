-- Certification system schema. Applied to D1 database sdr-certifications-test on 2026-10-29.
CREATE TABLE IF NOT EXISTS users (
  email TEXT PRIMARY KEY,
  name TEXT,
  role TEXT NOT NULL DEFAULT 'rep' CHECK (role IN ('admin','manager','rep')),
  manager_email TEXT REFERENCES users(email),
  cohort TEXT,
  start_date TEXT,
  active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS certifications (
  id TEXT PRIMARY KEY,
  track TEXT NOT NULL,
  name TEXT NOT NULL,
  summary TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  prerequisites TEXT NOT NULL DEFAULT '[]',
  components TEXT NOT NULL DEFAULT '["quiz"]',
  pass_mark REAL NOT NULL DEFAULT 0.8,
  questions_per_attempt INTEGER,
  seconds_per_question INTEGER,
  min_per_section INTEGER,
  onboarding_day INTEGER,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','active','retired')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS questions (
  id TEXT NOT NULL,
  version INTEGER NOT NULL DEFAULT 1,
  cert_id TEXT NOT NULL REFERENCES certifications(id),
  section TEXT NOT NULL,
  kind TEXT NOT NULL CHECK (kind IN ('judgment','knowledge')),
  topic TEXT NOT NULL,
  prompt TEXT NOT NULL,
  scenario TEXT,
  options TEXT NOT NULL,
  correct TEXT NOT NULL,
  reveal TEXT,
  review_link TEXT,
  source TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active','retired')),
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (id, version)
);
CREATE TABLE IF NOT EXISTS quiz_attempts (
  id TEXT PRIMARY KEY,
  user_email TEXT NOT NULL REFERENCES users(email),
  cert_id TEXT NOT NULL REFERENCES certifications(id),
  attempt_no INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'in_progress' CHECK (status IN ('in_progress','passed','failed','voided')),
  question_plan TEXT NOT NULL,
  current_index INTEGER NOT NULL DEFAULT 0,
  question_started_at TEXT,
  tab_leaves INTEGER NOT NULL DEFAULT 0,
  score REAL,
  correct_count INTEGER,
  started_at TEXT NOT NULL DEFAULT (datetime('now')),
  finished_at TEXT,
  locked_until TEXT
);
CREATE TABLE IF NOT EXISTS quiz_answers (
  attempt_id TEXT NOT NULL REFERENCES quiz_attempts(id),
  position INTEGER NOT NULL,
  question_id TEXT NOT NULL,
  question_version INTEGER NOT NULL,
  option_order TEXT NOT NULL,
  chosen TEXT,
  is_correct INTEGER,
  timed_out INTEGER NOT NULL DEFAULT 0,
  time_taken_ms INTEGER,
  answered_at TEXT,
  PRIMARY KEY (attempt_id, position)
);
CREATE TABLE IF NOT EXISTS integrity_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  attempt_id TEXT NOT NULL REFERENCES quiz_attempts(id),
  user_email TEXT NOT NULL,
  kind TEXT NOT NULL CHECK (kind IN ('tab_leave','fullscreen_exit')),
  duration_ms INTEGER,
  outcome TEXT NOT NULL CHECK (outcome IN ('warning','voided')),
  occurred_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS persona_cards (
  id TEXT PRIMARY KEY,
  cert_id TEXT NOT NULL REFERENCES certifications(id),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active'
);
CREATE TABLE IF NOT EXISTS roleplay_scores (
  id TEXT PRIMARY KEY,
  user_email TEXT NOT NULL REFERENCES users(email),
  cert_id TEXT NOT NULL REFERENCES certifications(id),
  attempt_no INTEGER NOT NULL,
  scorer_email TEXT NOT NULL REFERENCES users(email),
  persona_card_id TEXT REFERENCES persona_cards(id),
  criteria TEXT NOT NULL,
  must_pass TEXT NOT NULL,
  average REAL NOT NULL,
  result TEXT NOT NULL CHECK (result IN ('passed','failed','draft')),
  coaching_notes TEXT NOT NULL CHECK (length(trim(coaching_notes)) > 0),
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  shared_at TEXT
);
CREATE TABLE IF NOT EXISTS practical_submissions (
  id TEXT PRIMARY KEY,
  user_email TEXT NOT NULL REFERENCES users(email),
  cert_id TEXT NOT NULL REFERENCES certifications(id),
  content TEXT,
  link TEXT,
  submitted_at TEXT NOT NULL DEFAULT (datetime('now')),
  reviewer_email TEXT REFERENCES users(email),
  result TEXT CHECK (result IN ('passed','failed')),
  notes TEXT,
  reviewed_at TEXT
);
CREATE TABLE IF NOT EXISTS cert_progress (
  user_email TEXT NOT NULL REFERENCES users(email),
  cert_id TEXT NOT NULL REFERENCES certifications(id),
  status TEXT NOT NULL DEFAULT 'not_started' CHECK (status IN ('not_started','in_progress','passed','failed')),
  components TEXT NOT NULL DEFAULT '{}',
  attempts_used INTEGER NOT NULL DEFAULT 0,
  retake_unlocked INTEGER NOT NULL DEFAULT 1,
  passed_at TEXT,
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (user_email, cert_id)
);
CREATE TABLE IF NOT EXISTS retake_unlocks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_email TEXT NOT NULL REFERENCES users(email),
  cert_id TEXT NOT NULL REFERENCES certifications(id),
  coached_by TEXT NOT NULL REFERENCES users(email),
  coached_at TEXT NOT NULL DEFAULT (datetime('now')),
  note TEXT
);
CREATE TABLE IF NOT EXISTS activity_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_email TEXT NOT NULL,
  kind TEXT NOT NULL,
  ref TEXT,
  occurred_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS audit_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  actor_email TEXT NOT NULL,
  action TEXT NOT NULL,
  target TEXT,
  details TEXT,
  at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_attempts_user ON quiz_attempts(user_email, cert_id);
CREATE INDEX IF NOT EXISTS idx_questions_cert ON questions(cert_id, status);
CREATE INDEX IF NOT EXISTS idx_activity_user ON activity_events(user_email, occurred_at);
CREATE INDEX IF NOT EXISTS idx_integrity_attempt ON integrity_events(attempt_id);
