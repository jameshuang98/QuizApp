/*
 * All routes for quizzes are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    let query = `SELECT name FROM quizzes
    WHERE quizzes.public IS true;`;
    console.log(query);
    db.query(query)
      .then(data => {
        const quizzes = data.rows; //iterate over quizzes, make data structure for my ejs, then pass as a templatevars into ejs
        const templateVars = {quizzes};
        console.log(quizzes);
        console.log("can u hear me!")
        res.render("new_quiz", templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
