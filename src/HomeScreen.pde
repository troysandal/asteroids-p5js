public class HomeScreen extends DisplayObject {
    int start;
    HomeScreen() {
    start = frameCount;
    }
    
    void draw() {
        // Set the font and its size (in units of pixels)
        textFont(fontA, 48);
        textAlign(CENTER);
        
        stroke(255);
        fill(255);
        text("ASTEROIDS", width/2, height * .4);

        stroke(255);
        fill(255);
        textFont(fontA, 24);
        text("Click or Press A Key To Play", width/2, height * .6);

        //textFont(fontA, 16);
        //text("A T&T Production", width/2, height - 20);
    }
    
    public void update(ListIterator it) {
        if (frameCount > start + 5 * 60 * frameRate) {
            start = frameCount;
            game = new Game();
            game.init(true);
        }
    }
}