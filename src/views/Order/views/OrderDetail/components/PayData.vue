<template>
  <div class="PayData">
    <div class="title">付款信息</div>
    <div class="content">
      <div class="orderNo">
        <span>订单号:</span>
        <span class="value">{{ orderNo }}</span>
      </div>
      <TableBlock :tableData="tableData1" :valueWidth="250" />
    </div>
  </div>
</template>

<script>
import CONST from "@/constants/index";
import filters from "@/filters/index";
import TableBlock from "@/components/TableBlock";
export default {
  name: "PayData",
  components: { TableBlock },
  props: {
    payInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      CONST,
      column: [],
    };
  },
  computed: {
    orderNo() {
      return this.$router.currentRoute.query?.orderNo || "";
    },
    tableData1({ payInfo }) {
      return [
        { label: "商品总额", value: payInfo?.totalAmount, type: "money" },
        { label: "配送费", value: payInfo?.sendAmount, type: "money" },
        {
          label: "配送优惠金额",
          value: payInfo?.voucherSendAmount,
          type: "money",
        },
        {
          label: "积分抵扣",
          value: `￥${filters.formatCurrency(payInfo?.creditByPoints)}（${
            payInfo?.integral || "0"
          }积分）`,
        },
        { label: "优惠金额", value: payInfo?.couponAmount, type: "money" },
        { label: "实付款", value: payInfo?.orderAmount, type: "money" },
      ];
    },
  },
  methods: {},
  filters: {},
  mounted() {
    //
  },
};
</script>
<style lang="scss" scoped>
.PayData {
  padding: 20px 0;
  .title {
    font-size: 14px;
    font-weight: bold;
    color: $sub-font-color;
    margin-bottom: 20px;
  }
  .content {
    margin-bottom: 20px;
  }
  .orderNo {
    width: max-content;
    display: flex;
    align-items: center;
    background: #f7f8fa;
    padding: 10px 14px;
    box-sizing: border-box;
    margin: 0 0 14px;
    span {
      margin-right: 10px;
      font-size: 14px;
      color: $sub-font-color;
    }
    .value {
      color: $main-font-color;
    }
  }
}
</style>
