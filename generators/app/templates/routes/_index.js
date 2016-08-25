'use strict';

var routes = function(app) {
  var r = require('koa-router')();
  var compose = require('koa-compose');
  var path = require('path');
  var fs = require('fs');
  var swaggerJSDoc = require('swagger-jsdoc');
  var config = require(app.rootDir + '/lib/config');
  var glob = require('glob');

  r.get('', function*() {
    this.body =
      { active: true
      , timestamp: new Date().getTime()
      };
    return this.body;
  });

  function generateRoutes(files) {
    files.map(function(file) {
      if (file !== './routes/index.js') {
        file = file.replace(/\/index.js|.\/routes\//g, '');
        var paths = require(path.join(__dirname, file))(app);
        for (let method in paths) {
          if (paths.hasOwnProperty(method)) {
            for (var p in paths[method]) {
              if (paths[method].hasOwnProperty(p)) {
                let args = paths[method][p];
                let routeBreakdown = file.split('/');
                let breakdownCount = routeBreakdown.length - 1;
                let count = 0;
                routeBreakdown = routeBreakdown.map(function(subpath) {
                  if (count < breakdownCount) {
                    subpath += ('/:' + subpath.replace(/s$/, 'Id'));
                  }
                  count++
                  return subpath;
                });
                let sp = routeBreakdown.join('/');
                let uri = `${sp}${p}`
                if (Array.isArray(args)) {
                  r[method.toLowerCase()](uri, compose(args));
                } else {
                  r[method.toLowerCase()](uri, args);
                }
              }
            }
          }
        }
      }
    });
  }

  var directories = glob
    ( './routes/**/**/index.js'
    , function(er, files) {
        if (!er) {
          generateRoutes(files);
        } else {
          logger.error('Could not pull in files to generate routes.')
        }
      }
    );

  <%_ if (useSwagger) { _%>
  if (process.env.NODE_ENV !== "PRODUCTION") {
    var swaggerOptions =
      { swaggerDefinition:
          { swagger: '2.0'
          , info:
              { title: 'API Explorer' // Title (required)
              , version: '1.0.0' // Version (required)
              , contact:
                  { name: ''
                  , url: ''
                  }
              }
          , host: `${config.app.domain || config.app.host}:${config.app.port}`
          , basePath: config.app.namespace
          }
      , apis:
          [ app.rootDir + '/routes/**/*.js'
          , app.rootDir + '/lib/**/*.js'
          , app.rootDir + '/models/**/*.js'
          ]
      };

    // Initialize swagger-jsdoc -> returns validated swagger spec in json format
    var swaggerSpec = swaggerJSDoc(swaggerOptions);

    r.get('/docs.json', function*() {
      this.body = swaggerSpec;
    });
  }
  <%_ } _%>
  return r;
};

module.exports = routes;
