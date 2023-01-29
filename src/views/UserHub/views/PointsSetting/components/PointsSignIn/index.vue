<template>
  <!-- 积分签到 -->
  <div class="PointsSignIn">
    <!-- 签到获得积分设置 -->
    <SignIn
      ref="SignIn"
      :limitType.sync="sign.limitTimeStatus"
      :activityTime.sync="activityTime"
      :signRewardList="signRewardList"
    />
    <!-- 积分攻略设置 -->
    <RulesForm
      :rule.sync="sign.rule"
      title="积分攻略设置"
      formLabel="积分攻略"
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
import SignIn from "./SignIn.vue";
import FooterView from "@/components/Footer";
import RulesForm from "@/components/RulesForm";

export default {
  name: "PointsSignIn",
  components: { SignIn, RulesForm, FooterView },
  data() {
    return {
      CONST,
      nextSignDay: "",
      sign: {
        rule: "",
        limitTimeStatus: CONST.ACTIVITY_LIMIT_DATE_TYPE.LONG_ACTIVITY,
      },
      activityTime: [],
      signRewardList: [],
    };
  },
  computed: {},
  methods: {
    async getDetail() {
      const [, res] = await this.$http.SignIn.GetSignInDetail();
      this.sign = res?.sign || {};
      this.sign.rule = res?.sign?.rule || "";
      this.sign.limitTimeStatus = res?.sign?.limitTimeStatus || "";
      if (res?.sign?.startTime && res?.sign?.endTime) {
        this.activityTime = [res.sign.startTime, res.sign.endTime];
      }
      this.signRewardList = res?.signRewardList || [];
      this.nextSignDay = res?.nextSignDay || "";
    },
    async handleSubmit() {
      if (
        this.sign.limitTimeStatus ===
          CONST.ACTIVITY_LIMIT_DATE_TYPE.LIMITED_TIME &&
        this.activityTime?.length < 2
      ) {
        return this.$message.error("请选择活动时间区间");
      }
      const query = {
        nextSignDay: this.nextSignDay,
        sign: { ...this.sign },
        signRewardList: this.$refs.SignIn.list,
      };
      if (this.activityTime?.length >= 2) {
        query.sign.startTime = this.activityTime[0];
        query.sign.endTime = this.activityTime[1];
      }
      query.signRewardList.map((item) => {
        const idsArr = item.couponConfigList
          .filter((ele) => ele?.id)
          .map((v) => v.id);
        item.signReward.couponIds = idsArr.join(",");
      });
      const [, res] = await this.$http.SignIn.UpdateSignIn(query);
      if (res) {
        this.getDetail();
        this.$message.success("保存成功");
      }
    },
  },
  mounted() {
    this.getDetail();
  },
};
</script>
<style lang="scss" scoped>
.PointsSignIn {
  padding: 0 10px;
}
</style>
