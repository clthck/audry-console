const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: __dirname,
  entry: {
    vendor: [
      'babel-polyfill',
      'jquery-ujs',
      'bootstrap',
    ],
    application: './app/assets/javascripts/application'
  },
  output: {
    filename: '[name].js',
    path: './public/assets/webpack'
  },
  resolve: {
    alias: {
      components: path.resolve('./app/assets/javascripts/components'),
      comsass: path.resolve('./app/assets/stylesheets/components')
    }
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    new ExtractTextPlugin({
      filename: 'components.css',
      disable: false,
      allChunks: true
    })
  ],
  module: {
    rules: [{
      test: require.resolve('bootstrap'),
      loader: 'imports-loader?jQuery=jquery&window.Tether=tether'
    }, {
      test: require.resolve('jquery-ujs'),
      loader: 'imports-loader?jQuery=jquery'
    }, {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel-loader'
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract({
        notExtractLoader: 'style-loader',
        loader: 'css-loader!sass-loader'
      })
    }]
  }
};
