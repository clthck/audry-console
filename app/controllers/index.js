'use strict';

const fs = require('fs');
const path = require('path');
const basename = path.basename(module.filename);
const camelize = require('underscore.string/camelize');
const controllers = {};
let temp;

function isFolder(currentPath, fileName) {
  return fs.statSync(path.join(currentPath, fileName)).isDirectory();
}

function traverse(currentPath, obj) {
  fs
    .readdirSync(currentPath)
    .forEach(fileName => {
      if (isFolder(currentPath, fileName)) {
        temp = camelize(fileName);
        obj[temp] = {};
        traverse(path.join(currentPath, fileName), obj[temp]);
      } else if (fileName.indexOf('.') !== 0 && fileName !== basename && fileName.slice(-3) === '.js') {
        temp = fileName.match(/_controller\.js$/) ? fileName.split('_controller.js')[0] : path.parse(fileName).name;
        obj[camelize(temp)] = require(path.join(currentPath, fileName));
      }
    });
}

traverse(__dirname, controllers);

module.exports = controllers;
