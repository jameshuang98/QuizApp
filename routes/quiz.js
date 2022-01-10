/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/quiz/:id", (req, res) => {
    const id = req.params.id
    let query = `SELECT questions.quiz_id, questions.question, answers.answer
    FROM questions
    JOIN answers ON answers.question_id = questions.id
    JOIN quizzes ON questions.quiz_id = quizzes.id
    WHERE questions.quiz_id = $1
    ORDER BY questions.id;`;
    // console.log(query);
    db.query(query, [id])
      .then(data => {
        const results = data.rows;
        const templateVars = {results}
        console.log(templateVars);
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
