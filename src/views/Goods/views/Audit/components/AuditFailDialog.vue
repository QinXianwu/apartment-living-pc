<template>
  <el-dialog
    title="驳回申请"
    :visible.sync="show"
    width="600px"
    :before-close="handleClose"
  >
    <div class="content">
      <el-form ref="form" :rules="rules" :model="formData" label-width="100px">
        <el-form-item label="驳回原因" prop="remark">
          <el-input
            class="input-medium"
            v-model="formData.remark"
            placeholder="请输入驳回原因"
          />
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">提交</el-button>
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
          remark: "",
        };
    },
  },
  data() {
    return {
      CONST,
      formData: {
        remark: "",
      },
      rules: {
        remark: [
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
      const datas = this.editInfo?.datas || [];
      datas.forEach((item) => (item.remark = this.formData.remark));
      this.$emit("on-success", { ...(this.editInfo || {}) });
      this.handleClose();
    },
  },
};
</script>
<style lang="scss" scoped></style>
