import { Globals } from './Globals'
import {times} from 'lodash'
import 'p5'
import 'p5/lib/addons/p5.sound'
// This require is what gets p5.sound.js included
require('p5/lib/addons/p5.sound')


export class Sound {
    channels: p5.SoundFile[]

    constructor(filename:string, channelCount:number = 6) {
        this.channels = times(channelCount, (i) => Globals.p.loadSound(filename))
    }

    public play() {
        if (Globals.noSound) return;

        let which = -1;

        for (let i = 0; i < this.channels.length + 1; i++) {
            if (!this.channels[i].isPlaying()) {
                this.channels[i].play();
                break
            }
        }
    }

    public stop = () => { };
}