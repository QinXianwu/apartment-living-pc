<template>
  <div class="custom-input">
    <ElInput v-model="value" :placeholder="placeholder" :style="calStyle">
      <template #prefix>
        <i class="el-input__icon el-icon-search"></i>
      </template>
    </ElInput>
  </div>
</template>
<script>
export default {
  name: "cu-search",
  props: {
    keyId: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    backgroundColor: {
      type: String,
      default: "#f5f5f5",
    },
  },
  data() {
    return {
      value: "",
    };
  },
  computed: {
    calStyle() {
      return {
        backgroundColor: this.backgroundColor,
        borderColor: this.backgroundColor,
      };
    },
  },
};
</script>
<style lang="scss">
.custom-input {
  padding: 5px 15px;
  .el-input {
    border-radius: 20px;
  }
  .el-input__inner {
    background-color: inherit;
    border-color: inherit;
    border-radius: 20px;
  }
}
</style>
