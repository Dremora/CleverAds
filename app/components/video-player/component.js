/* global DM */

import Ember from 'ember';

export default Ember.Component.extend({
  playerMode: true,
  currentQuestion: 0,
  firstAdDelay: 5, // in seconds

  question: function () {
    return this.get('questions')[this.get('currentQuestion')];
  }.property('questions', 'currentQuestion'),

  createVideoPlayer() {
    // PARAMS is a javascript object containing parameters to pass to the player if any (eg: {autoplay: 1})
    var PARAMS = {background: 'ABE866', chromeless: 0,
      foreground: '000000',
      html: 1, highlight: '857580',
      GK_PV5: 1,
      info: 1, network: 'dsl', autoplay : 0};
    return DM.player("player", {
      video: "x2sz0be",
      width: "688",
      height: "387",
      params: PARAMS
    }
    );
  },

  createAdPlayer() {
    // PARAMS is a javascript object containing parameters to pass to the player if any (eg: {autoplay: 1})
    var PARAMS = {background: 'ABE866',
      foreground: '000000',
      html: 1, highlight: '857580',
      GK_PV5: 1,
      info: 1, network: 'dsl', autoplay : 0, chromeless: true};
    return DM.player("ad", {
      video: "x2sz0bb",
      width: "688",
      height: "387",
      params: PARAMS
    }
    );
  },

  actions: {
    incorrectAnswer() {
      if (this.get('currentQuestion') + 1 < this.get('questions').length) {
        this.set('currentQuestion', this.get('currentQuestion') + 1);
      } else {
        this.set('isQuizOn', false);
      }
    },

    correctAnswer() {
      this.set('isQuizOn', false);
      this.get('ad').pause();
      this.set('playerMode', true);
      this.get('player').play();
    }
  },

  initPlayer: function () {
    var player = this.createVideoPlayer();
    var ad = this.createAdPlayer();

    this.set('player', player);
    this.set('ad', ad);

    ad.addEventListener('apiready', () => {
      Ember.run(() => {
        ad.play();
        Ember.$(ad).one('playing', () => {
          ad.removeEventListener('playing');
          ad.pause();

          ad.addEventListener('ended', () => {
            Ember.run(() => {
              this.set('isQuizOn', false);
              this.set('playerMode', true);
            });
            player.play();
          });
        });
      });
    });

    var prevTime = 0;
    player.addEventListener('timeupdate', (event) => {
      var currentTime = event.srcElement.currentTime;
      if (prevTime < this.get('firstAdDelay') && currentTime > this.get('firstAdDelay')) {
        player.pause();
        Ember.run(() => {
          this.set('playerMode', false);
          this.set('isQuizOn', true);
        });
        ad.play();
      }
      prevTime = currentTime;
    });
  }.on('didInsertElement'),

  updatePlayer: function () {
    var playerMode = this.get('playerMode');
    this.$('#player')[playerMode ? 'addClass' : 'removeClass']('active');
    this.$('#ad')[playerMode ? 'removeClass' : 'addClass']('active');
    this.$('#adOverlay')[playerMode ? 'removeClass' : 'addClass']('active');
  }.observes('playerMode').on('didInsertElement')
});
