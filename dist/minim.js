"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Minim = (function () {
    function Minim() {
    }
    Minim.prototype.loadFile = function (str) {
        return new AudioPlayer(str);
    };
    return Minim;
}());
exports.Minim = Minim;
var AudioPlayer = (function () {
    function AudioPlayer(str) {
        this.loaded = false;
        this.looping = false;
        if (!!document.createElement('audio').canPlayType) {
            this.audio = document.createElement('audio');
            this.audio.addEventListener('ended', function () {
                if (this.looping) {
                    this.currentTime = 0;
                    this.play();
                }
            }, false);
            this.audio.preload = 'auto';
            this.audio.autobuffer = true;
            if (canPlayOgg()) {
                this.audio.src = str.split(".")[0] + ".ogg";
            }
            else if (canPlayMp3()) {
                this.audio.src = str;
            }
            this.loaded = true;
        }
    }
    AudioPlayer.prototype.play = function () {
        if (!this.loaded) {
            var local = this;
            setTimeout(function () { local.play(); }, 50);
            return;
        }
        this.audio.play();
    };
    ;
    AudioPlayer.prototype.loop = function () {
        if (!this.loaded) {
            var local = this;
            setTimeout(function () { local.loop(); }, 50);
            return;
        }
        this.looping = true;
        this.audio.play();
    };
    ;
    AudioPlayer.prototype.pause = function () {
        if (!this.loaded) {
            return;
        }
        this.audio.pause();
    };
    ;
    AudioPlayer.prototype.rewind = function () {
        if (!this.loaded) {
            return;
        }
        if (this.audio.currentTime) {
            this.audio.currentTime = 0;
        }
    };
    ;
    AudioPlayer.prototype.position = function () {
        if (!this.loaded) {
            return -1;
        }
        if (this.audio.currentTime) {
            return this.audio.currentTime * 1000;
        }
        return -1;
    };
    ;
    AudioPlayer.prototype.isPlaying = function () {
        return false;
    };
    AudioPlayer.prototype.cue = function (position) {
        if (!this.loaded) {
            return;
        }
        if (this.audio.currentTime) {
            this.audio.currentTime = position / 1000;
        }
    };
    ;
    AudioPlayer.prototype.mute = function () {
        this.audio.volume = 0.0;
    };
    ;
    AudioPlayer.prototype.unmute = function () {
        this.audio.volume = 1.0;
    };
    ;
    return AudioPlayer;
}());
exports.AudioPlayer = AudioPlayer;
function canPlayOgg() {
    var a = document.createElement('audio');
    return !!(a.canPlayType && a.canPlayType('audio/ogg; codecs="vorbis"').replace(/no/, ''));
}
function canPlayMp3() {
    var a = document.createElement('audio');
    return !!(a.canPlayType && a.canPlayType('audio/mpeg;').replace(/no/, ''));
}
//# sourceMappingURL=minim.js.map