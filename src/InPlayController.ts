import InputController from './InputController'
import {
    Globals, KEY_LEFT, KEY_UP, KEY_RIGHT, KEY_DOWN, KEY_SPACE, KEY_CTRL
} from './Globals'

export default class InPlayController extends InputController {
    keysPressed = {}

    keyPressed() {
        if (Globals.p.keyCode == KEY_SPACE && !this.keysPressed[Globals.p.keyCode]) {
            Globals.game.ship.fire();
        }
        if (Globals.p.keyCode == KEY_CTRL && !this.keysPressed[Globals.p.keyCode]) {
            Globals.game.ship.hyperspace();
        }

        //console.log("Key pressed == " + p.keyCode);
        this.keysPressed[Globals.p.keyCode] = true;
    }

    keyReleased() {
        this.keysPressed[Globals.p.keyCode] = false;
    }

    checkKeyboard() {
        if (this.keysPressed[KEY_LEFT]) {
            Globals.game.ship.rotateLeft();
        }
        if (this.keysPressed[KEY_RIGHT]) {
            Globals.game.ship.rotateRight();
        }
        if (this.keysPressed[KEY_UP]) {
            Globals.game.ship.speedUp();
        }
        // Should add an easter egg for this
        //if (this.keysPressed[KEY_DOWN])
        //    Globals.game.ship.slowDown();
    }
}
