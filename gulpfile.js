const gulp = require('gulp');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const minify = require('gulp-csso');

gulp.task('css', function() {
    return gulp.src('./assets/sass/tetris.sass')
        .pipe(sass({outputStyle: 'tetris',  onError: console.error.bind(console, 'Sass error:')}))
        .pipe(minify())
        .pipe(gulp.dest('./public/css'));
});

gulp.task('js', function () {
    return gulp.src('./assets/js/**/*.js')
        .pipe(babel())
        .pipe(uglify())
        .pipe(gulp.dest('./public/js'));
});

gulp.task('watch', function () {
    gulp.watch('./assets/sass/*.sass', ['css']);
});

gulp.task('default', ['css', 'js']);
