/* OpenProcessing Tweak of *@*http://www.openprocessing.org/sketch/1129*@* */
/* !do not delete the line above, required for linking your tweak if you upload again */
// import java.awt.Point;
// //import java.awt.Polygon;
// import java.awt.Rectangle;
// import java.awt.Dimension;

// import java.util.List;
// import java.util.LinkedList;
// import java.util.ArrayList;
// import java.util.Iterator;
// import java.util.ListIterator;
import { Minim } from "./minim"
import Sounds from "./Sounds"
import Game from './Game'

var minim;

var noSound = false;
var noHit = false;


//Game
var game = null;
//PFont
var fontA;
// Sounds
var sounds;

const EXPLODE_BIG = 2;
const EXPLODE_MEDIUM = 1;
const EXPLODE_SMALL = 0;

const sketch = (p:p5) => {
    p.keyPressed = () => {
        game.controller.keyPressed();
    }

    p.keyReleased = () => {
        game.controller.keyReleased();
    }

    p.mousePressed = () => {
        game.controller.mousePressed();
    }

    p.preload = () => {

    }

    p.setup = () => {
        p.createCanvas(800,675);
        p.frameRate(30);
        p.smooth();

        fontA = p.loadFont("data/CourierNew36.vlw");

        minim = new Minim();
        sounds = new Sounds();

        game = new Game();
        game.init(true);

        console.log("Game Started");
        console.log("Size = (" + p.width + ", " + p.height + ")");
    }

    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    }

    p.draw = () => {
        p.createCanvas(800,675);
        try {
            game.draw();
        }
        catch (e) {
            console.log(e);
        }
    }
}

const p:p5 = new p5(sketch);
