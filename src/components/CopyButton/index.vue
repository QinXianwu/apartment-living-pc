<template>
  <div class="copy_button theme-color" @click="copy">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    // 需要复制的文本
    copyString: {
      type: String,
      default: "",
    },
  },
  methods: {
    copy() {
      const result = this.$clipboard(this.copyString);
      if (result) {
        this.clipboardSuccessHandler();
      } else {
        this.clipboardErrorHandler();
      }
    },
    // 复制链接成功
    clipboardSuccessHandler() {
      this.$message({
        message: "复制成功!" + this.copyString,
        type: "success",
      });
    },
    // 复制链接失败
    clipboardErrorHandler() {
      this.$message({
        message:
          "复制失败!请使用最新浏览器进行复制或者选中复制" + this.copyString,
        type: "error",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.copy_button {
  cursor: pointer;
  padding: 0 5px;
  display: inline-block;
}
</style>
