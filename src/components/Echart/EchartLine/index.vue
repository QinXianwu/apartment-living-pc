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
export default {
  name: "EchartLine",
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
          // 坐标轴指示器是指示坐标轴当前刻度的工具
          axisPointer: {
            type: "cross",
            label: { backgroundColor: "#ff4949" },
          },
        },
        legend: {},
        xAxis: { type: "category", data: this.xAxisData, boundaryGap: true },
        yAxis: {},
        series: series,
      });
    },
    getChartsData() {
      if (!this.chartsData?.length) return [];
      // X轴
      const markPoint = {
        data: [
          { type: "max", name: "最大值" },
          { type: "min", name: "最小值" },
        ],
      };
      // Y轴
      const markLine = {
        data: [{ type: "average", name: "平均值" }],
      };
      const series = this.chartsData.map((item) => {
        const seriesItem = {
          data: item.data || [],
          type: "line",
          name: item.name || "",
          markPoint,
          markLine,
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
}
</style>
