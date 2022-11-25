<template>
  <div class="UploaderUser">
    <el-upload
      ref="Upload"
      :limit="limit"
      :accept="fileType"
      :headers="headers"
      :action="actionUrl"
      :disabled="isDisabled"
      :on-progress="() => (isUploading = true)"
      :on-success="handleFileSuccess"
      :auto-upload="false"
      drag
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </el-upload>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "UploaderUser",
  components: {},
  props: {
    actionUrl: {
      type: String,
      default: "",
      required: true,
    },
    limit: {
      type: [String, Number],
      default: 1,
    },
    fileType: {
      type: String,
      default: ".xlsx, .xls",
    },
  },
  data() {
    return { isUploading: false };
  },
  computed: {
    ...mapState({
      token: (state) => state.authorization.state,
    }),
    // 请求头
    headers({ token }) {
      return { Authorization: `Bearer ${token}` };
    },
    isDisabled({ isUploading }) {
      return isUploading;
    },
  },
  methods: {
    handleFileSuccess(response, file, fileList) {
      this.isUploading = false;
      this.$refs.Upload.clearFiles();
      this.$emit("on-success", { response, file, fileList });
    },
    // 提交上传文件
    submitFileForm() {
      if (!this.actionUrl) return;
      this.$refs.Upload.submit();
    },
  },
  mounted() {
    //
  },
};
</script>
<style lang="scss" scoped></style>
