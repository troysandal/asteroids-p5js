
class SoundLoop {
    private AudioPlayer channel;
    static final int FOREVER = -1;
    private int loops = FOREVER;
    
    public SoundLoop(String filename) {
        this.init(filename, FOREVER);
    }
    
    public SoundLoop(String filename, int loops) {
        this.init(filename, loops);
    }
    
    private void init(String filename, int loops) {
        channel = minim.loadFile(filename);
        //channel.smoothPan = true;
        this.loops = loops;
    }

    public void play() {
        if (noSound) return;

        if (channel.isPlaying()) {
            //if (loops != FOREVER) {
            //    channel.loop(channel.loopCount() + 1);
            //}
            return;
        }
        // channel.play();

        if (loops == FOREVER) {
            channel.loop();
        }
        else {
            channel.loop(loops);
        }
    }
    
    public void stop() {
        if (loops != FOREVER) { 
            return;
        }
        channel.pause();
        channel.cue(0);
    }
}