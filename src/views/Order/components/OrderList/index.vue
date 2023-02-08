<template>
  <div class="OrderList view-container">
    <OrderSearchForm :orderType="orderType" @on-search="onSearch" />
    <OrderStatusTabs
      :orderStatus.sync="query.orderStatus"
      :orderType="orderType"
      @getList="getList"
    />
    <ListMain
      ref="ListMain"
      :orderList="list"
      :orderType="orderType"
      :isShowCheckbox="isShowCheckbox"
    />
    <Pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-size="page.pageSize"
      :current-page="page.pageNum"
      :total="total"
    />
  </div>
</template>

<script>
import CONST from "@/constants/index";
// import { digits2Str } from "@/utils/index";
import OrderSearchForm from "./OrderSearchForm.vue";
import OrderStatusTabs from "./OrderStatusTabs.vue";
import ListMain from "./ListMain.vue";

export default {
  name: "OrderList",
  components: { OrderSearchForm, OrderStatusTabs, ListMain },
  props: {
    isShowCheckbox: Boolean,
    orderType: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      CONST,
      page: {
        pageNum: 1,
        pageSize: 10,
      },
      query: {
        orderStatus: "",
      },
      total: 0,
      list: [],
    };
  },
  computed: {
    // 订单类型
    receiveWay({ orderType }) {
      // 配送订单
      if (orderType?.isSendOrder) return CONST.DELIVERY_TYPE.HOME_DELIVERY;
      // 配送订单
      if (orderType?.isSelfPickupOrder)
        return CONST.DELIVERY_TYPE.ARRIVE_AT_PICKED;
      return "";
    },
    source({ orderType }) {
      // 积分订单
      if (orderType?.isPointsOrder) return CONST.SOURCE_ORDER.POINTS_ORDER;
      // 拼团订单
      if (orderType?.isGroupOrder) return CONST.SOURCE_ORDER.GROUP_ORDER;
      return "";
    },
  },
  methods: {
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.page.pageNum = 1;
      this.getList(true);
    },
    handleCurrentChange(val) {
      this.page.pageNum = val;
      this.getList(false);
    },
    onSearch(data) {
      this.query = { ...this.query, ...data };
      this.getList(true);
    },
    async getList(isClear) {
      if (isClear) this.page.pageNum = 1;
      const query = {
        ...this.page,
        ...this.query,
      };
      if (this.receiveWay) query.receiveWay = this.receiveWay;
      if (this.source) query.receiveWay = this.source;
      const [, res] = await this.$http.Order.GetOrderList(query);
      if (res?.code !== this.AJAX_CODE.SUCCESS) {
        this.$message.error(res?.msg || "获取订单列表异常");
      }
      const data = res?.rows?.length ? res.rows : [];
      // data.forEach((item) => {
      //   digits2Str(item, ["id", "serviceId"]);
      // });
      this.list = data;
      this.total = res?.total || 0;
    },
  },
  mounted() {
    this.getList();
  },
};
</script>
<style lang="scss" scoped>
.view-container {
  background: #fff;
}
</style>
