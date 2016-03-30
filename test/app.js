'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-koa-bp:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({appName: 'testApi'})
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'package.json',
      'README.md'
    ]);
  });
});

describe('generator-koa-bp:app testApi2', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withArguments(['testApi2'])
      .withPrompts({})
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'package.json',
      'README.md'
    ]);
  });
});
