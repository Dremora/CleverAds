$(function () {
  function createVideoPlayer() {
    // PARAMS is a javascript object containing parameters to pass to the player if any (eg: {autoplay: 1})
    var PARAMS = {background: 'ABE866', autoplay: 1, chromeless: 0,
      foreground: '000000',
      html: 1, highlight: '857580',
      info: 1, network: 'dsl', autoplay : 0};
    return DM.player("player", {
      video: "x2sx8z4",
      width: "640",
      height: "360",
      params: PARAMS
    }
    );
  }

  function createAdPlayer() {
    // PARAMS is a javascript object containing parameters to pass to the player if any (eg: {autoplay: 1})
    var PARAMS = {background: 'ABE866', autoplay: 1, chromeless: 0,
      foreground: '000000',
      html: 1, highlight: '857580',
      info: 1, network: 'dsl', autoplay : 0, chromeless: true};
    return DM.player("ad", {
      video: "xx6hd9",
      width: "640",
      height: "360",
      params: PARAMS
    }
    );
  }

  function showAd() {
    $('#ad').addClass('active');
    $('#player').removeClass('active');
  }

  function showPlayer() {
    $('#player').addClass('active');
    $('#ad').removeClass('active');
  }


  var player = createVideoPlayer();
  var ad = createAdPlayer();

  ad.addEventListener('apiready', function () {
    ad.play();
    $(ad).one('playing', function () {
      ad.removeEventListener('playing');
      ad.pause();

      ad.addEventListener('ended', function () {
        $('#the-quiz').html('').addClass('hidden');
        showPlayer();
        player.play();
      })
    });
  });


  var prevTime = 0;
  player.addEventListener('timeupdate', function (event) {
    var currentTime = event.srcElement.currentTime;
    if (prevTime < 5 && currentTime > 5) {
      player.pause();
      showAd();
      ad.play();
      getTheQuiz('1', function() {
        $('#the-quiz').html('').addClass('hidden');
      },
        function() {
          $('#the-quiz').html('').addClass('hidden');
          ad.pause();
          showPlayer();
          player.play();
        }
      );
    }
    prevTime = currentTime;
  });
});
