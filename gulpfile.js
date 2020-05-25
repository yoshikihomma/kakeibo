const gulp = require('gulp');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const babel = require('gulp-babel');
const browserSync = require('browser-sync');

gulp.task('sass', () => {
  const sass = require('gulp-sass')
  return gulp
    .src('./src/sass/*.scss')
    .pipe(sass())
    .pipe( postcss([ autoprefixer(
      {
        // ☆IEは11以上、Androidは4.4以上
        // その他は最新2バージョンで必要なベンダープレフィックスを付与する
        "overrideBrowserslist": ["last 2 versions", "ie >= 11", "Android >= 4"],
        cascade: false}
    ) ]) )
    .pipe(gulp.dest('./dist/css'))
})

gulp.task('babel', () => {
  return gulp.src('./src/js/*.js')
      .pipe(babel({
          presets: ['@babel/preset-env']
      }))
      .pipe(gulp.dest('./dist/js'));
});

gulp.task('serve', done => {
  browserSync.init({
    server: {
      baseDir: './dist',
      index: 'index.html',
    },
  })
  done()
})

gulp.task('browserReload', (done) => {
  browserSync.reload();
  done();
});

gulp.task('watch', () => {
  gulp.watch('./src/sass/*.scss', gulp.series('sass'));
  gulp.watch('./src/sass/*.scss', gulp.task('browserReload'));
  gulp.watch('./src/js/*.js', gulp.series('babel'));
  gulp.watch('./src/js/*.js', gulp.task('browserReload'));
  gulp.watch('./dist/*.html', gulp.task('browserReload'));
})

gulp.task('default', gulp.series(gulp.parallel('serve', 'watch')))