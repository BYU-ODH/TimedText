var gulp = require('gulp');
var del = require('del');
var minifyCSS = require('gulp-csso');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

const BUILD_DIR = 'build/'
const CSS_BUILD_DIR = `${BUILD_DIR}css/`
const JS_BUILD_DIR = `${BUILD_DIR}js/`
const CSS_DIR = 'css/'
const JS_DIR = 'js/'

const PLAYER_JS = 'player_timedtext.min.js'
const PLAYER_CSS = 'player_timedtext.min.css'

gulp.task('playercss', function(){
  return gulp.src(player_css, {base: CSS_DIR})
    .pipe(concat(PLAYER_CSS))
    .pipe(minifyCSS())
    .pipe(gulp.dest(CSS_BUILD_DIR))
});

gulp.task('playerjs', function(){
  return gulp.src(player_scripts, {base: JS_DIR})
    .pipe(sourcemaps.init())
    .pipe(concat(PLAYER_JS))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(JS_BUILD_DIR))
});

gulp.task('clean', function() {
  return del([BUILD_DIR])
})

gulp.task('player', gulp.series('playerjs', 'playercss'))
gulp.task('default', gulp.series('player'))

const player_css = "css/timed-text.css"

const player_scripts = [
  "js/TimedText.js",
  "js/CaptionRenderer.js",
  "js/TextTrack.js",
  "js/TextTrackCue.js",
  "js/plugins/WebVTT.js",
  "js/plugins/SRT.js",
  "js/plugins/STL.js",
  "js/plugins/SUB.js",
  "js/plugins/SBV.js",
  "js/plugins/LRC.js",
  "js/plugins/TTML.js",
  "js/plugins/SSAv4.js"
]
