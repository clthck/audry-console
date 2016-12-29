'use strict';

const path = require('path');
const fs = require('fs');

module.exports = pug => {
  const helpersPath = path.join(__dirname, '../../app/helpers');

  fs
    .readdirSync(helpersPath)
    .filter(file => file.indexOf('.') !== 0 && file.slice(-3) === '.js')
    .forEach(file => {
      const helper = require(path.join(helpersPath, file));
      Object.keys(helper).map(methodName => pug.locals[methodName] = helper[methodName]);
    });
}
