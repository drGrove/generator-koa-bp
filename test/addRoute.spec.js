'use strict';
var path = require('path');
var spawn = require('child_process').spawn;
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('Make a new custom route', function() {
  var tempDir;
  before(function(done) {
    helpers.run(path.join(__dirname, '../generators/route'))
      .withPrompts({
        route: 'users/tests'
      })
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

  it('Should create the route folder', function() {
    assert.file('routes/users/tests/index.js');
  });
});
