class ScoreBoard extends DisplayObject {
    private Ship ship;
    int fontSize = 20;
    int topMargin = 16;
    int scoreLeft = 20;
    
    public ScoreBoard() {
        ship = new Ship(50, 50);
    }
    
    void draw() {
        
        // Set the font and its size (in units of pixels)
        textFont(fontA, fontSize);
        fill(255);
        
        // Score        
        textAlign(RIGHT);
        text(game.getScore(), width - scoreLeft, topMargin);
        
        // Ships
        
        for (int i = 0 ; i < game.ships ; i++) {
            pushMatrix();
            ship.drawAt(scoreLeft + i * ship.width() + 5, topMargin/* + fontSize + 58*/);
            popMatrix();
        }

        // Level
        //textAlign(RIGHT);
        //text("LEVEL:" + game.level, width, topMargin);
        
    }
}
