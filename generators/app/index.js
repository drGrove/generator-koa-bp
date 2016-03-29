'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

var KoaBP = yeoman.Base.extend({
  constructor: function () {
    yeoman.Base.apply(this, arguments);

    this.argument('appName', {
      type: String,
      required: false
    });
  },
  info: function () {
    this.log(yosay(
      'Welcome to the opinionated koa api ' + chalk.red('generator-koa-bp') + ' generator!'
    ));
  },

  writing: function () {
    var props = {};
    for (var key in this.props) {
      if (key in this.props) {
        props[key] = this.props[key];
      }
    }

    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      props
    );

    this.fs.copyTpl(
      this.templatePath('_README.md'),
      this.destinationPath('README.md'),
      props
    );
  },

  install: function () {
    this.installDependencies();
  }
});

require('./src/prompts')(KoaBP);

module.exports = KoaBP;
