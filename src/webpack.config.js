const path = require('path');
const webpack = require('webpack');

module.exports = {
  plugins: [
    // new webpack.optimize.CommonsChunkPlugin({ name: 'vendor' }),
    // new webpack.optimize.UglifyJsPlugin({
    //   output: {
    //     comments: false,  // remove all comments
    //   },
    //   compress: {
    //     warnings: false
    //   },
    //   sourceMap: true
    // })
  ],
  //页面入口文件配置
  entry: {
    bundle: path.resolve(__dirname, './app.js'),
    vendor: ['react', 'react-dom', 'react-router', 'react-router-dom']
  },
  //入口文件输出配置
  output: {
    path: path.resolve(__dirname, './dist/'),
    filename: '[name].js'
  },
  module: {
    //加载器配置
    loaders: [
      {
        test: /(\.js$)||(\.jsx$)/,
        exclude: [
          path.resolve(__dirname, './node_modules')
        ],
        loader: 'babel-loader',
        query: {
          plugins: ['transform-runtime'],
          presets: ['es2015', 'react', 'stage-0']
        }
      },
      {
        test: /\.css$/, // Only .css files
        loader: 'style-loader!css-loader' // Run both loaders
      },
      { test: /\.(jpg|png|ttf|svg)$/, loader: 'url-loader' },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader'
      }
    ]
  },
  devtool: 'source-map'
};