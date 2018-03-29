const path = require('path');
const nodeExternals = require('webpack-node-externals');
const BUILD_DIR = path.resolve(__dirname, 'dist');
const APP_DIR = path.resolve(__dirname, 'client/js');

var config = {
  entry: ['babel-polyfill', './server/index.js'],
  output: {
    path: BUILD_DIR,
    filename: 'server.js',
    publicPath: '/'
  },
  target: 'node',
  externals:nodeExternals(),
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
            presets: ['react', 'env']
          }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
};
module.exports = config;