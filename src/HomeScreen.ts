import DisplayObject from './DisplayObject'
import Game from './Game'
import {Globals} from './Globals'

export default class HomeScreen extends DisplayObject {
    start:number

    constructor() {
        super()
        this.start = Globals.p.frameCount;
    }

    draw() {
        // Set the font and its size (in units of pixels)
        Globals.p.textSize(48)
        // Globals.p.textFont(Globals.fontA);
        //Globals.p.textAlign(CENTER);

        Globals.p.stroke(255);
        Globals.p.fill(255);
        Globals.p.text("ASTEROIDS", Globals.p.width/2, Globals.p.height * .4, 0, 0);

        Globals.p.stroke(255);
        Globals.p.fill(255);
        Globals.p.textSize(24)
        // Globals.p.textFont(Globals.fontA);
        Globals.p.text("Click or Press A Key To Play", Globals.p.width/2, Globals.p.height * .6, 0, 0);

        //textFont(Globals.fontA, 16);
        //text("A T&T Production", width/2, height - 20);
    }

    update(it/*:ListIterator*/) {
        if (Globals.p.frameCount > this.start + 5 * 60 * Globals.p.frameRate()) {
            this.start = Globals.p.frameCount;
            Globals.game = new Game();
            Globals.game.init(true);
        }
    }
}
