'use strict';

var path = require('path');
var koa = require('koa');
<% if (useSwagger) { -%>
var swagger = require('swagger-koa');
var swaggerDef = require(path.join(__dirname, 'lib/swaggerDef'))
<% } -%>
var bodyParser = require('koa-bodyparser');
var morgan = require('koa-morgan');
var responseTime = require('koa-response-time');
var error = require('koa-error');
var cors = require('koa-cors');
var logger = require(path.join(__dirname, 'lib/logger'));
var config = require(path.join(__dirname, 'lib/config'));
var genErr = require(path.join(__dirname, 'lib/error'));
var sequelize = require(path.join(__dirname, 'lib/db')).sequelize;
var routes = require(path.join(__dirname, 'routes/index'));
var r = require('koa-router')();
var app = koa();

app.rootDir = __dirname;

// X-Response-Time
app.use(responseTime());

// Logger
app.use(morgan.middleware('combined', {
  stream: logger.stream,
  skip: function() {
    if (process.env.NODE_ENV === 'TESTING') {
      return true;
    }
    return false;
  }
}));

// CORS
app.use(cors());

// Body Parser
app.use(bodyParser());

// Error Handler
app.use(error());

// Overload Response
app.use(function*(next) {
  yield next;
  if (/json/.test(this.type)) {
    if(this.body) {
      if (!this.body.error && !this.body.data) {
        this.body = {data: this.body};
      }
    }
  }
  return this.body;
});

// 404 Handler
app.use(function*(next) {
  yield next;
  this.status = this.status || 404;
  if (this.status === 404) {
    this.status = 404;
    this.body =
    { error: true
    , msg: 'Item not found'
    };

    return this.body;
  }
});
// 401 Handler
app.use(function*(next) {
  try {
    yield next;
  } catch (err) {
    if (err.status === 401) {
      this.status = 401;
      this.body = genErr('NO_AUTH');
    } else {
      yield next;
    }
  }
  return this.body;
});
<% if (useSwagger) { %>
// Swagger
if (process.env.NODE_ENV !== 'PRODUCTION') {
  app.use(swagger.init(swaggerDef));
}
<% } %>

// Sequelize Transactions
app.use(require('koa-sequelize-transaction')({
  sequelize: sequelize
}));

// Router
r.use(routes(app).routes());
app.use(r.routes());

if (!module.parent) {
  app.listen(config.app.port, config.app.host, function() {
    logger.info(`Listeing on http://${config.app.host}:${config.app.port}`);
  });
}

module.exports = app;
