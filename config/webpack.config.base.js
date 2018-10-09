// 基础配置,包含了这些环境都可能使用到的配置
'use strict'
const webpack = require('webpack')
const HTMLWebpackPlugin = require('html-webpack-plugin') // 生成html
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 抽取 css
const CopyWebpackPlugin = require('copy-webpack-plugin') // 拷贝static
const { resolvePath } = require('./utils')
const { htmlDirs, outputPath } = require('./config') // 引入多页面文件列表
let HTMLPlugins = [] // 通过 html-webpack-plugin 生成的 HTML 集合
let Entries = {} // 入口文件集合
let env = process.env.NODE_ENV // node环境变量
htmlDirs.forEach(page => {
  if (page !== 'layout') {
    // 生成多页面的集合
    const htmlPlugin = new HTMLWebpackPlugin({
      filename: `html/${page}.html`,
      template: resolvePath(`src/pages/${page}/${page}.pug`),
      chunks: ['common', page],
      minify: {
        caseSensitive: false, //是否大小写敏感
        removeComments: true, // 去除注释
        removeEmptyAttributes: true, // 去除空属性
        collapseWhitespace: true //是否去除空格
      },
      inject: true
    })
    HTMLPlugins.push(htmlPlugin)
    Entries[page] = resolvePath(`src/pages/${page}/${page}.js`)
  }
})
module.exports = {
  entry: Entries, // 入口文件
  // 输出文件
  output: {
    path: outputPath,
    publicPath: '/',
    filename: 'js/[name].[hash].bundle.js',
    chunkFilename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.pug', 'scss'],
    alias: {
      '@': resolvePath('src'),
      utils: '@/utils'
    }
  },
  // 加载器
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              interpolate: true
            }
          },
          {
            loader: 'pug-plain-loader',
            options: {
              data: {
                src: resolvePath('src')
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
              resources: resolvePath('src/utils/css/CONST.scss')
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
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/fonts/[name].[hash:7].[ext]'
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
        from: resolvePath('static'),
        to: 'static',
        ignore: ['.*']
      }
    ]),
    // 自动生成 HTML 插件
    ...HTMLPlugins
  ]
}
