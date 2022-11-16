<template>
  <el-dialog
    :title="`${editInfo && editInfo.id ? '编辑' : '新增'}支付宝账号`"
    :visible.sync="visible"
    width="550px"
    @close="handleClose(false)"
  >
    <el-form ref="form" :model="formData" :rules="rules" label-width="150px">
      <el-form-item label="支付宝账号名称:" prop="alipayAccount">
        <el-input
          v-model="formData.alipayAccount"
          placeholder="请输入支付宝账号名称"
        ></el-input>
      </el-form-item>
    </el-form>
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
export default {
  name: "UpdatePayAccountDiaog",
  mixins: [dialogMixin],
  props: {
    editInfo: {
      type: [Object, String],
      default: () => ({}),
    },
  },
  watch: {
    visible(val) {
      if (val && this.editInfo?.id) {
        this.formData = { ...this.editInfo };
      } else {
        this.formData = { alipayAccount: "" };
      }
    },
  },
  data() {
    return {
      formData: {
        alipayAccount: "",
      },
      isLoading: false,
      rules: {
        alipayAccount: [
          {
            required: true,
            message: "请输入支付宝账号名称",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    //
  },
  methods: {
    // 处理提交
    async handleSubmit() {
      // 表单校验
      try {
        const valid = await this.$refs.form.validate();
        if (!valid) {
          return;
        }
      } catch (error) {
        return;
      }
      this.isLoading = true;
      const id = this.editInfo?.id || "";
      const [, res] = await this.$http.PayConfig[
        id ? "UpdateAlipayAccount" : "AddAlipayAccount"
      ]({ ...this.formData });
      this.isLoading = false;
      this.$message[res ? "success" : "error"](
        res?.message ||
          `${id ? "编辑" : "新增"}支付宝账号${res ? "成功" : "失败"}`
      );
      if (res) {
        this.handleClose(true);
        // 刷新支付宝账号列表
        this.$store.dispatch("agent/GetAlipayAccountListAction", true);
      }
    },
  },
};
</script>
<style lang="scss" scoped></style>
