<template>
  <el-dialog
    :title="title || '批量操作'"
    :visible.sync="visible"
    width="40%"
    @closed="$emit('callback')"
  >
    <div class="flex flex-colmun align-center">
      <div>
        点击下载模板文件：
        <el-link
          v-for="(item, i) in templateUrl"
          :key="i"
          type="primary"
          :href="item.url"
          >{{ item.label }}</el-link
        >
      </div>
      <div class="mt-10">
        导入数据包文件：
        <el-button type="text" @click="handleInsetExcel">选择文件</el-button>
        <p class="mt-10 inneed font-12__666">{{ importTips }}</p>
      </div>
      <input
        type="file"
        id="file_uploader"
        ref="file_uploader"
        @change="fileChange"
        style="display: none"
        accept=".xlsx"
      />
    </div>
  </el-dialog>
</template>
<script>
import dialogMixin from "@/mixins/dialogMixin";
export default {
  mixins: [dialogMixin],
  props: {
    // 模板下载链接，数组
    templateUrl: {
      type: Array,
      required: true,
    },
    // 导入提示
    importTips: {
      type: String,
      default: "请仔细填写导入的数据",
    },
  },
  methods: {
    handleInsetExcel() {
      this.$refs.file_uploader.click();
    },
    async fileChange(e) {
      this.$emit("fileChange", [...e.target.files]);
      // 清空input
      this.$refs.file_uploader.value = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
}
.flex-colmun {
  flex-direction: column;
}
.align-center {
  align-items: center;
}
.font-12__333 {
  font-size: 12px;
  color: #333333;
}
.font-12__666 {
  font-size: 12px;
  color: #666666;
}
.font-14__666 {
  font-size: 14px;
  color: #666666;
}
.border-b {
  border-bottom: 1px solid $--border-color-lighter;
}
.danger {
  color: $--color-danger;
}
// 必填*号
.inneed::before {
  content: "*";
  color: #f56c6c;
  margin-right: 4px;
}
</style>
