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
    <!-- 签到活动规则 -->
    <ActivityRules
      :rule.sync="sign.rule"
      title="签到规则设置"
      formLabel="签到规则"
    />
    <!-- 底部按钮 -->
    <FooterView :isShowSave="false" :cancelType="true" :showCancelBtn="false">
      <template>
        <el-button type="primary" @click="handleSubmit">保存</el-button>
      </template>
    </FooterView>
  </div>
</template>

<script>
import CONST from "@/constants/index";
import SignIn from "./SignIn.vue";
import ActivityRules from "../ActivityRules.vue";
import FooterView from "@/components/Footer/";

export default {
  name: "PointsSignIn",
  components: { SignIn, ActivityRules, FooterView },
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
      const quert = {
        nextSignDay: this.nextSignDay,
        sign: { ...this.sign },
        signRewardList: this.$refs.SignIn.list,
      };
      if (this.activityTime?.length >= 2) {
        quert.sign.startTime = this.activityTime[0];
        quert.sign.endTime = this.activityTime[1];
      }
      quert.signRewardList.map((item) => {
        const idsArr = item.couponConfigList
          .filter((ele) => ele?.id)
          .map((v) => v.id);
        item.signReward.couponIds = idsArr.join(",");
      });
      const [, res] = await this.$http.SignIn.UpdateSignInDetail(quert);
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
