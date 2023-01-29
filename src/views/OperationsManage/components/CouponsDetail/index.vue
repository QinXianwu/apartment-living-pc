<template>
  <div class="CouponsDetail view-container">
    <div class="title">优惠劵详情</div>
    <CouponsInfo :couponsInfo="couponsInfo" />
    <ApplicableGoods :couponsInfo="couponsInfo" />
    <ApplicableServiceStation :couponsInfo="couponsInfo" />
    <FooterView :cancelType="true" @cancel="$emit('close', false)" />
  </div>
</template>
<script>
import CouponsInfo from "./CouponsInfo.vue";
import FooterView from "@/components/Footer";
import ApplicableGoods from "./ApplicableGoods.vue";
import ApplicableServiceStation from "./ApplicableServiceStation.vue";

export default {
  name: "CouponsDetail",
  components: {
    CouponsInfo,
    ApplicableGoods,
    ApplicableServiceStation,
    FooterView,
  },
  props: {
    editInfo: {
      type: [Object, String],
      default: () => ({}),
    },
  },
  watch: {},
  data() {
    return {
      isLoading: false,
      couponsInfo: {},
    };
  },
  computed: {},
  methods: {
    async getDetail() {
      if (!this.editInfo?.id) return;
      const [, res] = await this.$http.Coupons.GetCouponsDetail({
        id: this.editInfo.id,
      });
      if (!res) return this.$message.error("获取优惠劵详情异常");
      this.couponsInfo = { ...res };
    },
  },
  filters: {},
  mounted() {
    if (this.editInfo?.id) {
      this.couponsInfo = {};
      this.getDetail();
    }
  },
};
</script>
<style lang="scss" scoped>
.CouponsDetail {
  background: #fff;
  padding: 0 10px;
  margin: 0 0 60px;
  .title {
    font-size: 15px;
    font-weight: bold;
    color: $main-font-color;
    margin-bottom: 20px;
  }
  .label {
    font-size: 14px;
    color: $main-font-color;
  }
  .goods-img {
    width: 100px;
    height: 100px;
  }
  .putNum {
    width: 120px;
  }
}
</style>
