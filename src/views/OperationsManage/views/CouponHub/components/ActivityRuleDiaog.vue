<template>
  <el-dialog
    width="1000px"
    title="活动说明"
    :visible.sync="visible"
    v-loading="isLoading"
    @close="handleClose(false)"
  >
    <div class="content">
      <el-form ref="form" label-width="120px">
        <el-form-item label="活动说明">
          <Tinymce ref="Editor" v-model="activityRule.rule" :height="500" />
        </el-form-item>
      </el-form>
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
import Tinymce from "@/components/Tinymce";

export default {
  name: "ActivityRuleDiaog",
  mixins: [dialogMixin],
  components: { Tinymce },
  props: {},
  watch: {
    visible(val) {
      if (val) this.getActivityRule(val);
    },
  },
  data() {
    return {
      isLoading: false,
      isLoadingInfo: false,
      activityRule: {},
    };
  },
  computed: {},
  methods: {
    async getActivityRule() {
      this.isLoadingInfo = true;
      const [, res] = await this.$http.Coupons.GetCouponsActivityRule();
      this.isLoadingInfo = false;
      this.activityRule = { ...(res || {}), rule: res?.rule || "" };
    },
    async handleSubmit() {
      if (this.isLoading) return;
      this.isLoading = true;
      this.isLoadingInfo = true;
      const [, res] = await this.$http.Coupons.UpdateCouponsActivityRule(
        this.activityRule
      );
      this.isLoading = false;
      this.isLoadingInfo = false;
      this.$message[res ? "success" : "error"](
        res?.message || res ? "保存成功" : "保存失败"
      );
      if (res) this.handleClose(false);
    },
  },
  mounted() {
    //
  },
};
</script>
<style lang="scss" scoped>
.content {
  ::v-deep .pagination {
    border-top: none;
  }
}
.goodsInfo {
  display: flex;
  align-items: center;
  .table-img {
    width: 60px;
    height: 60px;
  }
  .name {
    margin-left: 10px;
    @include overflow-eps(2);
  }
}
</style>
