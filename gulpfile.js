'use strict';

var gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    cssomin = require('gulp-csso'),
    min = require('gulp-minify-css'),
    concatCss = require('gulp-concat-css'),
    uglify = require('gulp-uglify'),
    concatJs = require('gulp-concat'),
    browserSync = require("browser-sync"),
    watch = require('gulp-watch'),
    reload = browserSync.reload;

            var path = {
                build: {
                    html: 'build/',
                    js: 'build/js/',
                    css: 'build/css/'
                },
                src: {
                    html: 'src/*.html',
                    js: 'src/js/main.js',
                    allJs: 'src/js/**/*.js',
                    scss: 'src/scss/main.scss',
                    css: 'src/css/*.css'
                },
                watch: {
                    html: 'src/**/*.html',
                    js: 'src/js/**/*.js',
                    scss: 'src/scss/**/*.scss',
                    css: 'src/css/**/*.css'
                }
            };

var config = {
    server: {
        baseDir: "./build"
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "APP_LOGGER"
};

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.scss], function(event, cb) {
        gulp.start('scss:build');
    });
    watch([path.watch.css], function(event, cb) {
        gulp.start('css:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
});

gulp.task('html:build', function () {
    gulp.src(path.src.html)
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});

gulp.task('scss:build', function () {
    gulp.src(path.src.scss)
        .pipe(sass())
        .pipe(sourcemaps.init())
        .pipe(min())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
});

gulp.task('css:build', function () {
    gulp.src(path.src.css)
        .pipe(sourcemaps.init())
        .pipe(concatCss('all.css'))
        .pipe(cssomin())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
});

gulp.task('js:build', function () {
    gulp.src(path.src.allJs)
        .pipe(concatJs('all.js'))
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});

gulp.task('build', [
    'html:build',
    'scss:build',
    'css:build',
    'js:build'
]);

gulp.task('default', ['build', 'webserver', 'watch']);