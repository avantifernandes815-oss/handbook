-- Written practicals (F2 first): drafts, submissions and manager reviews.
-- Replaces the unused practical_submissions table from 0001 (it was empty).
DROP TABLE IF EXISTS practical_submissions;
CREATE TABLE practical_submissions (
  id TEXT PRIMARY KEY,
  user_email TEXT NOT NULL REFERENCES users(email),
  cert_id TEXT NOT NULL REFERENCES certifications(id),
  attempt_no INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','submitted','passed','failed')),
  content TEXT NOT NULL DEFAULT '{}',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  submitted_at TEXT,
  reviewer_email TEXT REFERENCES users(email),
  scores TEXT,
  must_pass INTEGER,
  average REAL,
  notes TEXT,
  reviewed_at TEXT,
  UNIQUE (user_email, cert_id, attempt_no)
);
CREATE INDEX IF NOT EXISTS idx_practical_user ON practical_submissions(user_email, cert_id);
CREATE INDEX IF NOT EXISTS idx_practical_status ON practical_submissions(status);
UPDATE certifications SET status='active', prerequisites='["F1"]', components='["quiz","practical"]', questions_per_attempt=15, seconds_per_question=45, min_per_section=2, onboarding_day=5, updated_at=datetime('now') WHERE id='F2';
