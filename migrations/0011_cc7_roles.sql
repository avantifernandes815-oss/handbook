-- SDR vs Senior SDR (stored as role='rep' + level), and CC7 · Full Call Capstone (roleplay only).
ALTER TABLE users ADD COLUMN level TEXT NOT NULL DEFAULT 'sdr';
UPDATE certifications SET status='active', prerequisites='["CC6"]', components='["roleplay"]', questions_per_attempt=NULL, updated_at=datetime('now') WHERE id='CC7';
