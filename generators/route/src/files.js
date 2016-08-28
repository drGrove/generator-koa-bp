'use strict';
var path = require('path');
var files = require('../files.json');

/**
 * Takes a template file path and creates a copy description object
 * Adds an _ to the file's basename if it's a template
 * @param {array} files is a template file
 * @param {object} props prompt properties
 * @return {function} function that takes in the file from a stream
 */
function resolvePaths(files, props) {
  files = files.map(function(file) {
    var src = file;
    var dest = file;
    var template = false;
    var basename = path.basename(file);
    var filename = basename.split('/')[basename.split('/').length - 1];
    var _filename;

    if (filename.indexOf('_') === 0) {
      _filename = file.replace(filename, filename.slice(1));
      template = true;
    } else {
      _filename = src;
    }

    dest = `routes/${props.route}/${_filename}`;

    return {
      src: src,
      dest: dest,
      template: template
    };
  });

  return files;
}

module.exports = function(KoaBPRoute) {
  KoaBPRoute.prototype.prepareFiles = function prepareFiles() {
    var props = this.props;
    var fileList = [];
    Object.keys(files).forEach(function(key) {
      switch (key) {
        default:
          fileList = fileList.concat(resolvePaths(files[key], props));
      }
    });
    this.files = fileList;
  };
};
