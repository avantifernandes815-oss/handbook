-- CC1 · Openers: training page progress, rapid-fire roleplay content, and activate CC1.
ALTER TABLE roleplay_leads ADD COLUMN content TEXT;
CREATE TABLE IF NOT EXISTS training_progress (
  user_email TEXT NOT NULL REFERENCES users(email),
  cert_id TEXT NOT NULL REFERENCES certifications(id),
  content TEXT NOT NULL DEFAULT '{}',
  completed_at TEXT,
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (user_email, cert_id)
);
UPDATE certifications SET status='active', components='["training","quiz","roleplay"]', questions_per_attempt=15, seconds_per_question=45, min_per_section=2, updated_at=datetime('now') WHERE id='CC1';
