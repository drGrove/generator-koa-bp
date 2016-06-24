'use strict';
module.exports = function(app) {
  var path = require('path');
  var ensureAuth = require(app.rootDir + '/lib/ensureAuth');
  var signup = require(path.join(__dirname, '/signup'))(app);
  var login = require(path.join(__dirname, '/login'))(app);
  var logout = require(path.join(__dirname, '/logout'))(app);
  var refresh = require(path.join(__dirname, '/refresh'))(app);
  
  var routeConfig =
  { POST:
    { '/signup': signup
    , '/login': login
        }
  , GET:
    { '/logout':
      [ ensureAuth
      , logout
      ]
    , '/refresh':
      [ ensureAuth
      , refresh
      ]
    }
  };

  return routeConfig;
};
