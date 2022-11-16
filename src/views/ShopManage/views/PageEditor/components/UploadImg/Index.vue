<template>
  <div class="custom-upload">
    <ElUpload
      action=""
      :auto-upload="false"
      :show-file-list="false"
      :on-change="changeUploadedFile"
    >
      <div class="form-picture_show form-carouselMap" v-if="img && img.url">
        <ElImage fit="contain" :src="img && img.url" alt="" srcset="" />
        <div class="form-mask" v-if="img && img.url">更换图片</div>
      </div>
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </ElUpload>
  </div>
</template>
<script>
import deafultImage from "@@/images/block.png";
export default {
  name: "UploadImg",
  props: {
    img: {
      type: [String, Object],
      default() {
        return "";
      },
    },
    index: {
      type: Number,
      default() {
        return -1;
      },
    },
  },
  data() {
    return {
      isLoading: false,
      deafultImage,
    };
  },
  methods: {
    // 选择文件
    async changeUploadedFile(file) {
      if (this.isLoading) {
        return;
      } else {
        if (this.isLoading) return this.$message.info("文件上传中，请稍后..");
      }
      const isImgSizeLimit3M = file.size / 1024 / 1024 < 3; // 3M
      // 图片是否在3M内
      if (!file.raw.type.includes("image")) {
        this.$message.error("请上传图片！");
        return;
      } else if (!isImgSizeLimit3M) {
        this.$message.error("上传群图片大小不能超过3M！");
        return;
      }
      // 发送
      this.isLoading = true;

      const [, Data] = await this.$http.FileSys.UploadImageApi([file.raw]);
      this.isLoading = false;
      if (!Data) return;
      this.$emit("handleImgChange", Data, this.index);
      // 获取图片，回调事件
    },
  },
};
</script>
<style lang="scss" scoped>
.custom-upload {
  position: relative;
  background: #f2f2f2;
  border: 1px solid #d7d7d7;
  border-radius: 5px;
  &,
  > div,
  ::v-deep .el-upload {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  [class^="el-icon-"] {
    font-size: 20px;
    color: #333333;
  }
  .el-image {
    width: 100%;
    height: 100%;
    // border-radius: 5px;
  }
  .form-picture_show {
    &.form-navBar_show {
      width: 100%;
      height: 100%;
    }
    &.form-carouselMap {
      height: 100%;
    }
    .form-mask {
      width: 100%;
      height: 20px;
      line-height: 20px;
      font-size: 12px;
      position: absolute;
      top: auto;
      bottom: 0;
      left: 0;
      cursor: pointer;
      background-color: rgba(0, 0, 0, 0.5);
      color: #fff;
      opacity: 1;
      transition: opacity 0.3s ease-in 0.1s;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
    }
  }
}
</style>
