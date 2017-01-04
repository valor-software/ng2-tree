'use strict';

const _ = require('lodash');

const webpackConfig = require('ng2-webpack-config').webpack.dev({
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

const loaders = _.filter(webpackConfig.module.loaders, loader => {
  return !loader.test.test('.css');
});

loaders.push({
  test: /\.css$/,
  loader: 'style-loader!css-loader'
})

webpackConfig.module.loaders = loaders;

module.exports = webpackConfig;