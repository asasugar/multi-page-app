// 全局配置
'use strict'
const path = require('path')
const fs = require('fs')
const getFileNameList = path => {
  let HTMLDirs = fs.readdirSync(path)
  return HTMLDirs //返回当前html文件夹下的所有文件名组成的数组
}

module.exports = {
  HTMLDirs: getFileNameList(path.resolve(__dirname, '../src')),
  imgOutputPath: 'img/',
  cssOutputPath: './css/styles.css',
  cssPublicPath: '../',
  devServerOutputPath: '../dist'
}
