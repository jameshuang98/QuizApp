/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/:id", (req, res) => {
    const id = req.params.id
    let query = `SELECT quizzes.name as quiz_name, questions.quiz_id, questions.id as question_id, questions.question, answers.answer
    FROM questions
    JOIN answers ON answers.question_id = questions.id
    JOIN quizzes ON questions.quiz_id = quizzes.id
    WHERE questions.quiz_id = $1
    ORDER BY questions.id;`;
    // console.log(query);
    db.query(query, [id])
      .then(data => {
        // console.log(data)
        const questionData = data.rows;
        // const templateVars = {questions}
        const templateVars = {quiz_name: questionData[0].quiz_name,
          quiz_id: questionData[0].quiz_id

        }
        const questions = [];

        data.rows.forEach((i) => {
          if (!questions.includes(i.question)) {
            questions.push(i.question)
          }

        });

        templateVars.questions = questions.map((i) => {
          const answers = data.rows.filter((j) => j.question === i);
          return {question:i,
            answers:answers.map((i) => i.answer)}
        });

        console.log(templateVars);
        res.render("quiz", templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
