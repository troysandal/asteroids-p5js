"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Sound_1 = require("./Sound");
var SoundLoop_1 = require("./SoundLoop");
var dS = 1000;
var dE = 250;
var N = 80;
var dR = (dS - dE) / N;
var Sounds = (function () {
    function Sounds() {
        this.inPlay = false;
        this.sound = 0;
        this.boops = [new Sound_1.Sound("data/low.wav"), new Sound_1.Sound("data/high.wav")];
        this.shot = new Sound_1.Sound("data/shot.wav", 6);
        this.explodeLow = new Sound_1.Sound("data/explode_low.wav");
        this._explodeMedium = new Sound_1.Sound("data/explode_medium.wav");
        this.explodeHigh = new Sound_1.Sound("data/explode_high.wav");
        this.thrust = new SoundLoop_1.SoundLoop("data/thrust.wav", 1);
        this.smallShip = new SoundLoop_1.SoundLoop("data/smallship.wav");
        this.bigShip = new SoundLoop_1.SoundLoop("data/bigship.wav");
    }
    Sounds.prototype.killAllSounds = function () {
        this.boops[0].stop();
        this.boops[1].stop();
        this.shot.stop();
        this.thrust.stop();
        this.smallShip.stop();
        this.bigShip.stop();
        this.explodeLow.stop();
        this._explodeMedium.stop();
        this.explodeHigh.stop();
    };
    Sounds.prototype.Sounds = function () {
        console.log("Sounds Start Level @" + this.wait + " wait");
    };
    Sounds.prototype.fire = function () { this.shot.play(); };
    Sounds.prototype.explode = function (size) {
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
    };
    Sounds.prototype.explodeSmall = function () { this.explodeHigh.play(); };
    Sounds.prototype.explodeMedium = function () { this._explodeMedium.play(); };
    Sounds.prototype.explodeBig = function () { this.explodeLow.play(); };
    Sounds.prototype.startLevel = function () {
        this.inPlay = true;
        this.wait = dS;
        this.start = p.millis();
        console.log("dS = " + dS);
        console.log("Sounds Start Level @" + this.wait + " wait, dS = " + dS);
    };
    Sounds.prototype.playBoop = function () {
        if (!this.inPlay)
            return;
        var now = p.millis();
        if (now - this.start > this.wait) {
            this.start = now;
            this.wait = Math.max(this.wait - dR, dE);
            this.boops[this.sound].play();
            this.sound = (this.sound + 1) % 2;
        }
    };
    Sounds.prototype.stopGame = function () {
        this.inPlay = false;
    };
    Sounds.prototype.playThrust = function () { this.thrust.play(); };
    Sounds.prototype.stopThrust = function () { this.thrust.stop(); };
    return Sounds;
}());
exports.Sounds = Sounds;
//# sourceMappingURL=Sounds.js.map