import DisplayObject from './DisplayObject'

const lifetime:number = 1;  // Lifetime in seconds

/**
 * All explosions look like a little puff of dust extending out from the center of what
 * exploded.  You can choose a size from small to large.
 */
export default class Explosion extends DisplayObject {
    x:number
    y:number
    //private
    end:number;
    pts = [ [ 0, 1, 0 ], [ 90, 2, 0 ], [ 180, 1, 0 ], [ 250, 2, 0 ] ];

    constructor(x:number, y:number) {
        super();
        this.x = x;
        this.y = y;
        this.end = p.frameCount + p.frameRate() * lifetime;

        // Generate particles velocities.
    }

    update(/*ListIterator*/ it) {
        for (let i:number = 0 ; i < this.pts.length ; i++)
            this.pts[i][2] += this.pts[i][1];

        if (p.frameCount >= this.end) {
            this.remove = true;
        }
    }

    draw() {
        p.translate(this.x, this.y);
        p.stroke(255);

        for (let i:number = 0 ; i < this.pts.length ; i++) {
            p.rotate(p.radians(this.pts[i][0]));
            p.point(this.pts[i][2], 0);
        }
    }
}
