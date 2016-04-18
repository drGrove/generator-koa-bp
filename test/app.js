'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var assets = require('./assets.json');

describe('generator-koa-bp:app', function() {
  before(function(done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({appName: 'testApi'})
      .on('end', done);
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
});

describe('generator-koa-bp:app testApi2', function() {
  before(function(done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withArguments(['testApi2'])
      .withPrompts({})
      .on('end', done);
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
});
