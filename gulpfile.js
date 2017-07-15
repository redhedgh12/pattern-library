const gulp     = require('gulp'),
      bs       = require('browser-sync').create(),
      plugins  = require('gulp-load-plugins')(),
      runSeq   = require('run-sequence'),
      del      = require('del'),
      postCss  = require('gulp-postcss'),
      shortCss = require('postcss-short'),
      cssNext  = require('postcss-cssnext'),
      cssSrcPath = 'src/assets/css/**/*.css',
      cssDestPath = 'public/assets/css';
      



// CSS Task

gulp.task('compile-css', function() {
  const plugs = [shortCss, cssNext];

  return gulp.src([cssSrcPath])

  .pipe(plugins.sourcemaps.init())
  .pipe(postCss(plugs))
  .pipe(plugins.concat('lib.min.css'))
  .pipe(plugins.cleanCss())
  .pipe(plugins.sourcemaps.write('.'))
  .pipe(gulp.dest(cssDestPath))
  .pipe(bs.stream());
});

// gulp browser-sync task
gulp.task('serve', function() {
  bs.init({
    server: {
      baseDir:"./"
    }
  });
});


gulp.task('html', function() {
  
  gulp.watch('index.html').on('change',bs.reload());
});

// gulp watch
gulp.task('watch', function() {
  gulp.watch([cssSrcPath], ['compile-css']);
  gulp.watch(['./index.html'], ['html']);
});


//gulp default
gulp.task('default', function() {
  runSeq('serve','compile-css', 'watch')
});