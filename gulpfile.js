var gulp = require('gulp'),
    wrap = require('gulp-wrap'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    spawn = require('child_process').spawn;
 
gulp.task('bower', function (cb) {
    var bower = spawn('bower', ['install']);
    bower.on('close', function (code) {

      if(code !== 0) {
        return cb('Error occured while running bower install');
      }

      cb();
    });
});

gulp.task('copy-to-dist', function () {
  return gulp.src(['keyboardkat.js', 'bower_components/mousetrap/mousetrap.js', 'bower_components/mousetrap/plugins/global-bind/mousetrap-global-bind.js'])
             .pipe(gulp.dest('dist'));

});

gulp.task('embed-mousetrap', ['copy-to-dist', 'bower'], function () {
  return gulp.src(['dist/mousetrap.js', 'dist/mousetrap-global-bind.js', 'dist/keyboardkat.js'])
             .pipe(concat('keyboardkat-combined.js'))
             .pipe(wrap('(function() {\n<%= contents %>\n})();'))
             .pipe(gulp.dest('dist'));
});

gulp.task('publish', ['embed-mousetrap'], function () {
  return gulp.src(['dist/keyboardkat.js', 'dist/keyboardkat-combined.js'])
             .pipe(uglify())
             .pipe(rename({ suffix: '.min' }))
             .pipe(gulp.dest('dist'));
});
