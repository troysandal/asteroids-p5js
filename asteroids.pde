/* OpenProcessing Tweak of *@*http://www.openprocessing.org/sketch/1129*@* */
/* !do not delete the line above, required for linking your tweak if you upload again */
import java.awt.Point;
import java.awt.Polygon;
import java.awt.Rectangle;
import java.awt.Dimension;

import java.util.List;
import java.util.LinkedList;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.ListIterator;

import ddf.minim.*;

Minim minim;
AudioPlayer player;

boolean noSound = false;
boolean noHit = false;

void setup() {
    size(800,675);
    frameRate(30);
    smooth();

    fontA = loadFont("CourierNew36.vlw");

    minim = new Minim(this);
    sounds = new Sounds();

    game = new Game();
    game.init(true);

    println("Game Started");
    println("Size = (" + width + ", " + height + ")");
}

void draw() {
    size(800,675);
    try {
        game.draw();
    }
    catch (Exception e) {
        e.printStackTrace();
    }
}

void keyPressed() {
    game.controller.keyPressed();
}

void keyReleased() {
    game.controller.keyReleased();
}

void mousePressed() {
    game.controller.mousePressed();
}

Game game = null;
PFont fontA;
Sounds sounds;

public final int EXPLODE_BIG = 2;
public final int EXPLODE_MEDIUM = 1;
public final int EXPLODE_SMALL = 0;