-- SELECT count() --> Needs to complete
SELECT quizzes.name, users.name, CONCAT((cast(score as float) / cast(count(quizzes.id) as float)) * 100, '%') as percent
FROM attempts
JOIN attempted_answers ON attempts.id = attempt_id
JOIN answers ON answer_id = answers.id
JOIN quizzes ON attempts.quiz_id = quizzes.id
JOIN users ON attempts.user_id = users.id
WHERE public = true
GROUP BY quizzes.name, attempts.score, users.name
ORDER BY score DESC
LIMIT 1;

-- to only show top score for user, add WHERE users.id = X;