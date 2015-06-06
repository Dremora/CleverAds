

  var getTheQuiz = function(quizName) {

    $.get("/tpl/quiz/" + quizName + ".json", function(data) {

      var output = "";
      var quizTitle = data.title;

      for (var i = 0; i < 1; i++) {

        var question = data.questions[i];
        var questionTitle = question.title;

        output += '<label>' + questionTitle + '</label>';
        $.each(question.options, function(index, value) {
          output += '<button data="' + index + '">' + value + '</button>';
        });
      }

      $('#the-quiz').html(output).removeClass('hidden');
    });
  };
