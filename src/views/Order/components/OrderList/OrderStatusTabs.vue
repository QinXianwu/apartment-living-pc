<template>
  <div class="OrderStatusTabs">
    <div class="OrderStatusTabs-l">
      <el-tabs type="card" v-model="tabValue" @tab-click="tabClick">
        <el-tab-pane
          v-for="(item, index) in tabList"
          :key="index"
          :label="item.label"
          :name="String(item.value)"
        />
        <!-- v-permission="item.permission" -->
      </el-tabs>
    </div>
    <div class="OrderStatusTabs-r">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import CONST from "@/constants/index";

export default {
  name: "OrderStatusTabs",
  props: {
    orderStatus: [String, Number], //状态
    orderTypeData: {
      type: Object,
      default: () => ({}),
    },
    // isAfterSale: Boolean, // 是否是售后
    // isSendOrder: Boolean, // 是否是配送单
    // isSelfPickupOrder: Boolean, // 是否是自提单
    // isGroupOrder: Boolean, // 是否是拼团订单
    // isPointsOrder: Boolean, // 是否是积分订单
  },
  data() {
    return {
      CONST,
      tabValue: 0,
    };
  },
  computed: {
    tabList({
      defaultTabList,
      sendTabList,
      selfPickupTabList,
      afterSaleTabList,
      groupTabList,
      orderTypeData,
    }) {
      if (orderTypeData?.isSendOrder || orderTypeData?.isPointsOrder)
        return sendTabList;
      if (orderTypeData.isSelfPickupOrder) return selfPickupTabList;
      if (orderTypeData.isAfterSale) return afterSaleTabList;
      if (orderTypeData.isGroupOrder) return groupTabList;
      return defaultTabList;
    },
    defaultTabList() {
      return CONST.ORDER_STATE_OPTIONS();
    },
    sendTabList() {
      return [
        {
          label: "全部",
          value: CONST.ORDER_STATE.ALL,
        },
        {
          label: "待付款",
          value: CONST.ORDER_STATE.WAIT_PAY,
        },
        {
          label: "配送中",
          value: CONST.ORDER_STATE.IN_TRANSIT,
        },
        {
          label: "待收货",
          value: CONST.ORDER_STATE.WAIT_DELIVERY,
        },
        {
          label: "已完成",
          value: CONST.ORDER_STATE.FINISH,
        },
        {
          label: "已取消",
          value: CONST.ORDER_STATE.CANCEL,
        },
      ];
    },
    selfPickupTabList() {
      return [
        {
          label: "全部",
          value: CONST.ORDER_STATE.ALL,
        },
        {
          label: "待付款",
          value: CONST.ORDER_STATE.WAIT_PAY,
        },
        {
          label: "待出货",
          value: CONST.ORDER_STATE.TO_BE_SHIPPED,
        },
        {
          label: "待核销",
          value: CONST.ORDER_STATE.TO_BE_WRITTEN_OFF,
        },
        {
          label: "已完成",
          value: CONST.ORDER_STATE.FINISH,
        },
        {
          label: "已取消",
          value: CONST.ORDER_STATE.CANCEL,
        },
      ];
    },
    afterSaleTabList() {
      return [
        {
          label: "全部",
          value: CONST.ORDER_STATE.ALL,
        },
      ];
    },
    groupTabList() {
      return [
        {
          label: "全部",
          value: CONST.ORDER_STATE.ALL,
        },
        {
          label: "配送中",
          value: CONST.ORDER_STATE.IN_TRANSIT,
        },
        {
          label: "待收货",
          value: CONST.ORDER_STATE.WAIT_DELIVERY,
        },
        {
          label: "已完成",
          value: CONST.ORDER_STATE.FINISH,
        },
        {
          label: "已取消",
          value: CONST.ORDER_STATE.CANCEL,
        },
      ];
    },
  },
  methods: {
    tabClick() {
      const orderStatus = !Number(this.tabValue) ? "" : this.tabValue;
      this.$emit("update:orderStatus", orderStatus);
      this.$emit("getList");
    },
  },
  mounted() {
    if (this.orderStatus) this.tabValue = this.orderStatus;
  },
};
</script>
<style lang="scss" scoped>
.OrderStatusTabs {
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: relative;
  &-l {
    width: 100%;
  }
  &-r {
    position: absolute;
    right: 0;
    margin: 15px 0 28px;
  }
}
.el-tabs {
  margin: 15px 0 28px;
  ::v-deep .el-tabs__header {
    margin: 0;
  }
  ::v-deep .el-tabs__item.is-top {
    background-color: #f7f8fa;
    &.is-active {
      background-color: #fff;
    }
  }
}
</style>
