var gulp = require('gulp')
  , jshint = require('gulp-jshint')
  , concat = require('gulp-concat')
  , uglify = require('gulp-uglify')
  , gulp_rename = require('gulp-rename')
  , haml = require('gulp-ruby-haml');


gulp.task('jshint', function () {
    gulp.src('scripts/src/*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('scripts', function() {
  return gulp.src('scripts/src/*.js')
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./js'));
});

gulp.task('haml', function() {
 return gulp.src('haml/**/*.haml', {read: true}).
       pipe(haml()).
       pipe(gulp.dest('.'));
});

// Watch for changes in Haml files
// gulp.task('haml-watch', function() {
//   gulp.src('htdocs/haml/**/*.haml', {read: false}).
//        pipe(watch()).
//        pipe(haml()).
//        pipe(gulp.dest('htdocs'));
// });

gulp.task('default', ['scripts', 'haml'], function(){});
