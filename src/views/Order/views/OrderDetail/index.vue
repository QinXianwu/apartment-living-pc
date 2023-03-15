<template>
  <div class="OrderDetail view-container">
    <div class="title">{{ title || "订单" }}详情</div>
    <PriceBlock title="订单号" :value="orderNo || '-'" />
    <OrderSteps
      isAlignCenter
      :orderInfo="orderInfo"
      :stepsInfo="
        isAfterSales
          ? orderInfo.atProcessReturnDate
          : orderInfo.atProcessOrderDate
      "
    />
    <template v-if="isAfterSales">
      <ReturnGoodsData :orderInfo="orderInfo" />
    </template>
    <template v-else>
      <WeChatUser :userInfo="orderInfo.orderUserVo" />
      <AddressInfo :addressInfo="orderInfo.sendPickeInfoVo" />
      <CourierInfo
        :courierInfo="orderInfo.sendPickeInfoVo"
        v-if="showCourierInfo"
      />
      <PayData :payInfo="orderInfo.payVo" />
    </template>
    <GoodsData :goodsList="orderInfo.productVoList" :orderInfo="orderInfo" />
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
import ReturnGoodsData from "./components/ReturnGoodsData.vue";
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
    ReturnGoodsData,
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
    orderId() {
      return this.$router.currentRoute.query?.orderId || "";
    },
    orderNo() {
      return this.$router.currentRoute.query?.orderNo || "";
    },
    orderType() {
      return this.$router.currentRoute.query?.orderType || "";
    },
    isAfterSales({ orderType }) {
      return orderType === CONST.ORDER_SOURCE.AFTER_SALE_ORDER;
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
      if (this.isAfterSales) {
        query.id = this.orderId;
        delete query.orderNo;
      }
      const [, res] = await this.$http.Order[
        this.isAfterSales ? "GetAfterSalesOrderDetail" : "GetOrderDetail"
      ](query);
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
