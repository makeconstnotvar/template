let path = require('path'),
  gulp = require('gulp'),
  sourcemaps = require('gulp-sourcemaps'),
  sass = require('gulp-sass')(require('sass')),
  clean = require('gulp-clean-css'),
  autoprefixer = require('gulp-autoprefixer'),
  hash = require('gulp-hash'),
  inject = require('gulp-inject'),
  del = require('del');

const styles = ['src/styles/styles.scss', 'src/styles/grafana.scss'],
  apps = ['admin', 'reports', 'scheme', 'wall'];

const getTasks = name => apps.map(app => `${app}-${name}`);

apps.forEach(function (app) {
  const destination = `build/${app}`;

  gulp.task(`${app}-inject`, function () {
    let sources = gulp.src([`build/${app}/scripts/*.js`, `build/${app}/styles/*.css`], {read: false});

    return gulp.src('src/assets/index.html')
      .pipe(inject(sources, {ignorePath: `/build`}))
      .pipe(gulp.dest(destination));
  });

  gulp.task(`${app}-copy`, function () {
    return gulp.src(['src/assets/**/*', '!src/assets/index.html']).pipe(gulp.dest(destination));
  });
})

gulp.task('styles-release', function () {
  return gulp.src(styles)
    .pipe(sourcemaps.init())
    .pipe(sass({importer: tildaResolver}).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(hash())
    .pipe(clean())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('build/admin/styles'))
    .pipe(gulp.dest('build/reports/styles'))
    .pipe(gulp.dest('build/scheme/styles'))
    .pipe(gulp.dest('build/wall/styles'));
});

gulp.task('styles-debug', function () {
  return gulp.src(styles)
    .pipe(sourcemaps.init())
    .pipe(sass({importer: tildaResolver}).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('build/admin/styles'))
    .pipe(gulp.dest('build/reports/styles'))
    .pipe(gulp.dest('build/scheme/styles'))
    .pipe(gulp.dest('build/wall/styles'));
});
gulp.task(`styles-delete`, function () {
  return del(['build/**/*.css', 'build/**/*.css.map'])
});

gulp.task('watch', gulp.series('styles-delete', 'styles-debug', function () {
  return gulp.watch(['src/styles/**/*.scss'], gulp.series('styles-debug'));
}));

gulp.task('debug', gulp.series('styles-debug', ...getTasks('copy'), ...getTasks('inject')));

gulp.task('release', gulp.series('styles-release', ...getTasks('copy'), ...getTasks('inject')));

gulp.task('clean', function () {
  return del(['build/**/*'])
});


function tildaResolver(url, prev, done) {
  if (url[0] === '~') {
    url = path.resolve('node_modules', url.substr(1));
  }
  return {file: url};
}