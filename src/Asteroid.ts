import FlyingObject from './FlyingObject'
import {Next, InitParams} from './AsteroidFactory'
import {Polygon} from './Java'
import {CLOSE} from './Globals'

export default class Asteroid extends FlyingObject {
    vertices:Polygon;
    next:Next;
    explodeSound:number;

    constructor(options:InitParams, vertices:Polygon, points:number, next:Next, explodeSound:number) {
        super(options.x, options.y, vertices.getBounds().width, vertices.getBounds().height, options.dx, options.dy);
        this.vertices = vertices;
        this.points = points;
        this.next = next;
        this.explodeSound = explodeSound;
    }

    public intersects(other:FlyingObject):boolean {
        if (other instanceof Asteroid) return false;
        return super.intersects(other);
    }

    public collide(other:FlyingObject, add/*:List*/) {
        super.collide(other, add);

        sounds.explode(this.explodeSound);
        //console.log("blowing up asteroid sized" + this.explodeSound);

        if (this.next != null)
            this.next.go(this, add);
    }

    public draw() {
        p.stroke(255);
        p.noFill();
        p.translate(this.x, this.y);
        p.beginShape();
        for (let i:number = 0 ; i < this.vertices.npoints ; i++) {
            p.vertex(this.vertices.xpoints[i], this.vertices.ypoints[i]);
        }
        p.endShape(CLOSE);
    }
}
