<template>
  <div class="StatisticsDetails" v-if="infoArr && infoArr.length">
    <div class="title">支付统计详情</div>
    <div class="content">
      <div class="item" v-for="(item, index) in infoArr" :key="index">
        <span class="item-label mr-10">{{ item && item.label }}:</span>
        <span
          class="item-value mr-10"
          :class="{
            is: item && item.value,
            dazzling: item && item.isDazzling && item.value,
          }"
          >{{ item.value }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StatisticsDetails",
  props: {
    info: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    infoArr({ info }) {
      // console.log(info);
      return [
        {
          label: "票款",
          value: info?.fareCount || 0,
        },
        {
          label: "支付订单数",
          value: info?.payOrderCount || 0,
          isDazzling: true, // 是否高亮
        },
        // {
        //   label: "代购费",
        //   value: "",
        //   isDazzling: true,
        // },
        // {
        //   label: "服务费",
        //   value: "",
        //   isDazzling: true,
        // },
        // {
        //   label: "订单总金额",
        //   value: "",
        //   isDazzling: true,
        // },
      ];
    },
  },
  methods: {},
  mounted() {
    //
  },
};
</script>
<style lang="scss" scoped>
.StatisticsDetails {
  background-color: #f7f8fa;
  margin-bottom: 20px;
  padding: 20px;
  .title {
    height: 20px;
    font-size: 14px;
    font-weight: 700;
    color: #282828;
    line-height: 20px;
  }
  .content {
    display: flex;
    flex-wrap: wrap;
    padding: 20px 20px 10px;
    .item {
      display: flex;
      align-items: center;
      margin-right: 20px;
      margin-bottom: 10px;
    }
    .item-label {
      color: $sub-font-color;
      font-size: 14px;
    }
    .item-value {
      padding: 5px 20px;
      border-radius: 40px;
      font-weight: bold;
    }
    .item-value.is {
      color: #fff;
      background: $--color-primary;
    }
    .item-value.dazzling {
      color: #fff;
      background: $--color-danger;
    }
    .item-value.info {
      color: #fff;
      background: $--color-info;
    }
  }
}
</style>
