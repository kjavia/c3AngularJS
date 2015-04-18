var gulp = require('gulp')
  , jshint = require('gulp-jshint')
  , concat = require('gulp-concat')
  , uglify = require('gulp-uglify')
  , gulp_rename = require('gulp-rename')
  , haml = require('gulp-ruby-haml');

gulp.task('ngdocs', [], function () {
  var gulpDocs = require('gulp-ngdocs')
    , options = {
      scripts: [
        'src/c3-charts.module.js',
        'src/directives/chart.directive.js'
      ]
    };
  return gulp.src('src/**/*.js')
    .pipe(gulpDocs.process(options))
    .pipe(gulp.dest('docs'));
});

gulp.task('jshint', function () {
    gulp.src('src/**/*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('src-scripts', function() {
  return gulp.src('src/**/*.js')
    .pipe(concat('c3-charts.angular.js'))
    .pipe(gulp.dest('dist'))
    // this assumes that the gh-pages branch working folder is one level up.
    // gh-pages branch is for the demo app.
    .pipe(gulp.dest('../c3AngularJSDemo/js'))
    .pipe(gulp_rename('c3-charts.angular.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['ngdocs', 'src-scripts'], function(){});
