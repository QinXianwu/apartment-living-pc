<template>
  <div class="upload-container">
    <el-button
      icon="el-icon-upload"
      size="mini"
      type="primary"
      @click="dialogVisible = true"
    >
      上传文件
    </el-button>
    <el-dialog title="图片上传" :visible.sync="dialogVisible" append-to-body>
      <!-- <Uploader
        :list.sync="imgList"
        tip="建议尺寸：1000 x 600像素，小于1M，支持jpg、png、jpeg格式"
      /> -->

      <div>
        <el-button @click="dialogVisible = false"> 取 消 </el-button>
        <el-button type="primary" @click="handleSubmit"> 确 定 </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import Uploader from "@/components/Uploader";
export default {
  name: "EditorSlideUpload",
  // components: { Uploader },
  data() {
    return {
      dialogVisible: false,
      imgList: [],
      listObj: {},
      fileList: [],
    };
  },
  methods: {
    handleSubmit() {
      this.$emit("successCBK", this.imgList);
      this.fileList = [];
      this.dialogVisible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.editor-slide-upload {
  margin-bottom: 20px;
  ::v-deep .el-upload--picture-card {
    width: 100%;
  }
}

.uploader {
  margin-bottom: 20px;
}
::v-deep .form-carouselMap {
  width: 100% !important;
  height: 100% !important;
}
</style>
