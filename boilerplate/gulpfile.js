"use strict"

let gulp = require('gulp')
    //gulp.task('default', ['babel', 'sass', 'uglify', 'imagemin', 'minify-css'])
    //gulp.task('watch', ['babel', 'sass:watch'])

let runSequence = require('run-sequence')

// Build tasks
gulp.task('default', function(callback) {
    runSequence('copy-html', 'copy-php', 'copy-img', 'concat', 'sass', 'folders', 'copy-files', callback)
})

gulp.task('production', function(callback){
  runSequence('copy-html', 'copy-php', 'imagemin', 'stripDebug', 'js', 'css', 'folders', 'copy-files', 'minify-html', 'minify-php', callback)
})

gulp.task('js', function(callback) {
    runSequence('babel', 'uglify', callback)
})

gulp.task('css', function(callback) {
    runSequence('sass', 'css-prefix', 'uncss', 'minify-css', callback)
})


gulp.task('img', function(callback) {
    runSequence('imgremove', 'imagemin', callback)
})

gulp.task('html', function(callback) {
    runSequence('copy-html', 'minify-html', callback)
})

gulp.task('php', function(callback) {
    runSequence('copy-php', 'minify-php', callback)
})

let concat = require('gulp-concat')
gulp.task('concat', function() {
    return gulp.src(['src/js/*.js'])
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('../assets/js/'))
})

let stripDebug = require('gulp-strip-debug')
gulp.task('stripDebug', function () {
    return gulp.src('../assets/js/bundle.js')
        .pipe(stripDebug())
        .pipe(gulp.dest('../assets/js/'))
})

let uglify = require('gulp-uglify')
gulp.task('uglify', function() {
    return gulp.src('../assets/js/bundle.js')
        .pipe(uglify())
        .pipe(gulp.dest('../assets/js/'))

})

// CSS
// Compile Scss
let sass = require('gulp-sass')
gulp.task('sass', function() {
    console.log('compile scss')
    return gulp.src('src/css/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('../assets/css'))
})

// Auto-vendor-prefix
let postcss = require('gulp-postcss')
let autoprefixer = require('autoprefixer')
gulp.task('css-prefix', function() {
    console.log('autoprefix css')
    let processors = [
        autoprefixer({
            browsers: ['last 1 version']
        })
    ]
    return gulp.src('../assets/css/*.css')
        .pipe(postcss(processors))
        .pipe(gulp.dest('../assets/css'))
})

// remove unused css
let uncss = require('gulp-uncss');

gulp.task('uncss', function() {
    return gulp.src('../assets/css/*.css')
        .pipe(uncss({
            html: [
                'src/**.html'
            ]
        }))
        .pipe(gulp.dest('../assets/css/'));
})


// Minify CSS
let cleanCSS = require('gulp-clean-css')
let sourcemaps = require('gulp-sourcemaps')
gulp.task('minify-css', function() {
    console.log('minify css')
    return gulp.src('../assets/css/*.css')
        .pipe(cleanCSS())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('../assets/css/'))
})




let del = require('del')
gulp.task('clean:../assets', function() {
    return del([
        '../assets/report.csv',
        // here we use a globbing pattern to match everything inside the `mobile` folder
        '../assets/**/*',
        // we don't want to clean this file though so we negate the pattern
        '!../assets/mobile/deploy.json'
    ])
})



// Images
// remove unused Images
let deleteUnusedImages = require('gulp-delete-unused-images');

gulp.task('imgremove', function() {
    return gulp.src(['src/img/**/*'])
        .pipe(deleteUnusedImages({
            log: true,
            delete: true
        }))
        .pipe(gulp.dest('../assets/img'))
})

// Copy HTML verbatim
gulp.task('copy-img', function() {
    gulp.src(['src/img/*'])
        // Perform minification tasks, etc here
        .pipe(gulp.dest('../assets/img'))
})

// optimise images
const imagemin = require('gulp-imagemin')

gulp.task('imagemin', () =>
    gulp.src('src/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('../assets/img'))
)

// Minify html
let htmlmin = require('gulp-htmlmin')

gulp.task('minify-html', function() {
  return gulp.src('../assets/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('../assets'))
})

// Copy HTML verbatim
gulp.task('copy-html', function() {
    gulp.src(['src/**/*.html'])
        // Perform minification tasks, etc here
        .pipe(gulp.dest('../assets'))
})


// Minify PHP
let phpMinify = require('gulp-php-minify')

gulp.task('minify-php', () => gulp.src('../assets/**/*.php', {read: false})
  .pipe(phpMinify())
  .pipe(gulp.dest('../assets'))
)

// Copy PHP verbatim
gulp.task('copy-php', function() {
    gulp.src(['src/**/*.php'])
        // Perform minification tasks, etc here
        .pipe(gulp.dest('../assets'))
})

// Copy folders verbatim (like vendor) or Phil's PHP stuff

gulp.task('folders', () =>
  gulp.src(['src/litebochs/**/*'])
  .pipe(gulp.dest('../assets/litebochs')))

  // Copy support files verbatim
  gulp.task('copy-files', function() {
      gulp.src(['src/.htaccess', 'src/favicon.ico', 'src/robots.txt'])
          // Perform minification tasks, etc here
          .pipe(gulp.dest('../assets'))
  })

//watchers
const babel = require('gulp-babel');

gulp.task('babel', () =>
    gulp.src('src/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(concat('bundle.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('../assets/js'))
)

gulp.task('sass:watch', function() {
    gulp.watch('src/css/**/*.scss', ['sass'])
})

let browserSync = require('browser-sync').create()

gulp.task('watch', function() {
    browserSync.init({
        server: "../assets"
    })

    gulp.watch('src/js/**/*.js', ['js', browserSync.reload])
    gulp.watch('src/css/**/*.scss', ['sass', 'minify-css', browserSync.reload])
    gulp.watch('src/**/*.html', ['html', browserSync.reload])
    gulp.watch('src/*.html').on("change", browserSync.reload)
})



// Dev tasks
var modernizr = require('gulp-modernizr');

gulp.task('modernizr', function() {
    gulp.src('src/js/*.js')
        .pipe(modernizr())
        .pipe(gulp.dest("../assets/js/"))
})



// Git Tasks
let argv = require('yargs').argv
let git = require('gulp-git')
gulp.task('init', function() {
    console.log(argv.m)
});

gulp.task('add', function() {
    console.log('adding...')
    return gulp.src('.')
        .pipe(git.add())
});

gulp.task('commit', function() {
    console.log('commiting')
    if (argv.m) {
        return gulp.src('.')
            .pipe(git.commit(argv.m))
    }
});

gulp.task('push', function() {
    console.log('pushing...')
    git.push('origin', 'master', function(err) {
        if (err) throw err
    })
})

gulp.task('gitsend', function() {
    runSequence('add', 'commit', 'push');
})
