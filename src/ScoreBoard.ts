import DisplayObject from './DisplayObject'
import Ship from './Ship'
import {Globals} from './Globals'

export default class ScoreBoard extends DisplayObject {
    private ship:Ship;
    private fontSize:number = 20;
    private topMargin:number = 16;
    private scoreLeft:number = 20;

    constructor() {
        super()
        this.ship = new Ship(50, 50);
    }

    draw() {
        // Set the font and its size (in units of pixels)
        Globals.p.textSize(this.fontSize)
        // Globals.p.textFont(Globals.fontA);
        Globals.p.fill(255);

        // Score
        Globals.p.textAlign(Globals.p.RIGHT); // TODO
        Globals.p.text(Globals.game.getScore(), Globals.p.width - this.scoreLeft, this.topMargin);

        // Ships

        for (let i:number = 0 ; i < Globals.game.ships ; i++) {
            Globals.p.push()
            this.ship.drawAt(this.scoreLeft + i * this.ship.width() + 5, this.topMargin/* + fontSize + 58*/);
            Globals.p.pop();
        }

        // Level
        //textAlign(RIGHT);
        //text("LEVEL:" + Globals.game.level, width, topMargin);

    }
}
