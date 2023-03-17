<template>
  <div class="EchartsPie">
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
  name: "EchartsPie",
  props: {
    width: {
      type: Number,
      default: 650,
    },
    height: {
      type: Number,
      default: 220,
    },
    legend: {
      type: Object,
      default: () => ({
        orient: "vertical",
        left: "auto",
      }),
    },
    // 系列名称
    seriesName: {
      type: String,
      default: "系列名称",
    },
    // 提示框浮层内容格式器，支持字符串模板和回调函数
    tooltipFormatter: {
      type: String,
      default: "{a}<br/>{b}:{c} ({d}%)",
    },
    // 列表 label key
    opinionKey: {
      type: String,
      default: "name",
    },
    //自定义颜色
    colorList: {
      type: Array,
      default: () => [],
    },
    // 饼状图数据
    chartsData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      charts: "",
      refName: `echartsPie-${new Date().getTime()}`,
    };
  },
  computed: {
    opinion({ opinionKey, chartsData }) {
      if (!chartsData?.length) return [];
      return chartsData.map((item) => item[opinionKey || "name"]);
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
        tooltip: {
          trigger: "item", // 数据项图形触发
          formatter: this.tooltipFormatter,
        },
        legend: {
          data: this.opinion,
          ...this.legend,
        },
        series: [series],
      });
    },
    getChartsData() {
      const series = {
        // 系列名称，用于tooltip的显示，legend 的图例筛选
        type: "pie",
        avoidLabelOverlap: false,
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
        data: this.chartsData,
      };
      if (this.seriesName) series.name = this.seriesName;
      if (this.colorList?.length) {
        series.itemStyle.color = (params) => this.colorList[params.dataIndex];
      }
      return { series };
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
<style lang="scss" scoped>
.EchartsPie {
  width: 600px;
  [i="chartsReport"] {
    width: 650px;
    height: 220px;
  }
}
</style>
