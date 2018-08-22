'use strict'
const webpack = require('webpack')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { resolvePath } = require('./utils')
const { htmlDirs, outputPath } = require('./config')
let HTMLPlugins = []
let Entries = {}
htmlDirs.forEach(page => {
  const htmlPlugin = new HTMLWebpackPlugin({
    filename: `html/${page}.html`,
    template: resolvePath(`src/pages/${page}/${page}.html`),
    chunks: ['common', page],
    minify: {
      caseSensitive: false,
      removeComments: true,
      removeEmptyAttributes: true,
      collapseWhitespace: true
    },
    inject: true
  })
  HTMLPlugins.push(htmlPlugin)
  Entries[page] = resolvePath(`src/pages/${page}/${page}.js`)
})
module.exports = {
  entry: Entries,
  output: {
    path: outputPath,
    publicPath: '/',
    filename: 'js/[name].bundle.js',
    chunkFilename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.css', 'scss'],
    alias: {
      '@': resolvePath('src'),
      utils: '@/utils'
    }
  },
  module: {
    rules: [
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
        test: /\.(htm|html)$/i,
        use: ['html-withimg-loader']
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
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
      chunkFilename: '[id].css'
    }),
    new CopyWebpackPlugin([
      {
        from: resolvePath('static'),
        to: 'static',
        ignore: ['.*']
      }
    ]),
    ...HTMLPlugins
  ]
}
