'use strict';
var path = require('path');
var spawn = require('child_process').spawn;
var expect = require('expect');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var assets = require('./assets.json');

describe('with oAuth', function() {
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
          )
        npmInstall.on('close', code => {
          console.log(`npm install exited with code: ${code}`);
          done();
        })
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

        init.stdout.on('data', data => {
          if( `${data}`.length > 1) {
            console.log(`[bin/init.exp stdout]: ${data}`);
          }
        });

        init.stderr.on('data', data => {
          if( `${data}`.length > 1) {
            console.log(`[bin/init.exp stderr]: ${data}`);
          }
        });

        init.on('close', code => {
          console.log(`Ran and existed with code ${code}`);
          done();
        });
      });

      after(function(done) {
        let mysql = spawn
          ( 'mysql'
          , [ '-u root'
            , '-e'
            , ` drop database ${DB_CREDS[2]};\n
                drop database ${DB_CREDS[2]}_testing;\n
                drop database ${DB_CREDS[2]}_development;\n
                drop user '${DB_CREDS[0]}'@'localhost';
              `
            ]
          )

        mysql.on('close', code => {
          console.log('Closed with error code: ', code);
          done();
        })
      });

      it('Should work with credentials', function(done) {
        let mysql = spawn
          ( 'mysql'
          , [ `-u ${DB_CREDS[0]}`
            , `-p${DB_CREDS[1]}`
            , `${DB_CREDS[2]}`
            ]
          )

        mysql.stdout.on('data', data => {
          if( `${data}`.length > 1) {
            console.log(`[mysql sdtout]: ${data}`);
          }
        })

        mysql.stderr.on('data', data => {
          if( `${data}`.length > 1) {
            console.log(`[mysql stderr]: ${data}`);
          }
        });

        mysql.on('close', code => {
          expect(code).toBe(0);
          done();
        });
      });
    });
  })
});
