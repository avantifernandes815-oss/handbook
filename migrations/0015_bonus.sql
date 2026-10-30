-- Bonus certifications: open to every SDR after Foundation, 80% quiz, earn a badge. Draft until their content ships.
INSERT OR REPLACE INTO certifications (id, track, name, summary, sort_order, prerequisites, components, pass_mark, questions_per_attempt, seconds_per_question, min_per_section, status, updated_at) VALUES
('BC1', 'bonus', 'Pilates', 'How Pilates studios run, what their owners care about, and what lands in a demo.', 41, '["F1","F2","F3","F4"]', '["training","quiz"]', 0.8, 10, 60, 2, 'draft', datetime('now')),
('BC2', 'bonus', 'Yoga', 'How yoga studios run, what their owners care about, and what lands in a demo.', 42, '["F1","F2","F3","F4"]', '["training","quiz"]', 0.8, 10, 60, 2, 'draft', datetime('now')),
('BC3', 'bonus', 'Fitness', 'How cycling, strength and small-group fitness studios run, and what lands in a demo.', 43, '["F1","F2","F3","F4"]', '["training","quiz"]', 0.8, 10, 60, 2, 'draft', datetime('now')),
('BC4', 'bonus', 'Dance', 'How dance studios and schools run, what their owners care about, and what lands in a demo.', 44, '["F1","F2","F3","F4"]', '["training","quiz"]', 0.8, 10, 60, 2, 'draft', datetime('now'));
