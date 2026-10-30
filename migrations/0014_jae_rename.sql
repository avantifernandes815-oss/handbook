-- Rename the Junior AE certifications from JA1–JA9 to JAE1–JAE9.
INSERT INTO certifications (id, track, name, summary, sort_order, prerequisites, components, pass_mark, questions_per_attempt, seconds_per_question, min_per_section, onboarding_day, status, updated_at)
  SELECT 'JAE' || substr(id, 3), track, name, summary, sort_order, replace(prerequisites, '"JA', '"JAE'), components, pass_mark, questions_per_attempt, seconds_per_question, min_per_section, onboarding_day, status, datetime('now')
  FROM certifications WHERE id GLOB 'JA[0-9]';
UPDATE questions SET cert_id = 'JAE' || substr(cert_id, 3), id = 'JAE' || substr(id, 3), review_link = replace(review_link, '/training/JA', '/training/JAE'), source = replace(source, 'JA', 'JAE') WHERE cert_id GLOB 'JA[0-9]';
UPDATE quiz_answers SET question_id = 'JAE' || substr(question_id, 3) WHERE question_id GLOB 'JA[0-9]-*';
UPDATE quiz_attempts SET cert_id = 'JAE' || substr(cert_id, 3) WHERE cert_id GLOB 'JA[0-9]';
UPDATE cert_progress SET cert_id = 'JAE' || substr(cert_id, 3) WHERE cert_id GLOB 'JA[0-9]';
UPDATE training_progress SET cert_id = 'JAE' || substr(cert_id, 3) WHERE cert_id GLOB 'JA[0-9]';
UPDATE retake_unlocks SET cert_id = 'JAE' || substr(cert_id, 3) WHERE cert_id GLOB 'JA[0-9]';
UPDATE roleplay_leads SET cert_id = 'JAE' || substr(cert_id, 3) WHERE cert_id GLOB 'JA[0-9]';
UPDATE roleplay_scores SET cert_id = 'JAE' || substr(cert_id, 3) WHERE cert_id GLOB 'JA[0-9]';
UPDATE persona_cards SET cert_id = 'JAE' || substr(cert_id, 3) WHERE cert_id GLOB 'JA[0-9]';
UPDATE practical_submissions SET cert_id = 'JAE' || substr(cert_id, 3) WHERE cert_id GLOB 'JA[0-9]';
DELETE FROM certifications WHERE id GLOB 'JA[0-9]';
