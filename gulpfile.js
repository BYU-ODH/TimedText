var gulp = require('gulp');
var del = require('del');
var minifyCSS = require('gulp-csso');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

const BUILD_DIR = 'lib/'
const CSS_BUILD_DIR = `${BUILD_DIR}css/`
const JS_BUILD_DIR = `${BUILD_DIR}js/`
const CSS_DIR = 'css/'
const JS_DIR = 'js/'

const PLAYER_JS = 'timedtext.min.js'
const PLAYER_CSS = 'timedtext.min.css'

// TimedText Needs to explicitly be first
// otherwise CaptionRenderer will fail
const player_scripts = [
  "js/TimedText.js",
  "js/CaptionRenderer.js",
  "js/TextTrack.js",
  "js/TextTrackCue.js",
  "js/plugins/*.js"
]
const player_css = "css/timed-text.css"

gulp.task('css', function(){
  return gulp.src(player_css, {base: CSS_DIR})
    .pipe(concat(PLAYER_CSS))
    .pipe(minifyCSS())
    .pipe(gulp.dest(CSS_BUILD_DIR))
});

gulp.task('js', function(){
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

gulp.task('default', gulp.series('js', 'css'))
