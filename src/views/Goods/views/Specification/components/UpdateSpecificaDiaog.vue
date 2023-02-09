<template>
  <el-dialog
    :title="`${isEdit ? '编辑' : '新增'}规格`"
    :visible.sync="visible"
    width="700px"
    v-loading="isLoading"
    @close="handleClose(false)"
  >
    <el-form
      ref="form"
      :model="formData"
      :rules="rules"
      label-width="180px"
      v-loading="isLoadingSpecifica"
    >
      <el-form-item label="规格名称" prop="specificationName">
        <el-input
          class="input-medium"
          v-model="formData.specificationName"
          placeholder="请输入规格名称"
        />
      </el-form-item>
      <el-form-item label="规格排序" prop="sort">
        <el-input
          class="input-medium"
          v-model="formData.sort"
          placeholder="请输入规格排序"
        />
      </el-form-item>
      <el-form-item label="启用状态" prop="status">
        <el-switch
          v-model="formData.status"
          :active-value="$CONST.SPECIFICA_TYPE.ON"
          :inactive-value="$CONST.SPECIFICA_TYPE.OFF"
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
  name: "UpdateSpecificaDiaog",
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
        this.getSpecificaInfo();
      }
    },
  },
  data() {
    return {
      formData: {},
      isLoading: false,
      isLoadingSpecifica: false,
      rules: {
        specificationName: [
          {
            required: true,
            message: "请输入规格名称",
            trigger: "blur",
          },
          {
            min: 1,
            max: 10,
            message: "长度在 1 到 10 个字符",
            trigger: "blur",
          },
        ],
        sort: [
          {
            required: true,
            message: "请输入规格名称",
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
        this.formData = {
          status: this.$CONST.SPECIFICA_TYPE.ON,
        };
      }
    },
    // 获取规格详情
    async getSpecificaInfo() {
      if (this.isLoadingSpecifica || !this.editInfo?.id) return;
      this.isLoadingSpecifica = true;
      const [, res] = await this.$http.GoodsSpecification.GetSpecificaById({
        id: this.editInfo?.id || "",
      });
      if (!res) this.$message.error(res?.msg || "获取规格详情异常");
      this.formData = {
        ...this.formData,
        ...(res || {}),
      };
      this.$nextTick(() => (this.isLoadingSpecifica = false));
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
        id ? "UpdateSpecifica" : "AddSpecifica"
      ]({
        id,
        ...this.formData,
      });
      this.isLoading = false;
      this.$message[res ? "success" : "error"](
        res?.message || `${id ? "编辑" : "新增"}规格${res ? "成功" : "失败"}`
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
