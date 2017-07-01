#!/usr/bin/node

const fs = require('fs');
const shell = require('shelljs');
const pkg = require('./package.json');

shell.exec('npm run pre:publish');

fs.writeFileSync('dist/package.json', JSON.stringify(omit(pkg, 'private'), null, 2), {encoding: 'utf-8'});

shell.exec('npm publish dist');
shell.exec('npm run post:publish');

function omit(obj, key) {
  return Object
    .keys(obj)
    .reduce((result, prop) => {
      if (prop === key) return result;
      return Object.assign(result, {[prop]: obj[prop]})
    }, {});
}
