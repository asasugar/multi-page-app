'use strict'
const UglifyJsPlugin = require('uglifyjs-webpack-plugin') //引入js压缩插件
const webpackMerge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin') // 清理 dist 文件夹
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin') // 引入css压缩插件
const webpackBase = require('./webpack.config.base') // 引入基础配置
const { resolvePath } = require('./utils')

// 合并配置文件
module.exports = webpackMerge(webpackBase, {
  mode: 'production',
  plugins: [
    // 自动清理 dist 文件夹
    new CleanWebpackPlugin(['dist'], {
      root: resolvePath('/'), //根目录
      verbose: true, //开启在控制台输出信息
      dry: false //启用删除文件
    })
  ],
  optimization: {
    minimizer: [
      // webpack4.x版本 --mode production自动压缩js
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: false,
        uglifyOptions: {
          compress: {
            warnings: false,
            drop_debugger: false,
            drop_console: true
          }
        },
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
