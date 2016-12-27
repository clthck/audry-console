const webpack = require('webpack');

module.exports = {
  context: __dirname,
  entry: {
    vendor: [
      'babel-polyfill',
      'jquery',
      'bootstrap',
    ],
    application: './app/assets/javascripts/application'
  },
  output: {
    filename: '[name].js',
    path: './public/assets/webpack'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    })
  ],
  module: {
    rules: [{
      test: require.resolve('bootstrap'),
      loader: 'imports-loader?jQuery=jquery&window.Tether=tether'
    }, {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel-loader'
    }]
  }
};
