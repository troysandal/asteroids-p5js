// TODO : I think this file *might* have made sense early on but
// all this logic should be moved into the classes that know when/why
// to play sound.

import { Sound } from "./Sound"
import { SoundLoop } from "./SoundLoop"
import { Globals, EXPLODE_BIG, EXPLODE_MEDIUM, EXPLODE_SMALL} from './Globals'

const LOW_MP3 = require("./assets/low.mp3").default;
const HIGH_MP3 = require("./assets/high.mp3").default;
const SHOT_MP3 = require("./assets/shot.mp3").default;
const EXPLODE_LOW_MP3 = require("./assets/explode_low.mp3").default;
const EXPLODE_MEDIUM_MP3 = require("./assets/explode_medium.mp3").default;
const EXPLODE_HIGH_MP3 = require("./assets/explode_high.mp3").default;
const THRUST_MP3 = require("./assets/thrust.mp3").default;
const SMALLSHIP_MP3 = require("./assets/smallship.mp3").default;
const BIGSHIP_MP3 = require("./assets/bigship.mp3").default;

const dS:number = 1000;
const dE:number = 250;
const N:number = 80;
const dR: number = (dS - dE) / N;

export default class Sounds {
    inPlay: boolean = false;
    wait: number
    start: number
    sound: number = 0;

    boops:Sound[] = [new Sound (LOW_MP3), new Sound(HIGH_MP3) ];
    shot:Sound  = new Sound(SHOT_MP3, 6);
    explodeBig:Sound = new Sound(EXPLODE_LOW_MP3);
    explodeMedium:Sound = new Sound(EXPLODE_MEDIUM_MP3);
    explodeSmall:Sound = new Sound(EXPLODE_HIGH_MP3);
    thrust:Sound = new Sound(THRUST_MP3, 1);
    smallShip:SoundLoop = new SoundLoop(SMALLSHIP_MP3);
    bigShip:SoundLoop = new SoundLoop(BIGSHIP_MP3);

    killAllSounds() {
        this.boops[0].stop();
        this.boops[1].stop();
        this.shot.stop();
        this.thrust.stop();
        this.smallShip.stop();
        this.bigShip.stop();
        this.explodeBig.stop();
        this.explodeMedium.stop();
        this.explodeSmall.stop();
    }

    Sounds() {
        console.log("Sounds Start Level @" + this.wait + " wait");
    }

    fire() { this.shot.play(); }

    explode(size: number) {
        // TODO: Sounds.ts shouldn't knows anything about the size of asteroid
        switch (size) {
            case EXPLODE_SMALL:
                this.explodeSmall.play();
                break;
            case EXPLODE_MEDIUM:
                this.explodeMedium.play();
                break;
            case EXPLODE_BIG:
            default:
                this.explodeBig.play();
        }
    }

    startLevel() {
        this.inPlay = true;
        this.wait = dS;
        this.start = Globals.p.millis();
        console.log("dS = " + dS);
        console.log("Sounds Start Level @" + this.wait + " wait, dS = " + dS);
    }

    playBoop() {
        if (!this.inPlay) return;

        const now = Globals.p.millis();

        if (now - this.start > this.wait) {
            this.start = now;
            this.wait = Math.max(this.wait - dR, dE);
            this.boops[this.sound].play();
            this.sound = (this.sound + 1) % 2;
        }
    }

    stopGame() {
        this.inPlay = false;
    }

    playThrust() { this.thrust.play(); }
}
