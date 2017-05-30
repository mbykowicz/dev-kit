var gulp = require('gulp');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');

gulp.task('scripts', function() {
  return gulp.src('src/scripts/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat('app.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'));
});

gulp.task('sass', function() {
  return gulp.src('src/styles/app.sass')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
});

gulp.task('html', function() {
  return gulp.src('src/**/*.html')
    .pipe(gulp.dest('dist'));
});

// gulp.task('images', function() {
//   return gulp.src('src/images/**/*.*')
//     .pipe(gulp.dest('dist/images/'));
// });

gulp.task('vendor', function() {
  return gulp.src('src/vendor/**/*.*')
    .pipe(gulp.dest('dist/vendor'));
});

gulp.task('serve', function () {
  browserSync.init({
    server: 'dist'
  });

  gulp.watch('src/scripts/**/*.js', ['scripts', browserSync.reload]);
  gulp.watch('src/styles/**/*.sass', ['sass']);
//   gulp.watch('src/images/**/*.*', ['images']);
  gulp.watch('src/vendor/**/*.*', ['vendor']);
  gulp.watch('src/**/*.html', ['html', browserSync.reload]);
});

gulp.task('default', ['html', 'sass', 'scripts', /*'images',*/ 'vendor']);
