<template>
  <div class="TagPage">
    <div class="TagPage-l">
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
    <div class="TagPage-r">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    state: [String, Number], //状态
    tabs: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      tabValue: 0,
    };
  },
  computed: {
    tabList({ tabs }) {
      return tabs;
    },
  },
  methods: {
    tabClick() {
      const state = !Number(this.tabValue) ? "" : this.tabValue;
      this.$emit("update:state", state);
      this.$emit("getList");
    },
  },
};
</script>
<style lang="scss" scoped>
.TagPage {
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
