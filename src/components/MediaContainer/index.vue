// 手机预览窗口
<template>
  <div class="device-warper">
    <div class="device-header">
      <img src="./images/header.png" />
      <div class="device-title">{{ title }}</div>
    </div>
    <div class="wrapper">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
// 手机预览窗口样式
$borderColor: #e5e5e5;
$deviceWidth: 375px;
.device-warper:not(.background-swipe) {
  min-height: inherit;
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  padding: 20px 0;
  > div {
    z-index: 1;
  }
  .wrapper {
    width: $deviceWidth;
    position: relative;
    border: 1px solid $borderColor;
    border-top: none;
    background-color: #fff;
    height: 100%;
    min-height: 600px;
    > span {
      width: 100%;
      display: inline-block;
    }
  }
  .device-header {
    width: 377px;
    position: relative;
    border: 1px solid $borderColor;
    box-sizing: border-box;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
    .device-title {
      padding: 0 100px;
      left: 0;
      right: 0;
      top: 50%;
      display: block;
      text-align: center;
      position: absolute;
      font-size: 17px;
      font-weight: 600;
      line-height: 20px;
      font-family: PingFangSC-Semibold, PingFang SC;
      color: #000;
      @include overflow-eps(1);
    }
  }
}
</style>
