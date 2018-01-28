import Asteroid from './Asteroid'
import {Polygon, randomRange, randomRangeInt} from './Java'
import {Globals, EXPLODE_BIG, EXPLODE_MEDIUM, EXPLODE_SMALL} from './Globals'

function createPolygon(points:number[][]):Polygon {
    let x:number[] = []
    let y:number[] = []

    for (let i:number = 0 ; i < points.length ; i++) {
        x[i] = points[i][0];
        y[i] = points[i][1];
    }

    return new Polygon(x, y, points.length);
}

function scaleAsteroid(points:Polygon, scale:number):Polygon {
    const result:Polygon = new Polygon();

    for (let i:number = 0 ; i < points.npoints ; i++){
        result.addPoint(
            Math.round(points.xpoints[i] * (scale/100.0)),
            Math.round(points.ypoints[i] * (scale/100.0)));
    }

    return result;
}

export class InitParams {
    public x:number;
    public y:number;
    public dx:number;
    public dy:number;
    static theta:number = 15;
    static border:number = 20.0;

    constructor(quadrant:number) {
        const xBorder:number = Math.round(Globals.p.width * InitParams.border);
        const yBorder:number = Math.round(Globals.p.height * InitParams.border);

        switch (quadrant % 4) {
            case 0:
                this.x = Globals.p.width - xBorder + randomRangeInt(0, xBorder);
                this.y = randomRangeInt(0, Globals.p.height);
                break;
            case 1:
                this.x = randomRangeInt(0, Globals.p.width);
                this.y = randomRangeInt(0, yBorder);
                break;
            case 2:
                this.x = randomRangeInt(0, xBorder);
                this.y = randomRangeInt(0, Globals.p.height);
                break;
            case 3:
                this.x = randomRangeInt(0, Globals.p.width);
                this.y = Globals.p.height - yBorder + randomRangeInt(0, yBorder);
                break;
        }

        const angle:number = Math.round(randomRange(InitParams.theta, 90 - InitParams.theta) + (quadrant % 4) * 90);
        this.dx = Math.cos(Globals.p.radians(angle));
        this.dy = Math.sin(Globals.p.radians(angle));
    }
}


type Creator = (ip:InitParams) => Asteroid;


/**
 * Strategy for what happens when an asteroid explodes.  Use the asteroid that
 * is breaking up as a reference point for position & velocity.
 */
export class Next {
    creator:Creator;

    constructor(creator:Creator) {
        this.creator = creator;
    }

    go(a:Asteroid, add/*:List*/) {
        const ips:InitParams[] = this.initParams(a);

        for (let i = 0 ; i < ips.length ; i++)
            add.push(this.creator(ips[i]));
    }

    initParams(a:Asteroid):InitParams[] {
        const delta:number = 1;
        let result:InitParams[] = new InitParams[2];
        result[0] = new InitParams(0);
        result[1] = new InitParams(0);

        const dx:number = randomRange(-delta, delta);
        const dy:number = randomRange(-delta, delta);

        result[0].x = result[1].x = a.x;
        result[0].y = result[1].y = a.y;

        result[0].dx = a.dx + dx;
        result[0].dy = a.dy + dy;

        result[1].dx = a.dx - dx;
        result[1].dy = a.dy - dy;

        return result;
    }
}

export default class AsteroidFactory {
    public quadrant:number = 0;
    private Shapes:Polygon[];
    private roid:number = 0;
    private nextLarge:Next = new Next(
        (ip:InitParams):Asteroid => this.createMediumEx(ip)
    );

    private nextMedium:Next = new Next(
        (ip:InitParams):Asteroid => this.createSmallEx(ip)
    );

    constructor() {
        this.Shapes = [
            createPolygon([
                [20, 0], [80, 0], [100, 20], [100, 50], [60, 100],
                [40, 100], [50, 70], [25, 90], [0, 70], [20, 40], [0, 20]
            ]),

            createPolygon([
                [20, 0], [50, 0], [100, 20], [100, 30], [50, 50], [100, 60],
                [75, 100], [50, 80], [20, 100], [0, 60], [0, 30] ]
            ),

            createPolygon([
                [25, 0], [50, 10], [75, 0], [100, 20], [70, 45], [100, 60],
                [65, 100], [30, 90], [20, 100], [0, 75], [10, 50], [0, 20] ]
            ),

            createPolygon([
                [30, 0], [50, 20], [75, 0], [100, 20], [80, 50], [100, 70],
                [75, 100], [30, 100], [0, 70], [0, 20] ]
            )
        ];
    }


    nextAsteroid():Polygon {
        this.roid = ++this.roid % this.Shapes.length;
        //console.log("this.roid is " + this.roid);
        return this.Shapes[this.roid];
    }


    createSmall()  {
        Globals.game.addObject(this.createSmallEx(null));
        }
    createMedium() {
        Globals.game.addObject(this.createMediumEx(null));
        }
    createLarge()  {
        Globals.game.addObject(this.createLargeEx(null));
        }

    createSmallEx(ip:InitParams):Asteroid  {
        return this.create(ip, this.nextAsteroid(), 15, 100, null, EXPLODE_SMALL);
        }
    createMediumEx(ip:InitParams):Asteroid {
        return this.create(ip, this.nextAsteroid(), 40, 50, this.nextMedium, EXPLODE_MEDIUM);
        }
    createLargeEx(ip:InitParams):Asteroid  {
        return this.create(ip, this.nextAsteroid(), 60, 20, this.nextLarge, EXPLODE_BIG);
        }

    private create(ip:InitParams, polygon:Polygon, scale:number, points:number, next:Next, explode:number):Asteroid {
        const init:InitParams = ip == null ? new InitParams(this.quadrant++) : ip;
        polygon = scaleAsteroid(polygon, scale);
        return new Asteroid(init, polygon, points, next, explode);
    }
}
