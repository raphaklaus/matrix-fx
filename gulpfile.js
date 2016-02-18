var gulp = require('gulp');
var stylus = require('gulp-stylus');
var browserSync = require('browser-sync');
var autoprefixer = require('autoprefixer-stylus');
var minifyCss = require('gulp-minify-css');
var gulpStylint = require('gulp-stylint');
var reload = browserSync.reload;
var del = require('del');

gulp.task('clean', function(){
  return del(['build']);
});

gulp.task('browser-sync', function(){
  browserSync({
    server:{
      baseDir: ""
    }
  })
});

gulp.task('refresh-browser', function(){
  reload({stream:true});
})

gulp.task('compile-css', ['clean'], function(){
  return gulp.src('./css/style.styl')
    .pipe(gulpStylint())
    .pipe(gulpStylint.reporter())
    .pipe(stylus({
      use: [autoprefixer()]
    }))
    .pipe(gulp.dest('./css/build'))
    .pipe(reload({stream:true}));
});

gulp.task('dist', function(){
  return gulp.src('./css/build/style.css')
    .pipe(minifyCss())
    .pipe(gulp.dest('./css/build/'));
});

gulp.task('watch', function(){
  gulp.watch('./css/style.styl', ['compile-css', 'dist']);
  gulp.watch('./index.html', ['browser-sync']);
});

gulp.task('default', ['browser-sync', 'watch']);