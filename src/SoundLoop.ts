import { Globals } from './Globals'

const FOREVER: number = -1

export class SoundLoop {
    channel: p5.SoundFile
    loops = FOREVER
    currentLoop: number = 0
    cue: number

    constructor(filename: string, loops: number = FOREVER) {
        this.channel = Globals.p.loadSound(filename)
        this.channel.onended(this._onEnd.bind(this))
        this.loops = loops
    }

    play() {
        if (Globals.noSound) {return}

        if (!this.channel.isPlaying()) {
            this.currentLoop = 0
            this.channel.play()
        }
    }

    _onEnd() {
        if (this.channel.isPlaying()) {
            this.currentLoop++;
            if (this.loops === FOREVER || (this.currentLoop < this.loops)) {
                this.channel.play()
            }
        }
    }

    stop() {
        this.channel.stop();
    }
}

export class SoundLoop {
    channel: p5.SoundFile
    loops = FOREVER
    currentLoop: number = 0
    cue: number
    filename: string

    constructor(filename: string, loops: number = FOREVER) {
        this.filename = filename
        this.channel = Globals.p.loadSound(filename)
        this.channel.onended(this._onEnd.bind(this))
        this.loops = loops
    }

    play() {
        if (Globals.noSound) {return}

        if (!this.channel.isPlaying()) {
            this.currentLoop = 0
            this.channel.play()
        }
    }

    _onEnd() {
        if (this.channel.isPlaying()) {
            this.currentLoop++;
            if (this.loops === FOREVER || (this.currentLoop < this.loops)) {
                this.channel.play()
            }
        }
    }

    stop() {
        this.channel.stop();
    }
}