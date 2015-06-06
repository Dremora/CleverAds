

  var getTheQuiz = function(quizName) {

    $.get("/tpl/quiz/" + quizName + ".json", function(data) {

      var output = '<div class="quiz-background"></div>';
      var quizTitle = data.title;

      for (var i = 0; i < 1; i++) {

        var question = data.questions[i];
        var questionTitle = question.title;

        output += '<div class="quiz-title">' + questionTitle + '</div>';
        $.each(question.options, function(index, value) {
          output += '<button class="quiz-answer" data="' + index + '">' + value + '</button>';
        });
      }

      $('#the-quiz').html(output).removeClass('hidden');
    });
  };
