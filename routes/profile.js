const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/:user_id", (req, res) => {
    const id = req.params.user_id;
    let query = `
    SELECT users.id as user_id, users.name as user_name, quizzes.name, quizzes.id as quiz_id, quizzes.public
    FROM quizzes
    JOIN users ON users.id = quizzes.user_id
    WHERE quizzes.user_id = $1;
    `;
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

