<template>
  <div class="slide-verify-container" ref="SliderVerifyContainer">
    <div
      class="loading-content"
      :class="{ loading: isVerifyLoading || isRefresh }"
      :style="{
        width: realWidth,
        height: isVerifyLoading || isRefresh ? realHeight : '0',
      }"
    >
      <div
        class="nb-spinner"
        style="border-top-color: #fff"
        v-if="isVerifyLoading || isRefresh"
      />
    </div>
    <div class="pic" :style="{ width: realWidth, height: realHeight }">
      <div
        class="pic-block-icon icon-refresh"
        :class="{ 'not-allowed': isVerifyLoading }"
        @click="initPic"
      />
      <canvas
        ref="PicImg"
        class="pic-img"
        :width="realWidth"
        :height="realHeight"
        v-show="!isRefresh"
      />
      <canvas
        ref="PicBlock"
        class="pic-block"
        :width="realWidth"
        :height="realHeight"
        :style="{ left: moveX }"
        v-show="!isRefresh"
      />
    </div>
  </div>
</template>

<script>
import verify_1 from "./images/verify_1.jpeg";
import verify_2 from "./images/verify_2.jpeg";
import verify_3 from "./images/verify_3.jpeg";
import verify_4 from "./images/verify_4.jpeg";
export default {
  name: "SliderVerifyContainer",
  components: {},
  props: {
    width: {
      type: [Number, String],
      default: 340,
    },
    height: {
      type: [Number, String],
      default: 200,
    },
    blockWidth: {
      type: Number,
      default: 40,
    },
    imageList: {
      type: Array,
      default: () => [verify_1, verify_2, verify_3, verify_4],
    },
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
  },
  data() {
    return {
      isRefresh: false,
      moveX: 0,
      bgImgDom: {},
      ctxPicImg: {},
      ctxPicBlock: {},
      // 滑块宽、圆半径、坐标
      blockRectPosition: { w: 0, r: 0, x: 0, y: 0 },
    };
  },
  watch: {
    blockMoveX(val) {
      const tempMoveX = typeof val === "string" ? val : `${val}`;
      this.moveX = `${tempMoveX || 0}px`;
    },
    "blockRectPosition.r"(val) {
      this.$emit("update:blockRadius", val || 0);
    },
  },
  computed: {
    realWidth({ width }) {
      const tempWidth = typeof width === "string" ? width : `${width}`;
      return `${tempWidth || 340}px`;
    },
    realHeight({ height }) {
      const tempHeight = typeof height === "string" ? height : `${height}`;
      return `${tempHeight || 180}px`;
    },
  },
  methods: {
    init() {
      this.ctxPicImg = this.$refs["PicImg"]?.getContext("2d", {
        willReadFrequently: true,
      });
      this.ctxPicBlock = this.$refs["PicBlock"]?.getContext("2d", {
        willReadFrequently: true,
      });
      this.blockRectPosition.r = this.blockWidth / 4;
      this.blockRectPosition.w = this.blockWidth + (2 * this.blockWidth) / 4;
      this.bgImgDom = document.createElement("img");

      this.initPicImg();
      this.initBlockPostion();
    },
    // 初始化背景图
    initPicImg() {
      if (this.isVerifyLoading) return;
      const imagesLen = this.imageList?.length;
      const randomIndex = Math.floor(Math.random() * imagesLen);
      this.bgImgDom.crossOrigin = "Anonymous";
      this.bgImgDom.src = this.imageList[randomIndex];
      const ImageW = parseInt(this.realWidth) || 340;
      const ImageH = parseInt(this.realHeight) || 180;
      this.bgImgDom.onload = () => {
        this.ctxPicImg.drawImage(this.bgImgDom, 0, 0, ImageW, ImageH);
        // 先绘制背景再绘制凹凸块
        this.draw(this.ctxPicImg, "fill"); // 填充
        this.draw(this.ctxPicBlock, "clip"); // 裁剪
        this.ctxPicBlock.drawImage(this.bgImgDom, 0, 0, ImageW, ImageH);

        const _yPos = this.blockRectPosition.y - 2 * this.blockRectPosition.r;
        const imageData = this.ctxPicBlock.getImageData(
          this.blockRectPosition.x,
          _yPos,
          this.blockRectPosition.w,
          this.blockRectPosition.w + 1
        );
        this.$refs["PicBlock"].width = this.blockRectPosition.w;
        this.ctxPicBlock.putImageData(imageData, 0, _yPos);
      };
      // console.log(this.ctxPicImg);
    },
    // 初始化凹凸块的位置
    initBlockPostion() {
      const contentW = parseInt(this.realWidth) || 340;
      const contentH = parseInt(this.realHeight) || 180;
      const xPos = Math.floor(
        contentW / 2 + Math.random() * (contentW / 2 - this.blockRectPosition.w)
      );
      const yPos = Math.floor(
        30 + Math.random() * (contentH - this.blockRectPosition.w - 30)
      );
      // console.log(xPos, yPos)
      this.blockRectPosition.x = xPos;
      this.blockRectPosition.y = yPos;
    },
    // 刷新
    initPic() {
      this.isRefresh = true;
      this.initBlockPostion();
      this.initPicImg();
      setTimeout(() => {
        this.$nextTick(() => {
          this.isRefresh = false;
        });
      }, 500);
    },
    draw(ctx, operation) {
      const { r, x, y } = this.blockRectPosition;
      const _w = this.blockWidth || 40;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.arc(x + _w / 2, y - r + 2, r, 0.72 * Math.PI, 2.26 * Math.PI);
      ctx.lineTo(x + _w, y);
      ctx.arc(x + _w + r - 2, y + _w / 2, r, 1.21 * Math.PI, 2.78 * Math.PI);
      ctx.lineTo(x + _w, y + _w);
      ctx.lineTo(x, y + _w);
      ctx.arc(
        x + r - 2,
        y + _w / 2,
        r + 0.4,
        2.76 * Math.PI,
        1.24 * Math.PI,
        true
      );
      ctx.lineTo(x, y);
      ctx.closePath();
      ctx.fillStyle = "rgba(225, 225, 225, 0.8)";
      ctx.strokeStyle = "rgba(225, 225, 225, 0.8)";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx[operation]();
    },
    async handleVerify() {
      // eslint-disable-next-line
      return new Promise(async (resolve) => {
        try {
          if (!this.blockRectPosition?.x) resolve(false);
          const threshold = 3;
          const verifyVal =
            parseInt(this.moveX) - parseInt(this.blockRectPosition.x);
          if (Math.abs(verifyVal) <= threshold) resolve(true);
          else resolve(false);
        } catch (error) {
          console.error(error);
          return error;
        }
      });
    },
  },
  mounted() {
    this.init();
  },
};
</script>
<style lang="scss" scoped>
.slide-verify-container {
  padding: 0 0 14px;
  .loading-content {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .loading {
    position: absolute;
    z-index: 50;
    background: rgb(88 88 88 / 50%);
  }
}
.pic {
  position: relative;
  z-index: 10;
  .pic-block {
    position: absolute;
    left: 0;
  }
}
.pic-block-icon {
  &.icon-refresh {
    cursor: pointer;
    position: absolute;
    right: 10px;
    margin: 10px 0 0;
    &.not-allowed {
      cursor: not-allowed;
    }
  }
}
.icon-refresh {
  &::before {
    content: "\27F2";
    color: #eee;
  }
}
</style>
