-- Live roleplays (F3 first): the rep's chosen lead, the hidden card the manager plays, and the attempt state.
-- Scores land in roleplay_scores (from 0001).
CREATE TABLE IF NOT EXISTS roleplay_leads (
  id TEXT PRIMARY KEY,
  user_email TEXT NOT NULL REFERENCES users(email),
  cert_id TEXT NOT NULL REFERENCES certifications(id),
  attempt_no INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'submitted' CHECK (status IN ('submitted','started','passed','failed')),
  business TEXT NOT NULL,
  link TEXT,
  code TEXT NOT NULL,
  lead_status TEXT NOT NULL,
  note TEXT,
  card_id TEXT,
  manager_email TEXT REFERENCES users(email),
  submitted_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  started_at TEXT,
  scored_at TEXT,
  UNIQUE (user_email, cert_id, attempt_no)
);
CREATE INDEX IF NOT EXISTS idx_roleplay_user ON roleplay_leads(user_email, cert_id);
CREATE INDEX IF NOT EXISTS idx_roleplay_status ON roleplay_leads(status);
CREATE INDEX IF NOT EXISTS idx_roleplay_scores_user ON roleplay_scores(user_email, cert_id);
UPDATE certifications SET status='active', prerequisites='["F2"]', components='["quiz","roleplay"]', questions_per_attempt=15, seconds_per_question=45, min_per_section=2, onboarding_day=8, updated_at=datetime('now') WHERE id='F3';
