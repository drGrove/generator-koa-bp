'use strict';
var fs = require('fs');

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
