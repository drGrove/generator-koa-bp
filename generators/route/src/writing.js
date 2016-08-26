'use strict';

/**
 * @param {!yeoman.Generator} KoaBPRoute - Generator
 * @export
 */
module.exports = function(KoaBPRoute) {
  /**
   * Writes files to users file system
   * @function
   */
  KoaBPRoute.prototype.writing = function() {
    var props = {};
    for (var key in this.props) {
      if (key in this.props) {
        props[key] = this.props[key];
      }
    }
    console.log('FILES: ', this.files);
    for (var idx in this.files) {
      if (this.files.hasOwnProperty(idx)) {
        var file = this.files[idx];
        console.log('FILE: ', file);
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
      }
    }
  };
};
