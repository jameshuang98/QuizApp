const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    let query = `SELECT name, id, public FROM quizzes WHERE public = true`;
    db.query(query)
      .then(data => {
        const quizzes = data.rows;
        res.json({ quizzes });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/turn_public", (req, res) => {
    const { id, public } = req.body;
    console.log('id', id, 'public', public);
    let query = `
    UPDATE quizzes
    SET public = $1
    WHERE quizzes.id = $2
    RETURNING *;
    `;
    db.query(query, [public, id])
      .then(data => {
        // console.log('HELLOOOO', data.rows[0]);
        const result = data.rows[0];
        res.send({ result });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};