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

  // router.post("/new", (req, res) => {
  //   console.log("hello");
  //   // let query1 = ` INSERT INTO quizzes () VALUES ()  `;
  //   // let query2 = ` INSERT INTO questions () VALUES ()  `;
  //   // let query3 = ` INSERT INTO answers () VALUES ()  `;
  //   // console.log(query);
  //   // db.query1(query1)
  //   //   .then(data => {
  //   //     console.log(req.body);
  //   //     const quizzes = data.rows;
  //   //     console.log(quizzes);
  //   //     templateVars = {quizzes}
  //   //     res.render("new_quiz", templateVars);
  //   //   })
  //   //   .catch(err => {
  //   //     res
  //   //       .status(500)
  //   //       .json({ error: err.message });
  //     // });
  // });

  router.post("/new", (req,res) => {
    console.log(req.body)
    let name = req.body['quizname'];
    console.log(name);
    const id = req.session.user_id;
    db.query(`INSERT INTO quizzes (user_id, name, subject, difficulty)
              VALUES ($1, $2, $3, $4)
              RETURNING id;`
            , [id, name, req.body.Subject, req.body.Difficulty])
      .then(data => {
        console.log(data.rows[0].id);
        let quizID = data.rows[0].id;
        const promises = [];
        for(let i = 0; i < req.body.question.length; i++){
         const questionId = (db.query(`INSERT INTO questions (quiz_id, question)
          VALUES ($1, $2)
          RETURNING id;`
        , [quizID, req.body.question[i]]))
        promises.push(questionId)
      }
        return Promise.all(promises)
        })
        .then(questions => {
          let n = 0;
          for(const question of questions){
            const promises = [];
            const questionId = question.rows[0].id;
            console.log(questionId);
            n += 1;
            const ans = 'answers' + n;
            const sol = 'soln' + n;
            let answerslen = req.body[ans].length;
            const solution =  Number(req.body[sol]);
            console.log(ans)
            for(let i = 0; i < answerslen; i++){
              const isAnsCorr = solution === i + 1;

            db.query(`INSERT INTO answers (question_id, answer,correct)
                VALUES ($1, $2, $3)
                RETURNING id;`
              , [questionId, req.body[ans][i], isAnsCorr])
              // promises.push(answers)
            }
            // return Promise.all(promises)
          }
          const id = req.session.user_id;
          console.log('id is', id);
          return res.redirect(`/api/profile/${id}`);
        })
      .catch(err => {
              res
                .status(500)
                .json({ error: err.message });
            });


  });
  return router;
};
