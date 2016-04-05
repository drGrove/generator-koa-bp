'use strict';
var gulp = require('gulp');
var config = require('../config');

gulp.task('watch', function() {
  gulp.watch([
    config.Paths.GENERATORS,
    config.Paths.TESTS
  ], ['test']);
});
