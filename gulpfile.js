const gulp = require("gulp");
const browserSync = require("browser-sync");
const sass = require("gulp-sass");
const cleanCSS = require("gulp-clean-css");
const autoprefixer = require("gulp-autoprefixer");
const rename = require("gulp-rename");

gulp.task("serverok", function () {
  browserSync({
    server: {
      baseDir: "src",
    },
  });

  gulp.watch("src/*.html").on("change", browserSync.reload);
  gulp.watch("src/css/*.css").on("change", browserSync.reload);
  gulp.watch("src/js/*.js").on("change", browserSync.reload);
});

gulp.task("stylesr", function () {
  return gulp
    .src("src/sass/**/*.+(scss|sass)")
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(rename({ suffix: ".min", prefix: "" }))
    .pipe(autoprefixer())
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(gulp.dest("src/css"))
    .pipe(browserSync.stream());
});

gulp.task("watch", function () {
  gulp.watch("src/sass/**/*.+(scss|sass)", gulp.parallel("stylesr"));
});

gulp.task("default", gulp.parallel("watch", "serverok", "stylesr"));
