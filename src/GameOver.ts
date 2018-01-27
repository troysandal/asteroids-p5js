import DisplayObject from './DisplayObject'
import {Globals} from './Globals'
export default class GameOver extends DisplayObject {
    constructor() {
        super()
    }
    draw() {
        // Set the font and its size (in units of pixels)
        Globals.p.textSize(32)
        // Globals.p.textFont(Globals.fontA);
        //Globals.p.textAlign(CENTER);  // TODO

        Globals.p.fill(255);
        Globals.p.text("G A M E   O V E R", Globals.p.width/2, Globals.p.height/2);
    }
}
