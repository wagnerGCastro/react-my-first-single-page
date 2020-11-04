'use strict';

/**
 * Abaixo com a versão Gulp 4
 * Referencias:
 * https://gist.github.com/atelic/8eb577e87a477a0fb411
 */

var gulp             = require('gulp');
// var gulpJshint    = require('gulp-jshint');
// var gulpBabel        = require('gulp-babel');
// var gulpPlumber      = require('gulp-plumber')
// var gulpClean        = require('gulp-clean');
// var gulpConcat       = require('gulp-concat');
// var gulpUglify       = require('gulp-uglify');
// var eventStream      = require('event-stream');
// var htmlmin        = require('gulp-htmlmin');
// var cleanCSS         = require('gulp-clean-css');
// var runSequence   = require('gulp4-run-sequence');
// var gulpCount        = require('gulp-count');
// var gulpRename       = require('gulp-rename');
var gulpSass         = require('gulp-sass');
// var pipeline      = require('readable-stream').pipeline;
// var copy          = require('copy').pipeline;
// var gulpCssMin       = require('gulp-cssmin');
// var gulpMinifyCss    = require('gulp-minify-css');
var gulpAutoprefixer = require('gulp-autoprefixer');
var gulpSourcemaps   = require('gulp-sourcemaps');
var gulpMerge        = require('merge-stream');
// var gulpWebp         = require('gulp-webp');


/**
 * Copy sass Bootstrap e mdbootstrap
 */
gulp.task('copy-sass-bs', gulp.series( function () {
    var firstPath =  gulp.src(
        [ 'node_modules/bootstrap/less/**/*'], { allowEmpty: true }  
    )
    .pipe(gulp.dest('public/assets/sass/elements/bootstrap/less'));

    var secondPath =  gulp.src(
        [ 'node_modules/bootstrap/fonts/**/*'], { allowEmpty: true }  
    )
    .pipe(gulp.dest('public/assets/sass/elements/bootstrap/fonts'));
    return gulpMerge(firstPath, secondPath);
 }));


// Sass
gulp.task('sass', gulp.series( function(callback) {
    return gulp.src('public/assets/sass/**/*.scss')
        .pipe( gulpSass().on('error', gulpSass.logError) )
        .pipe( gulpSass({outputStyle: 'nested'}).on('error', gulpSass.logError))
        .pipe( gulpAutoprefixer(
            {
                overrideBrowserslist: ['last 25 versions'],
                cascade: false
            }
        ))
        .pipe(gulp.dest('public/assets/css'))

        callback();
}));



// Default
gulp.task('default', gulp.series( function() {
    gulp.watch([ 'public/assets/sass/**/*.scss',  ], gulp.parallel(['sass']  ));
}));
