import FlyingObject from './FlyingObject'
import {Polygon, randomRangeInt, Rectangle} from './Java'
import Shot from './Shot'
import {CLOSE} from './Globals'
/**
 * Base class for enemy ships.
 *
 * 200 for big
 * 1000 for small
 */
export default class EnemyShip extends FlyingObject {
    private vertices:Polygon;
    private shot:Shot = null;
    private radius:number;
    private savedDY:number = 0;
    private lastShot:number = 0;
    private shotDelay:number = 1;
    private lastDirChange:number = 0;
    private dirChangeDelay:number = 1.5;
    private big:boolean = false;
    private targetHero:number = 0;
    private targetHeroEvery:number = 3;

    constructor(big:boolean) {
        super(0, 0, 0, 0, 0, 0);

        this.big = big;

        const left:number = 0;
        const right:number = p.width - left;
        const top:number = p.height/10;
        const bottom:number = p.height - top;
        const speed:number = big ? 1.5 : 2;

        switch (randomRangeInt(1, 4)) {
            case 1: this.x = left;  this.y = top;    this.dx =  1; break;
            case 2: this.x = left;  this.y = bottom; this.dx =  1; break;
            case 3: this.x = right; this.y = top;    this.dx = -1; break;
            case 4: this.x = right; this.y = bottom; this.dx = -1; break;
        }

        this.dx = this.dx * speed;
        this.dy = 0;

        this.savedDY = speed;

        this.shotDelay = big ? 1 : 0;
        this.lastShot = p.frameCount;

        this.dirChangeDelay = big ? 2.5 : 2;
        this.lastDirChange = p.frameCount;

        // This looks crummy for small ones, redo, the multiple just isn't good
        // Also make this into a factory - too costly to redo each time.
        this.vertices = game.asteroidFactory.createPolygon([
            [40, 0], [60, 0], [70, 20], [100, 40], [70, 60], [30, 60], [0, 40], [30, 20]
        ]);

        if (big) {
            this.points = 200;
            this.vertices = game.asteroidFactory.scaleAsteroid(this.vertices, 40);
        }
        else {
            this.points = 1000;
            this.vertices = game.asteroidFactory.scaleAsteroid(this.vertices, 20);
        }

        this.w = this.vertices.getBounds().width;
        this.h = this.vertices.getBounds().height;
        this.radius = Math.round(Math.sqrt(this.h * this.h + this.w * this.w) / 2 + 1);

        this.startSounds();
    }

    public startSounds() {
        if (this.big)
            sounds.bigShip.play();
        else
            sounds.smallShip.play();
    }

    public stopSounds() {
        if (this.big)
            sounds.bigShip.stop();
        else
            sounds.smallShip.stop();
    }

    public collide(other:FlyingObject, add/*:List*/) {
        super.collide(other, add);
        sounds.explode(EXPLODE_MEDIUM);
        this.stopSounds();

        game.enemy = null;

        console.log("Enemy exploded!");

        // HACK : Remove after testing
        //game.enemy = new EnemyShip(true);
        //game.addObject(game.enemy);
    }

    update(it/*:ListIterator*/) {
        // If ship is off screen yank it.
        if ( ((this.x + this.dx) > p.width) || ((this.x + this.dx) < -this.w) ) {
            console.log("Enemy off screen");
            this.stopSounds();
            this.remove = true;
            game.enemy = null;
            return;
        }

        // Move the ship up, down, or keep it level every x% of the screen.
           if (p.frameCount > (this.lastDirChange + this.dirChangeDelay * p.frameRate())) {
            this.lastDirChange = p.frameCount;
               //console.log("p.frameCount=" + p.frameCount + "," + lastDirChange + "," + dirChangeDelay + "," + p.frameRate());
               switch(randomRangeInt(0, 100) % 3) {
                   case 0: this.dy = this.savedDY; break;
                   case 1: this.dy = 0; break;
                   case 2: this.dy = -this.savedDY; break;
               }
           }

        // Update it
        super.update(it);

        if (this.shot == null || this.shot.remove) {
            this.shot = null;

            // Wait a bit before firing
            if (p.frameCount > (this.lastShot + this.shotDelay * p.frameRate())) {
                this.fire(it);
            }
        }
    }

    private fire(it/*:ListIterator*/) {
        this.lastShot = p.frameCount;
        //console.log("Enemy shot fired!");

        // small ship shoots right at our hero every 3rd shot
        if (!this.big) {
            this.targetHero = (this.targetHero + 1) % this.targetHeroEvery;
        }

        let l:number = this.x
        let t:number = this.y
        let a:number = 135

        if (!this.big && this.targetHero == 0) {
            const r:Rectangle = game.ship.rect();
            const d:Rectangle = this.rect();
            //console.log("ship is  at " + r.toString() + ", enemy at " + d.toString());
            d.translate(Math.round(-r.x), Math.round(-r.y))
            //console.log("ship is  NOW at " + r.toString() + ", enemy at " + d.toString());
            p.translate(r.x, r.y);
            a = p.degrees(Math.atan2(d.y, -d.x));
            p.translate(-r.x, -r.y);
        }
        else {
            a = randomRangeInt(0, 360);
        }

        l = this.x + this.w/2 + this.radius * Math.cos(p.radians(a));
        t = this.y + this.h/2 - this.radius * Math.sin(p.radians(a));

        console.log("Shot = " + a + " @ " + l + ", " + t);

        this.shot = new Shot(l, t, this.dx, this.dy, a);
        it.add(this.shot);
    }

    draw() {
        p.stroke(255);
        p.noFill();
        p.translate(this.x, this.y);

        p.beginShape();
        for (let i:number = 0 ; i < this.vertices.npoints ; i++)
            p.vertex(this.vertices.xpoints[i], this.vertices.ypoints[i]);
        p.endShape(CLOSE);

        p.line(this.vertices.xpoints[2], this.vertices.ypoints[2], this.vertices.xpoints[7], this.vertices.ypoints[7]);
        p.line(this.vertices.xpoints[3], this.vertices.ypoints[3], this.vertices.xpoints[6], this.vertices.ypoints[6]);

    }
}
