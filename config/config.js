// 全局配置
'use strict'
const { getFileNameList, resolvePath } = require('./utils')

module.exports = {
  htmlDirs: getFileNameList(resolvePath('src/pages')),
  outputPath: resolvePath('dist'),
  openPage: '/html/pageOne.html' // 默认打开主页
}
