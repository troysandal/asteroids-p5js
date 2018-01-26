import DisplayObject from './DisplayObject'

export default class ExplodingShip extends DisplayObject {
    endAt:number = p.frameCount + (p.frameRate() * 2);
    x:number
    y:number;

    constructor(x:number, y:number) {
        super()
        this.x = x;
        this.y = y;
    }

    update(it/*:ListIterator*/) {
        if (p.frameCount >= this.endAt) {
            game.newShip(it);
            this.remove = true;
            return;
        }
    }
    public draw() {
        const w:number = 20
        const h:number = 20;

        p.stroke(255);
        p.translate(this.x - 20/2, this.y - 20/2);
        p.line(0, 0, w/2, 20);
        p.line(w/2, 0, 20, h/2);
    }
}
