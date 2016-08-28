'use strict';
var gulp = require('gulp');
var config = require('../config');
var excludeGitignore = require('gulp-exclude-gitignore');
var istanbul = require('gulp-istanbul');

gulp.task('pre-test', function() {
  return gulp.src([
    config.Paths.GENERATORS,
    config.Paths.IGNORE_GENERATOR_TEMPLATES
  ])
  .pipe(excludeGitignore())
  .pipe(istanbul({
    includeUntested: true
  }))
  .pipe(istanbul.hookRequire());
});
