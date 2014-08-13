/*jshint node:true*/

'use strict';

var gulp = require('gulp')
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');

gulp.task('default', ['test']);

gulp.task('test', ['lint'], function () {
    return gulp.src('**/*.spec.js', {read: false})
        .pipe(mocha({reporter: 'spec'}));
});

gulp.task('lint', function () {
    return gulp.src(['**/*.js', '!node_modules/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('watch', function () {
    gulp.watch('**/*.spec.js', ['test']);
    gulp.watch('**/*.js', ['test']);
});