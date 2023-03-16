<template>
  <div class="UpdateMembership">
    <div class="title">
      <span> {{ editInfo && editInfo.id ? "编辑" : "新增" }}会员卡 </span>
    </div>
    <div class="content">
      <MembershipInfo ref="MembershipInfo" :infoData="infoData" />
      <MembershipAging ref="MembershipAging" :infoData="infoData" />
      <ApplicableGoods
        ref="ApplicableGoods"
        :infoData="infoData"
        :selectGoods="selectGoods"
        @chooseGoods="(val) => $emit('chooseGoods', val)"
      />
    </div>
    <FooterView :cancelType="true" @cancel="$emit('close', false)">
      <template>
        <el-button type="primary" :loading="isLoading" @click="handleSubmit">
          保存
        </el-button>
      </template>
    </FooterView>
  </div>
</template>
<script>
import CONST from "@/constants/index";
import MembershipInfo from "./MembershipInfo.vue";
import MembershipAging from "./MembershipAging.vue";
import ApplicableGoods from "./ApplicableGoods.vue";
import FooterView from "@/components/Footer";
export default {
  name: "UpdateMembership",
  components: {
    MembershipInfo,
    MembershipAging,
    ApplicableGoods,
    FooterView,
  },
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
  data() {
    return {
      CONST,
      isLoading: false,
      infoData: {},
    };
  },
  computed: {},
  methods: {
    async getMembershipInfo() {
      if (!this.editInfo?.id) return;
      const [, res] = await this.$http.UserHub.GetMemberCardDetail({
        id: this.editInfo.id,
      });
      if (!res) return this.$message.error("获取卡包详情异常");
      this.infoData = { ...res, productDiscount: res.productDiscount * 10 };
    },
    // 处理提交
    async handleSubmit() {
      const BaseInfo = await this.$refs.MembershipInfo.getQuery();
      const AgingInfo = await this.$refs.MembershipAging.getQuery();
      const GoodsInfo = await this.$refs.ApplicableGoods.getQuery();
      const query = {
        ...this.infoData,
        ...BaseInfo,
        ...AgingInfo,
        ...GoodsInfo,
      };
      query.productDiscount = Math.floor(query.productDiscount * 100) / 1000;
      const id = this.editInfo?.id || "";
      this.isLoading = true;
      const [, res] = await this.$http.UserHub[
        id ? "UpdateMemberCard" : "AddMemberCard"
      ](query);
      this.$message[res ? "success" : "error"](
        res?.message || `${id ? "编辑" : "新增"}卡包${res ? "成功" : "失败"}`
      );
      this.isLoading = false;
      if (res) this.$emit("close", true);
    },
  },
  mounted() {
    this.getMembershipInfo();
  },
};
</script>
<style lang="scss" scoped>
.UpdateMembership {
  background: #fff;
  padding: 0 10px 100px;
  margin: 0 0 60px;
  .title {
    font-size: 15px;
    font-weight: bold;
    color: $main-font-color;
    margin-bottom: 20px;
  }
}
</style>
