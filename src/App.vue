<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  mounted() {
    // 设置应用title
    document.title = this.$store.state.app.SysGlobal?.AppInfo?.AppTitle || "";
    // console.log(import.meta.env);
  },
};
</script>

<style lang="scss">
// 主题样式
#app {
  min-width: 1300px;
  color: $main-font-color;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
}
input[type="number"] {
  -moz-appearance: textfield;
}

.el-popover {
  min-width: 80px !important;
}

.el-dialog__header {
  padding: 10px 20px !important;
  box-sizing: border-box !important;
}
.el-dialog__title {
  font-weight: 700 !important;
  line-height: 24px !important;
  font-size: 14px !important;
  color: #1a1a1a !important;
}
.el-dialog__headerbtn {
  top: 15px !important;
}
.el-dialog__footer {
  border-top: $--table-border;
  padding: 10px 20px;
}
.view-container {
  padding: 20px;
  margin: 20px;
}
.el-popper.productTag {
  display: none !important;

  .el-select-dropdown__empty {
    display: none !important;
  }
}
</style>
