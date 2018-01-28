import Ship from './Ship';
import InputController from './InputController'
import InPlayController from './InPlayController'
import NewGameController from './NewGameController'
import GameOverController from './GameOverController'
import AsteroidFactory from './AsteroidFactory'
import DisplayList from './DisplayList'
import DisplayObject from './DisplayObject'
import EnemyShip from './EnemyShip'
import HomeScreen from './HomeScreen'
import ScoreBoard from './ScoreBoard'
import {Dimension, Point, Rectangle, randomRange, randomRangeInt} from './Java'
import NewGame from './NewGame'
import GameOver from './GameOver'
import FlyingObject from './FlyingObject'
import Asteroid from './Asteroid'
import {Globals} from './Globals'

const safeWH:Dimension = new Dimension(100, 100);

export default class Game {
    ship:Ship;
    controller:InputController = new InPlayController();
    asteroidFactory:AsteroidFactory = new AsteroidFactory();
    displayList:DisplayList = new DisplayList();
    score:number = 0; // private
    roids:number = 2;
    ships:number = 3;
    level:number = 0;
    timeOnLevel:number = 0;
    levelFrameStart:number;
    waiting:boolean = false;
    enemy:EnemyShip = null;
    nextEnemy:number = 0;
    tryNewShip:boolean = false;

    init(home:boolean) {
        Globals.sounds.killAllSounds();

        if (home) {
            console.log("Home Screen");
            this.controller = new NewGameController();
            this.addObject(new HomeScreen());
            for (let i:number = 0 ; i < 6 ; i++)
                this.addObject(this.asteroidFactory.createLargeEx(null));
            return;
        }

        // Real game
        this.addObject(new ScoreBoard());

        // Create the ship
        this.tryAddingShip();

        this.newLevel();
    }

    startNewLevel(/*ListIterator*/ it) {
        Globals.sounds.startLevel();
        this.waiting = false;

        console.log("Starting level " + this.level + " with " + this.roids + " asteroids.");
        // Add asteroids
        for (let i:number = 0 ; i < this.roids ; i++)
            it.add(this.asteroidFactory.createLargeEx(null));
    }

    newLevel() {
        this.waiting = true;
        this.level++;
        this.roids = Math.min(this.roids + 2, 11);
        this.timeOnLevel = 0;
        this.levelFrameStart = Globals.p.frameCount;
        console.log("Next Level : " + this.level);

        // Wait one second before starting the level.
        this.addObject(new NewGame());
    }

    addObject(o:DisplayObject) {
        this.displayList.add(o);
    }

    shipDied() {
        this.ships--;
        console.log("Ship died, you have " + this.ships + " left!");
    }

    gameOver(/*ListIterator*/ it) {
        console.log("Game over!");
        Globals.sounds.stopGame();
        this.controller = new GameOverController();
        it.add(new GameOver());
    }

    getScore():number {
        return this.score;
    }

    addPoints(points:number):number {
        if (this.ships > 0) {
            this.score += points;
        }
        return this.score;
    }

    newShip(/*ListIterator*/ it) {
        if (this.ships == 0) {
            this.gameOver(it);
            return;
        }

        this.tryNewShip = true;
    }

    tryAddingShip() {
        // Wait until center is clear

        const center:Point = new Point(Globals.p.width/2, Globals.p.height/2);

        if (!this.isSafeZone(center, safeWH)) {
             console.log("Center not clear!");
             return;
        }

        console.log("Found a clearing!");

        this.ship = new Ship(Globals.p.width/2, Globals.p.height/2);
        this.addObject(this.ship);
        this.tryNewShip = false;
    }

    findSafeZone(size:Dimension):Point {
        console.log("Finding safe zone of size " + size.toString());
        const MAX_TRIES = 20;
        let center:Point;

        for (let i:number = 0 ; i < MAX_TRIES ; i++) {
            center = new Point(
                randomRangeInt(Globals.p.width * 0.15, Globals.p.width * 0.85),
                randomRangeInt(Globals.p.height * 0.15, Globals.p.height * 0.85)
            );
            console.log("..." + center.toString());

            if (this.isSafeZone(center, size))
                return center;
        }

        return null;
    }

    isSafeZone(center:Point, wh:Dimension):boolean {
        const zone:Rectangle = new Rectangle(center.x - wh.width/2, center.y - wh.height/2, wh.width, wh.height);
        console.log("Checking safe zone " + zone.toString());

        for (const fo of this.displayList.iterator()) {
            if (!(fo instanceof FlyingObject))
                continue;

            if (zone.intersects((fo as FlyingObject).rect())) {
                return false;
            }
        }

        return true;
    }

    // Game Loop
    draw() {
        if (this.tryNewShip)
        this.tryAddingShip();

        Globals.sounds.playBoop();

        const last:number = this.timeOnLevel;
        const timeOnLevel = Math.round((Globals.p.frameCount - this.levelFrameStart) / Globals.p.frameRate());
        if (timeOnLevel != last) {
            //console.log("Time on level: " + timeOnLevel + " seconds.");
            //console.log("" + (frameCount - levelFrameStart) + ", " +  (frameRate * 3));
        }

        // We add our first ship after 20 seconds for levels 1-2, 15 for 3-5
        // then 10 for all those after that.
        const time_until_enemy_l12:number = 2;
        const time_until_enemy_l345:number = 5;
        const time_until_enemy_l6up:number = 10;

        if (this.enemy == null && timeOnLevel > ((this.level < 3) ? time_until_enemy_l12 : ((this.level < 6) ? time_until_enemy_l345 : time_until_enemy_l6up)) ) {
            if (this.nextEnemy == 0) {
                this.nextEnemy = Math.round(Globals.p.frameCount + Math.round(randomRangeInt(10,20) * Globals.p.frameRate()));
                console.log("Next enemy at " + this.nextEnemy);
            }
            else if (Globals.p.frameCount >= this.nextEnemy) {
                console.log("Adding enemy ship");
                this.nextEnemy = 0;
                // <= 10K always show big ship, above randomly choose
                this.enemy = new EnemyShip(this.score > 10000 ? Math.round(randomRangeInt(0, 10)) % 2 == 1 : true);
                this.addObject(this.enemy);
            }
        }

        // Check for keyboard action then update the display list.
        this.controller.checkKeyboard();
        this.displayList.update();
        this.displayList.hitTest();

        // Draw
        Globals.p.background(0);
        const it/*Iterator*/ = this.displayList.iterator();
        let asteroids:number = 0;

        for (const fo of this.displayList.iterator()) {
            if (fo instanceof Asteroid)
                asteroids++;

            Globals.p.push();
            fo.draw();
            Globals.p.pop();
        }

        if (asteroids == 0 && this.enemy == null && !this.waiting) {
            this.newLevel();
        }
    }
}