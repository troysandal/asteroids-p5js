# asteroids
A Clone of Asteroids written as my first Processing app, now ported to p5js.

Instructions.
```
yarn
yarn test
yarn sketch
open http://localhost:4444
```

## JS Porting Notes / To Dos
- push to openprocessing
  - setup sparky for different builds
  - New Fusebox bundle for uploading to openprocessing
- Bug - shots make viewport shift
- Bug - report bug with soundFormats() needs to take string|?* to p5.sound
- Fix your atrocious hit testing code
- Cleanup/Replace XxxControllers', use [isKeyDown](https://p5js.org/reference/#/p5/keyIsDown).
- Favicon of a ship
- Need better global strategy, so ugly
- Bug reported on typings to p5.js.
https://github.com/processing/p5.js/issues/2605
