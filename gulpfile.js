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
    .pipe(gulp.dest('htdocs/js'))
    .pipe(gulp_rename('c3-charts.angular.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('src-demo', function() {
  return gulp.src('htdocs/scripts/**/*.js')
    .pipe(concat('app.js'))
    .pipe(gulp.dest('htdocs/js'));
});

gulp.task('haml', function() {
 return gulp.src('htdocs/haml/**/*.haml', {read: true}).
       pipe(haml()).
       pipe(gulp.dest('htdocs'));
});

// Watch for changes in Haml files
// gulp.task('haml-watch', function() {
//   gulp.src('htdocs/haml/**/*.haml', {read: false}).
//        pipe(watch()).
//        pipe(haml()).
//        pipe(gulp.dest('htdocs'));
// });

gulp.task('default', ['ngdocs', 'src-scripts', 'src-demo', 'haml'], function(){});
