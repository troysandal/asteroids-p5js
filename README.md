# asteroids
A Clone of Asteroids written as my first Processing app in 2008, now ported to [p5js](https://p5js.org/) and hosted at [Open Processing](https://www.openprocessing.org/sketch/561679).

Instructions.
```
yarn
yarn test
yarn sketch
open http://localhost:4444
```

## Publishing to Open Processing [Experimental]
You can publish this sketch to [Open Processing](https://www.openprocessing.org).
* Run `yarn dist-os`
* Copy/Paste the contents of `./dist/app.js` to your sketch.
* Add the files from `dist/assets` to the sketch's `Files` tab.
* Turn on p5.Sound in your Sketch

## JS Porting Notes / To Dos
- Bug - report bug with soundFormats() schema needs to take string|?* to p5.sound
- Fix your atrocious hit testing code
- Cleanup/Replace XxxControllers', use [isKeyDown](https://p5js.org/reference/#/p5/keyIsDown).
- Favicon of a ship
- Need better global strategy, so ugly
- Bug reported on typings to p5.js.
https://github.com/processing/p5.js/issues/2605
