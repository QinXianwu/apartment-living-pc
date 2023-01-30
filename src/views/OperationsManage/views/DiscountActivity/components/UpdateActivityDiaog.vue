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
            placeholder="请输入购买商品数量"
            :min="0"
            :controls="false"
            :precision="0"
            :step="1"
          />
          <div class="form-tip">
            <span>第{{ formData.productCount || "N" }}件，可享受折扣</span>
          </div>
        </el-form-item>
        <el-form-item label="商品折扣" prop="discount">
          <el-input-number
            class="input-medium"
            v-model="formData.discount"
            placeholder="请输入商品折扣"
            :min="0"
            :max="10"
            :controls="false"
            :precision="1"
            :step="1"
          />
          <div class="form-tip">
            <span
              >第{{ formData.productCount || "N" }}件可享受{{
                formData.discount || "N"
              }}折扣</span
            >
          </div>
        </el-form-item>
      </el-form>
    </div>
    <ActivityGoods
      ref="ActivityGoods"
      :goodsList="goodsList"
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
import ActivityGoods from "@/views/OperationsManage/components/ActivityGoods";

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
      if (val) {
        this.activityInfo = {};
        this.formData = {
          activityDate: [],
        };
        this.getDetail(val);
      }
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
      goodsList: [],
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
          { required: true, message: "请输入购买商品数量", trigger: "blur" },
          {
            type: "number",
            min: 1,
            message: "购买商品数量必须大于0",
            trigger: "blur",
          },
        ],
        discount: [
          { required: true, message: "请输入商品折扣", trigger: "blur" },
          {
            type: "number",
            min: 0.1,
            message: "商品折扣必须大于0.0",
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
      const [, res] =
        await this.$http.OperationsManage.GetDiscountActivityDetail({
          id: this.editInfo.id,
        });
      this.isLoadingInfo = false;
      this.activityInfo = { ...(res || {}) };
      this.goodsList = this.activityInfo?.product?.id
        ? [this.activityInfo.product]
        : [];
      this.formData = { ...this.formData, ...this.activityInfo };
      if (this.activityInfo?.startTime && this.activityInfo?.endTime)
        this.formData.activityDate = [
          this.activityInfo.startTime,
          this.activityInfo.endTime,
        ];
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
      };
      if (this.formData?.activityDate?.length >= 2) {
        query.startTime = this.formData.activityDate[0];
        query.endTime = this.formData.activityDate[1];
      }
      query.productIds = GoodsInfo.productIds?.length
        ? GoodsInfo.productIds.join(",")
        : "";
      delete query.activityDate;
      const id = this.editInfo?.id || "";
      const [, res] = await this.$http.OperationsManage[
        id ? "UpdateDiscountActivity" : "AddDiscountActivity"
      ](query);
      this.isLoading = false;
      this.$message[res ? "success" : "error"](
        res?.message || res
          ? `${id ? "编辑" : "新增"}成功`
          : `${id ? "编辑" : "新增"}失败`
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
