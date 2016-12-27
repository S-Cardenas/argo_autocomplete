var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    shell = require('gulp-shell'),
    rename = require('gulp-rename');

gulp.task('copyENV', () => {
  return gulp.src('./src/.sample-env')
    .pipe(rename('.env'))
    .pipe(gulp.dest('./'));
});

gulp.task('serve:Dev', ['webpack', 'start-server']);

gulp.task('webpack', shell.task([
  'npm run webpack'
]));

gulp.task('start-server', shell.task([
  'npm start'
]));
