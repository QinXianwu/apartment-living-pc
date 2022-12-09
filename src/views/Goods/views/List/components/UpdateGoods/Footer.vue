<template>
  <footer :class="{ fullWidth: sidebar.opened, colseWidth: !sidebar.opened }">
    <el-button @click="cancel">取消</el-button>
    <el-button @click="goBack" v-if="activeIndex > 0"> 上一步</el-button>
    <el-button type="primary" @click="onNext">{{
      activeIndex >= setpAll ? (isUpdate ? "修改" : "保存") : "下一步"
    }}</el-button>
  </footer>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  props: {
    activeIndex: {
      type: Number,
      default: 0,
    },
    setpAll: {
      type: Number,
      default: 0,
    },
    isUpdate: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters(["sidebar"]),
  },
  methods: {
    onNext() {
      this.$emit("next");
    },
    goBack() {
      this.$emit("goBack");
    },
    cancel() {
      this.$emit("cancel");
    },
  },
};
</script>

<style lang="scss" scoped>
footer {
  position: fixed;
  width: 100%;
  height: 50px;
  right: 0;
  bottom: 0;
  padding: 0 20px;
  box-sizing: border-box;
  background: #ffffff;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: $--table-border;
  &.fullWidth {
    width: calc(100% - #{$sideBarWidth});
  }
  &.colseWidth {
    width: calc(100% - #{$sideBarCloseWidth});
  }
}

::v-deep.el-button {
  width: 70px;
}
</style>
