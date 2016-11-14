'use strict';

const gulp = require('gulp');
const ghPages = require('gulp-gh-pages');
const tslint = require('gulp-tslint');
const gitignore = require('gitignore-to-glob')();

gitignore.push('!node_modules/**/*');
gitignore.push('**/*.ts');

gulp.task('tslint', () =>
  gulp
    .src(gitignore)
    .pipe(tslint({
      formatter: 'verbose',
      emitError: true,
      summarizeFailureOutput: true,
      reportLimit: 50
    }))
    .pipe(tslint.report())
);

gulp.task('lint', ['tslint']);

gulp.task('deploy', function() {
  return gulp.src('./demo-build/**/*')
    .pipe(ghPages());
});
