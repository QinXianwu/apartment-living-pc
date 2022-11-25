<template>
  <el-dialog
    :title="`${editInfo && editInfo.dictCode ? '编辑' : '新增'}字典`"
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
      <el-form-item label="字典类型">
        <el-input
          v-model="formData.dictType"
          :disabled="true"
          class="input-medium"
        />
      </el-form-item>
      <el-form-item label="数据标签" prop="dictLabel">
        <el-input
          v-model="formData.dictLabel"
          placeholder="请输入数据标签"
          class="input-medium"
        />
      </el-form-item>
      <el-form-item label="数据键值" prop="dictValue">
        <el-input
          v-model="formData.dictValue"
          placeholder="请输入数据键值"
          class="input-medium"
        />
      </el-form-item>
      <el-form-item label="显示排序" prop="dictSort">
        <el-input-number
          v-model="formData.dictSort"
          placeholder="请输入显示排序"
          controls-position="right"
          class="input-medium"
          :min="0"
        />
      </el-form-item>
      <el-form-item label="样式属性" prop="cssClass">
        <el-input
          v-model="formData.cssClass"
          placeholder="请输入样式属性"
          class="input-medium"
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
        dictLabel: [
          {
            required: true,
            message: "请输入数据标签",
            trigger: "blur",
          },
        ],
        dictValue: [
          {
            required: true,
            message: "请输入数据键值",
            trigger: "blur",
          },
        ],
        dictSort: [
          {
            required: true,
            message: "请输入显示排序",
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
        dictType: this.editInfo?.dictType || "",
      };
    },
    // 获取字典详情
    async getRoleInfo() {
      if (this.isLoadingDict || !this.editInfo?.dictCode) return;
      this.isLoadingDict = true;
      const [, res] = await this.$http.DictionaryManage.GetDictionaryDataInfo({
        dictCode: this.editInfo?.dictCode || "",
      });
      this.isLoadingDict = false;
      if (!res) return this.$message.error(res?.msg || "获取字典数据详情异常");
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
      const id = this.editInfo?.dictCode || "";
      const [, res] = await this.$http.DictionaryManage[
        id ? "UpdateDictionaryData" : "AddDictionaryData"
      ]({ ...this.formData });
      this.isLoading = false;
      this.$message[res ? "success" : "error"](
        res?.message ||
          `${id ? "编辑" : "新增"}字典数据${res ? "成功" : "失败"}`
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
