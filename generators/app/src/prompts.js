'use strict'

module.exports = function(KoaBP) {
  KoaBP.prototype.prompting = function() {
    var done = this.async();
    var uname = process.env['USER'];

    // Have Yeoman greet the user.
    var prompts = [{
      type: 'prompt',
      name: 'appName',
      message: 'What is the name of your api?',
      default: this.appname || this.appName,
      store: true
    }, {
      type: 'prompt',
      name: 'repositoryLink',
      message: 'What is the link to your repository?',
      default: 'https://github.com/' + uname + '/' + (this.appname || this.appName),
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
      message: 'Would you like David DM to keep you informed of the state of your dependencies?',
      default: true,
      store: true
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someAnswer;
      if ( /github/.test(this.props.repositoryLink || '')) {
        this.props.githubEndpoint = this.props.repositoryLink.split('github.com/')[1];
      }
      done();
    }.bind(this));
  }
};
