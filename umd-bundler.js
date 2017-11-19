#!/usr/bin/env node

'use strict';

const del = require('del');
const path = require('path');
const Builder = require('systemjs-builder');

const pkg = require('./package.json');
const targetFolder = path.resolve('./dist/bundles');

del(targetFolder)
  .then(paths => {
    console.log('Deleted files and folders:\n', paths.join('\n'));
  })
  .then(() => {
    return Promise.all([
      buildSystemJs(),
      buildSystemJs({minify: true})
    ]);
  })
  .catch(e => console.log(e));

function buildSystemJs(options = {}) {
  const minPostFix = options && options.minify ? '.umd.min' : '.umd';
  const fileName = `${pkg.name}${minPostFix}.js`;
  const dest = path.resolve(__dirname, targetFolder, fileName);
  const builder = new Builder();

  console.log('Bundling system.js file:', fileName, options);
  builder.config(getSystemJsBundleConfig());

  return builder
    .buildStatic('dist/index', dest, Object.assign({
      format: 'umd',
      minify: false,
      sourceMaps: true,
      mangle: false,
      noEmitHelpers: false,
      declaration: false
    }, options))
    .then((b) => {
      console.log(`Build complete: ${minPostFix}`);
    })
    .catch(err => {
      console.log('Error', err);
    });
}

function getSystemJsBundleConfig() {
  return {
    baseURL: '.',
    map: {
      typescript: './node_modules/typescript/lib/typescript.js',
      '@angular': './node_modules/@angular',
      rxjs: './node_modules/rxjs/bundles',
      uuid: './node_modules/uuid',
      crypto: '@empty'
    },
    paths: {
      '*': '*.js'
    },
    meta: {
      './node_modules/@angular/*': { build: false },
      './node_modules/rxjs/*': { build: false }
    }
  };
}
