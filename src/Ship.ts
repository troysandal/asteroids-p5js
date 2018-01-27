import FlyingObject from './FlyingObject'
import { Rectangle, Dimension, Point } from './Java'
import ExplodingShip from './ExplodingShip'
import Shot from './Shot'
import {Globals} from './Globals'

const SHIP_WIDTH:number = 21;
const SHIP_HEIGHT:number = 14;
const MAX_DX:number = 15;
const MAX_DY:number = 15;
const hyperspaceWait:number = 1.0 * 1000;
const hyperspaceSafeWH:Dimension = new Dimension(
    Math.round(1.5 * this.w), Math.round(1.5 * this.h));

export default class Ship extends FlyingObject {
    showThrust:boolean = false;
    inHyperspace:number = -1;

    constructor(x:number, y:number) {
        super(x, y, SHIP_WIDTH, SHIP_HEIGHT, 0, 0);
        this.dragX = this.dragY = 0.0075;
        this.angle = 90;
        this.applyDrag = true;
    }

    speedUp() {
        this.showThrust = true;
        this.thrust(0);
    }

    // not really used - just for play
    slowDown() {
        this.thrust(180);
    }

    thrust(direction:number) {
        let factor:number = 0.27;
        let boostX:number = factor * Math.cos(Globals.p.radians(direction + this.angle));
        let boostY:number = factor * -Math.sin(Globals.p.radians(direction + this.angle));

        //console.log("Slowing down from (" + dx + "," + dy + ") to (" + (boostX + dx) + "," + (boostY + dy) + ")");
        this.dx = Globals.p.constrain(this.dx += boostX, -MAX_DX, MAX_DX);
        this.dy = Globals.p.constrain(this.dy += boostY, -MAX_DY, MAX_DY);
    }

    hyperspace() {
        if (this.inHyperspace != -1) return;
        // find a new point on the screen that's safe for the ship
        console.log("--H Y P E R  S P A C E--");
        this.inHyperspace = Globals.p.millis();
    }

    /**
     * Of course we are different, we draw ourself at -w/2, -h/2 to keep rotation about our center.
     */
    intersects(other:FlyingObject):boolean  {
        if (this.inHyperspace != -1) return false;
        const r1:Rectangle = new Rectangle(
            Math.round(this.x - this.w/2),
            Math.round(this.y - this.h/2),
            Math.max(this.w, this.h), Math.max(this.w, this.h));
        const r2:Rectangle = new Rectangle(
            Math.round(other.x), Math.round(other.y),
            other.w, other.h);
        return r1.intersects(r2);
    }

    collide(other:FlyingObject, /*List*/ add) {
        super.collide(other, add);
        console.log("ship died");
        Globals.game.shipDied();
        console.log("Adding exploding ship");
        add.add(new ExplodingShip(this.x, this.y));
    }

    fire() {
        if (this.inHyperspace != -1) return;
        if (this.remove) return;

        // Here's where the tip of the ship is at.
        const sx:number = this.x + (this.w/2 + 2) * Math.cos(Globals.p.radians(this.angle));
        const sy:number = this.y - (this.w/2 + 2) * Math.sin(Globals.p.radians(this.angle));
        Globals.game.addObject(new Shot(sx, sy, this.dx, this.dy, this.angle));
    }

    drawAt(x:number, y:number) {
        this.x = x;
        this.y = y;

        this.draw();
    }



    draw() {
        if (this.inHyperspace != -1) {
            // Wait before ship returns
            if ((this.inHyperspace + hyperspaceWait) > Globals.p.millis()) {
                return;
            }

            // find a new point on the screen that's safe for the ship
            const newCenter:Point = Globals.game.findSafeZone(hyperspaceSafeWH);
            if (newCenter != null) {
                console.log("LEAVING HYPERSPACE @ " + newCenter);
                this.x = newCenter.x;
                this.y = newCenter.y;
                this.dx = this.dy = 0;
                this.inHyperspace = -1;
            }
            else {
                return;
            }
        }

        Globals.p.stroke(255);
        Globals.p.translate(this.x, this.y);
        Globals.p.rotate(2*Math.PI-Globals.p.radians(this.angle));
        Globals.p.translate(-this.w/2, -this.h/2);
        Globals.p.line(0, 0, this.w, this.h/2);
        Globals.p.line(this.w, this.h/2, 0, this.h);
        Globals.p.line(this.w * 0.1, this.h * 0.1, this.w*0.1, this.h - this.h*0.1);
        if (this.showThrust) {
            Globals.sounds.playThrust();
            this.showThrust = false;
            Globals.p.line(this.w * 0.1, this.h * 0.1 + 2, this.w*0.1 - this.w*0.2, (this.h - this.h*0.1) / 2);
            Globals.p.line(this.w * 0.1 - this.w*0.2, (this.h - this.h*0.1) / 2, this.w*0.1, this.h - this.h*0.1 - 2);
        }
    }
}