import DisplayObject from './DisplayObject'
import {Globals} from './Globals'

export default class ExplodingShip extends DisplayObject {
    endAt:number = Globals.p.frameCount + (Globals.p.frameRate() * 2);
    x:number
    y:number;

    constructor(x:number, y:number) {
        super()
        this.x = x;
        this.y = y;
    }

    update(it/*:ListIterator*/) {
        if (Globals.p.frameCount >= this.endAt) {
            Globals.game.newShip(it);
            this.remove = true;
            return;
        }
    }
    public draw() {
        const w:number = 20
        const h:number = 20;

        Globals.p.stroke(255);
        Globals.p.translate(this.x - 20/2, this.y - 20/2);
        Globals.p.line(0, 0, w/2, 20);
        Globals.p.line(w/2, 0, 20, h/2);
    }
}
