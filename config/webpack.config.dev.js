'use strict'
const { createNotifierCallback, resolve } = require('./utils')
const path = require('path')
// 引入基础配置文件
const webpackBase = require('./webpack.config.base')
// 引入 webpack-merge 插件
const webpackMerge = require('webpack-merge')
// 引入friendly-errors-webpack-plugin插件(需将其他报错提示关闭：{quiet:true})
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
// 引入ip插件
const ip = require('ip')
const portfinder = require('portfinder')

// 合并配置文件
const devWebpackConfig = webpackMerge(webpackBase, {
  // 配置 webpack-dev-server
  devServer: {
    // 项目根目录,内存中的dist文件
    contentBase: resolve('dist'),
    // 错误、警告展示设置
    overlay: {
      errors: true,
      warnings: false
    },
    quiet: true, // necessary for FriendlyErrorsPlugin
    host: '0.0.0.0',
    useLocalIp: true,
    port: 4396,
    open: true,
    openPage: '/html/pageOne.html',
    inline: true
  }
})

module.exports = new Promise((resolve, reject) => {
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(
        new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: [
              `Your application is running here: http://${ip.address()}:${
                devWebpackConfig.devServer.port
              }/html/pageOne.html`
            ]
          },
          onErrors: createNotifierCallback()
        })
      )

      resolve(devWebpackConfig)
    }
  })
})
