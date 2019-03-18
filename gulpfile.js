let gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    cssnano = require('gulp-cssnano'),
    autoprefixer = require('gulp-autoprefixer'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    del = require('del');

gulp.task('sass', function () {
    return gulp.src('src/styles/sass/style.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 20 versions'],
            cascade: false
        }))
        .pipe(concat('style.min.css'))
        .pipe(cssnano())
        .pipe(gulp.dest('src/styles/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('images', function () {
    return gulp.src('src/images/**/*.+(png|jpg|gif|svg)')
        .pipe(cache(imagemin()))
        .pipe(gulp.dest('dist/images'))
});

gulp.task('fonts', function () {
    return gulp.src('src/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'))
});

gulp.task('scripts', function () {
    return gulp.src('src/js/script.js')
        .pipe(concat('script.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('html', function () {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('clean:dist', function () {
    return del.sync('dist');
});

gulp.task('cache:clear', function () {
    return cache.clearAll();
});

gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: 'src'
        },
        notify: false
    });
});

gulp.task('watch', function () {
    gulp.watch('src/styles/sass/**/*.scss', gulp.series('sass'), browserSync.reload);
    gulp.watch('src/*.html', gulp.series('html'), browserSync.reload);
    gulp.watch('src/js/script.js', gulp.series('scripts'), browserSync.reload);
});

gulp.task('default', gulp.series(gulp.series('html', 'sass', 'scripts'), gulp.parallel('browser-sync', 'watch')));

// gulp.task('build',  gulp.series('clean:dist', gulp.parallel('sass', 'images', 'fonts', 'scripts')), function () {
//
//     let html = gulp.src('src/*.html')
//         .pipe(gulp.dest('dist'));
//
//     let css = gulp.src('src/styles/css/style.min.css')
//         .pipe(gulp.dest('dist/css'));
//
//     let fonts = gulp.src('src/fonts/**/*')
//         .pipe(gulp.dest('dist/fonts'));
//
//     let js = gulp.src('src/js/scripts.min.js')
//         .pipe(gulp.dest('dist/js'));
//
// });

// gulp.task('build', gulp.parallel('sass', 'images', 'fonts', 'scripts', function () {
//     let html = gulp.src('src/*.html')
//         .pipe(gulp.dest('dist'));
//
//     let css = gulp.src('src/styles/css/style.min.css')
//         .pipe(gulp.dest('dist/css'));
//
//     let fonts = gulp.src('src/fonts/**/*')
//         .pipe(gulp.dest('dist/fonts'));
//
//     let js = gulp.src('src/js/scripts.min.js')
//         .pipe(gulp.dest('dist/js'));
//     })
// );
//
// gulp.task('build', function(done) {
//     gulp.series('clean:dist', gulp.parallel('sass', 'images', 'fonts', 'scripts', 'html'));
//         let html = gulp.src('src/*.html')
//         .pipe(gulp.dest('dist'));
//
//     let css = gulp.src('src/styles/css/style.min.css')
//         .pipe(gulp.dest('dist/css'));
//
//     let fonts = gulp.src('src/fonts/**/*')
//         .pipe(gulp.dest('dist/fonts'));
//
//     let js = gulp.src('src/js/scripts.min.js')
//         .pipe(gulp.dest('dist/js'));
//     done();
// });