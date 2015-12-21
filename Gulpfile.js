var gulp = require('gulp');
// var watch = require('gulp-watch');
var sass = require('gulp-sass');
var babel = require("gulp-babel");
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;

gulp.task('sass', function () {
  gulp.src('./assets/sass/**/*.scss')
    .pipe(sass({
      includePaths: [
        'node_modules/foundation-sites/scss',
        'node_modules/motion-ui/src'
      ]
    }).on('error', sass.logError))
    .pipe(gulp.dest('./assets/css'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./assets/sass/**/*.scss', ['sass']);
});

// gulp.task('js:babel', function () {
//   gulp.watch('./assets/js/**/*.js', ['js']);
// });
// gulp.task("js", function () {
//   return gulp.src("./assets/js/app.js")
//     .pipe(babel())
//     .pipe(gulp.dest("./assets/build/js"));
// });

gulp.task('browser-sync', function() {
  browserSync.init({
      open: false,
      proxy: "http://localhost:2368/",
      port: 2369,
  });

  gulp.watch(['*.hbs', '**/*.hbs']).on("change", browserSync.reload);
});

gulp.task('default', ['sass:watch', 'browser-sync']);

gulp.task('build', ['sass']);