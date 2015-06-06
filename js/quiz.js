var getTheQuiz = function(quizName, badCall, correctCall) {

  $.get("/tpl/quiz/" + quizName + ".json", function(data) {

    var output = '<div><div class="quiz-background"></div>';
    var quizTitle = data.title;

    for (var i = 0; i < 1; i++) {

      var question = data.questions[i];
      var questionTitle = question.title;
      var questionCorrectAnswer = question.correctAnswer;

      output += '<div class="quiz-success"><img src="/images/correct-answer.svg"></div>';
      output += '<div class="quiz-failure"><img src="/images/incorrect-answer.svg"></div>';
      output += '<div class="quiz-title">' + questionTitle + '</div>';
      output += '<div class="quiz-answer-container">';
      $.each(question.options, function(index, value) {
        output += '<button class="quiz-answer" data-answer="' + index + '">' + value + '</button>';
      });
      output += '</div>';
    }

    $('#the-quiz').on("click", "button", function() {
      var answer = $(this).data('answer');

      if (answer == questionCorrectAnswer) {
        $('.quiz-success').show();
        $(this).addClass('quiz-answer--correct');
        setTimeout(correctCall, 3000);
      }
      else {
        $('.quiz-failure').show();
        $(this).addClass('quiz-answer--incorrect');
        setTimeout(badCall, 3000);
      }

    });

    output += '</div>';
    $('#the-quiz').html(output).removeClass('hidden');
  });
};

var hideTheQuiz = function() {
  $('#the-quiz').addClass('hidden');
}
