<template>
  <div class="ReturnGoodsData">
    <div class="title">退货信息</div>
    <div class="content">
      <TableBlock :tableData="tableData1" :valueWidth="350" />
    </div>
    <div class="title return-info">退款单信息</div>
    <div class="content">
      <TableBlock :tableData="tableData2" :valueWidth="350" />
    </div>
  </div>
</template>

<script>
import CONST from "@/constants/index";
import TableBlock from "@/components/TableBlock";
export default {
  name: "ReturnGoodsData",
  components: { TableBlock },
  props: {
    orderInfo: {
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
    tableData1({ orderInfo }) {
      const refundImg = orderInfo?.fileAttachment
        ? orderInfo.fileAttachment.split(",")
        : [];
      return [
        { label: "退款原因", value: orderInfo?.reason },
        { label: "收件人", value: orderInfo?.nickName },
        { label: "退款描述", value: orderInfo?.description },
        { label: "自提时间", value: orderInfo?.pickingTime },
        {
          label: "退款图片",
          value: refundImg?.length ? refundImg : "",
          type: "image-list",
        },
      ];
    },
    tableData2({ orderInfo }) {
      return [
        { label: "服务点", value: orderInfo?.serviceName },
        { label: "订单号", value: orderInfo?.orderNo },
        { label: "申请时间", value: orderInfo?.applyDate },
        {
          label: "退款方式",
          value: CONST.REFUND_METHOD_TEXT[orderInfo?.refundMethod],
        },
        { label: "退款人", value: orderInfo?.name },
        { label: "收件电话", value: orderInfo?.managePhone },
        { label: "收货地址/自提地址", value: orderInfo?.address },
        { label: "授权头像", value: orderInfo?.avatarUrl, type: "image" },
        { label: "授权昵称", value: orderInfo?.nickName },
        { label: "授权手机", value: orderInfo?.mobile },
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
.ReturnGoodsData {
  padding: 20px 0;
  .title {
    font-size: 14px;
    font-weight: bold;
    color: $sub-font-color;
    margin-bottom: 20px;
  }
  .return-info {
    padding-top: 20px;
  }
  .content {
    margin-bottom: 20px;
  }
}
</style>
