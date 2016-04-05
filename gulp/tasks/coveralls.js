'use strict';
var gulp = require('gulp');
var path = require('path');
var plugins = require('../plugins');

gulp.task('coveralls', ['test'], function() {
  if (!process.env.CI) {
    return;
  }

  return gulp.src(path.join(__dirname, 'coverage/lcov.info'))
    .pipe(plugins.coveralls());
});

