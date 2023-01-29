<template>
  <el-dialog
    width="1050px"
    :title="`${editInfo && editInfo.id ? '编辑' : '新增'}秒杀活动`"
    :visible.sync="visible"
    v-loading="isLoading"
    @close="handleClose(false)"
  >
    <div class="content">
      <el-form ref="form" :model="formData" :rules="rules" label-width="120px">
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
            placeholder="请选择活动场次"
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
        <el-form-item
          label="适用服务点"
          prop="serviceStationIds"
          v-if="!isService"
        >
          <el-select
            :multiple="true"
            collapse-tags
            class="input-medium"
            value-key="id"
            placeholder="请选择适用服务点"
            v-model="formData.serviceStationIds"
          >
            <div class="select-all">
              <el-checkbox
                :value="
                  formData.serviceStationIds.length ===
                  serviceStationOptions.length
                "
                @change="selectAll('serviceStationIds')"
                >全选</el-checkbox
              >
            </div>
            <el-option
              :key="index"
              :label="ele.label"
              :value="ele.value"
              v-for="(ele, index) in serviceStationOptions"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="库存数量" prop="stockCount">
          <el-input-number
            class="input-medium"
            v-model="formData.stockCount"
            placeholder="库存数量"
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
import { mapGetters } from "vuex";
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
        secKillSessionIds: [],
        serviceStationIds: [],
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
        activityDate: [
          { required: true, message: "请选择活动时间", trigger: "blur" },
        ],
        secKillSessionIds: [
          { required: true, message: "请选择活动场次", trigger: "blur" },
        ],
        serviceStationIds: [
          { required: true, message: "请选择适用服务点", trigger: "blur" },
        ],
        stockCount: [
          { required: true, message: "请输入库存数量", trigger: "blur" },
          {
            type: "number",
            min: 1,
            message: "库存数量必须大于0",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {
    ...mapGetters({
      isService: "user/isService",
      serviceStationId: "user/serviceStationId",
      secKillSessionOptions: "fastDeals/secKillSessionOptions",
      serviceStationOptions: "accountRoleManage/serviceStationOptions",
    }),
  },
  methods: {
    // 全选select
    selectAll(formKey) {
      let options = [];
      if (formKey === "secKillSessionIds") {
        options = this.secKillSessionOptions;
      } else if (formKey === "serviceStationIds") {
        options = this.serviceStationOptions;
      }
      if (this.formData[formKey]?.length === options.length) {
        this.formData[formKey] = [];
        return;
      }
      this.formData[formKey] = options.map((item) => item.value);
    },
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
      if (this.isService) query.serviceStationId = this.serviceStationId;
      else query.serviceStationId = this.formData.serviceStationIds.join(",");
      if (this.formData?.activityDate?.length >= 2) {
        query.startTime = this.formData.activityDate[0];
        query.endTime = this.formData.activityDate[1];
      }
      delete query.activityDate;
      delete query.serviceStationIds;
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
