import gulp from 'gulp'
import gulpif from 'gulp-if'
import { log, colors } from 'gulp-util'
import named from 'vinyl-named'
import gulpWebpack from 'webpack-stream'
import plumber from 'gulp-plumber'
import livereload from 'gulp-livereload'
import args from './lib/args'
import config from '../webpack.config.js'

const ENV = args.production ? 'production' : 'development'

gulp.task('scripts', (cb) => {
  return gulp.src(['app/scripts/*.js'])
    .pipe(plumber({
      errorHandler: function () {
        // Webpack will log the errors
      }
    }))
    .pipe(named())
    .pipe(gulpWebpack(config, null, (err, stats) => {
      if (err) console.log(err)
      log(`Finished '${colors.cyan('scripts')}'`, stats.toString({
        chunks: false,
        colors: true,
        cached: false,
        children: false
      })
      )
    }))
    .pipe(gulp.dest(`dist/${args.vendor}/scripts`))
    .pipe(gulpif(args.watch, livereload()))
})
