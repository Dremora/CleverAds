// This code loads the Dailymotion Javascript SDK asynchronously.
(function() {

  var e = document.createElement('script');
  e.async = true;
  e.type = 'text/javascript';
  e.src = document.location.protocol + '//api.dmcdn.net/all.js';
  var s = document.getElementsByTagName('script')[0];

  s.parentNode.insertBefore(e, s);
}());

// This function init the player once the SDK is loaded
window.dmAsyncInit = function()
{
  // PARAMS is a javascript object containing parameters to pass to the player if any (eg: {autoplay: 1})
  var PARAMS = {background: 'ABE866', autoplay: 1, chromeless: 0,
    foreground: '000000',
    html: 0, highlight: '857580',
    info: 1, network: 'dsl', autoplay : 0};
  var player = DM.player("player", {
    video: "x2sx8z4",
    width: "640",
    height: "360",
    params: PARAMS
  }
  );


  // 4. We can attach some events on the player (using standard DOM events)
  player.addEventListener("apiready", function(e)
  {
    console.log('apiready');
  });

  player.addEventListener("playing", function(e)
  {
    console.log("playing");
  });

  //----- TOGGLE PLAY - OK to play, NOK to pause -----//
  $('#togglePlay').click(function() {
    player.togglePlay();
  });

  //----- SEEK - OK -----//
  $('#seek').click(function() {
    player.seek(10);
  });

  //----- LOAD - OK -----//
  $('#load').click(function() {
    player.load("x174uig");
  });

  //----- SETVOLUME - OK -----//
  $('#setVolume').click(function() {
    player.setVolume(0.2);
  });

  //----- UNMUTE - NOK -----//
  $('#unmute').click(function() {
    player.setMuted(0);
  });

  //----- MUTE - OK -----//
  $('#mute').click(function() {
    player.setMuted(1);
  });

  //----- TOGGLEMUTE - OK -----//
  $('#toggleMute').click(function() {
    player.toggleMuted();
  });

  //----- FULLSCREEN - NOK -----//
  $('#setFullscreen').click(function() {
    player.setFullscreen(1);
  });
}
