import FlyingObject from './FlyingObject'
import {Globals} from './Globals'

export default class Shot extends FlyingObject {
    speed:number = 10;
    time:number = 0.8 * Globals.p.frameRate();

    start:number = Globals.p.frameCount;

    /**
     * @param x      Shot point.
     * @param y      Shot point
     * @param dx     Ship trajectory.
     * @param dx     Ship trajectory.
     * @param angle  Ship angle in degrees.
     */
    constructor(x:number, y:number, dx:number, dy:number, angle:number) {
        super(x, y, 1, 1, 0, 0);
        this.dx = dx + this.speed * Math.cos(Globals.p.radians(angle));
        this.dy = dy + -this.speed * Math.sin(Globals.p.radians(angle));
        this.explodes = false;

        Globals.sounds.fire();
    }

    public update(it/*:ListIterator*/) {
        super.update(it);

        if (Globals.p.frameCount >= this.start + this.time)
            this.remove = true;
    }

    public draw() {
        /*
        stroke(255, 0, 0);
        fill(255, 0, 0);
        rectMode(CENTER);
        rect(x, y, 3, 3);
        */
        Globals.p.stroke(255);
        Globals.p.point(this.x, this.y);
    }
}
