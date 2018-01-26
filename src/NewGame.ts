import DisplayObject from './DisplayObject'

/**
 * A display object with a fixed lifetime.
 */
const seconds:number = 1;

export default class NewGame extends DisplayObject {
    end:number;


    constructor() {
        super()
        this.end = Math.round(p.frameCount + seconds * p.frameRate());
    }

    update(it/*:ListIterator*/) {
        if (p.frameCount >= this.end && !this.remove) {
            this.remove = true;
            game.startNewLevel(it);
        }
    }

    draw() {
    }
}
