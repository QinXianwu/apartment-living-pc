<template>
  <el-dialog
    title="修改账号密码"
    :visible.sync="visible"
    width="650px"
    v-loading="isLoading"
    @close="handleClose(false)"
  >
    <el-form ref="form" :model="formData" :rules="rules" label-width="150px">
      <el-form-item label="登录账号:" prop="userName">
        <el-input
          v-model="formData.userName"
          class="input-medium"
          :disabled="true"
        />
      </el-form-item>
      <el-form-item label="登录密码:" prop="password">
        <el-input
          type="password"
          class="input-medium"
          v-model="formData.password"
          placeholder="请输入登录密码"
        />
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
  name: "UpdatePasswordDiaog",
  mixins: [dialogMixin],
  props: {
    editInfo: {
      type: [Object, String],
      default: () => ({}),
    },
  },
  watch: {
    visible(val) {
      if (val && this.editInfo?.userId) {
        this.formData = { ...this.editInfo };
      } else {
        this.formData = {
          userName: "",
          password: "",
        };
      }
    },
  },
  data() {
    return {
      formData: {
        userName: "",
        password: "",
      },
      isLoading: false,
      rules: {
        userName: [
          {
            required: true,
            message: "请输入登录账号",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          {
            min: 5,
            max: 20,
            message: "用户密码长度必须介于 5 和 20 之间",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {},
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
      const [, res] = await this.$http.AccountRoleManage.UpdateUserPassword({
        userId: this.editInfo?.userId,
        password: this.formData?.password,
      });
      this.isLoading = false;
      this.$message[res ? "success" : "error"](
        res?.msg || `修改账号密码${res ? "成功" : "失败"}`
      );
      if (res) this.handleClose(true);
    },
  },
};
</script>
<style lang="scss" scoped></style>
