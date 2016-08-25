'use strict';
var expect = require('expect');
var app = require(process.env.PROJECT_ROOT + '/index');
var co = require('co');
var server = app.listen();
var request = require('co-supertest').agent(server);
var config = require(process.env.PROJECT_ROOT + '/lib/config');

describe('GET: AUTHORIZED: /users/me', function() {
  var res;

  after( function(done) {
    server.close();
    done();
  })

  before( function(done) {
    co( function*() {
      res = yield request
        .get(`${config.app.namespace}users/me`)
        .set('Authorization', 'Bearer ' + process.env.USER_TOKEN)
        .end();
      done();
    });
  });

  it('Should return a 200', function(done) {
    expect(res.statusCode).toBe(200);
    done();
  });

  it('Should be an object', function(done) {
    expect(res.body).toBeA('object');
    done();
  });

  it('Should not return a password', function() {
    let userData = res.body.data;
    expect(userData.password).toNotExist();
  })

  it('Should set the user id to an environment variable', function(done) {
    process.env.USER_ID = res.body.data.id;
    expect(parseInt(process.env.USER_ID)).toBe(parseInt(res.body.data.id));
    done();
  });
});
