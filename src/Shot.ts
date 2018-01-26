import FlyingObject from './FlyingObject'

const speed:number = 10;
const time:number = 0.8 * p.frameRate();

export default class Shot extends FlyingObject {
    start:number = p.frameCount;

    /**
     * @param x      Shot point.
     * @param y      Shot point
     * @param dx     Ship trajectory.
     * @param dx     Ship trajectory.
     * @param angle  Ship angle in degrees.
     */
    constructor(x:number, y:number, dx:number, dy:number, angle:number) {
        super(x, y, 1, 1, 0, 0);
        this.dx = dx + speed * Math.cos(p.radians(angle));
        this.dy = dy + -speed * Math.sin(p.radians(angle));
        this.explodes = false;

        sounds.fire();
    }

    public update(it/*:ListIterator*/) {
        super.update(it);

        if (p.frameCount >= this.start + time)
            this.remove = true;
    }

    public draw() {
        /*
        stroke(255, 0, 0);
        fill(255, 0, 0);
        rectMode(CENTER);
        rect(x, y, 3, 3);
        */
        p.stroke(255);
        p.point(this.x, this.y);
    }
}
