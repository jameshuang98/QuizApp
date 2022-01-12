-- example for attempt_id = 1

SELECT questions.quiz_id, questions.question, answers.answer as selected_answer, correct
FROM attempts
JOIN attempted_answers ON attempts.id = attempt_id
JOIN answers ON answers.id = attempted_answers.answer_id
JOIN questions ON answers.question_id = questions.id
WHERE attempt_id = 2
ORDER BY questions.id;