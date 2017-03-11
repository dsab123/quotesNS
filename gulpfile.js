//Gulpfile

var gulp = require('gulp');
var gutil = require('gulp-util');
var gbabel = require('gulp-babel');
var gstripDebug = require('gulp-strip-debug');

gulp.task('js', function() {
    return gulp.src('src/**/*.js')
        .pipe(gbabel({
            presets: ['es2015', 'stage-2']
        }))
        .pipe(gstripDebug())
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['js']);
