// 全局配置
'use strict'
const { getFileNameList, resolvePath } = require('./utils')

module.exports = {
  baseUrl: '', // 默认值：基于服务器根路径
  htmlDirs: getFileNameList(resolvePath('src/pages')),
  outputPath: resolvePath('dist'),
  openPage: 'Home.html' // 默认打开主页
}
