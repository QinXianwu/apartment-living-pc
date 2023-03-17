<template>
  <el-dialog
    :title="`${editInfo && editInfo.postId ? '编辑' : '新增'}岗位`"
    :visible.sync="visible"
    width="650px"
    @close="handleClose(false)"
  >
    <el-form
      ref="form"
      :model="formData"
      :rules="rules"
      label-width="150px"
      v-loading="isLoadingPost"
    >
      <el-form-item label="岗位名称:" prop="postName">
        <el-input
          class="input-medium"
          v-model="formData.postName"
          placeholder="请输入岗位名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="岗位编码:" prop="postCode">
        <el-input
          class="input-medium"
          v-model="formData.postCode"
          placeholder="请输入岗位编码"
        ></el-input>
      </el-form-item>
      <el-form-item label="岗位顺序" prop="postSort">
        <el-input-number
          v-model="formData.postSort"
          controls-position="right"
          class="input-medium"
          :min="0"
        />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select
          clearable
          class="input-medium"
          placeholder="岗位状态"
          v-model="formData.status"
        >
          <el-option
            v-for="item in $CONST.POST_STATE_OPTIONS()"
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
  name: "UpdatePostDiaog",
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
        this.getPostInfo();
      }
    },
  },
  data() {
    return {
      formData: {},
      isLoading: false,
      isLoadingPost: false,
      rules: {
        postName: [
          {
            required: true,
            message: "请输入岗位名称",
            trigger: "blur",
          },
        ],
        postCode: [
          {
            required: true,
            message: "请输入岗位编码",
            trigger: "blur",
          },
        ],
        postSort: [
          {
            required: true,
            message: "请输入岗位顺序",
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
        status: this.$CONST.POST_STATE.ON,
      };
    },
    // 获取岗位详情
    async getPostInfo() {
      if (this.isLoadingPost || !this.editInfo?.postId) return;
      this.isLoadingPost = true;
      const [, res] = await this.$http.DepartmentPostManage.GetPostInfo({
        postId: this.editInfo?.postId || "",
      });
      this.isLoadingPost = false;
      if (!res) return this.$message.error(res?.msg || "获取岗位信息异常");
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
      const id = this.editInfo?.postId || "";
      const [, res] = await this.$http.DepartmentPostManage[
        id ? "UpdatePost" : "AddPost"
      ]({ ...this.formData });
      this.isLoading = false;
      this.$message[res ? "success" : "error"](
        res?.message || `${id ? "编辑" : "新增"}岗位${res ? "成功" : "失败"}`
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
