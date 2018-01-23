/**
 * Minim-emulation code by Daniel Hodgin
 */

// wrap the P5 Minim sound library classes
export class Minim {
  loadFile(str) {
    return new AudioPlayer(str);
  }
}

// Browser Audio API
export class AudioPlayer {
  loaded:boolean = false;
  looping:boolean = false;
  audio: any;

  constructor(str) {
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
      } else if (canPlayMp3()) {
        this.audio.src = str;
      }
      this.loaded = true;
    }
  }

  play() {
    if (!this.loaded) {
      var local = this;
      setTimeout(function() { local.play(); }, 50);
      return;
    }
    this.audio.play();
  };
  loop () {
    if (!this.loaded) {
      var local = this;
      setTimeout(function() { local.loop(); }, 50);
      return;
    }
    //this.audio.loop = 'loop';
    this.looping = true;
    this.audio.play();
  };
  pause () {
    if (!this.loaded) {
      return;
    }
    this.audio.pause();
  };
  rewind () {
    if (!this.loaded) {
      return;
    }
    // rewind the sound to start
    if(this.audio.currentTime) {
      this.audio.currentTime = 0;
    }
  };
  position() {
    if (!this.loaded) {
      return -1;
    }
    if(this.audio.currentTime) {
      return this.audio.currentTime * 1000;
    }
    return -1;
  };
  isPlaying():boolean {
    return false;
  }
  cue(position) {
    if (!this.loaded) {
      return;
    }
    if(this.audio.currentTime) {
      this.audio.currentTime = position / 1000;
    }
  };
  mute() {
    this.audio.volume = 0.0;
  };
  unmute() {
    this.audio.volume = 1.0;
  };
}

function canPlayOgg() {
  var a = document.createElement('audio');
  return !!(a.canPlayType && a.canPlayType('audio/ogg; codecs="vorbis"').replace(/no/, ''));
}

function canPlayMp3() {
  var a = document.createElement('audio');
  return !!(a.canPlayType && a.canPlayType('audio/mpeg;').replace(/no/, ''));
}