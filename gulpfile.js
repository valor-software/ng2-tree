'use strict';

const gulp = require('gulp');
const stylus = require('stylus');
const ghPages = require('gulp-gh-pages');
const gitignore = require('gulp-gitignore');
const gulpStylus = require('gulp-stylus');

const SAME_DIRECTORY = '.';

gulp.task('stylus', () => {
  return gulp.src('**/*.styl')
    .pipe(gitignore())
    .pipe(gulpStylus({
      define: {
        url: stylus.resolver()
      }
    }))
    .pipe(gulp.dest(SAME_DIRECTORY));
});

gulp.task('watch:stylus', () => {
  gulp.watch('**/*.styl', ['stylus']);
});

gulp.task('deploy', function() {
  return gulp.src('./build/**/*')
    .pipe(ghPages());
});
