const {
  FuseBox,
  WebIndexPlugin,
  CopyPlugin
} = require('fuse-box');

const fuse = FuseBox.init({
  homeDir: 'src',
  output: 'dist/$name.js',
  sourceMaps: true,
  globals: { p5: 'p5' },
  plugins: [
    WebIndexPlugin({
      template: "index.html",
      target: "index.html"
    }),
    CopyPlugin({
      files: ['.mp3', '.wav', '.vlw', '.otf']
    })
  ]
});

fuse.dev();

fuse.bundle('app')
  .instructions('> asteroids.ts +lodash +p5')
  .watch()
  .hmr();

fuse.run();
