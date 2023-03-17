<template>
  <div
    class="pagination"
    :class="{
      fixed,
      fullWidth: fixed && sidebar.opened,
      colseWidth: fixed && !sidebar.opened,
    }"
    :style="calcStyle"
  >
    <slot></slot>
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      :layout="layout"
      :total="total"
    ></el-pagination>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "pagination",
  props: {
    fixed: {
      type: Boolean,
      default: true,
    },
    layout: {
      type: String,
      default: "total, ->, sizes, prev, pager, next, jumper",
    },
    total: {
      type: Number,
      default: 1000,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 50, 100];
      },
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    // 宽度，单位自己写
    paginationWidth: {
      type: [Number, String],
      default: "",
    },
  },
  computed: {
    ...mapGetters(["sidebar"]),
    calcStyle() {
      if (this.paginationWidth) return `width:${this.paginationWidth};`;
      return ``;
    },
  },
  methods: {
    handleSizeChange(val) {
      this.$emit("size-change", val);
    },
    handleCurrentChange(val) {
      this.$emit("current-change", val);
    },
  },
};
</script>
<style lang="scss" scoped>
.pagination {
  width: 100%;
  height: $paginationHeight;
  padding: 10px 20px;
  box-sizing: border-box;
  background: #ffffff;
  z-index: $z-index2;
  border-top: $--table-border;
  &.fullWidth {
    width: calc(100% - #{$sideBarWidth});
  }
  &.colseWidth {
    width: calc(100% - #{$sideBarCloseWidth});
  }
  &.fixed {
    position: fixed;
    right: 0;
    bottom: 0;
  }
}
</style>
