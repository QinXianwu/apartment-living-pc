# apartment-living-pc

## 后台管理系统

**开发前** 请开发人员查看项目代码规范 [docs/项目代码规范.md](./docs/项目代码规范.md)

### 框架

```js
Vite3 + Vue2 + ElementUi;
```

## 项目启动

```js
yarn // 安装依赖

yanr serve // 运行开发环境
yarn serve.pre // 运行业务演示环境
yarn serve.prod // 运行正式环境

yanr build // 打包开发环境
yarn build.pre // 打包业务演示环境
yarn build.prod // 打包正式环境

/**
 * node_modules\echarts\lib\chart\themeRiver\ThemeRiverView.js
 * 引入echarts打包后可能会报错
 * 原因 ThemeRiverView.js 文件的中有一个方法为 process => 和node环境中process重名
 * 解决方法 修改 ThemeRiverView.js 方法名称
 */
```
