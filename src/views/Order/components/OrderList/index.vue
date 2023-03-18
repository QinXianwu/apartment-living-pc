<template>
  <div class="OrderList view-container">
    <OrderSearchForm :orderTypeData="orderTypeData" @on-search="onSearch" />
    <OrderStatusTabs
      :orderStatus.sync="query.orderStatus"
      :orderTypeData="orderTypeData"
      @getList="getList"
    />
    <ListMain
      ref="ListMain"
      :orderList="list"
      :orderTypeData="orderTypeData"
      :isShowCheckbox="isShowCheckbox"
      @showOrderDialog="showOrderDialog"
    >
      <template #action-btn="{ scope }">
        <slot name="action-btn" :scope="scope"></slot>
      </template>
    </ListMain>
    <Pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-size="page.pageSize"
      :current-page="page.pageNum"
      :total="total"
    />
    <!-- 订单编辑弹窗 -->
    <OrderDialog
      :orderTypeData="orderTypeData"
      :show.sync="orderDialogkVisible"
      :type="dialogType"
      :dataSource="editRecord"
      @close="onOrderDialogClose"
    />
  </div>
</template>

<script>
import CONST from "@/constants/index";
import OrderSearchForm from "./OrderSearchForm.vue";
import OrderStatusTabs from "./OrderStatusTabs.vue";
import OrderDialog from "../OrderDialog";
import ListMain from "./ListMain.vue";

export default {
  name: "OrderList",
  components: { OrderSearchForm, OrderStatusTabs, ListMain, OrderDialog },
  props: {
    isShowCheckbox: Boolean,
    orderTypeData: {
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
        orderStatus: String(CONST.ORDER_STATE.ALL),
      },
      total: 0,
      list: [],
      editRecord: "", // 编辑中的订单
      dialogType: "", // 显示的订单操作弹窗类型
      orderDialogkVisible: false, // 订单操作弹窗
    };
  },
  computed: {
    receiveWay({ orderTypeData }) {
      // 配送订单
      if (orderTypeData?.isSendOrder) return CONST.DELIVERY_TYPE.HOME_DELIVERY;
      // 自提订单
      if (orderTypeData?.isSelfPickupOrder)
        return CONST.DELIVERY_TYPE.ARRIVE_AT_PICKED;
      return "";
    },
    source({ orderTypeData }) {
      // 积分订单
      if (orderTypeData?.isPointsOrder) return CONST.SOURCE_ORDER.POINTS_ORDER;
      // 拼团订单
      if (orderTypeData?.isGroupOrder) return CONST.SOURCE_ORDER.GROUP_ORDER;
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
    // 打开弹窗
    showOrderDialog(data, componentName) {
      this.editRecord = data;
      this.dialogType = componentName;
      this.orderDialogkVisible = true;
    },
    onOrderDialogClose(val) {
      if (val) this.getList();
    },
    async getList(isClear) {
      if (isClear) this.page.pageNum = 1;
      const query = {
        ...this.page,
        ...this.query,
      };
      query.orderStatus =
        String(query.orderStatus) === String(CONST.ORDER_STATE.ALL)
          ? ""
          : query.orderStatus;
      if (this.orderTypeData?.isAfterSale) {
        query.operStatus = query.orderStatus;
        delete query.orderStatus;
      }
      if (this.receiveWay) query.receiveWay = this.receiveWay;
      if (this.source) query.source = this.source;
      const ApiMethod = this.orderTypeData?.isAfterSale
        ? "GetAfterSalesOrderList"
        : this.orderTypeData?.isGroupOrder
        ? "GetGroupOrderList"
        : "GetOrderList";
      const [, res] = await this.$http.Order[ApiMethod](query);
      if (res?.code !== this.AJAX_CODE.SUCCESS) {
        this.$message.error(res?.msg || "获取订单列表异常");
      }
      const data = res?.rows?.length ? res.rows : [];
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
