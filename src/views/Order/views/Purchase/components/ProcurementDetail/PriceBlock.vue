<template>
  <div class="PriceBlock">
    <div class="PriceBlock-title">{{ title }}</div>
    <div class="PriceBlock-value">
      <template>
        {{ value }}
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 标题
    title: {
      type: String,
      default: "-",
    },
    // 值
    value: {
      type: [Number, String],
      default: "",
    },
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
.PriceBlock {
  display: inline-block;
  min-width: 180px;
  background: #f7f8fa;
  // border-radius: 8px;
  padding: 10px 14px;
  box-sizing: border-box;
  margin-right: 16px;
  margin-top: 0px;
  &-title {
    font-size: 12px;
    color: $tip-font-color;
    line-height: 17px;
  }
  &-value {
    font-size: 20px;
    color: $main-font-color;
    line-height: 33px;
  }
  .top-icon {
    color: #f23030;
  }
  .bottom-icon {
    color: #32b12e;
  }
}
</style>
