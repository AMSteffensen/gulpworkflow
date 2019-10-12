// Initialize modules
const {
    src,
    dest,
    watch,
    series,
    parallel
} = require('gulp');
// Importing all the Gulp-related packages we want to use
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
var replace = require('gulp-replace');
const less = require('gulp-less')
const browserSync = require('browser-sync').create()
const imagemin = require('gulp-imagemin')

// File paths
const files = {
    lessPath: 'app/less/**/*.less',
    jsPath: 'app/js/**/*.js',
    cssPath: 'dist/*.css',
    htmlPath: './*.html'
}

// Less task: compiles the main.less file into style.css
function lessTask() {
    return src(files.lessPath)
        .pipe(sourcemaps.init()) // initialize sourcemaps first
        .pipe(less()) // compile LESS to CSS
        .pipe(postcss([autoprefixer(), cssnano()])) // PostCSS plugins
        .pipe(sourcemaps.write('.')) // write sourcemaps file in current directory
        .pipe(dest('dist')); // put final CSS in dist folder
}

// JS task: concatenates and uglifies JS files to script.js
function jsTask() {
    return src([
            files.jsPath
            //,'!' + 'includes/js/jquery.min.js', // to exclude any specific files
        ])
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(dest('dist'));
}

//minify images
function minifyTask() {
    return gulp.src('images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
}

// Watch task: watch LESS and JS files for changes
// If any change, run less and js tasks simultaneously
function watchTask() {
     browserSync.init({
         server: './'
     });
     //html & css changes
    watch(files.htmlPath).on('change', browserSync.reload);
    watch(files.cssPath).on('change', browserSync.reload);
    watch([files.lessPath, files.jsPath],
    parallel(lessTask, jsTask));
}

// Export the default Gulp task so it can be run
// Runs the less and js tasks simultaneously
exports.default = series(
    parallel(lessTask, jsTask),
    watchTask 
);