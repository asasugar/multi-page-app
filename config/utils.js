'use strict'
const path = require('path')
const fs = require('fs')
const packageConfig = require('../package.json')

exports.getFileNameList = path => {
  let htmlDirs = fs.readdirSync(path)
  return htmlDirs
}

exports.resolvePath = dir => {
  return path.join(__dirname, '..', dir)
}
exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}
