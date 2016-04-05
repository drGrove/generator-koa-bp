'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var utils = require('./utils');

var KoaBP = yeoman.Base.extend({
  constructor: function() {
    yeoman.Base.apply(this, arguments);
    this.utils = utils;
    this.argument('appName', {
      type: String,
      required: false
    });
  },
  info: function() {
    this.log(yosay(
      'Welcome to the opinionated koa api ' +
      chalk.red('generator-koa-bp') +
      ' generator!'
    ));
  },

  install: function() {
    this.installDependencies();
  }
});

require('./src/prompts')(KoaBP);
require('./src/configure')(KoaBP);
require('./src/writing')(KoaBP);

module.exports = KoaBP;
