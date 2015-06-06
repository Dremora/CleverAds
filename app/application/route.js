import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return [{
      "title": "What are the creatures always fighting for?",
      "correctAnswer": 3,
      "correctAnswerMessage": "Well done!",
      "incorrectAnswerMessage": "Come on, you can do better",
      "options": [
        { "id": 1,
          "title": "Potato" },
        { "id": 2,
          "title": "Rabbit" },
        { "id": 3,
          "title": "Banana" },
      ]
    }, {
      "title": "Do you at least know the name of the film?",
      "correctAnswer": 2,
      "correctAnswerMessage": "We're getting you back in just a second!",
      "incorrectAnswerMessage": "Enjoy the ad!",
      "options": [
        { "id": 1,
          "title": "Minions" },
        { "id": 2,
          "title": "Despicable Me" },
        { "id": 3,
          "title": "Skyfall" },
      ]
    }];
  }
});
