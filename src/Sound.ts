import { AudioPlayer } from './minim';
import { Globals } from './Globals'
import {times} from 'lodash'

export class Sound {
    channels: AudioPlayer[]

    constructor(filename:string, channelCount:number = 6) {
        this.channels = times(channelCount, (i) => new AudioPlayer(filename))
    }

    public play() {
        if (Globals.noSound) return;

        let which = -1;

        for (let i = 0; i < this.channels.length + 1; i++) {
            if (!this.channels[i].isPlaying()) {
                this.channels[i].cue(0);
                this.channels[i].play();
                break
            }
        }
    }

    public stop = () => { };
}