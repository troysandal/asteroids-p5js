import DisplayObject from './DisplayObject'
import Ship from './Ship'

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
        p.textSize(this.fontSize)
        p.textFont(fontA);
        p.fill(255);

        // Score
        //p.textAlign(RIGHT); // TODO
        p.text(game.getScore(), p.width - this.scoreLeft, this.topMargin, 0, 0);

        // Ships

        for (let i:number = 0 ; i < game.ships ; i++) {
            p.push()
            this.ship.drawAt(this.scoreLeft + i * this.ship.width() + 5, this.topMargin/* + fontSize + 58*/);
            p.pop();
        }

        // Level
        //textAlign(RIGHT);
        //text("LEVEL:" + game.level, width, topMargin);

    }
}
