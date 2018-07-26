// 基础配置,包含了这些环境都可能使用到的配置
'use strict'
const path = require('path')
// 引入插件
const HTMLWebpackPlugin = require('html-webpack-plugin')
// 抽取 css
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 引入多页面文件列表
const { HTMLDirs, imgOutputPath } = require('./config')
// 通过 html-webpack-plugin 生成的 HTML 集合
let HTMLPlugins = []
// 入口文件集合
let Entries = {}
// node环境变量
let env = process.env.NODE_ENV
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
// 生成多页面的集合
HTMLDirs.forEach(page => {
  const htmlPlugin = new HTMLWebpackPlugin({
    filename: `pages/${page}/${page}.html`,
    template: path.resolve(__dirname, `../src/pages/${page}/${page}.html`),
    chunks: ['common', page],
    minify: {
      caseSensitive: false, //是否大小写敏感
      removeComments: true, // 去除注释
      removeEmptyAttributes: true, // 去除空属性
      collapseWhitespace: true //是否去除空格
    }
  })
  HTMLPlugins.push(htmlPlugin)
  Entries[page] = path.resolve(__dirname, `../src/pages/${page}/${page}.js`)
})
module.exports = {
  // 入口文件
  entry: Entries,
  // 启用 sourceMap
  devtool: env === 'prod' ? false : 'cheap-module-source-map',
  // 输出文件
  output: {
    filename: 'pages/[name]/[name].bundle.[hash].js',
    path: path.resolve(__dirname, '../dist')
  },
  // 加载器
  module: {
    rules: [
      {
        test: /\.css$/,
        // exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
          'postcss-loader',
          // 引用公共样式
          {
            loader: 'sass-resources-loader',
            options: {
              resources: resolve('src/utils/css/main.scss')
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            // 打包生成图片的名字
            name: '[name].[ext]',
            // 图片的生成路径
            outputPath: imgOutputPath
          }
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'font'
          }
        }
      }
    ]
  },
  // 插件
  plugins: [
    // 将 css 抽取到某个文件夹
    new MiniCssExtractPlugin({
      filename: 'pages/[name]/[name].css',
      chunkFilename: '[id].css'
    }),
    // 自动生成 HTML 插件
    ...HTMLPlugins
  ]
}
