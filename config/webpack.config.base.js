// 基础配置,包含了这些环境都可能使用到的配置
'use strict'
const webpack = require('webpack')
const path = require('path')
// 引入插件
const HTMLWebpackPlugin = require('html-webpack-plugin')
// 抽取 css
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 拷贝static
const CopyWebpackPlugin = require('copy-webpack-plugin')
// 引入多页面文件列表
const {
  htmlDirs,
  imgOutputPath,
  staticSubDirectory,
  outputPath
} = require('./config')
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
htmlDirs.forEach(page => {
  const htmlPlugin = new HTMLWebpackPlugin({
    filename: `html/${page}.html`,
    template: path.resolve(__dirname, `../src/pages/${page}/${page}.pug`),
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
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: 'js/[name].[hash].bundle.js',
    chunkFilename: '[name].js'
  },
  resolve: {
    alias: {
      // layout: path.resolve(__dirname, '../src/layout/layout'),
    }
  },
  // 加载器
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: [
          // 允许文件作为字符串导入
          {
            loader: 'raw-loader'
          },
          {
            loader: 'pug-plain-loader',
            options: {
              data: {
                src: path.resolve(__dirname, '../src')
              }
            }
          }
        ]
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
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
              resources: resolve('src/utils/css/CONST.scss')
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['latest']
            }
          }
        ]
      },
      // {
      //   test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      //   use: [
      //     {
      //       loader: 'url-loader',
      //       options: {
      //         name: assetsPath('img/[name].[hash:7].[ext]')
      //       }
      //     }
      //   ]
      // },
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    // 将 css 抽取到某个文件夹
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
      chunkFilename: '[id].css'
    }),
    // 拷贝static文件夹
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: staticSubDirectory,
        ignore: ['.*']
      }
    ]),
    // 自动生成 HTML 插件
    ...HTMLPlugins
  ]
}
