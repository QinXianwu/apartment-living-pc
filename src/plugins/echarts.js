import Vue from "vue";
import "echarts/lib/component/markPoint";
import "echarts/lib/component/markLine";
import * as echarts from "echarts/core";

// import * as echarts from "echarts";

// 按需引入
import {
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BrushComponent,
  TitleComponent,
  GraphicComponent,
} from "echarts/components";
import { LineChart, BarChart, PieChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BrushComponent,
  LineChart,
  BarChart,
  PieChart,
  CanvasRenderer,
  TitleComponent,
  GraphicComponent,
]);
// 全局挂载常量
Vue.prototype.$echarts = echarts;
