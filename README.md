# vue-model

## Description

vue/cli 搭建的框架目录，减少项目初始化各项配置，包含如下功能：

- 组件路由懒加载，路由拦截
- Axios 请求封装，请求缓存，请求拦截，请求取消，请求地址配置
- 404 页面配置，pc 端，移动端
- sass 预处理器，全局配置，sass 常用功能
- 常用 js 方法封装
- reset 样式处理
- svg 图标，svg 雪碧图，svg 组件

> 技术栈：Vue、Vue Cli、Vue Router、Vuex、Axios

## Usage

- 组件路由:设置不同的 404 页，在**router.js**中设置
- Axios 缓存配置：**AxiosConfig.js**中配置了缓存(默认关闭)，将**cache 设为 true**即可。若不想使用缓存可将 **\_AxiosConfig.js**设为主要配置

## Project setup

```js
npm install
```

### Compiles and hot-reloads for development

```js
npm run serve
```

### Compiles and minifies for production

```js
npm run build
```

### Lints and fixes files

```js
npm run lint
```
