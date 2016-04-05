'use strict';
var gulp = require('gulp');
var path = require('path');
var plugins = require('../plugins');

gulp.task('nsp', function(cb) {
  plugins.nsp({package: path.resolve('package.json'), stopOnError: true}, cb);
});
