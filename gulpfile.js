var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var minifyCss = require('gulp-minify-css');
var minifyHTML = require('gulp-minify-html');
var imageminGifsicle = require('imagemin-gifsicle');
var imageminJpegtran = require('imagemin-jpegtran');
var imageminOptipng = require('imagemin-optipng');
var svgo = require('imagemin-svgo');




// Static Server + watching scss/html files
gulp.task('serve', ['minify-html', 'imagemin-gifsicle', 'imagemin-jpegtran', 'imagemin-optipng', 'imagemin-svgo','minify-css', 'sass'], function() {

    browserSync.init({
        server: "./site",
        files: ["./site/assets/js/*.js"]
    });

    gulp.watch("./site/assets/scss/*.scss", ['sass']);
    gulp.watch("./site/*.js").on('change', browserSync.reload);
    gulp.watch("./site/*.json").on('change', browserSync.reload);
    gulp.watch("./site/**/*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("./site/assets/scss/main.scss")
        .pipe(sass()).on('error', errorHandler)
        .pipe(autoprefixer())
        .pipe(gulp.dest("site/assets/css"))
        .pipe(browserSync.stream());
});

gulp.task('imagemin', function () {
    return gulp.src('./site/assets/images/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('./dist/images'));
});

gulp.task('minify-css', function() {
  return gulp.src('./site/assets/css/*.css')
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('minify-html', function() {
  var opts = {
    conditionals: true,
    spare:true
  };
 
  return gulp.src('./site/**/*.html')
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('imagemin-gifsicle', function () {
    return gulp.src('./site/assets/images/*.gif')
        .pipe(imageminGifsicle({interlaced: true})())
        .pipe(gulp.dest('./dist/images'));
});

gulp.task('imagemin-jpegtran', function () {
    return gulp.src('./site/assets/images/*.jpg')
        .pipe(imageminJpegtran({progressive: true})())
        .pipe(gulp.dest('./dist/images'));
});

gulp.task('imagemin-optipng', function () {
    return gulp.src('./site/assets/images/*.png')
        .pipe(imageminOptipng({optimizationLevel: 3})())
        .pipe(gulp.dest('./dist/images'));
});

gulp.task('imagemin-svgo', function () {
    return gulp.src('./site/assets/images/*.svg')
        .pipe(svgo()())
        .pipe(gulp.dest('./dist/images'));
});

gulp.task('default', ['serve']);

function errorHandler (error) {
  console.log(error.toString());
  this.emit('end');
}
