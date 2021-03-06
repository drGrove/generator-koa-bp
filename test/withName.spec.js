'use strict';
var path = require('path');
var spawn = require('child_process').spawn;
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var assets = require('./assets.json');

describe('Make app with named application', function() {
  var tempDir;
  before(function(done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withArguments(['testApi2'])
      .withPrompts({})
      .toPromise()
      .then(function(dir) {
        tempDir = dir;
        done();
      })
      .catch(function(err) {
        console.error('ERROR: ', err);
      });
  });

  after(function(done) {
    let deleteTmp = spawn
      ( 'rm'
        , [ '-r'
        , `/tmp/${tempDir}`
        ]
      );
    deleteTmp.on('close', function() {
      done();
    });
  });

  it('creates metafiles', function() {
    assert.file(assets.metaFiles);
  });

  it('creates swagger files', function() {
    assert.file(assets.useSwagger);
  });

  it('creates lib files', function() {
    assert.file(assets.libFiles);
  });

  it('creates route files', function() {
    assert.file(assets.routeFiles);
  });

  it('creates model files', function() {
    assert.file(assets.modelFiles);
  });

  it('creates test files', function() {
    assert.file(assets.testFiles);
  });

  it('creates gulp files', function() {
    assert.file(assets.gulpFiles);
  });

  it('creates database files', function() {
    assert.file(assets.mysqlFiles);
  });
});

