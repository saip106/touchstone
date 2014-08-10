/*jshint node:true*/

'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');

gulp.task('default', ['test']);

gulp.task('test', ['lint'], function () {
    
});

gulp.task('lint', function () {
    gulp.src(['**/*.js', '!node_modules/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('watch', function () {
    gulp.watch('**/*.spec.js', ['test']);
    gulp.watch('**/*.js', ['test']);
});