import { Minim } from "./minim"
import { Sound } from "./Sound"
import { SoundLoop } from "./SoundLoop"

const dS:number = 1000;
const dE:number = 250;
const N:number = 80;
const dR: number = (dS - dE) / N;

export class Sounds {
    inPlay: boolean = false;
    wait: number
    start: number
    sound: number = 0;

    boops:Sound[] = [new Sound ("data/low.wav"), new Sound("data/high.wav") ];
    shot:Sound  = new Sound("data/shot.wav", 6);
    explodeLow:Sound = new Sound("data/explode_low.wav");
    _explodeMedium:Sound = new Sound("data/explode_medium.wav");
    explodeHigh:Sound = new Sound("data/explode_high.wav");
    thrust:SoundLoop = new SoundLoop("data/thrust.wav", 1);
    smallShip:SoundLoop = new SoundLoop("data/smallship.wav");
    bigShip:SoundLoop = new SoundLoop("data/bigship.wav");

    killAllSounds() {
        this.boops[0].stop();
        this.boops[1].stop();
        this.shot.stop();
        this.thrust.stop();
        this.smallShip.stop();
        this.bigShip.stop();
        this.explodeLow.stop();
        this._explodeMedium.stop();
        this.explodeHigh.stop();
    }

    Sounds() {
        console.log("Sounds Start Level @" + this.wait + " wait");
    }

    fire() { this.shot.play(); }

    explode(size: number) {
        switch (size) {
            case EXPLODE_SMALL:
                this.explodeSmall();
                break;
            case EXPLODE_MEDIUM:
                this.explodeMedium();
                break;
            case EXPLODE_BIG:
            default:
                this.explodeBig();
        }
    }

    explodeSmall()  { this.explodeHigh.play(); }
    explodeMedium() { this._explodeMedium.play(); }
    explodeBig()    { this.explodeLow.play(); }

    startLevel() {
        this.inPlay = true;
        this.wait = dS;
        this.start = p.millis();
        console.log("dS = " + dS);
        console.log("Sounds Start Level @" + this.wait + " wait, dS = " + dS);
    }

    playBoop() {
        if (!this.inPlay) return;

        const now = p.millis();

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
    stopThrust() { this.thrust.stop(); }
}
