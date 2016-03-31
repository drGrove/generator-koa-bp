'use strict';

module.exports = function(KoaBP) {
  KoaBP.prototype.configuring = function () {
    this.fs.copy(
      this.templatePath('config/**'),
      this.destinationRoot()
    );
  }
}
