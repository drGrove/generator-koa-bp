'use strict';

var gulp = require('gulp');
var config = require('../config');
var plumber = require('gulp-plumber');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');

gulp.task('test', ['pre-test'], function(cb) {
  var mochaErr;

  gulp.src(config.Paths.TESTS)
    .pipe(plumber())
    .pipe(mocha({reporter: 'spec'}))
    .on('error', function(err) {
      mochaErr = err;
    })
    .pipe(istanbul.writeReports({
      dir: config.Paths.COVERAGE,
      reportors: [
        'lcovonly',
        'json',
        'text-summary',
        'html'
      ]
    }))
    .on('end', function() {
      cb(mochaErr);
    });
});
