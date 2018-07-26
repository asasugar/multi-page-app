// 全局配置
'use strict'
const path = require('path')
const fs = require('fs')
const getFileNameList = path => {
  let htmlDirs = fs.readdirSync(path)
  return htmlDirs //返回当前path下的所有文件名组成的数组
}

module.exports = {
  htmlDirs: getFileNameList(path.resolve(__dirname, '../src/pages')),
  devServerOutputPath: '../dist',
  imgOutputPath: '../dist',
  outputPath: path.resolve(__dirname, '../dist'),
  staticSubDirectory: 'static'
}
