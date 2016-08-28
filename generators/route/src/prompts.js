'use strict';

/**
 * @param {!yeoman.Generator} KoaBPRoute generator
 * @export
 */
module.exports = function(KoaBPRoute) {
  /**
   * Prompts user for input necessary to generate code
   * @function
   */
  KoaBPRoute.prototype.prompting = function() {
    let utils = this.utils;
    let done = this.async();

    let prompts =
      [ { type: 'prompt'
        , name: 'route'
        , message: 'What is the endpoint (ie. users/attachments)?'
        }
      ];

    this.prompt(prompts, function(props) {
      let self = this;
      let _path = "";
      this.props = props;
      this.props.params = [];
      this.props.className = [];
      this.props.route.split('/').forEach(function(param) {
        let _param = param;
        let name = utils.toProperCase(param);
        param = param.replace(/s$/, 'Id');
        _path += `/${_param}/{${param}}`;
        this.props.params.push(param);
        this.props.className.push(name);
      }.bind(this));
      this.props.className = this.props.className.join('.');
      this.props.pathWithAllParams = _path;
      this.props.pathWithAllButLastParam = _path.split('/');
      this.props.pathWithAllButLastParam.pop();
      let fullPath = this.props.pathWithAllButLastParam.join('/');
      this.props.pathWithAllButLastParam = fullPath;

      var pathParts = this.props.route.split('/');
      self.log.info('Path parts: ', pathParts);
      for (var i = 0; i < pathParts; i++) {
        self.log.info(`Path part: ${pathParts[i]}`)
        if (!/s$/.test(pathParts[i])) {
          self.log.error('All parts of the path must be plural.');
          process.exit(1);
        }
      }
      done();
    }.bind(this));
  };
};
