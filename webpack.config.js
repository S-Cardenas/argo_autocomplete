var path = require('path');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');

module.exports = {
  context: __dirname,
  entry: "./src/frontend/entry.jsx",
  output: {
    path: path.join(__dirname,'src', 'public'),
    filename: "javascripts/bundle.js"
  },
  module: {
    loaders: [
      {
        test: [/\.jsx?$/, /\.js?$/],
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
         test: /\.s?css$/,
         loader: ExtractTextPlugin.extract('style', 'css!postcss!sass')
      },
    ]
  },
  devtool: 'souce-maps',
  resolve: {
    extensions: ["", ".js", ".jsx", ".json", ".css", ".scss"]
  },
  plugins: [
    new ExtractTextPlugin('stylesheets/bundle.css', { allChunks: true })
  ],
  postcss: [
    autoprefixer({
      browsers: ['last 2 versions']
    })
  ],
  watch: true
};
