'use strict';
var fs = require('fs');

/**
 * Walk a file tree
 * @param {string} dir - the relative or absolute directory path
 * @param {array} exclusions - list of files/folders to exclude
 * @param {?string} parent - the relative or absolute directory of the parent
 *  this is used internally for recursion
 * @return {array} results - the list of items with path in directory
 */
/* istanbul ignore next */
var walk = function(dir, exclusions, parent) {
  exclusions = exclusions || [];
  var results = [];
  if (parent) {
    dir = parent + '/' + dir;
  }

  var files = fs.readdirSync(dir);
  for (var idx in files) {
    if (files.hasOwnProperty(idx)) {
      var con = true;
      var file = files[idx];

      if (exclusions.indexOf(dir) !== -1) {
        con = false;
      }

      if (con) {
        var f = fs.lstatSync(dir + '/' + file);
        if (f.isDirectory()) {
          results = results.concat(walk(file, exclusions, dir));
        } else {
          results.push(dir + '/' + file);
        }
      }
    }
  }
  return results;
};

module.exports = walk;
