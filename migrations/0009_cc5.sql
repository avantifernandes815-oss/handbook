-- CC5 · Competitor Positioning L1: training page, quiz and competitor roleplay.
UPDATE certifications SET status='active', prerequisites='["CC4"]', components='["training","quiz","roleplay"]', questions_per_attempt=15, seconds_per_question=45, min_per_section=2, summary='MindBody, WellnessLiving, Glofox, Arketa and Walla on a live call.', updated_at=datetime('now') WHERE id='CC5';
