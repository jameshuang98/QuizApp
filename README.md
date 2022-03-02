# QuizApp

QuizApp is a full-stack multi-page quiz application built with Express.js, Node.js, jQuery, PostgreSQL, and CSS/Sass. 

**QuizApp features:**
- Create and take a quiz
- Toggle quiz to be private or public
- View list of other public quizzes
- See top score for public quizzes
- Review results for a taken quiz
- Share link for others to take a quiz or view results

## Final Product
!["Screenshot of profile page with public and private quizzes lists"](https://github.com/jameshuang98/QuizApp/blob/master/public/images/profile.png?raw=true)

!["Screenshot of quiz page"](https://github.com/jameshuang98/QuizApp/blob/master/public/images/quiz.png?raw=true)

!["Screenshot of quiz results page"](/docs/quiz-results.png)

!["Screenshot of quiz creation page"](https://github.com/jameshuang98/QuizApp/blob/master/public/images/quiz_results.png?raw=true)

!["Screenshot of homepage with list of public quizzes"](https://github.com/jameshuang98/QuizApp/blob/master/public/images/homepage.png?raw=true)

## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information 
  - username: `labber` 
  - password: `labber` 
  - database: `midterm`
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
7. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
8. Visit `http://localhost:8080/`

## Warnings & Tips

- Use the `npm run db:reset` command each time there is a change to the database schema or seeds. 
  - It runs through each of the files, in order, and executes them against the database. 
  - Note: you will lose all newly created (test) data each time this is run, since the schema files will tend to `DROP` the tables and recreate them.

## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
- Morgan
- Express
- Nodemon
- Cookie-parser
- Session-cookie
- Sass
