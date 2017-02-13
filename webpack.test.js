'use strict';

const path = require('path');
const SRC = path.resolve('src');

module.exports = {
  // devtool: 'inline-source-map',
  module: {
    postLoaders: [
      {
        test: /\.(ts)$/,
        loader: 'istanbul-instrumenter-loader',
        include: SRC,
        exclude: [
          /\.(e2e|spec)\.ts$/,
          /node_modules/
        ]
      }
    ],
    loaders: [
      { loader: 'raw', test: /\.(css|html)$/ },
      { exclude: /node_modules/, loader: 'ts', test: /\.ts$/ }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.ts'],
    modulesDirectories: ['node_modules'],
    root: SRC
  }
};
