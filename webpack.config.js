'use strict';

const _ = require('lodash');

const webpackConfig = require('ng2-webpack-config').webpack.dev({
  src: 'demo',
  dist: 'demo-dist',
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
});

loaders.push({
  test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
  loader: "url-loader?limit=10000&mimetype=application/font-woff"
});

loaders.push({
  test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
  loader: "file-loader"
});

webpackConfig.module.loaders = loaders;

module.exports = webpackConfig;
