'use strict'
// 根据环境变量引用相关的配置文件
module.exports = (env, argv) => {
  // mode方式
  // if (argv.mode === 'development') {
  //   process.env.NODE_ENV = 'dev'
  //   return require(`./config/webpack.config.dev.js`)
  // } else {
  //   process.env.NODE_ENV = 'prod'
  //   return require(`./config/webpack.config.prod.js`)
  // }
  return require(`./config/webpack.config.${process.env.NODE_ENV}.js`) // env方式
}
