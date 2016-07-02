'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var assets = require('./assets.json');

describe('generator-koa-bp:app', function() {
  describe('with oAuth', function() {
    before(function(done) {
      helpers.run(path.join(__dirname, '../generators/app'))
        .withPrompts({
          appName: 'testApi',
          includeOAuthProviders: true
        })
        .toPromise()
        .then(function() {
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

    it('creates oauth route files', function() {
      assert.file(assets.oAuthFiles);
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
  describe('with named application', function() {
    before(function(done) {
      helpers.run(path.join(__dirname, '../generators/app'))
        .withArguments(['testApi2'])
        .withPrompts({})
        .toPromise()
        .then(function() {
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
});

