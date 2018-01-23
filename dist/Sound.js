"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var minim_1 = require("./minim");
var Sound = (function () {
    function Sound(filename, channelCount) {
        if (channelCount === void 0) { channelCount = -1; }
        this.channels = new minim_1.AudioPlayer[6];
        this.stop = function () { };
        if (channelCount == -1)
            channelCount = Sound.DEFAULT_CHANNELS;
        this.init(filename, channelCount);
    }
    Sound.prototype.init = function (filename, channelCount) {
        this.channels = new minim_1.AudioPlayer[channelCount];
        for (var i = 0; i < this.channels.length; i++) {
            this.channels[i] = minim.loadFile(filename);
        }
    };
    Sound.prototype.play = function () {
        if (noSound)
            return;
        var which = -1;
        for (var i = 0; i < this.channels.length; i++) {
            if (!this.channels[i].isPlaying()) {
                this.channels[i].cue(0);
                which = i;
            }
        }
        if (which != -1) {
            this.channels[which].play();
        }
    };
    Sound.DEFAULT_CHANNELS = 6;
    return Sound;
}());
exports.Sound = Sound;
//# sourceMappingURL=Sound.js.map