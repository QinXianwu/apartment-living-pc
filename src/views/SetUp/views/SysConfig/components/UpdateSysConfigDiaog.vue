<template>
  <el-dialog
    :title="`更新系统配置`"
    :visible.sync="visible"
    width="550px"
    @close="handleClose(false)"
  >
    <el-form ref="form" :model="formData" :rules="rules" label-width="100px">
      <el-form-item label="内容:" prop="content">
        <el-input v-model="formData.content" placeholder="请输入配置项内容" />
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
  name: "UpdateSysConfigDiaog",
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
        this.formData = { content: "" };
      }
    },
  },
  data() {
    return {
      formData: {
        content: "",
      },
      isLoading: false,
      rules: {
        content: [
          {
            required: true,
            message: "请输入配置项内容",
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
      const [, res] = await this.$http.SysConfig[id ? "UpdateSysConfig" : ""]({
        ...this.formData,
      });
      this.isLoading = false;
      this.$message[res ? "success" : "error"](
        res?.message || `${id ? "更新" : ""}系统配置${res ? "成功" : "失败"}`
      );
      if (res) this.handleClose(true);
    },
  },
};
</script>
<style lang="scss" scoped></style>
