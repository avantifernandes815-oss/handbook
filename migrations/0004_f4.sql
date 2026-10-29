-- F4 · Yes to Meeting Held: quiz + confirmation roleplay (situation mode) + written Piper fix.
UPDATE certifications SET status='active', prerequisites='["F3"]', components='["quiz","roleplay","written"]', questions_per_attempt=15, seconds_per_question=45, min_per_section=2, onboarding_day=9, updated_at=datetime('now') WHERE id='F4';
