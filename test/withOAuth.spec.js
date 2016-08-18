'use strict';
var path = require('path');
var spawn = require('child_process').spawn;
var expect = require('expect');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var assets = require('./assets.json');

describe('Make app with OAuth providers', function() {
  this.timeout(200000000);
  var tempDir;
  before(function(done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        appName: 'testApi',
        includeOAuthProviders: true
      })
    .toPromise()
      .then(function(dir) {
        tempDir = dir;
        const npmInstall = spawn
          ( 'npm'
            , [ '--silent'
            , '--prefix'
            , `${dir}`
            , 'install'
            , `${dir}`
            ]
          );
        npmInstall.on('close', code => {
          console.log(`npm install exited with code: ${code}`);
          done();
        });
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

  describe('Creates base files', function() {
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
  describe('Test App', function() {
    this.timeout(200 * 1000);
    const DB_CREDS =
      [ 'testUser'
      , 'testPassword'
        , 'testDB'
      ];
    before(function(done) {
      const init = spawn
        ( path.join(tempDir, '/bin/init.exp')
          , DB_CREDS
        );
      init.stdout.on('data', function() {});
      init.stderr.on('data', function() {});
      init.on('close', function() {
        done();
      });
    });

    it('Should pass all application tests', function(done) {
      this.timeout(100 * 1000);
      let env = Object.create(process.env);
      env.NODE_ENV = 'TESTING';
      const tests = spawn
        ( 'npm'
          , [ 'test'
          ]
          , { env: env
          }
        );

      tests.stderr.on('data', function(data) {
        console.warn(`${data}`);
      });
      tests.on('close', function(code) {
        expect(code).toBe(0);
        done();
      });
    });
  });
});
