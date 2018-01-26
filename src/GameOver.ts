import DisplayObject from './DisplayObject'

export default class GameOver extends DisplayObject {
    constructor() {
        super()
    }
    draw() {
        // Set the font and its size (in units of pixels)
        p.textSize(32)
        p.textFont(fontA);
        //p.textAlign(CENTER);  // TODO

        p.fill(255);
        p.text("G A M E   O V E R", p.width/2, p.height/2, 0, 0);
    }
}
