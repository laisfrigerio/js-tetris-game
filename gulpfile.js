const gulp = require('gulp');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const minify = require('gulp-csso');

function css() {
  return gulp.src('./assets/sass/tetris.sass')
    .pipe(sass({outputStyle: 'tetris',  onError: console.error.bind(console, 'Sass error:')}))
    .pipe(minify())
    .pipe(gulp.dest('./public/css'));
}

function js() {
  return gulp.src('./assets/js/**/*.js')
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest('./public/js'));
}

exports.css = css;
exports.js = js;
exports.default = gulp.parallel(css, js);
