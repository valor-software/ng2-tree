'use strict';

const path = require('path');
const webpack = require('webpack');
//const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

let config = {};

config.devtool = 'sourcemap';
config.context = __dirname;

config.resolve = {
    root: __dirname,
    extensions: ['', '.ts', '.js', '.json']
};

config.entry = {
    vendor: [
        'zone.js/dist/zone-microtask',
        'reflect-metadata',
        'angular2/common',
        'angular2/core',
        'lodash'
    ],
    'app': ['./ng2-tree.ts', './demo/app.ts'],
};

config.output = {
    path: path.join(__dirname, './build'),
    filename: '[name].js'
};

config.module = {
    loaders: [
        {
            test: /\.ts$/,
            loader: 'ts-loader'
        },
        {
            test: /\.css$/,
            loader: 'raw'
        }
    ]
};

config.plugins = [
    new CleanWebpackPlugin(['build'], {
        root: __dirname,
        verbose: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'common'
    })
];

module.exports = config;