'use strict';

/**
 * @param {!yeoman.Generator} KoaBPRoute - Generator
 * @export
 */
module.exports = function(KoaBPRoute) {
  /**
   * Writes the yo-rc file
   * @function
   */
  KoaBPRoute.prototype.writeYoRc = function() {
    this.config.set('version', this.version);
  };
};
