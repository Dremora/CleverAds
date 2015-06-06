import Ember from 'ember';

export default Ember.Component.extend({
  elementId: 'the-quiz',
  success: false,
  failure: false,
  answerGiven: false,

  resetComponent: function () {
    this.set('success', false);
    this.set('failure', false);
    this.set('answerGiven', false);
  }.observes('question'),

  actions: {
    selectAnswer(option) {
      this.set('answerGiven', true);
      if (option.id === this.get('question.correctAnswer')) {
        this.set('success', true);
        Ember.run.later(this, () => {
          this.sendAction('correctAnswer');
        }, 2000);
      } else {
        this.set('failure', true);
        Ember.run.later(this, () => {
          this.sendAction('incorrectAnswer');
        }, 2000);
      }
    }
  }
});
