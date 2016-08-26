'use strict';
var yosay = require('yosay');
var chalk = require('chalk');

/**
 * @param {!yeoman.Generator} KoaBP generator
 * @export
 */
module.exports = function(KoaBP) {
  KoaBP.prototype.info = function() {
    this.log(yosay(
      'Add a new route? '
    ));
  };
};
