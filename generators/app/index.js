'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

var KoaBP = yeoman.Base.extend({
  constructor: function() {
    yeoman.Base.apply(this, arguments);

    this.argument('appName', {
      type: String,
      required: false
    })
  },
  info: function () {
    this.log(yosay(
      'Welcome to the opinionated koa api ' + chalk.red('generator-koa-bp') + ' generator!'
    ));
  },
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    var prompts = [{
      type: 'prompt',
      name: 'appName',
      message: 'What is the name of your api?',
      default: this.appname || this.appName
    }, {
      type: 'prompt',
      name: 'repositoryLink',
      message: 'What is the link to your repository?',
      default: ''
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someAnswer;
      done();
    }.bind(this));
  },

  writing: function () {
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      { appName: this.appname
      , repositoryLink: this.repositoryLink
      }
    );
  },

  install: function () {
    this.installDependencies();
  }
});

module.exports = KoaBP
