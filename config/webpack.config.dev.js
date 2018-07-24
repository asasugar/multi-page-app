'use strict'
// 引入基础配置文件
const webpackBase = require('./webpack.config.base')
// 引入 webpack-merge 插件
const webpackMerge = require('webpack-merge')
// 引入配置文件
const { devServerOutputPath } = require('./config')
// 合并配置文件
module.exports = webpackMerge(webpackBase, {
  // 配置 webpack-dev-server
  devServer: {
    // 项目根目录,内存中的dist文件
    contentBase: devServerOutputPath,
    // 错误、警告展示设置
    overlay: {
      errors: true,
      warnings: true
    }
  }
})
