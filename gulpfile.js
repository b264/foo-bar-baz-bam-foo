var gulp = require('gulp');
var karma = require('karma').server;
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var path = require('path');
var plumber = require('gulp-plumber');
var runSequence = require('run-sequence');
var jshint = require('gulp-jshint');
var scss = require('gulp-scss');
var concatCss = require('gulp-concat-css');
var templateCache = require('gulp-angular-templatecache');
var eventStream = require('event-stream');

/**
 * File patterns
 **/

// Root directory
var rootDirectory = path.resolve('./');

// Source directory for build process
var sourceDirectory = path.join(rootDirectory, './modules');

var sourceFiles = [

  // Make sure module files are handled first
  path.join(sourceDirectory, '/**/*.module.js'),

  // Then add all JavaScript files
  path.join(sourceDirectory, '/**/*.js')
];

var stylesheets = [
  path.join(sourceDirectory, '/**/*.css'),
  path.join(sourceDirectory, '/**/*.scss')
];

var templates = [
  path.join(sourceDirectory, '/**/*.tpl.html')
];

var lintFiles = [
  'gulpfile.js',
  // Karma configuration
  'karma-*.conf.js'
].concat(sourceFiles);

function getTemplateCache() {
  return gulp.src(templates)
    .pipe(plumber())
    .pipe(templateCache({
      module: 'fooBarBazBamFoo.directives'
    }));
}

gulp.task('build', function() {
  return eventStream.merge(gulp.src(sourceFiles), getTemplateCache())
    .pipe(plumber())
    .pipe(concat('fooBarBazBamFoo.js'))
    .pipe(gulp.dest('./dist/'))
    .pipe(uglify())
    .pipe(rename('fooBarBazBamFoo.min.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('build-stylesheets', function() {
  return gulp.src(stylesheets)
    .pipe(plumber())
    // .pipe(scss({ bundleExec: true }))
    .pipe(scss())
    .pipe(concatCss('fooBarBazBamFoo.css'))
    .pipe(gulp.dest('./dist'));
});

/**
 * Process
 */
gulp.task('process-all', function (done) {
  runSequence('jshint', 'test-src', 'build', done);
});

/**
 * Watch task
 */
gulp.task('watch', function () {

  // Watch JavaScript files
  gulp.watch([sourceFiles, templates], ['process-all']);
  gulp.watch([stylesheets], ['build-stylesheets']);
});

/**
 * Validate source JavaScript
 */
gulp.task('jshint', function () {
  gulp.src(lintFiles)
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

/**
 * Run test once and exit
 */
gulp.task('test-src', function (done) {
  karma.start({
    configFile: __dirname + '/karma-src.conf.js',
    singleRun: true
  }, done);
});

/**
 * Run test once and exit
 */
gulp.task('test-dist-concatenated', function (done) {
  karma.start({
    configFile: __dirname + '/karma-dist-concatenated.conf.js',
    singleRun: true
  }, done);
});

/**
 * Run test once and exit
 */
gulp.task('test-dist-minified', function (done) {
  karma.start({
    configFile: __dirname + '/karma-dist-minified.conf.js',
    singleRun: true
  }, done);
});

gulp.task('default', function () {
  runSequence('process-all', 'build-stylesheets', 'watch');
});
