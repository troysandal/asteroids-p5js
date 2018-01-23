class Game {
    Ship ship;
    InputController controller = new InPlayController();
    AsteroidFactory asteroidFactory = new AsteroidFactory();
    DisplayList displayList = new DisplayList();
    private int score = 0;
    int roids = 2;
    int ships = 3;
    int level = 0;
    int timeOnLevel = 0;
    int levelFrameStart;
    boolean waiting = false;
    EnemyShip enemy = null;
    int nextEnemy = 0;
        
    void init(boolean home) {
        sounds.killAllSounds();
        
        if (home) {
            println("Home Screen");
            controller = new NewGameController();
            addObject(new HomeScreen());
            for (int i = 0 ; i < 6 ; i++)
                addObject(asteroidFactory.createLargeEx(null));
            return;
        }

        // Real game
        addObject(new ScoreBoard());

        // Create the ship
        tryAddingShip();
        
        newLevel();
    }
    
    void startNewLevel(ListIterator it) {
        sounds.startLevel();
        waiting = false;
        
        println("Starting level " + level + " with " + roids + " asteroids.");            
        // Add asteroids
        for (int i = 0 ; i < roids ; i++)
            it.add(asteroidFactory.createLargeEx(null));
    }
    
    void newLevel() {
        waiting = true;
        level++;
        roids = min(roids + 2, 11);
        timeOnLevel = 0;
        levelFrameStart = frameCount;
        println("Next Level : " + level);
        
        // Wait one second before starting the level.
        addObject(new NewGame());
    }
    
    void addObject(DisplayObject o) {
        displayList.add(o);
    }
    
    void shipDied() {
        ships--;
        println("Ship died, you have " + ships + " left!");
    }
    
    void gameOver(ListIterator it) {
        println("Game over!");
        sounds.stopGame();
        controller = new GameOverController();
        it.add(new GameOver());
    }
    
    int getScore() {
        return score;
    }

    int addPoints(int points) {
        if (ships > 0)
            score += points;
        return score;
    }
    
    void newShip(ListIterator it) {
        if (ships == 0) {
            gameOver(it);
            return;
        }
        
        tryNewShip = true;
    }
    
    boolean tryNewShip = false;
    final Dimension safeWH = new Dimension(100, 100);
    
    void tryAddingShip() {
        // Wait until center is clear
        
        Point center = new Point(width/2, height/2);

        if (!isSafeZone(center, safeWH)) {
             println("Center not clear!");
             return;
        }

        println("Found a clearing!");

        ship = new Ship(width/2, height/2);
        addObject(ship);
        tryNewShip = false;
    }
    
    public Point findSafeZone(Dimension size) {
        println("Finding safe zone of size " + size.toString());
        int MAX_TRIES = 20;
        Point center;
        
        for (int i = 0 ; i < MAX_TRIES ; i++) {
            center = new Point((int)random(width * 0.15, width * 0.85), (int)random(height * 0.15, height * 0.85));
            println("..." + center.toString());
            
            if (isSafeZone(center, size))
                return center;
        }
        
        return null;
    }
    
    public boolean isSafeZone(Point center, Dimension wh) {
        Rectangle zone = new Rectangle(center.x - wh.width/2, center.y - wh.height/2, wh.width, wh.height);
        println("Checking safe zone " + zone.toString());
        Iterator it = displayList.iterator();
        
        while (it.hasNext()) {
            DisplayObject fo = (DisplayObject)it.next();
            
            if (!(fo instanceof FlyingObject))
                continue;
            
            if (zone.intersects(((FlyingObject)fo).rect())) {
                return false;
            }
        }
        
        return true;
    }
            
    // Game Loop
    void draw() {
        if (tryNewShip)
            tryAddingShip();
            
        sounds.playBoop();
        
        int last = timeOnLevel;
        timeOnLevel = (int)((frameCount - levelFrameStart) / frameRate);
        if (timeOnLevel != last) {
            //println("Time on level: " + timeOnLevel + " seconds.");
            //println("" + (frameCount - levelFrameStart) + ", " +  (frameRate * 3));
        }

        // We add our first ship after 20 seconds for levels 1-2, 15 for 3-5
        // then 10 for all those after that.
        int time_until_enemy_l12 = 20; // 20
        int time_until_enemy_l345 = 15;
        int time_until_enemy_l6up = 10;
        
        if (enemy == null && timeOnLevel > ((level < 3) ? time_until_enemy_l12 : ((level < 6) ? time_until_enemy_l345 : time_until_enemy_l6up)) ) {
            if (nextEnemy == 0) {
                nextEnemy = (int)(frameCount + (int)random(10,20) * frameRate);
                println("Next enemy at " + nextEnemy);
            }
            else if (frameCount >= nextEnemy) {
                println("Adding enemy ship");
                nextEnemy = 0;
                // <= 10K always show big ship, above randomly choose
                enemy = new EnemyShip(score > 10000 ? (int)random(0, 10) % 2 == 1 : true);
                addObject(enemy);
            }
        }
            
        // Check for keyboard action then update the display list.
        controller.checkKeyboard();
        displayList.update();
        displayList.hitTest();

        // Draw
        background(0);
        Iterator it = displayList.iterator();
        int asteroids = 0;
        
        while (it.hasNext()) {
            DisplayObject fo = (DisplayObject)it.next();
            if (fo instanceof Asteroid)
                asteroids++;
            
            pushMatrix();
            fo.draw();
            popMatrix();
        }
        
        if (asteroids == 0 && enemy == null && !waiting) {
            newLevel();
        }
    }
}