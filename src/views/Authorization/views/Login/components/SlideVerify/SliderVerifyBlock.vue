<template>
  <div
    class="slide-verify-slider tipText"
    ref="SliderVerify"
    :class="`${isDownUp || isVerifyLoading ? 'hide' : ''}`"
    :data-attr="tipText"
  >
    <div class="slider" ref="Slider" :style="sliderStyle">
      <div
        ref="SliderBlock"
        class="slider-block"
        :class="{ 'not-allowed': isVerifyLoading }"
        :style="sliderMainStyle"
        @mousedown="holdDown"
        @mouseup="holdUp"
      >
        <div class="slider-block-icon" :class="sliderBlockIconClass" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SliderVerifyBlock",
  components: {},
  props: {
    blockMoveX: {
      type: [Number, String],
      default: 0,
    },
    blockRadius: {
      type: [Number, String],
      default: 0,
    },
    isVerifyLoading: {
      type: Boolean,
      default: false,
    },
    isVerifyResult: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      verifyTime: 1000,
      originX: 0,
      originY: 0,
      tipText: "向右滑动滑块填充拼图",
      isDownUp: false,
      isVerifySucceed: false,
      isVerifyError: false,
      sliderBlockStyle: {},
    };
  },
  computed: {
    sliderBlockIconClass({ isVerifySucceed, isVerifyError }) {
      const iconClass = `icon-${
        isVerifySucceed ? "succeed" : isVerifyError ? "close" : "right"
      } `;
      return iconClass;
    },
    sliderStyle({ isDownUp, isVerifyLoading, isVerifySucceed, isVerifyError }) {
      const styleObj = {};
      if (isDownUp || isVerifyLoading) {
        styleObj["background"] = "#d4e6fb";
        styleObj["border-color"] = "#2b6fe5";
      }
      if (isVerifySucceed && isVerifyLoading) {
        styleObj["background"] = "#C1F5F0";
        styleObj["border-color"] = "#40E0D0";
      } else if (isVerifyError && isVerifyLoading) {
        styleObj["background"] = "#f56c6c5c";
        styleObj["border-color"] = "#f56c6c";
      }
      return styleObj;
    },
    sliderMainStyle({
      isDownUp,
      isVerifyLoading,
      isVerifySucceed,
      isVerifyError,
      sliderBlockStyle,
    }) {
      const styleObj = { ...sliderBlockStyle };
      if (isDownUp || isVerifyLoading) {
        styleObj["background"] = "#2b6fe5";
      }
      if (isVerifySucceed && isVerifyLoading) {
        styleObj["background"] = "#40E0D0";
      } else if (isVerifyError && isVerifyLoading) {
        styleObj["background"] = "#f56c6c";
      }
      return styleObj;
    },
  },
  methods: {
    init() {
      this.originX = 0;
      this.originY = 0;
      this.isDownUp = false;
      this.isVerifySucceed = false;
      this.isVerifyError = false;
      this.sliderBlockStyle = {};
      this.$emit("update:blockMoveX", 0);
      this.$emit("update:isVerifyLoading", false);
      this.$emit("update:isVerifyResult", false);
    },
    //鼠标按下
    holdDown(event) {
      // 获取拖拽起始位置坐标
      this.originX = event.clientX || event.touches[0].clientX;
      this.originY = event.clientY || event.touches[0].clientY;
      this.isDownUp = true;
      document.onmousemove = (ev) => {
        if (!this.isDownUp || this.isVerifyLoading) return false;
        this.$emit("update:isVerifyLoading", false);
        const blockRadius = (parseInt(this.blockRadius) || 0) * 2;
        const maxMoveX = this.$refs.SliderVerify.offsetWidth - blockRadius;
        // 获取拖拽移动的距离
        const eventX = ev.clientX || ev.touches[0].clientX;
        const moveX = eventX - this.originX;
        if (moveX < 0 || moveX + 40 >= maxMoveX) return false;
        this.$emit("update:blockMoveX", moveX);
        this.sliderBlockStyle = {
          "margin-left": moveX + "px",
        };
      };
      document.onmouseup = () => {
        if (this.isDownUp && !this.isVerifyLoading) this.holdUp();
      };
    },
    //鼠标松开
    holdUp() {
      this.isDownUp = false;
      this.$emit("update:isVerifyLoading", true);
      this.$emit("changeVerify", true);
    },
    // 处理校验结果
    async handleVerifyResult() {
      // eslint-disable-next-line
      return new Promise(async (resolve) => {
        setTimeout(() => {
          this.isVerifyError = !this.isVerifyResult;
          this.isVerifySucceed = this.isVerifyResult;
        }, this.verifyTime);
        if (this.isVerifyResult) console.log("校验通过");
        setTimeout(() => {
          this.$emit("changeResult", this.isVerifyResult);
          this.init();
          resolve(true);
        }, 1500);
      });
    },
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    //
  },
};
</script>
<style lang="scss" scoped>
.slide-verify-slider {
  position: relative;
  z-index: 10;
  width: 100%;
  height: 40px;
  border: 1px solid #eee;
  background: #f7f8fa;
  border-radius: 4px;
  &.tipText {
    color: #999;
    transition: color 0.3s;
  }
  &.tipText.hide {
    color: rgba(153, 153, 153, 0);
  }
  &.tipText::before {
    content: attr(data-attr);
    width: 100%;
    left: 0;
    text-align: center;
    position: absolute;
    font-size: 14px;
    line-height: 40px;
  }

  .slider {
    opacity: 1;
    position: relative;
    top: -1px;
    width: fit-content;
    border-radius: 4px;
    border: solid 1px rgba(255, 255, 255, 0);
    transition: border-color 0.3s;
    &-block {
      position: relative;
      z-index: 20;
      width: 40px;
      height: 40px;
      background: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background 0.3s;
      border-radius: 4px;
      box-shadow: 0 2px 8px 0 rgba(112, 112, 112, 0.1),
        0 6px 20px 0 rgba(112, 112, 112, 0.1);
    }
    &-block.hover {
      background: #2b6fe5;
    }
    &-block:hover {
      background: #2b6fe5;
    }
    &-block.not-allowed {
      cursor: not-allowed;
    }
  }
}
.slider-block-icon {
  &.icon-right {
    &::before {
      content: "\279C";
      color: #eee;
    }
  }
  &.icon-succeed {
    margin: 0 0 0 0;
    &::before {
      content: "\2714";
      color: #eee;
    }
  }
  &.icon-close {
    margin: 0 0 0 0;
    &::before {
      content: "\2716";
      color: #eee;
    }
  }
}
</style>
