<template>
  <!-- 组队瓜分积分 -->
  <div class="TeamSharePoints">
    <div class="title">组队瓜分积分设置</div>
    <div class="content">
      <el-form ref="form" :model="formData" label-width="150px" :rules="rules">
        <el-form-item label="活动类型" prop="limitTimeStatus">
          <el-radio-group
            v-model="formData.limitTimeStatus"
            @change="changeActivityType"
          >
            <el-radio
              v-for="item in CONST.ACTIVITY_TYPE_OPTIONS()"
              :label="item.value"
              :key="item.value"
              >{{ item.label }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="活动时间"
          prop="activityTime"
          v-if="
            formData.limitTimeStatus ===
            CONST.INTEGRAL_CARVE_ACTIVITY_TYPE.LONG_TERM
          "
        >
          <el-date-picker
            v-model="formData.activityTime"
            type="datetime"
            :picker-options="datePickerOptions"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期"
          />
        </el-form-item>
        <el-form-item
          label="活动时间"
          prop="activityDate"
          v-if="
            formData.limitTimeStatus ===
            CONST.INTEGRAL_CARVE_ACTIVITY_TYPE.LIMITED_TIME
          "
        >
          <el-date-picker
            v-model="formData.activityDate"
            type="datetimerange"
            :picker-options="datePickerOptions"
            value-format="yyyy-MM-dd HH:mm:ss"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item label="瓜分积分数" prop="integral">
          <el-input-number
            class="input-small"
            v-model="formData.integral"
            :min="0"
            :controls="false"
            :precision="0"
            :step="1"
            placeholder="积分数"
          />
        </el-form-item>
        <el-form-item label="组队坐席" prop="teamCount">
          <el-input-number
            class="input-small"
            v-model="formData.teamCount"
            :min="0"
            :controls="false"
            :precision="0"
            :step="1"
            placeholder="席位数"
          />
        </el-form-item>
        <el-form-item label="每次开启活动后" prop="teamHour">
          <div class="input-flex">
            <div class="input-content input-small">
              <el-input-number
                class="input-small"
                v-model="formData.teamHour"
                :min="0"
                :controls="false"
                :precision="0"
                :step="1"
                placeholder="时长"
              />
              <span class="append el-input-group__append">小时后</span>
            </div>
            <span class="ml-10 mr-10">自动结束</span>
          </div>
        </el-form-item>
        <el-form-item label="团长获得总积分的" prop="leaderRate">
          <div class="input-flex">
            <div class="input-content input-small">
              <el-input-number
                class="input-small"
                v-model="formData.leaderRate"
                :min="0"
                :controls="false"
                :precision="0"
                placeholder="积分比例"
                :step="1"
              />
              <span class="append el-input-group__append">%</span>
            </div>
            <span class="ml-10 mr-10">剩余积分有团队成员均分</span>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <!-- 活动规则规则 -->
    <ActivityRules
      :rule.sync="formData.rule"
      title="活动规则设置"
      formLabel="活动规则"
    />
    <!-- 底部按钮 -->
    <FooterView :isShowSave="false" :cancelType="true" :showCancelBtn="false">
      <template>
        <el-button type="primary" @click="handleSubmit">保存</el-button>
        <el-button type="primary" @click="getDetail" plain>刷新</el-button>
      </template>
    </FooterView>
  </div>
</template>

<script>
import CONST from "@/constants/index";
import FooterView from "@/components/Footer";
import ActivityRules from "../ActivityRules.vue";

export default {
  name: "TeamSharePoints",
  components: { ActivityRules, FooterView },
  data() {
    return {
      CONST,
      datePickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7; //如果没有后面的-8.64e7就是不可以选择今天的
        },
      },
      integralCarve: {},
      formData: {
        activityTime: "",
        activityDate: [],
        limitTimeStatus: CONST.INTEGRAL_CARVE_ACTIVITY_TYPE.LONG_TERM,
      },
      rules: {
        activityTime: [
          { required: true, message: "请选择活动开始日期", trigger: "blur" },
        ],
        activityDate: [
          { required: true, message: "请选择活动日期期限", trigger: "blur" },
        ],
        integral: [
          { required: true, message: "请输入消费积分", trigger: "blur" },
          { min: 1, type: "number", message: "积分必须大于0", trigger: "blur" },
        ],
        teamCount: [
          { required: true, message: "请输入抵扣金额", trigger: "blur" },
        ],
        teamHour: [
          { required: true, message: "请输入抵扣比例", trigger: "blur" },
        ],
      },
    };
  },
  computed: {},
  methods: {
    async getDetail() {
      const [, res] = await this.$http.PointsSetting.GetIntegralCarveDetail();
      this.integralCarve = res?.id ? res : {};
      this.formData = { ...this.integralCarve };
      const startTime = this.integralCarve?.startTime || "";
      const endTime = this.integralCarve?.endTime || "";
      const state =
        this.integralCarve?.limitTimeStatus ||
        CONST.INTEGRAL_CARVE_ACTIVITY_TYPE.LONG_TERM;
      if (state === CONST.INTEGRAL_CARVE_ACTIVITY_TYPE.LONG_TERM) {
        this.formData.activityTime = startTime || "";
      } else if (state === CONST.INTEGRAL_CARVE_ACTIVITY_TYPE.LIMITED_TIME) {
        this.formData.activityDate =
          startTime && endTime ? [startTime, endTime] : [];
      }
    },
    changeActivityType(val) {
      // if (val === CONST.INTEGRAL_CARVE_ACTIVITY_TYPE.LONG_TERM) {
      //   this.$set(this.formData, "activityDate", "");
      // }
      console.log(val);
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
      const quert = {
        ...this.integralCarve,
        ...this.formData,
      };
      quert.startTime =
        quert.limitTimeStatus === CONST.INTEGRAL_CARVE_ACTIVITY_TYPE.LONG_TERM
          ? quert.activityTime
          : quert.activityDate[0];
      quert.endTime =
        quert.limitTimeStatus === CONST.INTEGRAL_CARVE_ACTIVITY_TYPE.LONG_TERM
          ? ""
          : quert.activityDate[1];
      delete quert.activityTime;
      delete quert.activityDate;
      const [, res] = await this.$http.PointsSetting.UpdateIntegralRule(quert);
      if (res) {
        this.getDetail();
        this.$message.success("保存成功");
      }
      this.isLoading = false;
    },
  },
  mounted() {
    this.getDetail();
  },
};
</script>
<style lang="scss" scoped>
.TeamSharePoints {
  .title {
    font-size: 14px;
    font-weight: bold;
    color: $main-font-color;
  }
  .content {
    padding: 20px;
    span {
      margin: 0 10px;
      font-size: 14px;
    }
  }
  .input-flex {
    display: flex;
    align-items: center;
    .input-content {
      display: flex;
      align-items: center;
    }
    .append {
      width: max-content;
      margin: 0;
    }
  }
}
</style>
