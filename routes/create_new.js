/*
 * All routes for quizzes are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

//comeback to work on

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  console.log("hello");
  router.get("/new", (req, res) => {
    let query = ``;
    console.log(query);
    db.query(query)
      .then(data => {
        const quizzes = data.rows;
        console.log(quizzes);
        templateVars = {quizzes}
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

