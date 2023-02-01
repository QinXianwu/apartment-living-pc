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
  data() {
    return {
      originX: 0,
      originY: 0,
      tipText: "向右滑动滑块填充拼图",
      isDownUp: false,
      isVerifyResult: false,
      isVerifyLoading: false,
      isVerifyResultError: false,
      sliderBlockStyle: {},
    };
  },
  computed: {
    sliderBlockIconClass({ isVerifyResult, isVerifyResultError }) {
      return `icon-arrow-${
        isVerifyResult ? "succeed" : isVerifyResultError ? "close" : "right"
      }`;
    },
    sliderStyle({
      isDownUp,
      isVerifyLoading,
      isVerifyResult,
      isVerifyResultError,
    }) {
      const styleObj = {};
      if (isDownUp || isVerifyLoading) {
        styleObj["background"] = "#d4e6fb";
        styleObj["border-color"] = "#2b6fe5";
      }
      if (isVerifyResult && isVerifyLoading) {
        styleObj["background"] = "#C1F5F0";
        styleObj["border-color"] = "#40E0D0";
      } else if (isVerifyResultError && isVerifyLoading) {
        styleObj["background"] = "#f56c6c5c";
        styleObj["border-color"] = "#f56c6c";
      }
      return styleObj;
    },
    sliderMainStyle({
      isDownUp,
      isVerifyLoading,
      isVerifyResult,
      isVerifyResultError,
      sliderBlockStyle,
    }) {
      const styleObj = { ...sliderBlockStyle };
      if (isDownUp || isVerifyLoading) {
        styleObj["background"] = "#2b6fe5";
      }
      if (isVerifyResult && isVerifyLoading) {
        styleObj["background"] = "#40E0D0";
      } else if (isVerifyResultError && isVerifyLoading) {
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
      this.isVerifyResult = false;
      this.isVerifyLoading = false;
      this.isVerifyResultError = false;
      this.sliderBlockStyle = {};
    },
    //鼠标按下
    holdDown(event) {
      // 获取拖拽起始位置坐标
      this.originX = event.clientX || event.touches[0].clientX;
      this.originY = event.clientY || event.touches[0].clientY;
      this.isDownUp = true;
      this.isVerifyLoading = false;
      document.onmousemove = (ev) => {
        if (!this.isDownUp) return false;
        const maxMoveX = this.$refs.SliderVerify.offsetWidth;
        // 获取拖拽移动的距离
        const eventX = ev.clientX || ev.touches[0].clientX;
        const moveX = eventX - this.originX;
        if (moveX < 0 || moveX + 40 >= maxMoveX) return false;
        this.sliderBlockStyle = {
          "margin-left": moveX + "px",
        };
      };
      document.onmouseup = () => {
        if (this.isDownUp) this.holdUp();
      };
    },
    //鼠标松开
    holdUp() {
      this.isDownUp = false;
      this.isVerifyLoading = true;
      setTimeout(() => {
        const result = false;
        this.isVerifyResult = result;
        this.isVerifyResultError = !result;
        setTimeout(() => {
          this.init();
        }, 2000);
      }, 2000);
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
  }
}
.slider-block-icon {
  &.icon-arrow-right {
    &::before {
      content: "\279C";
      color: #eee;
    }
  }
  &.icon-arrow-succeed {
    margin: 0 0 0 0;
    &::before {
      content: "\2714";
      color: #eee;
    }
  }
  &.icon-arrow-close {
    margin: 0 0 0 0;
    &::before {
      content: "\2716";
      color: #eee;
    }
  }
}
</style>
