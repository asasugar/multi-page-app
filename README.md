# multi-page-app

> 基于 webpack4.x 的多页应用脚手架（完善中......）

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
 baseUrl: 默认基于根目录，需要修改请到config/config.js中修改

 css: 采用 scss，并在配置中默认引入 CONST.scss，无需手动引入

 模板: 采用 pug，[layout]文件为公用部分

 localStorage: setLocalStorage(key,val) | getLocalStorage(key)

 static 引入方式: 使用相对路径引入（拷贝不打包）

 assets 图片引入方式: 背景图使用相对路径、img 使用：img(src="${require(`@/assets/logo.png`)}")（打包）

 --open页面通过设置config/config.js中openPage选项
```

## 文件树

```bash
│ .gitignore
│ package.json
│ postcss.config.js
│ README.md
│ webpack.config.js
│ yarn.lock
│
├─config
│ config.js
│ utils.js
│ webpack.config.base.js
│ webpack.config.dev.js
│ webpack.config.prod.js
│
├─src
│ ├─assets
│ │ s_rate_red_b.png
│ │
│ ├─pages
│ │ ├─layout
│ │ │ ├─layout.js
│ │ │ ├─layout.pug
│ │ │
│ │ ├─pageOne
│ │ │ ├─pageOne.js
│ │ │ ├─pageOne.pug
│ │ │ ├─pageOne.scss
│ │ │
│ │ └─pageTwo
│ │ ├─pageTwo.js
│ │ ├─pageTwo.pug
│ │ ├─pageTwo.scss
│ │
│ ├─utils
│ │  │
│ ├──css
│ │  ├─CONST.scss
│ │
│ └──js
│    ├─localStorage.js
│
└─static
│   │
├──css
│   ├─bs.css
│   │
├──img
│   ├─s_rate_red_b.png
│   │
├──js
│   ├─jq.js
```
