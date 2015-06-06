import Ember from 'ember';

export default Ember.Component.extend({
  elementId: 'the-quiz',

  actions: {
    selectAnswer(option, correctAnswer) {
      if (option.id === this.get('question.correctAnswer')) {
        this.set('success', true);
        Ember.run.later(this, () => {
          this.sendAction('correctAnswer');
        }, 3000);
      } else {
        this.set('failure', true);
        Ember.run.later(this, () => {
          this.sendAction('incorrectAnswer');
        }, 3000);
      }
    }
  }
});
