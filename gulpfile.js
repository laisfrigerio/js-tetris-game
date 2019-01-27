const gulp = require('gulp');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const minify = require('gulp-csso');
const concat = require('gulp-concat');

function css() {
  return gulp.src('./assets/sass/tetris.sass')
    .pipe(sass({outputStyle: 'tetris',  onError: console.error.bind(console, 'Sass error:')}))
    .pipe(minify())
    .pipe(concat('app.css'))
    .pipe(gulp.dest('./public/css'));
}

function js() {
  const base_path = './assets/js/';
  const files = [
    base_path + 'tetrominoes.js',
    base_path + 'const.js',
    base_path + 'Square.js',
    base_path + 'Board.js',
    base_path + 'Piece.js',
    base_path + 'Timer.js',
    base_path + 'tetris.js'
  ];
  
  return gulp.src(files)
    .pipe(concat('app.js'))
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest('./public/js'));
}

exports.css = css;
exports.js = js;
exports.default = gulp.parallel(css, js);
