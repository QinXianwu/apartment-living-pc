<template>
  <el-tabs type="card" v-model="tabValue" @tab-click="tabClick">
    <el-tab-pane
      v-for="(item, index) in tabList"
      :key="index"
      :label="item.label"
      :name="String(item.value)"
    />
    <!-- v-permission="item.permission" -->
  </el-tabs>
</template>
<script>
export default {
  props: {
    state: [String, Number], //状态
  },
  data() {
    return {
      tabValue: this.$CONST.ORDER_PURCHASE_STATE.ALL,
      tabList: [
        {
          label: "全部",
          value: this.$CONST.ORDER_PURCHASE_STATE.ALL,
          permission: this.$PERMISSION_ID.Goods,
        },
        {
          label: "待发货",
          value: this.$CONST.ORDER_PURCHASE_STATE.WAIT_SEND,
          permission: this.$PERMISSION_ID.Goods,
        },
        {
          label: "待收货",
          value: this.$CONST.ORDER_PURCHASE_STATE.WAIT_DELIVERY,
          permission: this.$PERMISSION_ID.Goods,
        },
        {
          label: "已完成",
          value: this.$CONST.ORDER_PURCHASE_STATE.FINISH,
          permission: this.$PERMISSION_ID.Goods,
        },
        {
          label: "已取消",
          value: this.$CONST.ORDER_PURCHASE_STATE.CANCEL,
          permission: this.$PERMISSION_ID.Goods,
        },
      ],
    };
  },
  methods: {
    tabClick() {
      const state =
        Number(this.tabValue) === this.$CONST.ORDER_PURCHASE_STATE.ALL
          ? ""
          : this.tabValue;
      this.$emit("update:state", state);
      this.$emit("getList");
    },
  },
};
</script>
<style lang="scss" scoped>
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
