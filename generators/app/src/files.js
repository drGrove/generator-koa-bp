'use strict';
var path = require('path');
var files = require('../files.json');

/**
 * Takes a template file path and creates a copy description object
 * Adds an _ to the file's basename if it's a template
 * @param {boolean} template is a template file
 * @return {function} function that takes in the file from a stream
 */
function resolvePaths(files) {
  files = files.map(function(file) {
    var src = file;
    var dest = file;
    var template = false;
    var basename = path.basename(file);
    var filename = basename.split('/')[basename.split('/').length - 1];
    if (filename.indexOf('_') == 0) {
      dest = file.replace(filename, filename.slice(1));
      template = true;
    }

    return {
      src: src,
      dest: dest,
      template: template
    };
  });

  return files;
}

module.exports = function(KoaBP) {
  KoaBP.prototype.prepareFiles = function prepareFiles() {
    var props = this.props;
    var fileList = [];
    Object.keys(files).map(function(key) {
      switch(key) {
        case 'oAuth':
          if (props.includeOAuthProviders) {
            fileList = fileList.concat(resolvePaths(files[key]));
          }
          break;
        default:
          fileList = fileList.concat(resolvePaths(files[key]));

      }
    });
    this.files = fileList;
  };
};
