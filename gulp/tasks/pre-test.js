'use strict';
var gulp = require('gulp');
var config = require('../config');
var plugins = require('../plugins');

gulp.task('pre-test', function() {
  return gulp.src([
    config.Paths.GENERATORS,
    config.Paths.IGNORE_GENERATOR_TEMPLATES
  ])
  .pipe(plugins.excludeGitignore())
  .pipe(plugins.istanbul({
    includeUntested: true
  }))
  .pipe(plugins.istanbul.hookRequire());
});
