<template>
  <el-dialog
    width="750px"
    :title="`${editInfo && editInfo.id ? '编辑' : '新增'}场次`"
    :visible.sync="visible"
    v-loading="isLoading"
    @close="handleClose(false)"
  >
    <div class="content">
      <el-form ref="form" :model="formData" :rules="rules" label-width="120px">
        <el-form-item label="活动开始时间" prop="startTime">
          <el-time-picker
            v-model="formData.startTime"
            placeholder="开始时间"
            format="HH:mm:ss"
            value-format="HH:mm:ss"
          >
          </el-time-picker>
        </el-form-item>
        <el-form-item label="活动结束时间" prop="endTime">
          <el-time-picker
            v-model="formData.endTime"
            placeholder="结束时间"
            format="HH:mm:ss"
            value-format="HH:mm:ss"
          >
          </el-time-picker>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="formData.status">
            <el-radio-button
              v-for="(item, index) in $CONST.SESSION_COUNT_STATE_OPTIONS()"
              :label="item.value"
              :value="item.value"
              :key="index"
              >{{ item.label }}</el-radio-button
            >
          </el-radio-group>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer">
      <el-button type="primary" :loading="isLoading" @click="handleSubmit">
        保存
      </el-button>
      <el-button @click="handleClose(false)"> 取消 </el-button>
    </span>
  </el-dialog>
</template>
<script>
import filters from "@/filters";
import dialogMixin from "@/mixins/dialogMixin";

export default {
  name: "UpdateSessionCountDiaog",
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
      if (val) this.getDetail(val);
      else {
        this.sessionInfo = {};
        this.formData = {
          status: this.$CONST.SESSION_COUNT_STATE.ON,
        };
      }
    },
  },
  data() {
    const validateStartTime = (rule, value, callback) => {
      const curDate = filters.formatDate(Date.now());
      const startTime = new Date(`${curDate} ${value}`).getTime();
      const endTime = new Date(
        `${curDate} ${this.formData?.endTime || ""}`
      ).getTime();
      if (!value) {
        callback(new Error("请选择开始时间"));
      } else if (endTime < startTime) {
        callback(new Error("开始时间需早于结束时间"));
      } else {
        callback();
      }
    };
    const validateEndTime = (rule, value, callback) => {
      const curDate = filters.formatDate(Date.now());
      const startTime = new Date(
        `${curDate} ${this.formData?.startTime || ""}`
      ).getTime();
      const endTime = new Date(`${curDate} ${value}`).getTime();
      if (!value) {
        callback(new Error("请选择开始时间"));
      } else if (endTime < startTime) {
        callback(new Error("结束时间需晚于开始时间"));
      } else {
        callback();
      }
    };
    return {
      formData: {
        status: this.$CONST.SESSION_COUNT_STATE.ON,
      },
      isLoading: false,
      isLoadingInfo: false,
      sessionInfo: {},
      rules: {
        startTime: [
          { required: true, message: "请选择开始时间", trigger: "blur" },
          { validator: validateStartTime, trigger: "blur" },
        ],
        endTime: [
          { required: true, message: "请选择结束时间", trigger: "blur" },
          { validator: validateEndTime, trigger: "blur" },
        ],
      },
    };
  },
  computed: {},
  methods: {
    async getDetail() {
      if (!this.editInfo?.id) return;
      this.isLoadingInfo = true;
      const [, res] = await this.$http.FastDeals.GetSessionCountDetail({
        id: this.editInfo.id,
      });
      this.isLoadingInfo = false;
      this.sessionInfo = { ...(res || {}) };
      this.formData = { ...this.formData, ...this.sessionInfo };
    },
    async handleSubmit() {
      // 表单校验
      try {
        const valid = await this.$refs.form.validate();
        if (!valid) {
          return null;
        }
      } catch (error) {
        return error;
      }
      if (this.isLoading) return;
      this.isLoading = true;
      const query = {
        ...this.sessionInfo,
        ...this.formData,
        delFlag: 1,
      };
      const id = this.editInfo?.id || "";
      const [, res] = await this.$http.FastDeals[
        id ? "UpdateSessionCount" : "AddSessionCount"
      ](query);
      this.isLoading = false;
      const title = id ? "编辑" : "新增";
      this.$message[res ? "success" : "error"](
        res?.message || res ? `${title}成功` : `${title}失败`
      );
      if (res) this.handleClose(true);
    },
  },
  mounted() {
    //
  },
};
</script>
<style lang="scss" scoped>
.content {
  ::v-deep .pagination {
    border-top: none;
  }
}
</style>
