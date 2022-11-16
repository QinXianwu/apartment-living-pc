import "@/plugins/element-ui.js"; // element-ui 配置

/**
 * node_modules\echarts\lib\chart\themeRiver\ThemeRiverView.js
 * 引入echarts打包后可能会报错
 * 原因 ThemeRiverView.js 文件的中有一个方法为 process => 和node环境中process重名
 * 解决方法 修改 ThemeRiverView.js 方法名称
 */
import "@/plugins/echarts.js"; // echarts 配置
