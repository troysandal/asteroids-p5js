const {FuseBox, WebIndexPlugin} = require('fuse-box');

const fuse = FuseBox.init({
  homeDir: 'src',
  output: 'dist/$name.js',
  sourceMaps: true,
  // globals: {
  //   default : "Globals"
  // },
  plugins: [
      WebIndexPlugin({
        template: "index.html",
        target: "index.html"
    })
  ]
});

fuse.dev();

fuse.bundle('app')
  .cache(false)
  .instructions('> asteroids.ts +lodash +p5')
  .watch()
  .hmr();

fuse.run();
