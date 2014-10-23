/* jshint ignore:start */
var gulp = require('gulp')
	, gutil = require('gulp-util')
	, notify = require('gulp-notify')
	, rename = require('gulp-rename')
	, sass = require('gulp-sass')
	, browserify = require('gulp-browserify')
	, uglify = require('gulp-uglify')
	, react = require('gulp-react')
	, reactify = require('reactify')
	, debowerify = require('debowerify')
	, livereload = require('gulp-livereload')
	, nodemon = require('gulp-nodemon')
	, livereloadServer = require('tiny-lr')()
	, http = require('http')
	, path = require('path')
	, express = require('express')

	, srcPaths = ['./src/client/js/**/*.js']
	, scssPaths = ['./src/client/scss/**/*.scss'];

gulp.task('bowerFontawesome', function() {
	gulp.src('./bower_components/fontawesome/fonts/*')
	    .pipe(gulp.dest('./public/fonts'));
});

gulp.task('bowerMaterialBootstrap', ['bowerMaterialBootstrap-css', 'bowerMaterialBootstrap-fonts', 'bowerMaterialBootstrap-js']);
gulp.task('bowerMaterialBootstrap-css', function() {
    gulp.src([
        './bower_components/bootstrap-material-design/dist/css/*-wfont.min.css'
        , './bower_components/bootstrap-material-design/dist/css/ripples.min.css*'
    ])
        .pipe(gulp.dest('./public/css'));
});
gulp.task('bowerMaterialBootstrap-fonts', function() {
    gulp.src('./bower_components/bootstrap-material-design/dist/fonts/**/*')
        .pipe(gulp.dest('./public/fonts'));
});
gulp.task('bowerMaterialBootstrap-js', function() {
    gulp.src('./bower_components/bootstrap-material-design/dist/js/**/*.min.js')
        .pipe(gulp.dest('./public/js'));
});

gulp.task('bower', ['bowerFontawesome', 'bowerMaterialBootstrap']);


gulp.task('sass', ['bower'], function () {
	gulp.src('./src/client/scss/app.scss')
		.pipe(sass({
			outputStyle: 'compressed'
		}))
		.pipe(gulp.dest('./public/css'))
		.pipe(livereload(livereloadServer))
		.pipe(notify({
			message: '<%= file.relative %> built'
		}));
});

gulp.task('browserify', function() {
	return gulp.src('./src/client/js/index.js', { read: false })
		.pipe(browserify({
			debug: !gutil.env.production
			, transform: ['reactify', 'debowerify']
		}))
		/*.on('prebundle', function(bundle) {
			bundle.require('../../../bower_components/masonry/masonry.js', {expose: 'masonry'});
		})*/
		.pipe(rename('app.js'))
		.pipe(gulp.dest('public/js'))
		.pipe(livereload(livereloadServer))
		.pipe(notify({
			message: '<%= file.relative %> built'
		}));
});

gulp.task('uglify', ['browserify'], function() {
	return gulp.src('./public/js/app.js')
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
		.pipe(gulp.dest('./public/js'))
		.pipe(notify({
			message: '<%= file.relative %> built'
		}));
});

gulp.task('server', function() {
	var port = 8080
		, express = require('express')
		, app = express();

	app.use(express.static('public'));

	app.listen(port, function() {

	});
});

gulp.task('watch', function() {
	livereloadServer.listen(35729, function(err) {
		if(err) {
			gutil.log(gutil.colors.red('LiveReload Error: ' + err));
		}

		gulp.watch(srcPaths, ['uglify']);
		gulp.watch(scssPaths, ['sass']);
	});
});


gulp.task('client', ['sass', /*'uglify',*/ 'browserify', 'server', 'watch']);

gulp.task('default', ['client']);
