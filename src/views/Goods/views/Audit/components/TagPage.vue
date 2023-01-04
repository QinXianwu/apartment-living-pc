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
      tabValue: this.$CONST.AUDIT_TYPE.ALL,
      tabList: [
        {
          label: "全部",
          value: this.$CONST.AUDIT_TYPE.ALL,
          permission: this.$PERMISSION_ID.Goods,
        },
        {
          label: "待审核",
          value: this.$CONST.AUDIT_TYPE.NO_CHECK,
          permission: this.$PERMISSION_ID.Goods,
        },
        {
          label: "审核成功",
          value: this.$CONST.AUDIT_TYPE.SUCCESS_CHECK,
          permission: this.$PERMISSION_ID.Goods,
        },
        {
          label: "审核失败",
          value: this.$CONST.AUDIT_TYPE.FAIL_CHECK,
          permission: this.$PERMISSION_ID.Goods,
        },
      ],
    };
  },
  methods: {
    tabClick() {
      const state =
        Number(this.tabValue) === this.$CONST.AUDIT_TYPE.ALL
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
