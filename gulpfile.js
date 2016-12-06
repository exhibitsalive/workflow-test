var gulp = require("gulp");
var gutil = require("gulp-util");
var coffee = require("gulp-coffee");
var concat = require("gulp-concat");
var browserify = require("gulp-browserify");
var compass = require("gulp-compass");
var coffeeSource = ["components/coffee/tagline.coffee"];
var jsSource = [
    "components/scripts/rclick.js",
    "components/scripts/pixgrid.js",
    "components/scripts/tagline.js",
    "components/scripts/template.js"
    ];
var sassSource = ["components/sass/style.scss"];
gulp.task("coffee", function(){
    gulp.src(coffeeSource)
    .pipe(coffee({bare:true})
        .on("error", gutil.log))
    .pipe(gulp.dest("components/scripts"))
});
gulp.task("js", function(){
    gulp.src(jsSource)
    .pipe(concat("script.js"))
    .pipe(browserify())
    .pipe(gulp.dest("builds/development/js"))
    
});
gulp.task("compass", function(){
    gulp.src(sassSource)
    .pipe(compass({
        sass:"components/sass",
        images:"build/development/images",
        style:"expanded"
    }))
    .on("error", gutil.log)
    .pipe(gulp.dest("builds/development/css"))
});

gulp.task("default", ["coffee","js","compass"])

gulp.task("watch", function(){
   gulp.watch(coffeeSource,["coffee"]);
   gulp.watch(jsSource,["js"]);
   gulp.watch("components/sass/*.scss",["compass"]);
});


