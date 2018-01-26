const {FuseBox, WebIndexPlugin} = require('fuse-box');

const fuse = FuseBox.init({
  homeDir: 'src',
  output: 'dist/$name.js',
  sourceMaps: true,
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
  .instructions('> asteroids.ts +lodash')
  .watch()
  .hmr();

fuse.run();
