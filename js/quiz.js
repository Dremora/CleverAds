var getTheQuiz = function(quizName, badCall, correctCall) {

  $.get("/tpl/quiz/" + quizName + ".json", function(data) {

    var output = '<div><div class="quiz-background"></div>';
    var quizTitle = data.title;

    for (var i = 0; i < 1; i++) {

      var question = data.questions[i];
      var questionTitle = question.title;
      var questionCorrectAnswer = question.correctAnswer;

      output += '<div class="quiz-title">' + questionTitle + '</div>';
      output += '<div class="quiz-answer-container">';
      $.each(question.options, function(index, value) {
        output += '<button class="quiz-answer" data-answer="' + index + '">' + value + '</button>';
      });
      output += '</div>';
    }

    // Set as global variable.
    window.addCorrectAnswer = questionCorrectAnswer;

    $('#the-quiz').on("click", "button", function() {
      var answer = $(this).data('answer');

      if (answer == questionCorrectAnswer) {
        correctCall();
      }
      else {
        badCall();
      }

    });

    output += '</div>';
    $('#the-quiz').html(output).removeClass('hidden');
  });
};

var hideTheQuiz = function() {
  $('#the-quiz').addClass('hidden');
}