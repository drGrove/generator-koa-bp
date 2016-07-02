'use strict';

/**
 * @param {!yeoman.Generator} KoaBP generator
 * @export
 */
module.exports = function(KoaBP) {
  /**
   * Sets the install instructions
   * @function
   */
  KoaBP.prototype.install = function() {
    this.installDependencies();
  };
};
