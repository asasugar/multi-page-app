'use strict'
// 引入基础配置
const webpackBase = require('./webpack.config.base')
// 引入 webpack-merge 插件
const webpackMerge = require('webpack-merge')
// 引入js压缩插件
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// 引入css压缩插件
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
// 合并配置文件
module.exports = webpackMerge(webpackBase, {
  plugins: [],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        warningsFilter: src => true
      }),
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
