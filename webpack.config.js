'use strict'
module.exports = (env, argv) => {
  return require(`./config/webpack.config.${process.env.NODE_ENV}.js`)
}
