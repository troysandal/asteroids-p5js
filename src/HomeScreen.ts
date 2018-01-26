import DisplayObject from './DisplayObject'
import Game from './Game'

export default class HomeScreen extends DisplayObject {
    start:number

    constructor() {
        super()
        this.start = p.frameCount;
    }

    draw() {
        // Set the font and its size (in units of pixels)
        p.textSize(48)
        p.textFont(fontA);
        //p.textAlign(CENTER);

        p.stroke(255);
        p.fill(255);
        p.text("ASTEROIDS", p.width/2, p.height * .4, 0, 0);

        p.stroke(255);
        p.fill(255);
        p.textSize(24)
        p.textFont(fontA);
        p.text("Click or Press A Key To Play", p.width/2, p.height * .6, 0, 0);

        //textFont(fontA, 16);
        //text("A T&T Production", width/2, height - 20);
    }

    update(it/*:ListIterator*/) {
        if (p.frameCount > this.start + 5 * 60 * p.frameRate()) {
            this.start = p.frameCount;
            game = new Game();
            game.init(true);
        }
    }
}