/* OpenProcessing Tweak of *@*http://www.openprocessing.org/sketch/1129*@* */
/* !do not delete the line above, required for linking your tweak if you upload again */
import { Minim } from "./minim"
import Sounds from "./Sounds"
import Game from './Game'
import {Globals} from './Globals'
import 'p5'
import CourierNewPath from "./assets/CourierNew36.vlw"

const sketch = (p:p5) => {
    Globals.p = p

    p.keyPressed = () => {
        Globals.game.controller.keyPressed();
    }

    p.keyReleased = () => {
        Globals.game.controller.keyReleased();
    }

    p.mousePressed = () => {
        Globals.game.controller.mousePressed();
    }

    p.preload = () => {

    }

    p.setup = () => {
        p.createCanvas(800,675);
        p.frameRate(30);
        p.smooth();

        // TODO
        // Globals.fontA = p.loadFont('./' + CourierNewPath);

        Globals.noSound = true;
        Globals.minim = new Minim();
        Globals.sounds = new Sounds();

        Globals.game = new Game();
        Globals.game.init(true);

        console.log("Game Started");
        console.log("Size = (" + p.width + ", " + p.height + ")");
    }

    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    }

    p.draw = () => {
        try {
            // frameRate() === 0 in 1st frame
            if (p.frameCount > 1)  {
                Globals.game.draw();
            }
        }
        catch (e) {
            console.log(e);
        }
    }
}

new p5(sketch);
