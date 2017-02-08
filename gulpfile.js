'use strict';

const gulp = require('gulp');
const ghPages = require('gulp-gh-pages');

gulp.task('deploy', function() {
  return gulp.src('./demo-dist/**/*')
    .pipe(ghPages());
});
