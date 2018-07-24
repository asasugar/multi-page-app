// 基础配置,包含了这些环境都可能使用到的配置
'use strict'
const path = require('path')
// 引入插件
const HTMLWebpackPlugin = require('html-webpack-plugin')
// 清理 dist 文件夹
const CleanWebpackPlugin = require('clean-webpack-plugin')
// 抽取 css
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 引入多页面文件列表
const {
  HTMLDirs,
  imgOutputPath,
  cssOutputPath,
  cssPublicPath
} = require('./config')
// 通过 html-webpack-plugin 生成的 HTML 集合
let HTMLPlugins = []
// 入口文件集合
let Entries = {}

// 生成多页面的集合
HTMLDirs.forEach(page => {
  const htmlPlugin = new HTMLWebpackPlugin({
    filename: `${page}.html`,
    template: path.resolve(__dirname, `../src/${page}/${page}.html`),
    chunks: [page, 'commons']
  })
  HTMLPlugins.push(htmlPlugin)
  Entries[page] = path.resolve(__dirname, `../src/${page}/index.js`)
})
module.exports = {
  // 入口文件
  entry: Entries,
  // 启用 sourceMap
  devtool: 'cheap-module-source-map',
  // 输出文件
  output: {
    filename: 'js/[name].bundle.[hash].js',
    path: path.resolve(__dirname, '../dist')
  },
  // 加载器
  module: {
    rules: [
      {
        // 对 css 后缀名进行处理
        test: /\.css$/,
        // 不处理 node_modules 文件中的 css 文件
        exclude: /node_modules/,
        // 抽取 css 文件到单独的文件夹
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: cssPublicPath
            }
          },
          {
            loader: 'css-loader',
            options: {
              // 开启 css 压缩
              minimize: true
            }
          },
          {
            loader: 'postcss-loader'
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            // 打包生成图片的名字
            name: '[name].[ext]',
            // 图片的生成路径
            outputPath: imgOutputPath
          }
        }
      }
    ]
  },
  // 插件
  plugins: [
    // 自动清理 dist 文件夹
    new CleanWebpackPlugin(['dist']),
    // 将 css 抽取到某个文件夹
    new MiniCssExtractPlugin(cssOutputPath),
    // 自动生成 HTML 插件
    ...HTMLPlugins
  ]
}
