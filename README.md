# multi-page-app

> 基于 webpack4.x 的多页应用脚手架 HTML 模板（完善中......）

## Build Setup

```bash
# install dependencies
npm install
or
yarn

# serve with hot reload at localhost:4396
npm run dev

# build for production with minification
npm run build
```

## 使用说明

```bash
 css: 采用 scss，并在配置中默认引入 CONST.scss，无需手动引入

 static 引入方式: 使用相对路径引入（拷贝不打包）

 assets 图片引入方式: 背景图使用相对路径、img 使用：<img src="../../assets/s_rate_red_1.png">（打包）

 --open页面通过设置config/config.js中openPage选项
```

## 注意点

```bash
 scss文件在js中引入，js无需通过script标签引入
```
