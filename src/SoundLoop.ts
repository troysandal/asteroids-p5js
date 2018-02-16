import { Globals } from './Globals'

const FOREVER: number = -1

export class SoundLoop {
    channel: p5.SoundFile

    constructor(filename: string) {
        this.channel = Globals.p.loadSound(filename)
    }

    play() {
        if (Globals.noSound) {return}

        if (!this.channel.isPlaying()) {
            this.channel.loop()
        }
    }

    stop() {
        this.channel.stop();
    }
}