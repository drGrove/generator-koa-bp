'use strict';
var gulp = require('gulp');
var config = require('../config');
var plugins = require('../plugins');

gulp.task('static', function() {
  return gulp.src([
    config.Paths.ALL_JS,
    config.Paths.IGNORE_GENERATOR_TEMPLATES
  ])
  .pipe(plugins.excludeGitignore())
  .pipe(plugins.eslint())
  .pipe(plugins.eslint.format())
  .pipe(plugins.eslint.failAfterError());
});
