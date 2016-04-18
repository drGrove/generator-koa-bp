'use strict';
var fs = require('fs');
var gulp = require('gulp');

fs.readdirSync('./gulp/tasks').filter(function(file) {
  return (/\.(js|coffee)$/i).test(file);
}).forEach(function(file) {
  require('./gulp/tasks/' + file);
});

gulp.task('prepublish', ['nsp']);
gulp.task('default', ['static', 'test', 'coveralls']);
