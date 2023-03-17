<template>
  <div class="EchartLine">
    <div
      i="chartsReport"
      :ref="refName"
      :style="{
        width: `${width ? width : ''}px`,
        height: `${height ? height : ''}px`,
      }"
    ></div>
  </div>
</template>

<script>
import { graphic } from "echarts";
import { themeColor } from "../config";
export default {
  name: "Chart",
  props: {
    width: {
      type: Number,
      default: 800,
    },
    height: {
      type: Number,
      default: 420,
    },
    chartTitle: {
      type: String,
      default: "",
    },
    chartsData: {
      type: Array,
      default: () => [],
    },
    chartsXAxisData: {
      type: Array,
      default: () => [],
    },
    yAxisFormatter: {
      type: String,
      default: "{value}",
    },
  },
  data() {
    return {
      charts: "",
      refName: `echartLine-${new Date().getTime()}`,
    };
  },
  computed: {
    xAxisData({ chartsXAxisData }) {
      if (!chartsXAxisData?.length) return [];
      return chartsXAxisData;
    },
  },
  methods: {
    initEcharts() {
      if (!this.$echarts) return;
      this.charts = this.$echarts.init(this.$refs[this.refName], null, {
        renderer: "svg",
      });
    },
    drawCharts() {
      const { series } = this.getChartsData();
      if (!this.charts) return;
      this.charts.setOption({
        title: { text: this.chartTitle, textStyle: {} },
        tooltip: {
          trigger: "axis",
        },
        // 设置主题色
        color: themeColor.map((item) => item.lineColor),
        legend: {},
        xAxis: {
          type: "category",
          data: this.xAxisData,
          boundaryGap: false,
          axisLabel: {
            color: "#4E5969",
            formatter(value, idx) {
              if (idx === 0) return "";
              return `${value}`;
            },
          },
          axisPointer: {
            show: true,
            lineStyle: {
              color: "#23ADFF",
              width: 2,
            },
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
        },
        yAxis: {
          type: "value",
          axisLabel: {
            show: true,
            interval: "auto",
            formatter: this.yAxisFormatter || "{value}", //纵坐标百分比
          },
        },
        series: series,
      });
    },
    getChartsData() {
      if (!this.chartsData?.length) return [];
      const series = this.chartsData.map((item, index) => {
        const chartStyleObj = this.getChartStyle(index);
        const seriesItem = {
          data: item.data || [],
          type: "line",
          name: item.name || "",
          symbolSize: 12,
          emphasis: {
            focus: "series",
            itemStyle: {
              borderWidth: 3,
            },
          },
          showSymbol: false,
          ...chartStyleObj,
        };
        if (!item?.showXMarkPoint && typeof item?.showXMarkPoint === "boolean")
          delete seriesItem.markPoint;
        if (!item?.showYMarkLine && typeof item?.showYMarkLine === "boolean")
          delete seriesItem.markLine;
        if (item?.isSmooth) seriesItem.smooth = true; // 是否平滑曲线
        return seriesItem;
      });
      return { series };
    },
    // 处理图表相关样式
    getChartStyle(index = 1) {
      const themeStyleItem = themeColor[index % themeColor.length];
      const peakStyle = {
        itemStyle: {
          ...themeStyleItem.peakColor,
        },
      };
      // X轴
      const markPoint = {
        data: [
          { type: "max", name: "最大值", ...peakStyle },
          { type: "min", name: "最小值", ...peakStyle },
        ],
      };
      // Y轴
      const markLine = {
        data: [{ type: "average", name: "平均值", ...peakStyle }],
      };
      const styleObj = {
        markPoint,
        markLine,
        // 线条颜色
        lineStyle: {
          width: 2,
          color: new graphic.LinearGradient(0, 0, 1, 0, [
            {
              offset: 1,
              color: themeStyleItem.lineColor,
            },
          ]),
        },
        // 线条所覆盖内容颜色
        areaStyle: {
          opacity: 0.8,
          color: new graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: themeStyleItem.areaColor.state,
            },
            {
              offset: 1,
              color: themeStyleItem.areaColor.end,
            },
          ]),
        },
      };
      return styleObj;
    },
    // 动态设置图表数据
    setChartsDate({ xAxis = [], chartsDataList = [] }) {
      if (!xAxis?.length || !chartsDataList?.length) return;
      const series = chartsDataList.map((item) => ({ data: item }));
      this.charts.setOption({
        xAxis: [{ data: xAxis }],
        series: series,
      });
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.initEcharts();
      this.drawCharts();
    });
  },
};
</script>

<style scoped lang="scss">
.EchartLine {
  [i="chartsReport"] {
    width: 800px;
    height: 420px;
  }
  .tooltip-title {
    margin: 0 0 10px 0;
  }
  .tooltip-title,
  .tooltip-value {
    font-size: 13px;
    line-height: 15px;
    display: flex;
    align-items: center;
    text-align: right;
    color: #1d2129;
    font-weight: bold;
  }
  .tooltip-item-icon {
    display: inline-block;
    margin-right: 8px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }
}
</style>
