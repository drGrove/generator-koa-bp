'use strict';

var gulp = require('gulp');
var config = require('../config');
var plugins = require('../plugins');

gulp.task('test', ['pre-test'], function(cb) {
  var mochaErr;

  gulp.src(config.Paths.TESTS)
    .pipe(plugins.plumber())
    .pipe(plugins.mocha({reporter: 'spec'}))
    .on('error', function(err) {
      console.log('mocha error: ', err);
      mochaErr = err;
    })
    .pipe(plugins.istanbul.writeReports({
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
