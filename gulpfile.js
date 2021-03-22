const { src, dest, watch, series, parallel } = require('gulp');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const newer = require('gulp-newer');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');



function browsersync() {
  browserSync.init({
    server: {
      baseDir: "./dist/"
    },
    online: true
  });
}

function html() {
  return src('src/pug/*.pug')
    .pipe(pug({ pretty: true }))
    .pipe(dest('dist/'))
    .pipe(browserSync.stream());
}

function style() {
  return src('src/scss/main.scss')
  .pipe(concat('main.min.css'))
    .pipe(sass())
    .pipe(autoprefixer({ overrideBrowserlist: ['last 10 versions'], grid: true }))
    .pipe(dest('dist/'))
    .pipe(browserSync.stream());
}

function scripts() {
  return src('src/js/**.js')
    .pipe(concat('main.min.js'))
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(dest('dist/'))
    .pipe(browserSync.stream())
}

function images() {
  return src('src/img/**/*')
    .pipe(newer('dist/img/'))
    .pipe(imagemin())
    .pipe(dest('dist/img/'))
}

function startwatch() {
  watch('src/pug/**/*.pug', html)
  watch('src/scss/**/*.scss', style)
  watch('src/js/**/*.js', scripts)
  watch('src/img/**/*', images)
}


exports.browsersync = browsersync;
exports.html = html;
exports.style = style;
exports.scripts = scripts;
exports.images = images;
exports.startwatch = startwatch;

exports.default = parallel(html, style, scripts, images, browsersync, startwatch);