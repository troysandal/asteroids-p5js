"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var minim_1 = require("./minim");
var Sounds_1 = require("./Sounds");
var minim;
var noSound = false;
var noHit = false;
var game = null;
var fontA;
var sounds;
var EXPLODE_BIG = 2;
var EXPLODE_MEDIUM = 1;
var EXPLODE_SMALL = 0;
var sketch = function (p) {
    p.keyPressed = function () {
        game.controller.keyPressed();
    };
    p.keyReleased = function () {
        game.controller.keyReleased();
    };
    p.mousePressed = function () {
        game.controller.mousePressed();
    };
    p.preload = function () {
    };
    p.setup = function () {
        p.createCanvas(800, 675);
        p.frameRate(30);
        p.smooth();
        fontA = p.loadFont("data/CourierNew36.vlw");
        minim = new minim_1.Minim();
        sounds = new Sounds_1.Sounds();
        game = new Game();
        game.init(true);
        console.log("Game Started");
        console.log("Size = (" + p.width + ", " + p.height + ")");
    };
    p.windowResized = function () {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    };
    p.draw = function () {
        p.createCanvas(800, 675);
        try {
            game.draw();
        }
        catch (e) {
            console.log(e);
        }
    };
};
var p = new p5(sketch);
//# sourceMappingURL=asteroids.js.map