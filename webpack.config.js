import webpack from 'webpack'
import args from './tasks/lib/args'
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const ENV = args.production ? 'production' : 'development'

module.exports = {
  devtool: args.sourcemaps ? 'inline-source-map' : null,
  watch: args.watch,
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(ENV)
      },
      '__ENV__': JSON.stringify(ENV),
      '__VENDOR__': JSON.stringify(args.vendor)
    })
  ].concat(args.production ? [
    new webpack.optimize.UglifyJsPlugin()
  ] : []),
  module: {
    preLoaders: [{
      test: /\.js$/,
      loader: 'eslint-loader',
      exclude: /node_modules/
    }],
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            'scss': 'vue-style-loader!css-loader!sass-loader',
            'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
          }
        }
      }
    ]
  },
  eslint: {
    configFile: '.eslintrc.json',
    extensions: [
      '.html',
      '.vue',
      '.js'
    ]
  }
}
