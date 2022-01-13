// Client facing scripts here

const loadPublicQuizzes = function() {
  $.get("/api/public")
    .then(data => {
      renderQuizzes(data.quizzes);
    });
  }

  const renderQuizzes = function(quizzes) {
    const $public = $(".list_public_quizzes");
    $public.empty();
    for (const quiz of quizzes) {
      // console.log('quiz.name', quiz.name)
      $public.append(`
        <tr class="public_table_rows">
          <td>${quiz.name}</td>
          <td>Score</td>
          <td><a class="start_quiz" href="/api/quiz/${quiz.id}">Start Quiz</td>
        </tr>
      `);
    }
  }

  const turnPublic = function(key) {
    const key_id = `${key.getAttribute("data-quiz_id")}`;
    const parts = key_id.split('-', 2);
    const id = parts[1];
    console.log('public');
    $.post("http://localhost:8080/api/public/turn_public", { id: id, public: true })
      .then(data => {
        console.log('post success');
        loadPublicQuizzes();
      })
      .catch((err) => console.log(err));
  };

  const turnPrivate = function(key) {
    const key_id = `${key.getAttribute("data-quiz_id")}`;
      const parts = key_id.split('-', 2);
      const id = parts[1];

    $.post("http://localhost:8080/api/public/turn_public", { id: id, public: false })
      .then(data => {
        console.log('post success');
        loadPublicQuizzes();
      })
      .catch((err) => console.log(err));
  };

$(() => {
  const publickeys = document.querySelectorAll(".public-btn");
  const privatekeys = document.querySelectorAll(".private-btn");

  publickeys.forEach((key) => {
    $(key).on("click", function() {
      console.log('inside publickeys loop')
      turnPublic(key);
      loadPublicQuizzes();

      const key_id = `${key.getAttribute("data-quiz_id")}`;
      const parts = key_id.split('-', 2);
      const id = parts[1];

      $(`.privatekey-${id}`).removeClass('hide');
      $(`.publickey-${id}`).addClass('hide');
    });
  })

  privatekeys.forEach((key) => {
    $(key).on("click", function() {
      turnPrivate(key);
      loadPublicQuizzes();
      const key_id = `${key.getAttribute("data-quiz_id")}`;
      const parts = key_id.split('-', 2);
      const id = parts[1];

      $(`.privatekey-${id}`).addClass('hide');
      $(`.publickey-${id}`).removeClass('hide');
    });
  })

  console.log("Ready");
  loadPublicQuizzes();
});


