var gulp = require('gulp');
var stylus = require('gulp-stylus');
var browserSync = require('browser-sync');
var autoprefixer = require('autoprefixer-stylus')
var gulpStylint = require('gulp-stylint');
var reload = browserSync.reload;

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

gulp.task('compile-css', function(){
  return gulp.src('./css/style.styl')
    .pipe(gulpStylint())
    .pipe(gulpStylint.reporter())
    .pipe(stylus({
      use: [autoprefixer()]
    }))
    .pipe(gulp.dest('./css/build'))
    .pipe(reload({stream:true}));
});

gulp.task('watch', function(){
  gulp.watch('./css/style.styl', ['compile-css']);
  gulp.watch('./index.html', ['browser-sync']);
});

gulp.task('default', ['browser-sync', 'watch']);