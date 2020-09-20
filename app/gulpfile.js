var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css')
var sourcemaps = require('gulp-sourcemaps');
var babelify = require('babelify');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();
var autoprefix = require("gulp-autoprefixer");
var browserify = require('browserify');
var minifyCSS = require('gulp-minify-css');
var clean = require('gulp-clean');
var minify = require('gulp-minify');
var log = require('fancy-log');
var source = require('vinyl-source-stream');
var rename = require('gulp-rename');
var streamify = require('gulp-streamify');

var proxyAddress = 'http://localhost:8888/';

var paths = {
	sass: {
		src: 'src/assets/scss/*.scss',
		dest: '../public_html/assets/css',
	},
	js: {
		src: 'src/index.js',
		dest: '../public_html/assets/js/',
	},
}

function swallowError(error) {
	log.error(error.toString());
	this.emit('end');
}

/**
 * Browsersync task
 */
gulp.task('browserSync', function() {
	browserSync.init({
		proxy: proxyAddress
	})
})

/**
 * SASS task
 */
gulp.task('sass', function() {
	return gulp.src(paths.sass.src)
		.pipe(sass({
			sourcemaps: true,
			outputStyle: 'compressed',
		}))
		.on('error', swallowError)
		.pipe(autoprefix("last 2 versions"))
		.on('error', swallowError)
		.pipe(cleanCSS())
		.on('error', swallowError)
		.pipe(rename('app.min.css'))
		.pipe(gulp.dest(paths.sass.dest))
		.pipe(browserSync.stream({once:true}))
})

/**
 * JS development task
 */
gulp.task('js-dev', function() {
	return browserify(paths.js.src)
		.transform(babelify, {presets: ["@babel/preset-env", "@babel/react"]})
		.on('error', swallowError)
		.bundle()
		.on('error', swallowError)
		.pipe(source('app.js'))
		.pipe(gulp.dest(paths.js.dest))
		.pipe(rename('app.min.js'))
		.pipe(streamify(concat('app.min.js')))
		.pipe(gulp.dest(paths.js.dest))
		.pipe(browserSync.stream({once:true}));
});

/**
 * JS production task
 */
gulp.task('js-prod', function() {
	return browserify(paths.js.src)
		.transform(babelify, {presets: ["@babel/preset-env", "@babel/react"]})
		.bundle()
		.pipe(source('app.js'))
		.pipe(gulp.dest(paths.js.dest))
		.pipe(rename('app.min.js'))
		.pipe(streamify(concat('app.min.js')))
		.pipe(streamify(uglify()))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(paths.js.dest));
});

/**
 * Watch task
 */
gulp.task('watch', ['browserSync', 'sass', 'js-dev'], function() {
	gulp.watch('src/assets/scss/**/*.scss',['sass']);
	gulp.watch('src/**/*.js', ['js-dev']);
});

/**
 * Build task
 */
gulp.task('build', ['sass', 'js-prod']);
