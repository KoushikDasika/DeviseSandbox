var configuration = {
      'sass'         : {
        'src'        : [ './app/assets/stylesheets/application.scss' ]
      , 'dest'       : './public/assets/stylesheets'
      }
    , 'coffeescript' : {
        'src'        : ['./app/assets/javascripts/application.js']
      , 'dest'       : './public/assets/javascripts'
      , 'output'     : './public/assets/javascripts/bundled.js'
      , 'test'       : './public/assets/test'
      }
    , 'bower'        : {
        'dest'       : './public/assets/bower_components'
      }
    }
  , browserify = require('browserify')
  , browserSync = require('browser-sync')
  , coffee     = require('gulp-coffee')
  , concat     = require('gulp-concat')
  , connect    = require('gulp-connect')
  , del        = require('del')
  , fs         = require('fs')
  , gulp       = require('gulp')
  , gutil      = require('gulp-util')
  , minimist   = require('minimist')
  , pp         = require('preprocess')
  , replace    = require('gulp-replace-task')
  , sass       = require('gulp-sass')
  , source     = require('vinyl-source-stream')
  , transform  = require('vinyl-transform')
  , util       = require('util')
;

var defaultGulpOptions = {
  string: 'env',
  default: {env: process.env.RAILS_ENV || 'development'}
};
var options = minimist(process.argv.slice(2), defaultGulpOptions);

gulp.task('browserify', function() {
  var browserified = transform(function(filename) {
    var b = browserify(filename);
    return b.bundle();
  });

  return gulp.src(configuration.coffeescript.src)
    //.pipe(coffee())
    //.on('error', gutil.log)
    .pipe(browserified)
    .on('error', gutil.log)
    .pipe(concat('bundled.js'))
    .pipe(gulp.dest(configuration.coffeescript.dest));
});

gulp.task('browser-sync', function() {
    browserSync({
      proxy: "localhost:3000"
    });
});

gulp.task('clean', function(cb) {
  return del(['public/assets/javascripts/*'], cb);
});

gulp.task('connect', function () {
  connect.server({
    root: 'app/',
    port: 8888
  });
});


gulp.task('testJS', function() {
  var processedVars = pp.preprocessFileSync("./environmental_variables.js", "./tmp/output.json", {RAILS_ENV: 'test'});

  var jsonVars = JSON.parse(fs.readFileSync("./tmp/output.json"));

  return gulp.src(configuration.coffeescript.src)
    //.pipe(coffee())
    //.on('error', gutil.log)
    .pipe(browserified)
    .on('error', gutil.log)
    .pipe(concat('bundled.js'))
    .pipe(replace({
      patterns: [{
        json: jsonVars
      }],
      usePrefix: false
    }))
    .pipe(gulp.dest(configuration.coffeescript.test));
});

/*
 * Usage:
 * terminal$ gulp replace --env staging
 * terminal$ gulp replace --env production
 * builds for development by default
*/

gulp.task('replace', ['browserify'], function() {
  var processedVars = pp.preprocessFileSync("./environmental_variables.js", "./tmp/output.json", {RAILS_ENV: options.env});

  var jsonVars = JSON.parse(fs.readFileSync("./tmp/output.json"));

  return gulp.src(configuration.coffeescript.output)
    .pipe(replace({
      patterns: [{
        json: jsonVars
      }],
      usePrefix: false
    }))
    .pipe(gulp.dest(configuration.coffeescript.dest))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('sass',function() {
  return gulp.src(configuration.sass.src)
    .pipe(sass())
    .on('error', gutil.log)
    .pipe(gulp.dest(configuration.sass.dest))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('watch', ['watch-sass', 'watch-js'],  function() {});

gulp.task('watch-js', function() {
   gulp.watch('./app/assets/javascripts/**/*.{js,html}', ['replace']); 
});

gulp.task('watch-sass', function() {
   gulp.watch('./app/assets/stylesheets/**/*.{sass,scss}', ['sass']); 
});

gulp.task('default', ['clean', 'sass', 'browserify', 'watch'],  function() {
});
