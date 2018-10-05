'use strict'
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin') // 引入friendly-errors-webpack-plugin插件(需将其他报错提示关闭：{quiet:true})
const ip = require('ip')
const portfinder = require('portfinder')
const webpackMerge = require('webpack-merge')
const { createNotifierCallback } = require('./utils')
const { outputPath, openPage } = require('./config') // 引入基础配置文件
const webpackBase = require('./webpack.config.base')
const Package = require('../package.json')

const devWebpackConfig = webpackMerge(webpackBase, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    contentBase: outputPath,
    overlay: {
      errors: true,
      warnings: false
    },
    quiet: true,
    host: '0.0.0.0',
    useLocalIp: true,
    port: Package.port,
    openPage,
    inline: true,
    progress: true
  }
})

module.exports = new Promise((resolve, reject) => {
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      devWebpackConfig.plugins.push(
        new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: [
              `Your application is running here: http://${ip.address()}:${
                devWebpackConfig.devServer.port
              }${openPage}`
            ]
          },
          onErrors: createNotifierCallback()
        })
      )
      devWebpackConfig.devServer.open = true
      resolve(devWebpackConfig)
    }
  })
})
