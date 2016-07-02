'use strict';
var path = require('path');
var files = require('../files.json');

/**
 * Takes a template file path and creates a copy description object
 * Adds an _ to the file's basename if it's a template
 * @param {boolean} template is a template file
 * @return {function} function that takes in the file from a stream
 */
function resolvePaths(template) {
  return function(file) {
    var src = file;
    var dest = file;

    if (template) {
      var basename = path.basename(file);
      src = file.replace(basename, '_' + basename);
    }

    return {
      src: src,
      dest: dest,
      template: template
    };
  };
}

module.exports = function(KoaBP) {
  KoaBP.prototype.prepareFiles = function prepareFiles() {
    this.files = []
      .concat(files.staticFiles.map(resolvePaths(false), this))
      .concat(files.templates.map(resolvePaths(true), this));
  };
};
