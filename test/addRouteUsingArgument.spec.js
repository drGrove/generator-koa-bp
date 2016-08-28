'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('Make a new custom route with args', function() {
  before(function(done) {
    helpers.run(path.join(__dirname, '../generators/route'))
      .withArguments(['tests'])
      .toPromise()
      .then(function() {
        done();
      })
      .catch(function(err) {
        console.error('ERROR: ', err);
      });
  });

  it('creates a route named tests', function() {
    assert.file('routes/tests/index.js');
  });
});
