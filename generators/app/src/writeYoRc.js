'use strict';

/**
 * @param {!yeoman.Generator} KoaBP - Generator
 * @export
 */
module.exports = function(KoaBP) {
  /**
   * Writes the yo-rc file
   * @function
   */
  KoaBP.prototype.writeYoRc = function() {
    this.config.set('version', this.version);
    this.config.set('props', this.props);
  };
};
