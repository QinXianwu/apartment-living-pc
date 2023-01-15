<template>
  <el-dialog
    width="750px"
    :title="`${editInfo && editInfo.id ? '编辑' : '新增'}秒杀活动`"
    :visible.sync="visible"
    v-loading="isLoading"
    @close="handleClose(false)"
  >
    <div class="content">
      <el-form ref="form" :model="formData" :rules="rules" label-width="120px">
        <!-- <el-form-item label="活动名称" prop="name">
          <el-input
            class="input-medium"
            v-model="formData.name"
            placeholder="请输入活动名称"
          />
        </el-form-item> -->
        <el-form-item label="活动时间" prop="activityDate">
          <el-date-picker
            v-model="formData.activityDate"
            type="datetimerange"
            :picker-options="datePickerOptions"
            value-format="yyyy-MM-dd HH:mm:ss"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item label="活动场次" prop="secKillSessionIds">
          <el-select
            :multiple="true"
            collapse-tags
            class="input-medium"
            value-key="id"
            placeholder="请选择活动活动场次"
            v-model="formData.secKillSessionIds"
          >
            <div class="select-all">
              <el-checkbox
                :value="
                  formData.secKillSessionIds.length ===
                  secKillSessionOptions.length
                "
                @change="selectAll('secKillSessionIds')"
                >全选</el-checkbox
              >
            </div>
            <el-option
              :key="index"
              :label="ele.label"
              :value="ele.value"
              v-for="(ele, index) in secKillSessionOptions"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="适用商品">
          <el-button @click="chooseGoods">选择商品</el-button>
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
import dialogMixin from "@/mixins/dialogMixin";

export default {
  name: "UpdateActivityDiaog",
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
      else this.sessionInfo = {};
    },
  },
  data() {
    return {
      formData: {
        secKillSessionIds: [],
        status: this.$CONST.SESSION_COUNT_STATE.ON,
      },
      isLoading: false,
      isLoadingInfo: false,
      sessionInfo: {},
      datePickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7; //如果没有后面的-8.64e7就是不可以选择今天的
        },
      },
      rules: {
        activityDate: [
          { required: true, message: "请选择活动时间", trigger: "blur" },
        ],
        secKillSessionIds: [
          { required: true, message: "请选择活动活动场次", trigger: "blur" },
        ],
      },
    };
  },
  computed: {
    secKillSessionOptions() {
      return [];
    },
  },
  methods: {
    // 全选select
    selectAll(formKey) {
      let options = [];
      if (formKey === "secKillSessionIds") {
        options = this.secKillSessionOptions.map((item) => ({
          value: item.postId,
        }));
      }
      if (this.formData[formKey]?.length === options.length) {
        this.formData[formKey] = [];
        return;
      }
      this.formData[formKey] = options.map((item) => item.value);
    },
    chooseGoods() {
      //
    },
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
      };
      const id = this.editInfo?.id || "";
      const [, res] = await this.$http.FastDeals[
        id ? "UpdateSessionCount" : "AddSessionCount"
      ](query);
      this.isLoading = false;
      this.$message[res ? "success" : "error"](
        res?.message || res
          ? `${id ? "编辑" : "新增"}成功`
          : `${id ? "编辑" : "新增"}失败`
      );
      if (res) this.handleClose(false);
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
