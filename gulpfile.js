/**
 * Created by yevgen on 31.01.17.
 */

'use strict';

var gulp = require('gulp'),
    cssomin = require('gulp-csso')

gulp.task('style:build', function () {
    gulp.src(path.src.style)
        .pipe(sourcemaps.init())
        .pipe(cssomin())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css)); //И в build
});