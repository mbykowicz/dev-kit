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
  return gulp.src('src/index.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('serve', function () {
  browserSync.init({
    server: 'dist'
  });

  gulp.watch('src/scripts/**/*.js', ['scripts', browserSync.reload]);
  gulp.watch('src/styles/**/*.sass', ['styles']);
  gulp.watch('src/index.html', ['html', browserSync.reload]);
});

gulp.task('default', ['html', 'sass', 'scripts']);
