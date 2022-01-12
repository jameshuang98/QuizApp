// Client facing scripts here

$(() => {
  console.log("Ready");
  $("#public").on("click", turnPublic);

  $("#hide").on("click", turnPrivate);
});
  
  

const turnPublic = function() {
  $.get("/api/public")
    .then(data => {
      console.log('data', data)
      renderQuizzes(data);
    });

  $(".fa-toggle-off").hide();
  $(".fa-toggle-on").show();
};

const turnPrivate = function() {
  $.get("/api/public")
    .then(data => {
      // console.log('data', data)
      removeQuiz(data); // make this only remove the selected quiz
    });

  $(".fa-toggle-off").show();
  $(".fa-toggle-on").hide();

};

const renderQuizzes = function(quizzes) {
  const $public = $("#list_public");
  for (const quiz in quizzes) {
    console.log('quiz.name', quiz.name)
    $public.append(`<td>${quiz.name}</td>`);
  }
};

const removeQuiz = function() {
  const $public = $("#list_public");
  for (const quiz in quizzes) {
    console.log('quiz.name', quiz.name)
    $public.removeChild(`<td>${quiz.name}</td>`);
  }
}