import InputController from './InputController'
import {
    KEY_LEFT, KEY_UP, KEY_RIGHT, KEY_DOWN, KEY_SPACE, KEY_CTRL
} from './Globals'

export default class InPlayController extends InputController {
    keysPressed:boolean[] = []

    keyPressed() {
        if (p.keyCode == KEY_SPACE && !this.keysPressed[p.keyCode])
            game.ship.fire();
        if (p.keyCode == KEY_CTRL && !this.keysPressed[p.keyCode])
            game.ship.hyperspace();

        if (p.keyCode < this.keysPressed.length) {
            //console.log("Key pressed == " + p.keyCode);
            this.keysPressed[p.keyCode] = true;
        }
    }

    keyReleased() {
        if (p.keyCode < this.keysPressed.length) {
            //console.log("Key released == " + p.keyCode);
            this.keysPressed[p.keyCode] = false;
        }
    }

    checkKeyboard() {
        if (this.keysPressed[KEY_LEFT])
            game.ship.rotateLeft();

        if (this.keysPressed[KEY_RIGHT])
            game.ship.rotateRight();
        if (this.keysPressed[KEY_UP])
            game.ship.speedUp();
        //if (this.keysPressed[KEY_DOWN])
        //    game.ship.slowDown();
    }
}
