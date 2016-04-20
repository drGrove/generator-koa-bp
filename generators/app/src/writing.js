'use strict';

/**
 * @param {!yeoman.Generator} KoaBP - Generator
 * @export
 */
module.exports = function(KoaBP) {
  /**
   * Writes files to users file system
   * @function
   */
  KoaBP.prototype.writing = function() {
    var props = {};
    for (var key in this.props) {
      if (key in this.props) {
        props[key] = this.props[key];
      }
    }
    for (var idx in this.files) {
      if (this.files.hasOwnProperty(idx)) {
        var file = this.files[idx];
        try {
          if (file.template) {
            this.fs.copyTpl(
              this.templatePath(file.src),
              this.destinationPath(file.dest),
              props);
          } else {
            this.fs.copy(
              this.templatePath(file.src),
              this.destinationPath(file.dest),
              props);
          }
        } catch (error) {
          console.error('Template processing error on file', file.src);
          throw error;
        }
      }
    }
  };
};
