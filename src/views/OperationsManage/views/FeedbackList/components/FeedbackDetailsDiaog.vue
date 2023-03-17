<template>
  <el-dialog
    width="750px"
    :title="`查看反馈详情`"
    :visible.sync="visible"
    v-loading="isLoading"
    @close="handleClose(false)"
  >
    <div class="content">
      <el-form ref="form" label-width="120px">
        <el-form-item label="状态">
          <el-tag
            :type="
              detailsInfo.status === $CONST.FEED_BACK_STATE.A_S_HANDLE
                ? 'danger'
                : 'success'
            "
            >{{ $CONST.FEED_BACK_STATE_TEXT[detailsInfo.status] }}</el-tag
          >
        </el-form-item>
        <el-form-item label="反馈内容">
          <div>{{ detailsInfo.text || "-" }}</div>
        </el-form-item>
        <el-form-item label="联系方式">
          <div>{{ detailsInfo.contactWay || "-" }}</div>
        </el-form-item>
        <el-form-item label="提交时间">
          <div>{{ detailsInfo.createTime || "-" }}</div>
        </el-form-item>
        <el-form-item label="图片">
          <div class="images-list">
            <ImageView
              v-for="(url, index) in detailsInfo.imageList || []"
              :src="url"
              :key="index"
              customClass="images"
            />
          </div>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer">
      <el-button
        type="primary"
        :loading="isLoading"
        @click="handleSubmit"
        v-if="detailsInfo.status === $CONST.FEED_BACK_STATE.A_S_HANDLE"
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
  name: "FeedbackDetailsDiaog",
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
      const [, res] = await this.$http.OperationsManage.UpdateFeedbackStatus({
        id: this.detailsInfo.id,
        status: this.$CONST.FEED_BACK_STATE.A_S_PROCESSED,
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
