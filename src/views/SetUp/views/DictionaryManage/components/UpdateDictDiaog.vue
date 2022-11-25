<template>
  <el-dialog
    :title="`${editInfo && editInfo.dictId ? '编辑' : '新增'}字典`"
    :visible.sync="visible"
    width="650px"
    @close="handleClose(false)"
  >
    <el-form
      ref="form"
      :model="formData"
      :rules="rules"
      label-width="150px"
      v-loading="isLoadingDict"
    >
      <el-form-item label="字典名称" prop="dictName">
        <el-input
          v-model="formData.dictName"
          class="input-medium"
          placeholder="请输入字典名称"
        />
      </el-form-item>
      <el-form-item label="字典类型" prop="dictType">
        <el-input
          v-model="formData.dictType"
          class="input-medium"
          placeholder="请输入字典类型"
        />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select
          clearable
          class="input-medium"
          placeholder="字典状态"
          v-model="formData.status"
        >
          <el-option
            v-for="item in $CONST.DICT_STATE_OPTIONS()"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="备注">
        <el-input
          type="textarea"
          class="input-medium"
          placeholder="请输入内容"
          v-model="formData.remark"
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
  name: "UpdateDictDiaog",
  mixins: [dialogMixin],
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
        this.getRoleInfo();
      }
    },
  },
  data() {
    return {
      formData: {},
      isLoading: false,
      isLoadingDict: false,
      rules: {
        dictName: [
          {
            required: true,
            message: "请输入字典名称",
            trigger: "blur",
          },
        ],
        dictType: [
          {
            required: true,
            message: "请输入字典类型",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {},
  mounted() {
    //
  },
  methods: {
    init() {
      this.formData = {
        status: this.$CONST.DICT_STATE.ON,
      };
    },
    // 获取字典详情
    async getRoleInfo() {
      if (this.isLoadingDict || !this.editInfo?.dictId) return;
      this.isLoadingDict = true;
      const [, res] = await this.$http.DictionaryManage.GetDictionaryInfo({
        dictId: this.editInfo?.dictId || "",
      });
      this.isLoadingDict = false;
      if (!res) return this.$message.error(res?.msg || "获取字典信息异常");
      this.formData = { ...this.formData, ...res };
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
      const id = this.editInfo?.dictId || "";
      const [, res] = await this.$http.DictionaryManage[
        id ? "UpdateDictionary" : "AddDictionary"
      ]({ ...this.formData });
      this.isLoading = false;
      this.$message[res ? "success" : "error"](
        res?.message || `${id ? "编辑" : "新增"}字典${res ? "成功" : "失败"}`
      );
      if (res) this.handleClose(true);
    },
  },
};
</script>
<style lang="scss" scoped>
.tree-border {
  margin-top: 5px;
  border: 1px solid #e5e6e7;
  background: #ffffff none;
  border-radius: 4px;
}
</style>
