<template>
  <div class="slide-verify-container" ref="SliderVerifyContainer">
    <div class="pic">
      <canvas
        ref="PicImg"
        class="pic-img"
        :width="realWidth"
        :height="realHeight"
      />
      <canvas
        ref="PicBlock"
        class="pic-block"
        :width="blockWidth"
        :height="blockHeight"
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
      default: "",
    },
    height: {
      type: [Number, String],
      default: "",
    },
    imageList: {
      type: Array,
      default: () => [verify_1, verify_2, verify_3, verify_4],
    },
  },
  data() {
    return {
      blockWidth: "40px",
      blockHeight: "40px",
      bgImgDom: {},
      ctxPicImg: {},
      ctxPicBlock: {},
    };
  },
  computed: {
    realWidth({ width }) {
      const tempWidth = typeof width === "string" ? width : `${width}`;
      return `${tempWidth || 340}px`;
    },
    realHeight({ height }) {
      const tempHeight = typeof height === "string" ? height : `${height}`;
      return `${tempHeight}px`;
    },
  },
  methods: {
    init() {
      this.ctxPicImg = this.$refs["PicImg"]?.getContext("2d");
      this.ctxPicBlock = this.$refs["PicBlock"]?.getContext("2d");
      this.initPicImg();
    },
    // 初始化背景图
    initPicImg() {
      const img = document.createElement("img");
      const imagesLen = this.imageList?.length;
      const randomIndex = Math.floor(Math.random() * imagesLen);
      img.crossOrigin = "Anonymous";
      img.src = this.imageList[randomIndex];
      this.bgImgDom = img;

      img.onload = () => {
        console.log("图片加载完成");
        this.ctxPicImg.drawImage(
          this.bgImgDom,
          0,
          0,
          this.realWidth,
          this.realHeight
        );
        // 先绘制背景再绘制凹凸块
        // this.initBlockPostion();
        this.ctxPicBlock.drawImage(
          this.bgImgDom,
          0,
          0,
          this.realWidth,
          this.realHeight
        );

        // console.log(this.blockRect.x, this.blockRect.y, this.blockRect.w)
        // const _yPos = this.blockRect.y - 2 * this.blockRect.r;
        // const imageData = this.ctxPicBlock.getImageData(
        //   this.blockRect.x,
        //   _yPos,
        //   this.blockRect.w,
        //   this.blockRect.w + 1
        // );
        // this.$refs["PicBlock"].width = this.blockRect.w;
        // this.ctxPicBlock.putImageData(imageData, 0, _yPos);
      };
      console.log(this.ctxPicImg);
    },
    // 初始化凹凸块的位置
    initBlockPostion() {
      const xPos = Math.floor(
        this.realWidth / 2 +
          Math.random() * (this.realWidth / 2 - this.blockRect.w)
      );
      const yPos = Math.floor(
        30 + Math.random() * (this.realHeight - this.blockRect.w - 30)
      );
      // console.log(xPos, yPos)
      this.blockRect.x = xPos;
      this.blockRect.y = yPos;

      // this.draw(this.ctxImg, "fill");
      // this.draw(this.ctxBlock, "clip");
    },
    draw(ctx, operation) {
      const { r, x, y } = this.blockRect;
      const _w = this.blockW;
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
  },
  mounted() {
    this.init();
  },
};
</script>
<style lang="scss" scoped>
.slide-verify-container {
  padding: 0 0 14px;
}
.pic {
  position: relative;
  .pic-block {
    position: absolute;
    left: 0;
  }
}
</style>
