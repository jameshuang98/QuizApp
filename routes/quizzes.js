/*
 * All routes for quizzes are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  console.log("hello");
  router.get("/public", (req, res) => {
    let query = `SELECT *
    FROM quizzes`;

    console.log(query);
    db.query(query)
      .then(data => {
        const quizzes = data.rows;
        console.log(quizzes);

        // check if user logged in
        const user_id = req.session.user_id;
        const templateVars = {
          user: user_id,
          quizzes: quizzes
        }
        res.render("index", templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};


// (SELECT CONCAT((cast(score as float) / cast(count(quizzes.id) as float)) * 100, '%') as top_score
//     FROM attempts
//     JOIN attempted_answers ON attempts.id = attempt_id
//     JOIN answers ON answer_id = answers.id
//     JOIN quizzes ON attempts.quiz_id = quizzes.id
//     JOIN users ON attempts.user_id = users.id
//     WHERE public = true
//     GROUP BY quizzes.name, attempts.score, users.name
//     ORDER BY score DESC
//     LIMIT 1) as top_score
