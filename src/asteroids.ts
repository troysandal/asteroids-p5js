import Sounds from "./Sounds"
import Game from './Game'
import {Globals} from './Globals'
import 'p5'

const sketch = (p:p5) => {
    Globals.p = p

    p.keyPressed = () => {
        if (Globals.game) {
            Globals.game.controller.keyPressed();
        }
    }

    p.keyReleased = () => {
        if (Globals.game) {
            Globals.game.controller.keyReleased();
        }
    }

    p.mousePressed = () => {
        if (Globals.game) {
            Globals.game.controller.mousePressed();
        }
    }

    p.preload = () => {
        p.soundFormats('mp3');
        Globals.sounds = new Sounds();

        const MainFont = require("./assets/Hyperspace.otf").default;
        Globals.fontA = p.loadFont(MainFont);
        }

    p.setup = () => {
        p.createCanvas(800,600);
        p.frameRate(30);
        p.smooth();

        Globals.noSound = false;

        Globals.game = new Game();
        Globals.game.init(true);

        console.log("Game Started");
        console.log("Size = (" + p.width + ", " + p.height + ")");
    }

    p.windowResized = () => {
        //p.resizeCanvas(p.windowWidth, p.windowHeight);
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
