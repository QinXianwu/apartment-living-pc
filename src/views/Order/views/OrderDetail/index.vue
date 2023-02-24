<template>
  <div class="OrderDetail view-container">
    <div class="title">{{ title || "订单" }}详情</div>
    <PriceBlock title="订单号" :value="orderNo || '-'" />
    <OrderSteps isAlignCenter :stepsInfo="orderInfo.atProcessOrderDate" />
    <WeChatUser :userInfo="orderInfo.orderUserVo" />
    <AddressInfo :addressInfo="orderInfo.sendPickeInfoVo" />
    <CourierInfo v-if="showCourierInfo" />
    <PayData :payInfo="orderInfo.payVo" />
    <GoodsData
      :goodsList="orderInfo.productVoList"
      :payInfo="orderInfo.payVo"
    />
    <FooterView />
  </div>
</template>

<script>
import CONST from "@/constants/index";
import OrderSteps from "./components/OrderSteps.vue";
import PriceBlock from "./components/PriceBlock.vue";
import WeChatUser from "./components/WeChatUser.vue";
import AddressInfo from "./components/AddressInfo.vue";
import CourierInfo from "./components/CourierInfo.vue";
import PayData from "./components/PayData.vue";
import GoodsData from "./components/GoodsData.vue";
import FooterView from "@/components/Footer";
export default {
  name: "OrderDetail",
  components: {
    PriceBlock,
    OrderSteps,
    WeChatUser,
    AddressInfo,
    CourierInfo,
    PayData,
    GoodsData,
    FooterView,
  },
  data() {
    return {
      CONST,
      isLoading: false,
      orderInfo: {},
    };
  },
  computed: {
    title({ orderType }) {
      return CONST.ORDER_SOURCE_TEXT[orderType] || "订单";
    },
    orderNo() {
      return this.$router.currentRoute.query?.orderNo || "";
    },
    orderType() {
      return this.$router.currentRoute.query?.orderType || "";
    },
    showCourierInfo({ orderInfo }) {
      return !!orderInfo?.atProcessOrderDate?.sendDate;
    },
  },
  methods: {
    async getOrderInfo() {
      if (!this.orderNo || this.isLoading) return;
      this.isLoading = true;
      const query = {
        orderNo: this.orderNo || "",
      };
      const [, res] = await this.$http.Order.GetOrderDetail(query);
      this.isLoading = false;
      if (!res) return this.$message.error("获取订单详情异常");
      this.orderInfo = { ...res };
    },
    // 初始化操作
    async initLoad() {
      this.orderInfo = {};
      this.getOrderInfo();
    },
  },
  // 依然需要mounted是为了应对直接按F5刷新的时候不会触发activated，
  mounted() {
    this.hasMounted = true;
    this.initLoad();
  },
  // 激活的时候重新获取列表
  // this.hasMounted 是防止页面正常跳转（非F5刷新）第一次进入的时候触发两次
  activated() {
    if (this.hasMounted) {
      this.hasMounted = false;
    } else {
      this.initLoad();
    }
  },
};
</script>
<style lang="scss" scoped>
.OrderDetail {
  background: #fff;
  padding-bottom: 60px;
  .title {
    font-size: 15px;
    font-weight: bold;
    color: $main-font-color;
    margin-bottom: 20px;
  }
}
</style>
