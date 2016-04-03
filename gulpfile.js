var gulp = require('gulp');
var deploy = require('gulp-gh-pages');
var del = require('del');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglifyjs');
var webserver = require('gulp-webserver');

var config = {
  assetsDir: './assets',
  bowerDir: './bower_components',
  HTMLDir: './html',
  publicDir: './public',
};

gulp.task('clean:public', function(cb) {
  del([
    config.publicDir + '/*',
    '!' + config.publicDir + '/CNAME',
  ], cb);
});

gulp.task('assets', function() {
  return gulp.src(config.assetsDir + '/**')
  .pipe(gulp.dest(config.publicDir));
});

gulp.task('icons', function() {
  return gulp.src(config.bowerDir + '/fontawesome/fonts/**.*')
  .pipe(gulp.dest(config.publicDir + '/fonts'));
});

gulp.task('html', function() {
  return gulp.src(config.HTMLDir + '/**')
  .pipe(gulp.dest(config.publicDir));
});

gulp.task('js', function() {
  return gulp.src([
    config.bowerDir + '/jquery/dist/jquery.min.js',
    config.bowerDir + '/bootstrap-sass-official/assets/javascripts/bootstrap.js',
  ])
  .pipe(uglify('app.js', {
    compress: false,
    outSourceMap: true,
  }))
  .pipe(gulp.dest(config.publicDir + '/js'));
});

gulp.task('css', function() {
  return gulp.src('css/app.scss')
  .pipe(sourcemaps.init())
  .pipe(sass({
    style: 'compressed',
    includePaths: [
      config.bowerDir + '/bootstrap-sass-official/assets/stylesheets',
      config.bowerDir + '/fontawesome/scss',
    ]
  }))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(config.publicDir + '/css'));
});

gulp.task('deploy', function () {
  return gulp.src(config.publicDir + '/**/*')
  .pipe(deploy());
});

gulp.task('build', function (cb) {
  runSequence('clean:public', ['assets', 'icons', 'css', 'js', 'html'], cb);
});

gulp.task('watch', function () {
  gulp.watch(['html/**/*', 'assets/**/*', 'bower_components/**/*', 'css/**/*'], ['build']);
});

gulp.task('serve', function() {
  gulp.src('public')
    .pipe(webserver({
      host: '0.0.0.0',
      port: 6772,
      livereload: {enable: true, port: 2345},
      open: true,
    }));
});

gulp.task('default', ['watch', 'serve']);
