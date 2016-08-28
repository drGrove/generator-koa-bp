'use strict';
const gulp = require('gulp');
const path = require('path');
const nsp = require('gulp-nsp');

gulp.task('nsp', function(cb) {
  nsp({package: path.resolve('package.json'), stopOnError: true}, cb);
});
