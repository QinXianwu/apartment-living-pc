<template>
  <div class="UpdateProtocol">
    <div class="title">
      {{ editInfo && editInfo.id ? "编辑协议" : "新增协议" }}
    </div>
    <div class="content view-container">
      <el-form
        ref="form"
        :rules="rules"
        :model="formData"
        label-width="90px"
        v-loading="isLoadingProtocp"
      >
        <el-form-item label="标题:" prop="title">
          <el-input
            :disabled="true"
            class="input-medium"
            :value="$CONST.PROTOCOL_TYPE_TEXT[formData.type]"
          />
        </el-form-item>
        <el-form-item label="协议内容:" prop="agreement">
          <Tinymce ref="Editor" v-model="formData.agreement" :height="500" />
        </el-form-item>
      </el-form>
    </div>
    <div class="footer">
      <el-button type="primary" :loading="isLoading" @click="handleSubmit">
        保存
      </el-button>
      <el-button @click="$emit('close', false)"> 取消 </el-button>
    </div>
  </div>
</template>
<script>
import Tinymce from "@/components/Tinymce";

export default {
  name: "ProtocolDiaog",
  components: { Tinymce },
  props: {
    editInfo: {
      type: [Object, String],
      default: () => ({}),
    },
  },
  data() {
    return {
      formData: {
        agreement: "",
      },
      isLoading: false,
      isLoadingProtocp: false,
      rules: {
        agreement: [
          {
            required: true,
            message: "请输入协议内容",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {},
  mounted() {
    this.getProtocpInfo();
  },
  methods: {
    async getProtocpInfo() {
      if (!this.editInfo?.type) return;
      this.isLoadingProtocp = true;
      const [, res] = await this.$http.ProtocolManage.GetAgreementInfo({
        type: this.editInfo?.type || "",
      });
      this.isLoadingProtocp = false;
      this.formData = { ...this.formData, ...(res || {}) };
    },
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
      const [, res] = await this.$http.ProtocolManage.UpdateAgreement({
        type: this.editInfo?.type || "",
        agreement: this.formData?.agreement,
      });
      this.isLoading = false;
      this.$message[res ? "success" : "error"](
        res?.msg || `修改账号密码${res ? "成功" : "失败"}`
      );
      if (res) this.$emit("close", true);
    },
  },
};
</script>
<style lang="scss" scoped>
.title {
  font-size: 14px;
  font-weight: bold;
  color: $main-font-color;
}
.tree-border {
  margin-top: 5px;
  border: 1px solid #e5e6e7;
  background: #ffffff none;
  border-radius: 4px;
}
</style>
