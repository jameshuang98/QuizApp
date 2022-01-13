const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/:user_id", (req, res) => {
    const id = req.params.user_id;
    let query = `SELECT name, id, public FROM quizzes
    WHERE quizzes.user_id = $1`;
    // console.log(query);
    db.query(query, [id])
      .then(data => {
        const quizzes = data.rows;
        console.log('quizzes', quizzes);
        
        // check if user logged in
        const user_id = req.session.user_id;
        const templateVars = {
          user: user_id,
          quizzes: quizzes
        }
        res.render("profile", templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};

