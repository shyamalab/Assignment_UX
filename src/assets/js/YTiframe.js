/**
 * JavaScript code for the "YouTube IFRAME API example"
 *
 */

/**
 * YT.Player initialized by onYouTubeIframeAPIReady().
 */
var youTubePlayer;
var tube_id;

function onYouTubeIframeAPIReady() {
    'use strict';
    if (document.getElementById('YouTube-video-id') != undefined) {
        var inputVideoId = document.getElementById('YouTube-video-id');
    }
    var videoId = inputVideoId.value;
    var suggestedQuality = 'medium';
    var height = 300;
    var width = 400;
    function onError(event) {
        youTubePlayer.personalPlayer.errors.push(event.data);
    }

    function onReady(event) {
        var player = event.target;
        player.loadVideoById({
            suggestedQuality: suggestedQuality,
            videoId: videoId
        });
        player.pauseVideo();
    }


    function onStateChange(event) {
        var volume = Math.round(event.target.getVolume());
    }

    youTubePlayer = new YT.Player('YouTube-player',
        {
            videoId: videoId,
            height: height,
            width: width,
            playerVars: {
                'autohide': 0,
                'cc_load_policy': 0,
                'controls': 0,
                'disablekb': 1,
                'iv_load_policy': 3,
                'modestbranding': 1,
                'rel': 0,
                'showinfo': 0,
                'start': 3
            },
            events: {
                'onError': onError,
                'onReady': onReady,
                'onStateChange': onStateChange
            }
        });

    // Add private data to the YouTube object
    youTubePlayer.personalPlayer = {
        'currentTimeSliding': false,
        'errors': []
    };
}

/**
 * :return: true if the player is active, else false
 */
function youTubePlayerActive() {
    'use strict';
    return youTubePlayer && youTubePlayer.hasOwnProperty('getPlayerState');
}



/**
 * Get videoId from the #YouTube-video-id HTML item value,
 * load this video, pause it
 */
function youTubePlayerChangeVideoId(videoId) {
    'use strict';
    youTubePlayer.cueVideoById({
        suggestedQuality: 'medium',
        videoId: videoId
    });
    youTubePlayer.pauseVideo();
}


/**
 * Seek the video to the currentTime.
 * :param currentTime: 0 <= number <= 100
 */
function youTubePlayerCurrentTimeChange(currentTime) {
    'use strict';
    youTubePlayer.personalPlayer.currentTimeSliding = false;
    if (youTubePlayerActive()) {
        youTubePlayer.seekTo(currentTime * youTubePlayer.getDuration() / 100, true);
    }
}

/**
 * Mark that the HTML slider move.
 */
function youTubePlayerCurrentTimeSlide() {
    'use strict';

    youTubePlayer.personalPlayer.currentTimeSliding = true;
}

/**
 *   and set progress bar #YouTube-player-progress.
 */
function youTubePlayerDisplayInfos() {
    'use strict';
    if (youTubePlayerActive()) {
        var current = youTubePlayer.getCurrentTime();
        var duration = youTubePlayer.getDuration();
        var currentPercent = (current && duration ? current * 100 / duration : 0);
        if (!youTubePlayer.personalPlayer.currentTimeSliding) {
            document.getElementById('YouTube-player-progress').value = currentPercent;
        }
    }
}

/**
 * Pause.
 */
function youTubePlayerPause() {
    'use strict';

    if (youTubePlayerActive()) {
        youTubePlayer.pauseVideo();
    }
}

/**
 * Mute / Unmute.
 */
function youTubePlayerMute() {
    'use strict';

    if (youTubePlayerActive()) {
        if (!!youTubePlayer.isMuted())
            youTubePlayer.unMute();
        else
            youTubePlayer.mute();
    }
}

/**
 * Play.
 */
function youTubePlayerPlay() {
    'use strict';
    if (youTubePlayerActive()) {
        youTubePlayer.playVideo();
    }
}


/**
 * Return the state decription corresponding of the state value.
 * :return: 'unstarted', 'ended', 'playing', 'paused', 'buffering', 'video cued' or unknow
 */
function youTubePlayerStateValueToDescription(state, unknow) {
    'use strict';

    var STATES = {
        '-1': 'unstarted',   // YT.PlayerState.
        '0': 'ended',        // YT.PlayerState.ENDED
        '1': 'playing',      // YT.PlayerState.PLAYING
        '2': 'paused',       // YT.PlayerState.PAUSED
        '3': 'buffering',    // YT.PlayerState.BUFFERING
        '5': 'video cued'
    };  // YT.PlayerState.CUED

    return (state in STATES
        ? STATES[state]
        : unknow);
}

function videoIdTrigger() {
    tube_id = document.getElementById('YouTube-video-idnum');
}

/**
 * Stop.
 */
function youTubePlayerStop() {
    'use strict';

    if (youTubePlayerActive()) {
        youTubePlayer.stopVideo();
        youTubePlayer.clearVideo();
    }
}

function youTubePlayerReplay(videoId) {
    'use strict';
    youTubePlayerChangeVideoId(videoId)
    youTubePlayer.playVideo();
}
/**
 * Change the volume.
 */
function youTubePlayerVolumeChange(volume) {
    'use strict';
    if (youTubePlayerActive()) {
        if (volume === '+')
            youTubePlayer.setVolume(youTubePlayer.getVolume() + 1);
        else
            youTubePlayer.setVolume(youTubePlayer.getVolume() - 1);
    }
}

/**
 * Main
 */
(function () {
    'use strict';

    function init() {
        // Load YouTube library
        var tag = document.createElement('script');

        tag.src = 'https://www.youtube.com/iframe_api';

        var first_script_tag = document.getElementsByTagName('script')[0];

        first_script_tag.parentNode.insertBefore(tag, first_script_tag);

        setInterval(youTubePlayerDisplayInfos, 3);
    }


    if (window.addEventListener) {
        window.addEventListener('load', init);
    } else if (window.attachEvent) {
        window.attachEvent('onload', init);
    }
}());
