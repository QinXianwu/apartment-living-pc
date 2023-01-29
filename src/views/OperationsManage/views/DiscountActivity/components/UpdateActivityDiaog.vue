<template>
  <el-dialog
    width="1050px"
    :title="`${editInfo && editInfo.id ? '编辑' : '新增'}折扣活动`"
    :visible.sync="visible"
    v-loading="isLoading"
    @close="handleClose(false)"
  >
    <div class="content">
      <el-form ref="form" :model="formData" :rules="rules" label-width="120px">
        <el-form-item label="活动名称" prop="name">
          <el-input
            class="input-medium"
            v-model="formData.name"
            placeholder="请输入活动名称"
          />
        </el-form-item>
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
        <el-form-item label="满足条件" prop="productCount">
          <el-input-number
            class="input-medium"
            v-model="formData.productCount"
            placeholder="请输入商品数量"
            :min="0"
            :controls="false"
            :precision="0"
            :step="1"
          />
        </el-form-item>
      </el-form>
    </div>
    <ActivityGoods
      ref="ActivityGoods"
      :activityInfo="activityInfo"
      :selectGoods="selectGoods"
      @chooseGoods="(val) => $emit('chooseGoods', val)"
    />
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
import ActivityGoods from "./ActivityGoods.vue";

export default {
  name: "UpdateActivityDiaog",
  mixins: [dialogMixin],
  components: { ActivityGoods },
  props: {
    editInfo: {
      type: [Object, String],
      default: () => ({}),
    },
    selectGoods: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    visible(val) {
      if (val) this.getDetail(val);
      else this.activityInfo = {};
    },
  },
  data() {
    return {
      formData: {
        activityDate: [],
      },
      isLoading: false,
      isLoadingInfo: false,
      activityInfo: {},
      datePickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7; //如果没有后面的-8.64e7就是不可以选择今天的
        },
      },
      rules: {
        name: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
        activityDate: [
          { required: true, message: "请选择活动时间", trigger: "blur" },
        ],
        productCount: [
          { required: true, message: "请输入商品数量", trigger: "blur" },
          {
            type: "number",
            min: 1,
            message: "商品数量必须大于0",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {},
  methods: {
    async getDetail() {
      if (!this.editInfo?.id) return;
      this.isLoadingInfo = true;
      const [, res] = await this.$http.FastDeals.GetActivityDetail({
        id: this.editInfo.id,
      });
      this.isLoadingInfo = false;
      this.activityInfo = { ...(res || {}) };
      this.formData = { ...this.formData, ...this.activityInfo };
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
      const GoodsInfo = await this.$refs.ActivityGoods.getQuery();
      if (this.isLoading) return;
      this.isLoading = true;
      const query = {
        ...this.activityInfo,
        ...this.formData,
        ...GoodsInfo,
      };
      if (this.formData?.activityDate?.length >= 2) {
        query.startTime = this.formData.activityDate[0];
        query.endTime = this.formData.activityDate[1];
      }
      delete query.activityDate;
      const id = this.editInfo?.id || "";
      const [, res] = await this.$http.FastDeals[
        id ? "UpdateActivity" : "AddActivity"
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
  margin: 0 0 40px;
  ::v-deep .pagination {
    border-top: none;
  }
}
.select-all {
  padding: 0 20px 5px;
  text-align: right;
}
</style>
