<template>
  <div class="AddressInfo">
    <div class="title">{{ title }}地址信息</div>
    <div class="content">
      <TableBlock :tableData="tableData1" :valueWidth="250" />
    </div>
  </div>
</template>

<script>
import CONST from "@/constants/index";
import TableBlock from "@/components/TableBlock";
export default {
  name: "AddressInfo",
  components: { TableBlock },
  props: {
    addressInfo: {
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
    orderType() {
      return this.$router.currentRoute.query?.orderType || "";
    },
    title({ orderType }) {
      return orderType === CONST.LOOK_ORDER_TYPE.SELF_PICKUP_ORDER
        ? "自提"
        : orderType === CONST.LOOK_ORDER_TYPE.SEND_ORDER
        ? "配送"
        : "";
    },
    tableData1({ orderType, addressInfo }) {
      const arr = [
        { label: "服务点", value: addressInfo?.serviceName },
        { label: "收件人", value: addressInfo?.receipteName },
        { label: "收件手机号", value: addressInfo?.receiptePhone },
        { label: "地址", value: addressInfo?.address },
      ];
      if (orderType === CONST.LOOK_ORDER_TYPE.SELF_PICKUP_ORDER) {
        arr.push({ label: "自提时间", value: addressInfo?.pickingTime });
      }
      return [...arr, { label: "备注", value: addressInfo?.remark }];
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
.AddressInfo {
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
}
</style>
