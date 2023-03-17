<template>
  <el-dialog
    title="驳回申请"
    :visible.sync="show"
    width="600px"
    :before-close="handleClose"
  >
    <div class="content">
      <el-form ref="form" :rules="rules" :model="formData" label-width="100px">
        <el-form-item label="驳回原因" prop="reject">
          <el-input
            class="input-medium"
            v-model="formData.reject"
            placeholder="请输入驳回原因"
          />
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleSubmit" :loading="isLoading"
        >提交</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import CONST from "@/constants/index";
import dialogMixin from "@/mixins/dialogMixin";
export default {
  name: "AuditFailDialog",
  mixins: [dialogMixin],
  props: {
    editInfo: {
      type: [Object, String],
      default: () => ({}),
    },
  },
  watch: {
    visible(val) {
      if (val)
        this.formData = {
          reject: "",
        };
    },
  },
  data() {
    return {
      CONST,
      isLoading: false,
      formData: {
        reject: "",
      },
      rules: {
        reject: [
          { required: true, message: "请输入驳回原因", trigger: "blur" },
        ],
      },
    };
  },
  computed: {},
  methods: {
    async handleSubmit() {
      try {
        const valid = await this.$refs.form.validate();
        if (!valid) return;
      } catch (error) {
        return;
      }
      if (this.isLoading) return;
      this.isLoading = true;
      const [, res] = await this.$http.FastDeals.AuditActivity({
        id: this.editInfo.id,
        status: this.editInfo.status,
        reject: this.formData.reject,
      });
      this.isLoading = false;
      this.$message[res ? "success" : "error"](
        res?.message || `审核${res ? "成功" : "失败"}`
      );
      if (res) this.handleClose(true);
    },
  },
};
</script>
<style lang="scss" scoped></style>
