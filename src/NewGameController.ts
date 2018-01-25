import InputController from './InputController'
import Game from './Game'

export default class NewGameController extends InputController {
    public keyPressed() { }

    public keyReleased() {
        this.newGame();
    }

    public checkKeyboard() { }
    public mousePressed() { this.newGame(); }

    private newGame() {
           game = new Game();
           game.init(false);
    }
}
