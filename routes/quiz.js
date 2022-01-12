/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const { text } = require('express');
const express = require('express');
const router = express.Router();

// Getting all information for a specific quiz that the user is taking
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

  return templateVars;
};

// Getting the users score after they submit the quiz
const getScore = (db, submissions) => {
  let answers_query = `SELECT * FROM answers WHERE correct = true;`
    let score = 0;
    db.query(answers_query)
      .then(data => {
        let correct_answers = [];
        correct_answers = data.rows.map(a => a.answer)
        console.log('correct_answers', correct_answers)

        submissions.forEach((s, index) => {
          if (s[1] === correct_answers[index]) {
            score++;
          }
        })
        console.log('correct_answers', correct_answers)
        console.log('score', score);
        return score;
      })
      .catch(err => {
        throw(err);
      });
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
    console.log('req.body', req.body)

    // Converting attempted answers object (req.body) into an array of arrays
    let submissions = Object.keys(req.body).map((key) => [key, req.body[key]]);
    console.log('submissions', submissions)
    let submissions_query =
      `INSERT INTO attempted_answers (attempt_id, answer_id)
    VALUES
    `;
    submissions.forEach((attempt, index) => {
      submissions_query+= ` (1, ${attempt[1]}),`
    });
    submissions_query = submissions_query.substring(0, submissions_query.length - 1);
    submissions_query += ';'
    console.log(submissions_query);

    db.query(submissions_query)
      .then(() => {
        console.log('success')
      })
      .catch(err => {
        console.log(err)
      });


    // Calculate score from submissions
    // getScore(db, submissions)
    //   .then(

    //   })
    //   .catch(err => {
    //     res
    //       .status(500)
    //       .json({ error: err.message });
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

    res.send('success')

  });

  return router;
};
