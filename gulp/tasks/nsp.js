'use strict';
var gulp = require('gulp');
var path = require('path');
var config = require('../config');
var plugins = require('../plugins');

gulp.task('nsp', function(cb) {
  nsp({package: path.resolve('package.json')}, cb);
});
