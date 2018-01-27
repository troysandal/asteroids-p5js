import DisplayObject from './DisplayObject'
import {Globals} from './Globals'

/**
 * A display object with a fixed lifetime.
 */
const seconds:number = 1;

export default class NewGame extends DisplayObject {
    end:number;


    constructor() {
        super()
        this.end = Math.round(Globals.p.frameCount + seconds * Globals.p.frameRate());
    }

    update(it/*:ListIterator*/) {
        if (Globals.p.frameCount >= this.end && !this.remove) {
            this.remove = true;
            Globals.game.startNewLevel(it);
        }
    }

    draw() {
    }
}
