'use strict';

const gulp = require('gulp');
const stylus = require('gulp-stylus');
const gitignore = require('gulp-gitignore');
const ghPages = require('gulp-gh-pages');

const SAME_DIRECTORY = '.';

gulp.task('stylus', () => {
  return gulp.src('**/*.styl')
    .pipe(gitignore())
    .pipe(stylus())
    .pipe(gulp.dest(SAME_DIRECTORY));
});

gulp.task('watch:stylus', () => {
  gulp.watch('**/*.styl', ['stylus']);
});

gulp.task('deploy', function() {
  return gulp.src('./build/**/*')
    .pipe(ghPages());
});
