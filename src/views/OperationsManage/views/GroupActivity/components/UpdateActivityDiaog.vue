<template>
  <el-dialog
    width="1050px"
    :title="`${
      editInfo && editInfo.id ? (editInfo.write ? '编辑' : '查看') : '新增'
    }拼团活动`"
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
                  (formData.serviceStationIds &&
                    formData.serviceStationIds.length) ===
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
        <el-form-item label="成团人数" prop="groupCount">
          <el-input-number
            class="input-medium"
            v-model="formData.groupCount"
            placeholder="成团人数"
            :min="0"
            :controls="false"
            :precision="0"
            :step="1"
          />
        </el-form-item>
        <el-form-item label="拼团库存" prop="stockCount">
          <el-input-number
            class="input-medium"
            v-model="formData.stockCount"
            placeholder="拼团库存"
            :min="0"
            :controls="false"
            :precision="0"
            :step="1"
          />
        </el-form-item>
        <el-form-item label="成团限制时间" prop="timeCount">
          <el-input
            placeholder="请输入限制时间值"
            v-model="formData.timeCount"
            class="input-medium"
            @input="timeCountInput"
          >
            <el-select
              slot="prepend"
              placeholder="请选择限制类型"
              v-model="formData.timeType"
              class="input-select-type"
            >
              <el-option
                v-for="item in $CONST.GROUP_LIMIT_OPTIONS()"
                :label="item.label"
                :key="item.value"
                :value="item.value"
              />
            </el-select>
          </el-input>
        </el-form-item>
        <el-form-item label="是否热门" prop="hot">
          <el-radio-group v-model="formData.hot">
            <el-radio-button
              v-for="(item, index) in $CONST.GROUP_HOT_TYPE_OPTIONS()"
              :label="item.value"
              :value="item.value"
              :key="index"
              >{{ item.label }}</el-radio-button
            >
          </el-radio-group>
        </el-form-item>
      </el-form>
    </div>
    <ActivityGoods
      isRadio
      showGroupPrice
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
        this.init();
        this.getDetail(val);
      } else {
        this.goodsList = [];
      }
    },
  },
  data() {
    return {
      formData: {
        activityDate: [],
        serviceStationIds: [],
        timeType: this.$CONST.GROUP_LIMIT_TYPE.HOUR,
        hot: this.$CONST.GROUP_HOT_TYPE.NOT,
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
        serviceStationIds: [
          { required: true, message: "请选择适用服务点", trigger: "blur" },
        ],
        groupCount: [
          { required: true, message: "请输入成团人数", trigger: "blur" },
          {
            type: "number",
            min: 2,
            message: "成团人数必须大于1",
            trigger: "blur",
          },
        ],
        stockCount: [
          { required: true, message: "请输入拼团库存", trigger: "blur" },
          {
            type: "number",
            min: 1,
            message: "拼团库存必须大于0",
            trigger: "blur",
          },
        ],
        timeCount: [
          { required: true, message: "请输入限制时间值", trigger: "blur" },
        ],
      },
    };
  },
  computed: {
    ...mapGetters({
      isService: "user/isService",
      serviceStationId: "user/serviceStationId",
      enableServiceStationOptions:
        "accountRoleManage/enableServiceStationOptions",
    }),
  },
  methods: {
    timeCountInput(val) {
      val = val.match(/^\d*(\d{0})/g)[0];
      this.$nextTick(() => {
        this.formData.timeCount = val;
      });
      this.$forceUpdate();
    },
    init() {
      this.activityInfo = {};
      this.formData = {
        activityDate: [],
        serviceStationIds: [],
        timeType: this.$CONST.GROUP_LIMIT_TYPE.HOUR,
        hot: this.$CONST.GROUP_HOT_TYPE.NOT,
      };
    },
    // 全选select
    selectAll(formKey) {
      let options = [];
      if (formKey === "serviceStationIds") {
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
      const [, res] = await this.$http.OperationsManage.GetGroupActivityDetail({
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
      if (this.activityInfo?.serviceStationIds)
        this.formData.serviceStationIds =
          typeof this.activityInfo?.serviceStationIds === "string"
            ? this.activityInfo.serviceStationIds.split(",")
            : [];
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
      if (this.isService) query.serviceStationIds = this.serviceStationId;
      else query.serviceStationIds = this.formData.serviceStationIds.join(",");
      if (this.formData?.activityDate?.length >= 2) {
        query.startTime = this.formData.activityDate[0];
        query.endTime = this.formData.activityDate[1];
      }
      delete query.activityDate;
      const id = this.editInfo?.id || "";
      const [, res] = await this.$http.OperationsManage[
        id ? "UpdateGroupActivity" : "AddGroupActivity"
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
    this.init();
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
.input-select-type {
  width: 80px;
}
</style>
