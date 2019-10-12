//initialize modules
const gulp = require('gulp')
const less = require('gulp-less')
const browserSync = require('browser-sync').create()
const imagemin = require('gulp-imagemin')


//browserSync
function browserSync() {
      browserSync.init({
          server: "./dist"
      });
}
//compile less into css
function style() {
    return gulp.src('./src/less/**/*.less')
    .pipe(less())
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream())
}

//minify images
function minify() {
    return gulp.src('images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
}

//watch for changes
function watchFiles() {
     gulp.watch("src/less/*.less", ['less']);
     gulp.watch("src/*.html").on('change', browserSync.reload);
     gulp.watch('src/js/**/*,js').on('change', browserSync.reload);
     gulp.watch('src/images/*', gulp.series('imageMIN'));
}


exports.minify = minify;
exports.style = style;
exports.watch = watch;
