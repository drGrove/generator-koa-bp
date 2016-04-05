'use strict';
var gulp = require('gulp');
var config = require('../config');
var plugins = require('../plugins');

gulp.task('watch', function() {
  gulp.watch([
    config.Paths.GENERATORS,
    config.Paths.TESTS
  ], ['test']);
});
