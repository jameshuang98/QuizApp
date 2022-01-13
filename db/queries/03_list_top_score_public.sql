SELECT quizzes.name, CONCAT((cast(attempts.score as float) / cast(count(quizzes.id) as float)) * 100, '%') as top_score
FROM attempts
JOIN attempted_answers ON attempts.id = attempt_id
JOIN answers ON answer_id = answers.id
RIGHT JOIN quizzes ON attempts.quiz_id = quizzes.id
JOIN users ON attempts.user_id = users.id
GROUP BY quizzes.name, attempts.score, users.name
ORDER BY score DESC
;

-- to only show top score for user, add WHERE users.id = X;

SELECT MAX(score)
FROM attempts
JOIN quizzes ON attempts.quiz_id = quizzes.id
WHERE quizzes.name = 'HTTP QUIZ'
;