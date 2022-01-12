const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/quiz/:quiz_id/attempt/:attempt_id/", (req, res) => {
    const quiz_id = req.params.quiz_id;
    const attempt_id = req.params.attempt_id;
    let query = `SELECT attempts.id as attempt_id, attempted_answers.id as attempted_answers_id, attempted_answers.answer_id as attempted_answer, correct, score as total, quizzes.name as quiz_name, questions.quiz_id, questions.id as question_id, questions.question, answers.id as answer_id, answers.answer
    FROM attempts
    JOIN quizzes ON attempts.quiz_id = quizzes.id
    JOIN attempted_answers ON attempts.id = attempt_id
    JOIN answers ON answers.id = attempted_answers.answer_id
    JOIN questions ON answers.question_id = questions.id
    WHERE attempts.quiz_id = $1 AND attempt_id = $2
    ORDER BY questions.id;
    `;
    db.query(query, [quiz_id, attempt_id])
      .then(data => {
        const results = data.rows;
        console.log('results', results);
        const templateVars = {
          attempt_score: results[0].total,
          quiz_name: results[0].quiz_name,
          quiz_id: results[0].quiz_id
        };
        const questions = [];
        data.rows.forEach((i) => {
          if (!questions.includes(i.question)) {
            questions.push(i.question);
          }
        });
        templateVars.questions = questions.map((i) => {
          const answers = data.rows.filter((j) => j.question === i);
          return {
            question:i,
          }
        });
        const selected_answers = [];
        const scores = [];
        data.rows.forEach((x) => {
          selected_answers.push(x.answer);
        })
        data.rows.forEach((x) => {
          x.correct ? scores.push(1) : scores.push(0);
        })
        // console.log('selected_answers', selected_answers)
        let index = 0;
        templateVars.questions.forEach((x) => {
          x.attempted_answer = selected_answers[index];
          x.score = scores[index];
          index++;
        })
        console.log('templateVars', templateVars);
        // console.log(templateVars.questions[0].answers);
        res.render("quiz_results", templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};