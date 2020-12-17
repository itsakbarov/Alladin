var gulp = require('gulp'); 
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var del = require('del');

var p = require('./package.json');

// Clean
gulp.task('clean', function(callback) {
    del(['dist/ga-basic-slider-*.js'], callback);
});

// Scripts
gulp.task('scripts', ['clean'], function() {
    return gulp.src('src/ga-basic-slider.js')
        .pipe(rename('ga-basic-slider-' + p.version + '.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('ga-basic-slider-' + p.version + '-min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

// Watch
gulp.task('watch', function() {
    gulp.watch('src/ga-basic-slider.js', ['scripts']);
});

// Default Task
gulp.task('default', ['scripts', 'watch']);