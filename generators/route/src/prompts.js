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
    var utils = this.utils;
    var uname = process.env.USER;
    var done = this.async();

    var prompts =
      [ { type: 'prompt'
        , name: 'route'
        , message: 'What is the endpoint (ie. users/attachments)?'
        }
      ];

    this.prompt(prompts, function(props) {
      var _path = "";
      this.props = props;
      this.props.params = []
      this.props.className = [];
      this.props.route.split('/').forEach(function(param) {
        var _param = param;
        var name = utils.toProperCase(param);
        param = param.replace(/s$/, 'Id');
        _path += `/${_param}/:${param}`
        this.props.params.push(param);
        this.props.className.push(name);
      }.bind(this));
      this.props.className = this.props.className.join('.');
      this.props.pathWithAllParams = _path;
      this.props.pathWithAllButLastParam = _path.split('/')
      this.props.pathWithAllButLastParam.pop()
      this.props.pathWithAllButLastParam = this.props.pathWithAllButLastParam.join('/')
      done();
    }.bind(this));
  };
};
