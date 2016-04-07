'use strict';
var yeoman = require('yeoman-generator');
var utils = require('./utils');

/**
 * Creates a new Generator
 * @constructor
 */
var KoaBP = yeoman.Base.extend({
  constructor: function() {
    yeoman.Base.apply(this, arguments);
    this.utils = utils;
    this.argument('appName', {
      type: String,
      required: false
    });
  }
});

require('./src/configure')(KoaBP);
require('./src/info')(KoaBP);
require('./src/install')(KoaBP);
require('./src/prompts')(KoaBP);
require('./src/writing')(KoaBP);

/**
 * @export
 */
module.exports = KoaBP;
