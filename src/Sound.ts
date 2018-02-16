import { Globals } from './Globals'
import {times, each} from 'lodash'
import 'p5'
// This require is what gets p5.sound.js included
require('p5/lib/addons/p5.sound')


export class Sound {
    channels: p5.SoundFile[]

    constructor(filename:string, channelCount:number = 1) {
        this.channels = times(channelCount, () => Globals.p.loadSound(filename))
    }

    public play() {
        if (Globals.noSound) return;

        each(this.channels, (channel) => {
            if (!channel.isPlaying()) {
                channel.play()
                return false
            }
        })
    }

    public stop = () => {
        each(this.channels, (channel) => {
            if (channel.isPlaying()) {
                channel.stop;
            }
        })
    };
}