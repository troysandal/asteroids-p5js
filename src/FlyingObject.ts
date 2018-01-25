import DisplayObject from './DisplayObject'
import { Rectangle } from './Java'
import Explosion from './Explosion'

const DRAG_X:number = 0.02
const DRAG_Y:number = 0.02
const da:number = 7.5

export default class FlyingObject extends DisplayObject {
    // protected
    dx:number = 0
    dy:number = 0
    x:number = 0
    y:number = 0
    w:number = 0
    h:number = 0
    angle:number = 0
    dragX:number
    dragY:number
    applyDrag:boolean = false
    points:number = 0
    explodes:boolean = true

    constructor(x:number, y:number, w:number, h:number, dx:number, dy:number) {
        super();
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.dx = dx;
        this.dy = dy;
        this.dragX = DRAG_X;
        this.dragY = DRAG_Y;
    }

    /**
     * Update the object by moving it along it's vector.
     */
    update(/*ListIterator*/ it) {
        this.x += this.dx;

        if (this.x > p.width)
            this.x = -this.w;
        else if (this.x < -this.w)
            this.x = p.width;

        this.y += this.dy;

        if (this.y > p.height) {
            this.y = -this.h;
        } else if (this.y < -this.h) {
            this.y = p.height;
        }

        // Put some drag on the ship.
        if (this.applyDrag) {
            this.dx = this.drag(this.dx, this.dragX);
            this.dy = this.drag(this.dy, this.dragY);
        }
    }

    intersects(other:FlyingObject):boolean {
        const r1:Rectangle = new Rectangle(this.x, this.y, this.w, this.h);
        const r2:Rectangle = new Rectangle(other.x, other.y, other.w, other.h);
        return r1.intersects(r2);
    }

    collide(other:FlyingObject, /* List */ add) {
        //console.log(this.getClass().getName() + " collided with a " + other.getClass().getName());
        this.remove = true;

        const oldScore:number = game.getScore();
        const newScore:number = game.addPoints(this.points);

        // Give a new ship at 10K, then every 25K aftewards.

        if ((oldScore < 10000 && newScore >= 10000)) {
            console.log("NEW SHIP 10,000");
            game.ships++;
        }
        else if ( (newScore > 10000 && ((oldScore % 25000) > (newScore % 25000))) ) {
            console.log("NEW SHIP 25,000");
            game.ships++;
        }

        if (this.explodes) {
            add.add(new Explosion(this.x, this.y));
        }
    }

    drag(d:number, drag:number):number {
        if (d == 0) return d;

        // Bleed off a percent
        const reduceBy:number = Math.abs(drag * d);

        let result:number = (d > 0) ? p.constrain(d - reduceBy, 0, d) : p.constrain(d + reduceBy, d, 0);
        if (Math.abs(p.frameRate() * result) < 1) {
            result = 0;
        }
        //console.log("Slowing " + d + " to " + result + " == " + frameRate * result);
        return result;
    }

    rotateLeft() {
        this.angle = (this.angle + da) % 360;
        //console.log("New angle is " + angle);
    }
    rotateRight() {
        this.angle -= da;
        if (this.angle < 0) this.angle = (360 + this.angle);
        //console.log("New angle is " + angle);
    }

    width():number {
        return this.w;
    }

    rect():Rectangle {
        return new Rectangle(this.x, this.y, this.w, this.h);
    }
}