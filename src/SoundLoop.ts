import { AudioPlayer } from './minim';
import { Globals } from './Globals'

const FOREVER: number = -1;

export class SoundLoop {
    channel: AudioPlayer;
    loops = FOREVER;

    constructor(filename: string, loops: number = FOREVER) {
        this.init(filename, loops);
    }

    init(filename: string, loops: number) {
        this.channel = Globals.minim.loadFile(filename);
        //channel.smoothPan = true;
        this.loops = loops;
    }

    play() {
        if (Globals.noSound) return;

        if (this.channel.isPlaying()) {
            //if (loops != FOREVER) {
            //    channel.loop(channel.loopCount() + 1);
            //}
            return;
        }
        // channel.play();

        if (this.loops == FOREVER) {
            this.channel.loop();
        }
        else {
            // TODO : loop needs to take # of loops (or do we even use this?)
            this.channel.loop(/*this.loops*/);
        }
    }

    stop() {
        if (this.loops != FOREVER) {
            return;
        }
        this.channel.pause();
        this.channel.cue(0);
    }
}