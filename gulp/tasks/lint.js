'use strict';
var gulp = require('gulp');
var config = require('../config');
var excludeGitignore = require('gulp-exclude-gitignore');
var eslint = require('gulp-eslint');

gulp.task('lint', function() {
  return gulp.src([
    config.Paths.ALL_JS,
    config.Paths.IGNORE_GENERATOR_TEMPLATES
  ])
  .pipe(excludeGitignore())
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
});
