'use strict';
var yeoman = require('yeoman-generator');
var utils = require('./utils');

/**
 * Creates a new Generator
 * @constructor
 */
var KoaBPRoute = yeoman.Base.extend({
  constructor: function() {
    yeoman.Base.apply(this, arguments);
    this.utils = utils;
  }
});

//require('./src/info')(KoaBP);
require('./src/files')(KoaBPRoute);
require('./src/prompts')(KoaBPRoute);
require('./src/writing')(KoaBPRoute);

/**
 * @export
 */
module.exports = KoaBPRoute;
