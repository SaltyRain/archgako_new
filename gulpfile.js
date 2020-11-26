"use strict";

const gulp = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const babel = require("gulp-babel");

sass.compiler = require("node-sass");

function build() {
    return gulp
        .src("./js/*.js")
        .pipe(
            babel({
                presets: ["@babel/env"],
            })
        )
        .pipe(uglify({ mangle: { toplevel: true } }))
        .pipe(
            rename((path) => {
                path.basename += "-min";
            })
        )
        .pipe(gulp.dest("dist"));
}

function style() {
    return gulp
        .src("./scss/**/*.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest("./css"))
        .pipe(browserSync.stream());
}

function watch() {
    browserSync.init({
        server: {
            baseDir: "./",
        },
    });
    gulp.watch("./scss/**/*.scss", style);
    gulp.watch("./*.html").on("change", browserSync.reload);
    gulp.watch("./js/*.js").on("change", browserSync.reload);
}

exports.style = style;
exports.watch = watch;
exports.build = build;
