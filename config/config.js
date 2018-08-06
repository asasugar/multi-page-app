// 全局配置
'use strict'
const { getFileNameList, resolve } = require('./utils')

module.exports = {
  htmlDirs: getFileNameList(resolve('src/pages')),
  devServerOutputPath: '../dist',
  outputPath: resolve('dist'),
  staticSubDirectory: 'static'
}
