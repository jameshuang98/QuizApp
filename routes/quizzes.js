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
    let query = `SELECT * FROM quizzes
    `;
    console.log(query);
    db.query(query)
      .then(data => {
        const quizzes = data.rows;
        // console.log(quizzes);
        
        // // check if user logged in
        // const user_id = req.session.user_id;
        // const templateVars = {
        //   user: user_id,
        //   quizzes: quizzes
        // }
        // res.render("index", templateVars);

        res.json({ quizzes })
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};

