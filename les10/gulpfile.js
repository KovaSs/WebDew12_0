var gulp 					= require('gulp'),
		sass 					= require('gulp-sass'),
		autoprefixer 	= require('gulp-autoprefixer'),
		concatCss 		= require('gulp-concat-css'),
		ftp 					= require('gulp-ftp'),
		browserSync 	= require('browser-sync').create();

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "src/"
    });

    gulp.watch("src/sass/*.sass", ['sass']);
    gulp.watch("src/*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("src/sass/*.sass")
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(concatCss('style.css'))
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});

gulp.task('ftp', function () {
    return gulp.src('src/**')
        .pipe(ftp({
            host: 'ftp.isaev.store',
            user: 'u431519944.kovass',
            pass: 'Den085317',
            remotePath: 'www/WebDew_12/les10'
        }))
       .pipe(gutil.noop());
});

gulp.task('default', ['serve']);