<template>
  <div class="NewcomerActivities view-container">
    <div class="title">新人好礼活动配置</div>
    <div class="content">
      <el-form ref="form" :model="formData" :rules="rules" label-width="110px">
        <el-form-item label="活动期限" prop="activityDate">
          <el-date-picker
            v-model="formData.activityDate"
            type="datetimerange"
            :picker-options="datePickerOptions"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期"
          />
        </el-form-item>
        <el-form-item label="针对新用户" prop="showDay">
          <el-input
            v-model="formData.showDay"
            placeholder="请输入天数"
            @input="showDayInput"
            class="input-medium"
          >
            <span slot="append">天</span>
          </el-input>
          <span class="form-tip ml-10">未购买商品后，活动持续时效</span>
        </el-form-item>
      </el-form>
    </div>
    <div class="sub-content">
      <div class="title">新人好礼配置</div>
      <NewcomerCoupon ref="NewcomerCoupon" :newComerInfo="newComerInfo" />
      <NewcomerGoods ref="NewcomerGoods" :newComerInfo="newComerInfo" />
    </div>
    <!-- 活动说明 -->
    <RulesForm
      :rule.sync="formData.rule"
      title="活动说明设置"
      formLabel="活动说明"
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
import NewcomerCoupon from "./components/NewcomerCoupon.vue";
import NewcomerGoods from "./components/NewcomerGoods.vue";
import FooterView from "@/components/Footer";
import RulesForm from "@/components/RulesForm";
export default {
  name: "NewcomerActivities",
  components: { NewcomerCoupon, NewcomerGoods, RulesForm, FooterView },
  data() {
    const validateShowDay = (rule, value, callback) => {
      if (Number(value) !== 0 && !value) {
        callback(new Error("请输入天数"));
      } else if (Number(value) <= 0) {
        callback(new Error("天数必须大于0"));
      } else {
        callback();
      }
    };
    return {
      newComerInfo: {},
      formData: {
        startTime: "",
        endTime: "",
        activityDate: [],
        rule: "",
      },
      rules: {
        activityDate: [
          { required: true, message: "请选择活动期限", trigger: "blur" },
        ],
        showDay: [
          { required: true, message: "请输入天数", trigger: "blur" },
          { validator: validateShowDay, trigger: "blur" },
        ],
      },
      datePickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7; //如果没有后面的-8.64e7就是不可以选择今天的
        },
      },
    };
  },
  computed: {},
  methods: {
    showDayInput(val) {
      val = val.match(/^\d*(\d{0})/g)[0];
      this.$nextTick(() => {
        this.formData.showDay = val;
      });
    },
    async getDetail() {
      this.newComerInfo = {};
      const [, res] =
        await this.$http.OperationsManage.GetNewcomerActivitieDetail();
      this.newComerInfo = res?.id ? res : {};
      const startTime = this.newComerInfo?.startTime || "";
      const endTime = this.newComerInfo?.endTime || "";
      const activityDate = startTime && endTime ? [startTime, endTime] : [];
      this.formData = { ...this.formData, ...this.newComerInfo, activityDate };
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

      const CouponInfo = await this.$refs.NewcomerCoupon.getQuery();
      const GoodsInfo = await this.$refs.NewcomerGoods.getQuery();
      this.isLoading = true;
      const query = {
        ...this.newComerInfo,
        ...this.formData,
        ...CouponInfo,
        ...GoodsInfo,
      };
      query.startTime = query.activityDate?.length ? query.activityDate[0] : "";
      query.endTime = query.activityDate?.length ? query.activityDate[1] : "";
      delete query.activityDate;
      const [, res] = await this.$http.OperationsManage.GetNewcomerActivitie(
        query
      );
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
.view-container {
  background: #fff;
}
.NewcomerActivities {
  .title {
    font-size: 15px;
    font-weight: bold;
    color: $main-font-color;
    margin-bottom: 20px;
  }
  .content {
    padding: 20px;
  }
  .sub-content {
    padding: 0 20px 30px;
    .title {
      margin-bottom: 5px;
    }
  }
}
</style>
