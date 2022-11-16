<template>
  <div class="container" :class="customClass" :style="calStyle">
    <span>{{ title }}</span>
  </div>
</template>

<script>
export default {
  name: "cu-title",
  props: {
    keyId: {
      type: String,
      default: "",
    },
    // 标题
    title: {
      type: String,
      default: "",
    },
    // tips文本
    tips: {
      type: String,
      default: "",
    },
    unit: {
      type: String,
      default: "px",
    },
    styleObj: {
      type: Object,
      default() {
        return {
          height: 0,
          textAlign: "left",
          fontSize: "18",
          fontWeight: "bold",
          color: "#333",
          backGroundColor: "",
          borderRadius: 0,
        };
      },
    },
    customClass: {
      type: String,
      default: "",
    },
  },
  computed: {
    calStyle() {
      return {
        height: `${this.styleObj.height}${this.unit}`,
        lineHeight: `${this.styleObj.height}${this.unit}`,
        textAlign: this.styleObj.textAlign,
        fontSize: this.styleObj.fontSize + this.unit,
        fontWeight: this.styleObj.fontWeight,
        color: this.styleObj.color,
        backgroundColor: this.styleObj.backGroundColor,
        borderRadius: this.styleObj.borderRadius + this.unit,
      };
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  padding: 0 15px;
  box-sizing: border-box;
  h3 {
    vertical-align: middle;
  }
}
</style>
