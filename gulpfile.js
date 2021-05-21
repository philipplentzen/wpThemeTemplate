"use strict";
const path = require("path");
const gulp = require("gulp");
const newer = require("gulp-newer");
const imagemin = require("gulp-imagemin");
const sass = require("gulp-dart-sass");
const postcss = require("gulp-postcss");
const gutil = require('gulp-util');
const webpack = require('webpack-stream');

const dir = {
    src: path.resolve("./src/"),
    // build: path.resolve("./dist/")
    build: path.resolve("/Users/philipplentzen/Local Sites/tachyons/app/public/wp-content/themes/test/")
};
let sync = false;

// Copying
gulp.task("php", function () {
    return gulp.src(path.resolve(dir.src, "**/*.php"))
        .pipe(newer(dir.build))
        .pipe(gulp.dest(dir.build));
});

// Image processing
gulp.task("images", function () {
    return gulp.src(path.resolve(dir.src, "images/**/*"))
        .pipe(newer(path.resolve(dir.build, "images/")))
        .pipe(imagemin())
        .pipe(gulp.dest(path.resolve(dir.build, "images/")));
});

// Main css file
gulp.task("sass-main", function () {
    return gulp.src(path.resolve(dir.src, "styles/style.scss"))
        .pipe(sass({
            outputStyle: "compressed",
            precision: 3,
            errLogToConsole: true
        }).on("error", sass.logError))
        .pipe(postcss([
            require("autoprefixer")({
                browsers: ["last 2 versions", "> 2%"]
            }),
            require("css-mqpacker"),
            require("cssnano")
        ]))
        .pipe(gulp.dest(dir.build))
        .pipe(sync ? sync.reload({ stream: true }) : gutil.noop());
});

// Assets css files
gulp.task("sass-assets", function () {
    return gulp.src(path.resolve(dir.src, "assets/css/**/*.scss"))
        .pipe(sass({
            outputStyle: "compressed",
            precision: 3,
            errLogToConsole: true
        }).on("error", sass.logError))
        .pipe(postcss([
            require("autoprefixer")({
                browsers: ["last 2 versions", "> 2%"]
            }),
            require("css-mqpacker"),
            require("cssnano")
        ]))
        .pipe(gulp.dest(path.resolve(dir.build, "assets/css")))
        .pipe(sync ? sync.reload({ stream: true }) : gutil.noop());
});

// Bundle js
gulp.task("webpack", function () {
    return gulp.src(path.resolve(dir.src, "scripts/main.ts"))
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest(path.resolve(dir.build)))
        .pipe(sync ? sync.reload({ stream: true }) : gutil.noop());
});

// Build task
gulp.task("build", gulp.series("php", "images", "sass-main", "sass-assets", "webpack"));

// Dev task
gulp.task("watch", () => {
    if (sync === false) {
        sync = require("browser-sync").create();
        sync.init({
            proxy       : 'tachyons.local',
            files       : dir.build + '**/*',
            open        : false,
            notify      : false,
            ghostMode   : false,
            ui: {
                port: 8001
            }
        })
    }

    // page changes
    gulp.watch(path.resolve(dir.src, "**/*.php"), gulp.series("php"));

    // image changes
    gulp.watch(path.resolve(dir.src, "images/**/*"), gulp.series("images"));

    // main CSS changes
    gulp.watch(path.resolve(dir.src, "styles/**/*.scss"), gulp.series("sass-main"));

    // assets CSS changes
    gulp.watch(path.resolve(dir.src, "assets/css/*.scss"), gulp.series("sass-assets"));

    // JavaScript main changes
    gulp.watch(path.resolve(dir.src, "scripts/**/*.ts"), gulp.series("webpack"));
});

gulp.task("dev", gulp.series("build", "watch"));