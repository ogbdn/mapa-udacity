const gulp = require('gulp');
const browserSync = require('browser-sync')
  .create();
const sass = require('gulp-sass');

//compile sass
//https://www.npmjs.com/package/gulp-sass

gulp.task('sass', function () {
  return gulp.src('src/scss/*.scss')
    .pipe(sass()
      .on('error', sass.logError))
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.stream());
});

//Watch and Serve

gulp.task('serve', ['sass'], function () {
  browserSync.init({
    server: './src'
  })
});

gulp.watch('src/scss/*.scss', ['sass']);
gulp.watch('src/*.htlm')
  .on('change', browserSync.reload);


//Default

gulp.task('default', ['serve']);
