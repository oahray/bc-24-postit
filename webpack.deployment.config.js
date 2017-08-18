const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
let FaviconsWebpackPlugin = require('favicons-webpack-plugin')

const extractSass = new ExtractTextPlugin({
    filename: "style.css",
    disable: process.env.NODE_ENV === "development"
});

module.exports = {
  devtool: 'source-map',

  entry: './client/src/index.js'
  ,
  output: {
    path: path.resolve('client/public'),
    filename: 'bundle.min.js',
    publicPath: '/client/public/'
  },
  module: {
    loaders: [
      { test: /\.(js|jsx)$/, loader: 'babel-loader', exclude: /node_modules\//,
      query: {
        presets: ['react', 'es2015', 'stage-2'],
        plugins: [
          'react-html-attrs', 
          'transform-decorators-legacy',
          'transform-class-properties'
        ],
      } },
      // { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, loader: "style-loader!css-loader" }, 
      { test: /\.scss$/,
        use: extractSass.extract({
          use: [{
            loader: "css-loader"
          }, {
            loader: "sass-loader"
          }],
          // use style-loader in development
          fallback: "style-loader"
        })
      },
      { test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    // new webpack.ProvidePlugin({
    //   _$: "jquery",
    //   jQuery: "jquery",
    //   'window.$': 'jquery',
    //   'window.jQuery': 'jquery'
    // }),
    extractSass,
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    }),
    new FaviconsWebpackPlugin('client/src/images/Andela.png')
  ],
};