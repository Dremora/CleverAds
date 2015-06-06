import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return {
      "title": "How are you?",
      "correctAnswer": 2,
      "options": [
        { "id": 1,
          "title": "Answer 1" },
        { "id": 2,
          "title": "Answer 2" },
        { "id": 3,
          "title": "Answer 3" },
      ]
    };
  }
});
