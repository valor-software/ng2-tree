'use strict';

module.exports = require('ng2-webpack-config').webpack.dev({
  src: 'demo',
  dist: 'demo-build',
  htmlIndexes: ['index.html'],
  entry: {
    main: ['./demo/polyfills.ts', './demo/vendor.ts', './demo/index.ts']
  },

  commonChunks: {
    name: ['main']
  },
  alias: {},
  baseUrl: '/'
});
