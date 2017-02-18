'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var babel = require("gulp-babel");
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;
let fs = require('fs');

gulp.task('sass', function () {
  gulp.src('./assets/sass/**/*.scss')
    .pipe(sass({
      includePaths: [
        'node_modules/foundation-sites/scss',
        'node_modules/motion-ui/src'
      ]
    })
    .pipe(sass({outputStyle: 'compressed'}))
    .on('error', sass.logError))
    .pipe(gulp.dest('./assets/css'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./assets/sass/**/*.scss', ['sass']);
});

gulp.task('js:watch', function () {
  gulp.watch('./assets/javascript/**/*.js', ['js']);
});

gulp.task("js", function () {
  return gulp.src("./assets/javascript/**/*.js")
    .pipe(babel())
    .pipe(gulp.dest("./assets/js"));
});

gulp.task('dependencies', () => {
  const files = [
    {target: {
      folder: './assets/js', file: 'foundation.min.js'
    }, origin: './node_modules/foundation-sites/dist/foundation.min.js'},
  ];

  files.forEach((file) => {
    fs.stat(`${file.target.folder}/${file.target.file}`, function(err, stat) {
      if(err == null) {
          console.log('File exists');
      } else {
        gulp.src(file.origin)
          .pipe(gulp.dest(file.target.folder));
      }
    });
  });
});

gulp.task('browser-sync', function() {
  browserSync.init({
      open: false,
      proxy: "http://localhost:2368/",
      port: 2369,
  });

  gulp.watch(['*.hbs', '**/*.hbs', './assets/css/**/*.css', './assets/js/*.*']).on("change", browserSync.reload);
});

gulp.task('default', ['dependencies', 'sass:watch', 'js:watch', 'browser-sync']);

gulp.task('build', ['dependencies', 'sass', 'js']);
