-- JAE9 becomes Demo Flow (training + quiz); the mock demo moves to JAE10 and requires JAE1–JAE9.
INSERT INTO certifications (id, track, name, summary, sort_order, prerequisites, components, pass_mark, questions_per_attempt, seconds_per_question, min_per_section, onboarding_day, status, updated_at)
  SELECT 'JAE10', track, name, summary, 40, '["JAE1","JAE2","JAE3","JAE4","JAE5","JAE6","JAE7","JAE8","JAE9"]', components, pass_mark, questions_per_attempt, seconds_per_question, min_per_section, onboarding_day, status, datetime('now')
  FROM certifications WHERE id = 'JAE9';
UPDATE quiz_attempts SET cert_id = 'JAE10' WHERE cert_id = 'JAE9';
UPDATE cert_progress SET cert_id = 'JAE10' WHERE cert_id = 'JAE9';
UPDATE training_progress SET cert_id = 'JAE10' WHERE cert_id = 'JAE9';
UPDATE retake_unlocks SET cert_id = 'JAE10' WHERE cert_id = 'JAE9';
UPDATE roleplay_leads SET cert_id = 'JAE10' WHERE cert_id = 'JAE9';
UPDATE roleplay_scores SET cert_id = 'JAE10' WHERE cert_id = 'JAE9';
UPDATE persona_cards SET cert_id = 'JAE10' WHERE cert_id = 'JAE9';
UPDATE practical_submissions SET cert_id = 'JAE10' WHERE cert_id = 'JAE9';
UPDATE certifications SET name = 'Demo Flow', summary = 'The order of a strong demo, from the up-front contract to a dated next step, and how to move between stages.', sort_order = 39, prerequisites = '[]', components = '["training","quiz"]', pass_mark = 0.8, questions_per_attempt = 10, seconds_per_question = 60, min_per_section = 2, status = 'active', updated_at = datetime('now') WHERE id = 'JAE9';
