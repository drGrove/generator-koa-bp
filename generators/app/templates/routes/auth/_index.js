'use strict';
module.exports = function(app) {
  var path = require('path');
  var ensureAuth = require(app.rootDir + '/lib/ensureAuth');
  var signup = require(path.join(__dirname, '/signup'))(app);
  var login = require(path.join(__dirname, '/login'))(app);
  var logout = require(path.join(__dirname, '/logout'))(app);
  var refresh = require(path.join(__dirname, '/refresh'))(app);
  <%_ if (includeOAuthProviders) { _%>
  var google = require(path.join(__dirname, '/google'))(app);
  var facebook = require(path.join(__dirname, '/facebook'))(app);
  var github = require(path.join(__dirname, '/github'))(app);
  var linkedin = require(path.join(__dirname, '/linkedin'))(app);
  var unlink = require(path.join(__dirname, '/unlink'))(app);
  <%_ } _%>

  var routeConfig =
  { POST:
    { '/signup': signup
    , '/login': login
    <%_ if (includeOAuthProviders) { _%>
    , '/google': google
    , '/facebook': facebook
    , '/github': github
    , '/linkedin': linkedin
    , '/unlink':
      [ ensureAuth
      , unlink
      ]
    <%_ } _%>
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
