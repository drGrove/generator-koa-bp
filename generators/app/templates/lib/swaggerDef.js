var path = require('path');
var config = require(path.join(__dirname, 'config'));
var pkg = require(path.join(__dirname,'../package.json'));

module.exports = {
  apiVersion: '1.0',
  swaggerVersion: '2.0',
  swaggerURL: `${config.app.namespace}swagger`,
  swaggerJSON: `${config.app.namespace}api-docs.json`,
  swaggerUI: 'node_modules/swagger-ui/dist',
  basePath: `http://${config.app.domain}:${config.app.port}`,
  info: {
    title: 'API',
    description: 'Blah',
    version: pkg.version
  }
}
