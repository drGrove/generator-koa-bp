'use strict';
var yosay = require('yosay');
var chalk = require('chalk');

/**
 * @param {!yeoman.Generator} KoaBPRoute generator
 * @export
 */
module.exports = function(KoaBPRoute) {
  KoaBPRoute.prototype.info = function() {
    this.log(yosay(
      'Add a new route? '
    ));
  };
};
