'use strict'
// 引入基础配置
const webpackBase = require('./webpack.config.base')
// 引入 webpack-merge 插件
const webpackMerge = require('webpack-merge')
// 引入js压缩插件
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const path = require('path')
// 清理 dist 文件夹
const CleanWebpackPlugin = require('clean-webpack-plugin')
// 引入css压缩插件
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
// 合并配置文件
module.exports = webpackMerge(webpackBase, {
  plugins: [
    // 自动清理 dist 文件夹
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, '../'), //根目录
      verbose: true, //开启在控制台输出信息
      dry: false //启用删除文件
    })
  ],
  optimization: {
    minimizer: [
      // webpack4.x版本 --mode production自动压缩js
      // new UglifyJsPlugin({
      //   cache: true,
      //   parallel: true,
      //   sourceMap: false,
      //   warningsFilter: src => true
      // }),
      new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'initial',
          minChunks: 2
        }
      }
    }
  }
})
