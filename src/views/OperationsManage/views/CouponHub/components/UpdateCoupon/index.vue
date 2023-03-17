<template>
  <div class="UpdateCoupon">
    <div class="title">
      <span> {{ editInfo && editInfo.id ? "编辑" : "新增" }}优惠劵 </span>
    </div>
    <div class="content">
      <CouponInfo ref="CouponInfo" :couponsInfo="couponsInfo" />
      <ApplicableGoods
        ref="ApplicableGoods"
        :couponsInfo="couponsInfo"
        :selectGoods="selectGoods"
        @chooseGoods="(val) => $emit('chooseGoods', val)"
      />
      <ApplicableServiceStation
        ref="ApplicableServiceStation"
        :couponsInfo="couponsInfo"
        :selectStation="selectStation"
        @chooseStation="(val) => $emit('chooseStation', val)"
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
import CouponInfo from "./CouponInfo.vue";
import ApplicableGoods from "./ApplicableGoods.vue";
import ApplicableServiceStation from "./ApplicableServiceStation.vue";
import FooterView from "@/components/Footer";
export default {
  name: "UpdateCoupon",
  components: {
    CouponInfo,
    ApplicableGoods,
    ApplicableServiceStation,
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
    selectStation: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      CONST,
      isLoading: false,
      couponsInfo: {},
    };
  },
  computed: {},
  methods: {
    init() {
      //
    },
    async getCouponsInfo() {
      if (!this.editInfo?.id) return;
      const [, res] = await this.$http.Coupons.GetCouponsDetail({
        id: this.editInfo.id,
      });
      if (!res) return this.$message.error("获取优惠劵详情异常");
      this.couponsInfo = { ...res };
    },
    // 处理提交
    async handleSubmit() {
      const BaseInfo = await this.$refs.CouponInfo.getQuery();
      const GoodsInfo = await this.$refs.ApplicableGoods.getQuery();
      const StationInfo = await this.$refs.ApplicableServiceStation.getQuery();
      const query = {
        ...this.couponsInfo,
        ...BaseInfo,
        ...GoodsInfo,
        ...StationInfo,
        relationType: CONST.COUPONS_RELATION_TYPE.COLLECTION_ACTIVITY,
      };
      const id = this.editInfo?.id || "";
      this.isLoading = true;
      const [, res] = await this.$http.Coupons[
        id ? "UpdateCoupons" : "AddCoupons"
      ](query);
      this.$message[res ? "success" : "error"](
        res?.message || `${id ? "编辑" : "新增"}优惠劵${res ? "成功" : "失败"}`
      );
      this.isLoading = false;
      if (res) this.$emit("close", true);
    },
  },
  mounted() {
    this.init();
    this.getCouponsInfo();
  },
};
</script>
<style lang="scss" scoped>
.UpdateCoupon {
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
