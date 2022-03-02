/*
 * All routes for quizzes are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/public", (req, res) => {
    let query = `SELECT name, id FROM quizzes WHERE public = true;
    `;
    console.log(query);
    db.query(query)
      .then(data => {
        const quizzes = data.rows;
        console.log(quizzes);

        const arr = [];
        quizzes.forEach((x) => {
          arr.push(x.id);
        })

        const str = arr.toString();

        console.log('str', str)

        // CONCAT((cast(attempts.score as float) / cast(count(quizzes.id) as float)) * 100, '%')

        let query2 = `SELECT quizzes.name, quizzes.id, CONCAT(cast(MAX(score) as float) / 4 * 100, '%') as top_score
        FROM attempts
        RIGHT JOIN quizzes ON attempts.quiz_id = quizzes.id
        WHERE quizzes.id IN (${str})
        GROUP BY quizzes.name, quizzes.id
        ;`
        // console.log(query2);
        db.query(query2)
        .then(data => {
          const user_id = req.session.user_id;
          const quizzes = data.rows;
          console.log('quizzes', quizzes)
          const templateVars = {
          user: user_id,
          quizzes: quizzes
        }
        res.render("index", templateVars);
        })
        // check if user logged in

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
