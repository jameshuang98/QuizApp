/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const { text } = require('express');
const express = require('express');
const router = express.Router();

const getQuizFromDB = async (id, db) => {
  let query =
    `SELECT quizzes.name as quiz_name, questions.quiz_id, questions.id as question_id, questions.question, answers.answer, answers.id as answer_id
    FROM questions
    JOIN answers ON answers.question_id = questions.id
    JOIN quizzes ON questions.quiz_id = quizzes.id
    WHERE questions.quiz_id = $1
    ORDER BY questions.id;`;
  const data = await db.query(query, [id])

  // console.log(data)
  const questionData = data.rows;
  const templateVars = {
    quiz_name: questionData[0].quiz_name,
    quiz_id: questionData[0].quiz_id
  }
  const questions = [];

  // Collecting each unique question in quiz and storing them in an array
  data.rows.forEach((q) => {
    if (!questions.includes(q.question)) {
      questions.push(q.question)
    }
  });
  // Looping through questions array and creating an array of answers from data.rows for each question
  templateVars.questions = questions.map((q) => {
    // Stores info on all answers for a specific question
    const answers = data.rows.filter((i) => i.question === q);
    // console.log(answers);
    // Each element of the templateVars.questions stores an object containing the question, and an answers object
    // Within that answers object is an array of objects corresponding to the various answers for a given question
    // Each object contains the answer-text and answer-id
    return {
      question: q,
      answers: answers.map((a) => {
        return {
          text: a.answer,
          id: a.answer_id
        }
      })
    }
  });

  console.log(templateVars);
  return templateVars;

}

module.exports = (db) => {
  router.get("/:id", (req, res) => {
    const id = req.params.id
    getQuizFromDB(id, db)
      .then(templateVars => {
        res.render("quiz", templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


  router.post("/:id", (req, res) => {
    // Converting attempted answers object (req.body) into an array of arrays
    let submissions = Object.keys(req.body).map((key) => [key, req.body[key]]);

    let attempts_query =
      `INSERT INTO attempts (user_id, quiz_id, score)
    VALUES
    `;
    for (const attempt of submissions) {
      attempts_query += ` (${attempt[1]}, ${attempt[0]}),`
    };
    attempts_query = attempts_query.substring(0, attempts_query.length - 1);
    attempts_query += ';'

    // db.query(attempts_query)
    //   .catch(err => {
    //     console.log(err)
    //   });



    // const id = req.params.id;
    // getQuizFromDB(id, db)
    //   .then(templateVars => {
    //     let answers_query = `INSERT INTO attempted_answers (attempt_id, answer_id)
    //     VALUES`;
    //     for (const quiz)
    //     res.render('quiz/results/:id');
    //   })

    // fetch answers from database using quiz_id
    // loop over submitted answers and check if theyre correct
    // return results

    //option 1 : send json and receive json and use jquery to see results
    //option 2: redirect to a new page results
    console.log(req.body)
    res.send('success')

  });

  return router;
};
