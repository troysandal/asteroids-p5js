import { AudioPlayer } from './minim';

export class Sound {
    static DEFAULT_CHANNELS = 6;

    constructor(filename, channelCount = -1) {
        if (channelCount == -1)
            channelCount = Sound.DEFAULT_CHANNELS;

        this.init(filename, channelCount);
    }

    channels: AudioPlayer[]  = new AudioPlayer[6];

    init(filename, channelCount) {
        this.channels = new AudioPlayer[channelCount];

        for (let i = 0 ; i < this.channels.length ; i++) {
            this.channels[i] = minim.loadFile(filename);
        }
    }

    play() {
        if (noSound) return;

        let which = -1;

        for (let i = 0; i < this.channels.length; i++) {
            if (!this.channels[i].isPlaying()) {
                this.channels[i].cue(0);
                which = i; // Find a free voice
            }
        }

        // If a voice is available and selected, play it
        if (which != -1) {
            //this.channels[which].sampleRate(44100, false);
            this.channels[which].play();
        }
    }

    stop = () => { };
}