import InputController from './InputController'
import Game from './Game'
import {Globals} from './Globals'

export default class GameOverController extends InputController {
    public keyPressed() { }

    public keyReleased() {
        this.newGame();
    }

    public checkKeyboard() { }
    public mousePressed() { this.newGame(); }

    private newGame() {
           Globals.game = new Game();
           Globals.game.init(true);
    }
}
