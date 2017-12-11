const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'source-map',

  entry: './client/src/index.js',
  output: {
    path: path.resolve(__dirname, 'client/public'),
    filename: 'bundle.min.js',
    publicPath: '/'
  },
  module: {
    loaders: [
      { test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules\//,
        query: {
          presets: ['react', 'es2015'],
          plugins: [
            'react-html-attrs',
            'transform-decorators-legacy',
            'transform-class-properties'
          ],
        }
      },
      { test: /\.css$/,
        loader: [
          'style-loader',
          'css-loader?importLoaders=1',
          'font-loader?format[]=truetype&format[]=woff&format[]=embedded-opentype'
        ]
      },
      { test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader'
      },
      { test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader?name=/fonts/[name].[ext]'
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env.CLOUDINARY_URL': JSON.stringify(process.env.CLOUDINARY_URL),
      'process.env.CLOUDINARY_PRESET': JSON.stringify(process.env.CLOUDINARY_PRESET),
      'process.env.CLOUDINARY_KEY': JSON.stringify(process.env.CLOUDINARY_KEY),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
  ],
};
