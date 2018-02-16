import InputController from './InputController'
import Game from './Game'
import {Globals, KEY_SPACE} from './Globals'

export default class NewGameController extends InputController {
    public keyPressed() {
        if (Globals.p.keyCode == KEY_SPACE) {
            this.newGame();
        }
    }

    public keyReleased() {
    }

    public checkKeyboard() {
    }

    public mousePressed() {
        this.newGame();
    }

    private newGame() {
           Globals.game = new Game();
           Globals.game.init(false);
    }
}
