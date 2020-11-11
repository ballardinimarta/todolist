let gulp = require('gulp');
let sass = require('gulp-sass');
let csso = require('gulp-csso');
let rename = require('gulp-rename');

gulp.task('default', function() {
    
    return gulp.src('sass/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('css'));
});

gulp.task('minify', function() {
    return gulp.src('css/*.css')
        .pipe(csso())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('dist'))

});