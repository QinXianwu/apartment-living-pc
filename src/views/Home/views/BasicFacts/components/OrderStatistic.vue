<template>
  <div class="OrderStatistic">
    <div class="title">
      <span>订单数据统计</span>
    </div>
    <div class="content">
      <div class="content-l">
        <EchartLine
          chartTitle=""
          :chartsData="chartsData"
          :chartsXAxisData="chartsXAxisData"
          v-if="chartsXAxisData && chartsXAxisData.length"
        />
      </div>
      <div class="content-r">
        <div class="content-l-title">汇总信息</div>
        <div class="order-info">
          <div
            class="order-info-item"
            v-for="(item, index) in orderInfoArr"
            :key="index"
          >
            <span class="label">{{ item.label }}</span>
            <span class="value">{{ item.value || "-" }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="title">
      <span>订单数据统计</span>
    </div>
    <div class="content-ratio">
      <EchartLine
        chartTitle=""
        :chartsData="chartsRatioData"
        :chartsXAxisData="chartsXAxisData"
        yAxisFormatter="{value} %"
        v-if="chartsXAxisData && chartsXAxisData.length"
      />
    </div>
  </div>
</template>

<script>
import EchartLine from "components/Echart/EchartLine/Chart.vue";

export default {
  name: "OrderStatistic",
  components: { EchartLine },
  props: {
    statisticInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {};
  },
  computed: {
    orderInfoArr({ statisticInfo }) {
      return [
        {
          label: "订单数",
          prop: "orderCount",
          value: statisticInfo?.orderCountEveryDay || 0,
        },
        {
          label: "有票订单数",
          prop: "successOrderCount",
          value: statisticInfo?.successOrderCountEveryDay || 0,
        },
        {
          label: "票数",
          prop: "ticketingCountEveryHour",
          value: statisticInfo?.ticketingCountEveryDay || 0,
        },
        {
          label: "无票订单数",
          prop: "failOrderCount",
          value: statisticInfo?.failOrderCountEveryDay || 0,
        },
        {
          label: "超时订单数",
          prop: "overtimeOrderCount",
          value: statisticInfo?.overtimeOrderCountEveryDay || 0,
        },
      ];
    },
    // x轴数据
    chartsXAxisData({ statisticInfo }) {
      if (!statisticInfo?.statistics?.length) return [];
      return statisticInfo.statistics.map((item) => item.indexTime);
    },
    chartsData({ orderInfoArr, statisticInfo }) {
      return orderInfoArr.map((item) => {
        const date = statisticInfo?.statistics?.length
          ? statisticInfo.statistics.map((ele) => ele[item.prop])
          : [];
        return {
          data: date,
          name: item.label,
          isSmooth: true,
          showXMarkPoint: true,
          showYMarkLine: false,
        };
      });
    },
    chartsRatioData({ statisticInfo }) {
      const infoMapArr = [
        {
          label: "出票效率",
          prop: "efficiency",
        },
        {
          label: "出票成功率",
          prop: "successRate",
        },
      ];
      return infoMapArr.map((item) => {
        const date = statisticInfo?.statistics?.length
          ? statisticInfo.statistics.map((ele) => ele[item.prop])
          : [];
        return {
          data: date,
          name: item.label,
          isSmooth: true,
          showXMarkPoint: true,
          showYMarkLine: false,
        };
      });
    },
  },
  methods: {},
  mounted() {
    //
  },
};
</script>
<style lang="scss" scoped>
.title {
  font-size: 14px;
  color: $main-font-color;
  margin: 0 0 15px;
}
.content {
  display: flex;
  padding: 0 10px;
  margin: 0 0 30px;
  &-r {
    background: #f7f8fa;
    padding: 20px;
    border-radius: 8px;
    height: fit-content;
    position: relative;
    top: 10px;

    &-title {
      font-size: 14px;
      color: $main-font-color;
      margin: 0 0 15px;
    }
    .order-info {
      display: flex;
      flex-direction: column;
      width: 200px;
    }
    .order-info .order-info-item {
      font-size: 14px;
      color: $sub-font-color;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 0;
    }
    .order-info .order-info-item .value {
      color: $main-font-color;
      font-weight: 600;
    }
  }
}
</style>
