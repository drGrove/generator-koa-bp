'use strict';

/**
 * @param {!yeoman.Generator} KoaBP generator
 * @export
 */
module.exports = function(KoaBP) {
  /**
   * Prompts user for input necessary to generate code
   * @function
   */
  KoaBP.prototype.prompting = function() {
    var done = this.async();
    var uname = process.env.USER;

    // Have Yeoman greet the user.
    var prompts = [{
      type: 'prompt',
      name: 'appName',
      message: 'What is the name of your api?',
      default: this.appName || this.appname,
      store: true
    }, {
      type: 'prompt',
      name: 'repositoryLink',
      message: 'What is the link to your repository?',
      default: 'https://github.com/' +
        uname +
        '/' +
        (this.appName || this.appname),
      store: true
    }, {
      type: 'confirm',
      name: 'useTravis',
      message: 'Will you be using Travis CI?',
      default: true,
      store: true
    }, {
      type: 'confirm',
      name: 'useDavidDM',
      message: 'Would you like David DM to keep you informed ' +
        'of the state of your dependencies?',
      default: true,
      store: true
    }, {
      type: 'confirm',
      name: 'includeOAuthProviders',
      message: 'Would you like to include OAuth Providers ' +
        '(Google, Facebook, Linkedin)?',
      default: true,
      store: true
    }, {
      type: 'confirm',
      name: 'useSwagger',
      message: 'Would you like to use swagger?',
      default: true,
      store: true
    }];

    this.prompt(prompts, function(props) {
      this.props = props;
      // To access props later use this.props.someAnswer;
      if (/github/.test(this.props.repositoryLink)) {
        this.props.githubEndpoint = this.props.repositoryLink
          .split('github.com/')[1];
      }
      done();
    }.bind(this));
  };
};
