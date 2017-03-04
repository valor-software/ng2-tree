#!/usr/bin/node

const _ = require('lodash');
const fs = require('fs');
const shell = require('shelljs');
const pkg = require('./package.json');

shell.exec('npm run pre:publish');
fs.writeFileSync('dist/package.json', JSON.stringify(_.omit(pkg, ['private']), null, 2), {encoding: 'utf-8'});

shell.exec('npm publish dist');
shell.exec('npm run post:publish');

