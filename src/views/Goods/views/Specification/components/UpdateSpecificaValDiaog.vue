<template>
  <el-dialog
    :title="`${isEdit ? '编辑' : '新增'}规格值`"
    :visible.sync="visible"
    width="700px"
    v-loading="isLoading"
    @close="handleClose(false)"
  >
    <el-form ref="form" :model="formData" :rules="rules" label-width="180px">
      <el-form-item label="规格名称" prop="specificationValueName">
        <el-input
          class="input-medium"
          v-model="formData.specificationValueName"
          placeholder="请输入规格名称"
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
import { mapGetters } from "vuex";
import dialogMixin from "@/mixins/dialogMixin";

export default {
  name: "UpdateSpecificaValDiaog",
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
      this.init();
      if (val) {
        //
      }
    },
  },
  data() {
    return {
      formData: {},
      isLoading: false,
      rules: {
        specificationValueName: [
          {
            required: true,
            message: "请输入规格值",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {
    ...mapGetters({}),
    isEdit({ editInfo }) {
      return !!editInfo?.id;
    },
  },
  methods: {
    init() {
      if (this.editInfo?.id) {
        this.formData = { ...this.editInfo };
      } else {
        this.formData = {};
      }
    },
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
      const [, res] = await this.$http.GoodsSpecification[
        id ? "UpdateSpecificaValue" : "AddSpecificaValue"
      ]({
        id,
        ...this.formData,
      });
      this.isLoading = false;
      this.$message[res ? "success" : "error"](
        res?.message || `${id ? "编辑" : "新增"}规格值${res ? "成功" : "失败"}`
      );
      if (res) {
        this.$store.dispatch("goods/GetSpecificaListAction", true);
        this.handleClose(true);
      }
    },
  },
};
</script>
<style lang="scss" scoped></style>
