<template>
  <el-dialog
    width="1050px"
    :title="`${
      editInfo && editInfo.id ? (editInfo.write ? '编辑' : '查看') : '新增'
    }秒杀活动`"
    :visible.sync="visible"
    v-loading="isLoading"
    @close="handleClose(false)"
  >
    <div class="content" v-loading="isLoadingInfo">
      <el-form
        ref="form"
        :model="formData"
        :rules="rules"
        label-width="120px"
        :disabled="!(editInfo && editInfo.write)"
      >
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
            :collapse-tags="editInfo && editInfo.write"
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
            :collapse-tags="editInfo && editInfo.write"
            class="input-medium"
            value-key="id"
            placeholder="请选择适用服务点"
            v-model="formData.serviceStationIds"
          >
            <div class="select-all">
              <el-checkbox
                :value="
                  formData.serviceStationIds.length ===
                  enableServiceStationOptions.length
                "
                @change="selectAll('serviceStationIds')"
                >全选</el-checkbox
              >
            </div>
            <el-option
              :key="index"
              :label="ele.label"
              :value="ele.value"
              v-for="(ele, index) in enableServiceStationOptions"
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
      isRadio
      showSpikePrice
      ref="ActivityGoods"
      :goodsList="goodsList"
      :selectGoods="selectGoods"
      :isAction="editInfo && editInfo.write"
      @chooseGoods="(val) => $emit('chooseGoods', val)"
    />
    <span slot="footer">
      <el-button
        type="primary"
        v-if="editInfo && editInfo.write"
        :loading="isLoading"
        @click="handleSubmit"
      >
        保存
      </el-button>
      <el-button @click="handleClose(false)"> 取消 </el-button>
    </span>
  </el-dialog>
</template>
<script>
import { mapGetters } from "vuex";
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
        this.goodsList = [];
        this.activityInfo = {};
        this.formData = {
          activityDate: [],
          secKillSessionIds: [],
          serviceStationIds: [],
        };
        this.getDetail(val);
      }
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
      goodsList: [],
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
      enableServiceStationOptions:
        "accountRoleManage/enableServiceStationOptions",
    }),
  },
  methods: {
    // 全选select
    selectAll(formKey) {
      let options = [];
      if (formKey === "secKillSessionIds") {
        options = this.secKillSessionOptions;
      } else if (formKey === "serviceStationIds") {
        options = this.enableServiceStationOptions;
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
      this.goodsList = this.activityInfo?.product?.id
        ? [this.activityInfo.product]
        : [];
      this.formData = { ...this.formData, ...this.activityInfo };
      if (this.activityInfo?.startTime && this.activityInfo?.endTime)
        this.formData.activityDate = [
          this.activityInfo.startTime,
          this.activityInfo.endTime,
        ];
      if (this.activityInfo?.serviceStationId)
        this.formData.serviceStationIds =
          typeof this.activityInfo?.serviceStationId === "string"
            ? this.activityInfo.serviceStationId.split(",")
            : [];
      if (this.activityInfo?.secKillSessionIds?.length) {
        this.activityInfo.secKillSessionIds.forEach((id, index) => {
          this.activityInfo.secKillSessionIds[index] =
            this.$JSONbig.stringify(id);
        });
        const ids = this.activityInfo.secKillSessionIds.join(",");
        this.formData.secKillSessionIds = this.secKillSessionOptions
          .filter((item) => ids.includes(item.value))
          .map((item) => item.value);
      }
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
      if (
        Number(this.formData?.stockCount) > Number(GoodsInfo?.product?.stock)
      ) {
        return this.$message.error("库存数量不得大于商品剩余库存");
      }
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
