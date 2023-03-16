<template>
  <el-dialog
    width="750px"
    :title="`查看招聘详情`"
    :visible.sync="visible"
    v-loading="isLoading"
    @close="handleClose(false)"
  >
    <div class="content">
      <el-form ref="form" label-width="120px">
        <el-form-item label="状态">
          <el-tag
            :type="
              detailsInfo.status === $CONST.RECRUITER_STATE.A_S_HANDLE
                ? 'danger'
                : 'success'
            "
            >{{ $CONST.RECRUITER_STATE_TEXT[detailsInfo.status] }}</el-tag
          >
        </el-form-item>
        <el-form-item label="联系人">
          <div>{{ detailsInfo.userName || "-" }}</div>
        </el-form-item>
        <el-form-item label="联系方式">
          <div>{{ detailsInfo.phone || "-" }}</div>
        </el-form-item>
        <el-form-item label="招募类型">
          <div>{{ $CONST.RECRUITER_TYPE_TEXT[detailsInfo.type] }}</div>
        </el-form-item>
        <el-form-item label="备注">
          <div>{{ detailsInfo.remark || "-" }}</div>
        </el-form-item>
        <el-form-item label="提交时间">
          <div>{{ detailsInfo.createTime || "-" }}</div>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer">
      <el-button
        type="primary"
        :loading="isLoading"
        @click="handleSubmit"
        v-if="detailsInfo.status === $CONST.RECRUITER_STATE.A_S_HANDLE"
      >
        标记完成
      </el-button>
      <el-button @click="handleClose(false)"> 取消 </el-button>
    </span>
  </el-dialog>
</template>
<script>
import dialogMixin from "@/mixins/dialogMixin";

export default {
  name: "RecruiterDetailsDiaog",
  mixins: [dialogMixin],
  components: {},
  props: {
    editInfo: {
      type: [Object, String],
      default: () => ({}),
    },
  },
  watch: {
    visible(val) {
      if (val) {
        this.detailsInfo = { ...(this.editInfo || {}) };
        this.formData = {};
      }
    },
  },
  data() {
    return {
      formData: {},
      isLoading: false,
      isLoadingInfo: false,
      detailsInfo: {},
      rules: {},
    };
  },
  computed: {},
  methods: {
    async handleSubmit() {
      this.isLoading = true;
      const [, res] = await this.$http.OperationsManage.UpdateRecruiterStatus({
        id: this.detailsInfo.id,
        status: this.$CONST.RECRUITER_STATE.A_S_PROCESSED,
      });
      this.isLoading = false;
      this.$message[res ? "success" : "error"](`提交${res ? "成功" : "失败"}`);
      if (res) this.handleClose(true);
    },
  },
  mounted() {
    //
  },
};
</script>
<style lang="scss" scoped>
.content {
  margin: 0 0 40px;
  ::v-deep .pagination {
    border-top: none;
  }
  .images {
    width: 120px;
    height: 120px;
  }
}
.select-all {
  padding: 0 20px 5px;
  text-align: right;
}
</style>
