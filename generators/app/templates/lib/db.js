'use strict';

const NODE_ENV = process.env.NODE_ENV || 'DEVELOPMENT';
var configFile = String(NODE_ENV).toLowerCase();
var path = require('path');
var os = require('os');
var Sequelize = require('sequelize');
var logger = require(path.join(__dirname, '/logger'));
var cfg;
var errors = 0;

try {
  cfg = require(path.join(__dirname, `/../migrations/${configFile}.json`));
} catch (e) {
  logger.info('Could not pull config, checking environment variables');
  cfg = {};
  cfg.database = process.env.DATABASE_NAME || '';
  cfg.username = process.env.DATABASE_USER || '';
  cfg.password = process.env.DATABASE_PASS || '';
  cfg.dialect = process.env.DATABASE_DIALECT || 'mariadb';
  cfg.host = process.env.DATABASE_HOST || 'localhost';
}



function checkConfig(config) {
  for(var key in config) {
    if (config.hasOwnProperty(key)) {
      if (!config[key]) {
        logger
          .error(
            'Could not find database configuration for:',
            key,
            'at',
            os.hostname() + ":" + __filename
          );
        errors += 1;
      }
    }
  }
}

checkConfig(cfg);

if (errors) {
  logger.error('Missing configurations for database. Shutting down....');
  process.exit();
}

var db = {};

var options =
{ host: cfg.host
, dialect: cfg.dialect
, pool:
  { max: 50
  , min: 1
  , idle: 10000
  }
};

if (NODE_ENV === 'PRODUCTION' || NODE_ENV === 'TESTING') {
  options.logging = false;
}

var sequelize = new Sequelize
( cfg.database
, cfg.username
, cfg.password
, options
);

sequelize
  .authenticate()
  .then(function() {
    logger.info('Database connect successfully.');
  })
  .catch(function(err) {
    logger.error('Unable to connect to database: ', err);
    process.exit(1);
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
