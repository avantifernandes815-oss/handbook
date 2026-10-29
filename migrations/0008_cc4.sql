-- CC4 · Objection Handling: training page, quiz and stacked-objection roleplay.
UPDATE certifications SET status='active', prerequisites='["CC3"]', components='["training","quiz","roleplay"]', questions_per_attempt=15, seconds_per_question=45, min_per_section=2, updated_at=datetime('now') WHERE id='CC4';
