// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));
app.use(
  cookieSession({
    name: 'session',
    keys: ['lighthouse', 'midterm'],
  })
);

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");
const quizzesRoutes = require("./routes/quizzes");
const quizResultsRoutes = require("./routes/quiz_results");
const profileRoutes = require("./routes/profile");
const loadPublic = require("./routes/load_public");
// const search = require("./routes/search");
const quizRoutes = require("./routes/quiz");
const quizNewRoutes = require("./routes/create_new");
const quizNewPostRoutes = require("./routes/create_new_post");
const { cookie } = require("express/lib/response");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
app.use("/api/quizzes", quizzesRoutes(db));
app.use("/api/results", quizResultsRoutes(db));
// app.use("/api/quizzes/search", search(db));
app.use("/api/quiz", quizRoutes(db));
app.use("/api/quizzes", quizNewRoutes(db));
app.use("/api/quizzes", quizNewPostRoutes(db));
app.use("/api/profile", profileRoutes(db));
app.use("/api/public", loadPublic(db)); // sends JSON
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  res.redirect("/api/quizzes/public");
});

app.get('/login/:id', (req, res) => {
  // cookie-session middleware
  req.session.user_id = req.params.id;

  // cookie-parser middleware
  res.cookie('user_id', req.params.id);

  // send the user somewhere
  res.redirect('/');
});

// logout
app.get('/logout', (req, res) => {
  req.session = null;
  res.clearCookie("user_id");
  return res.redirect('/');
})

// Helper function used on quiz page to convert question and answer indices to letters
app.locals.indexToLetter = function(index) {
  const map = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  return map[index]
};

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
