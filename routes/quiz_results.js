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
    let query = `SELECT questions.question, answers.answer, correct, score as total
    FROM attempts
    JOIN attempted_answers ON attempts.id = attempt_id
    JOIN answers ON answers.id = attempted_answers.answer_id
    JOIN questions ON answers.question_id = questions.id
    WHERE attempt_id = $1
    ORDER BY questions.id;`;
    // console.log(query);
    db.query(query, [id])
      .then(data => {
        const results = data.rows;
        for (let result of results) { // create new key called score, set value to 1 forcorrect = T, and 0 for correct = F
          if (result.correct) {
            result.score = 1;
          } else {
            result.score = 0;
          }
        }
        const templateVars = {results}
        // console.log('templateVars', templateVars)
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

// app.get("/quizzes/results/:id", (req, res) => {
//   const id = req.params.id
//   const templateVars = {id}
//   res.render("quiz_results", templateVars);
// });