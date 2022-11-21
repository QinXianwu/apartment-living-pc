<template>
  <el-dialog
    width="700px"
    title="导入用户"
    :visible.sync="visible"
    v-loading="isLoading"
    @close="handleClose(false)"
  >
    <div class="content">
      <UploaderUser
        ref="UploaderUser"
        :actionUrl="actionUrl"
        @on-success="UploaderSuccess"
      />
      <div class="content-bottom">
        <div>
          <el-checkbox v-model="updateSupport" :true-label="1" :false-label="0">
            <span>是否更新已经存在的用户数据</span>
          </el-checkbox>
        </div>
        <div>
          <span>仅允许导入xls、xlsx格式文件</span>
          <el-button type="text" @click="downloadTemplate">下载模板</el-button>
        </div>
      </div>
    </div>
    <span slot="footer">
      <el-button type="primary" :loading="isLoading" @click="handleSubmit">
        保存
      </el-button>
      <el-button @click="handleClose(false)"> 取消 </el-button>
    </span>
  </el-dialog>
</template>
<script>
import dialogMixin from "@/mixins/dialogMixin";
import UploaderUser from "./UploaderUser.vue";
import downloadFilelMixin from "@/mixins/downloadFilelMixin";
export default {
  name: "ImportUserDiaog",
  mixins: [dialogMixin, downloadFilelMixin],
  components: { UploaderUser },
  props: {},
  watch: {
    visible() {
      //
    },
  },
  data() {
    return {
      isLoading: false,
      updateSupport: 0,
    };
  },
  computed: {
    actionUrl({ updateSupport }) {
      const prefix = process.env.VITE_APP_API_PREFIX;
      return `${prefix}/system/user/importData?updateSupport=${updateSupport}`;
    },
  },
  methods: {
    handleSubmit() {
      this.$refs.UploaderUser.submitFileForm();
    },
    async downloadTemplate() {
      this.isLoading = true;
      const [, res] = await this.$http.ExportImport.ImportUserListTemplate({});
      this.isLoading = false;
      if (!res) return this.$message.error(res?.msg || "导出失败");
      this.onExportDownloadFile({
        data: res,
        tipText: "下载导入模板成功，是否保存？",
        fileName: "用户列表导入模板",
      });
    },
    async UploaderSuccess({ response: res }) {
      const message = res?.msg || "导入失败";
      await this.$alert(
        `<div style='overflow: auto;overflow-x: hidden;max-height: 70vh;padding: 10px 20px 0;'>
          ${message}
        </div>
        `,
        "导入结果",
        { dangerouslyUseHTMLString: true }
      );
      if (res?.code === this.AJAX_CODE.SUCCESS) this.handleClose(true);
    },
  },
  mounted() {
    //
  },
};
</script>
<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  &-bottom {
    margin: 10px 0 0;
  }
}
</style>
