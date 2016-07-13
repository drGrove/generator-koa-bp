'use strict';
var path = require('path');
var spawn = require('child_process').spawn;
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var assets = require('./assets.json');

describe('generator-koa-bp:app', function() {
  describe('with oAuth', function() {
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
      describe('Initalize Database', function() {
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

          init.stdout.on('data', (data) => {
            console.log(`[stdout]: ${data}`);
          });

          init.stderr.on('data', (data) => {
            console.log(`[stderr]: ${data}`);
          });

          init.on('close', (code) => {
            console.log(`Ran and existed with code ${code}`);
            done();
          });
        });

        it('Should work with credentials', function(done) {
          const mysql = spawn
            ( 'mysql'
            , [ `-u ${DB_CREDS[0]}`
              , `-p${DB_CREDS[1]}`
              , `${DB_CREDS[2]}`
              ]
            )
          mysql.on('close', function(code) {
            expect(code).toBe(0);
            done();
          });
        });
      });
    })
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

