'use strict';

module.exports = function(KoaBP) {
  KoaBP.prototype.writing = function() {
    var props = {};
    for (var key in this.props) {
      if (key in this.props) {
        props[key] = this.props[key];
      }
    }
    var exclusions = [];
    exclusions.push(this.templatePath('config'));
    exclusions.push(this.templatePath['public']);

    var files = this.utils.walk(this.templatePath(), exclusions);
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      var filename = file.split('/')[file.split('/').length - 1];
      if (/^_/.test(filename)) {
        filename = filename.substring(1);
      }
      this.fs.copyTpl(
        file,
        this.destinationPath(filename),
        props
      );
    }
    if (this.props.useSwagger) {
      this.fs.copy(
        this.templatePath('public/**/*'),
        this.destinationPath('public/')
      );
    }
  }
};
