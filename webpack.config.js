'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const config = {};

config.devtool = 'sourcemap';
config.context = __dirname;

config.resolve = {
    root: __dirname,
    extensions: ['', '.ts', '.js', '.json', '.styl']
};

config.entry = {
    vendor: [
        'zone.js',
        'reflect-metadata',
        'angular2/common',
        'angular2/core',
        'lodash'
    ],
    'app': ['./ng2-tree.ts', './demo/app.ts'],
};

config.output = {
    path: path.join(__dirname, './build'),
    publicPath: '/',
    filename: '[name].js'
};

config.module = {
    loaders: [
        {
            test: /\.ts$/,
            loader: 'ts'
        },
        {
            test: /\.styl$/,
            loader: 'style!css!stylus?resolve url'
        }
    ]
};

config.plugins = [
    new HtmlWebpackPlugin({
        title: 'ng2-tree',
        template: 'demo/index.ejs',
        inject: 'body'
    }),
    new CleanWebpackPlugin(['build'], {
        root: __dirname,
        verbose: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'common'
    })
];

config.devServer = {
    host: 'localhost',
    port: 8080
};

module.exports = config;