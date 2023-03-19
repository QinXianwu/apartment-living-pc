<template>
  <div class="ListMain">
    <TablePanel
      ref="TablePanel"
      :tableData="orderList"
      :tableHead="tableHead"
      :checkbox="isShowCheckbox"
      :isShowTopCheck="false"
      @selection-change="handleSelectionChange"
    >
      <template #goodsInfo="{ scope }">
        <GoodsList
          :goodsList="
            orderTypeData.isAfterSale
              ? scope.productVoList
              : orderTypeData.isGroupOrder
              ? [scope.product]
              : scope.atOrderDetailVoList
          "
        />
      </template>
      <template #receiveWay="{ scope }">
        <span>{{ CONST.DELIVERY_TYPE_TEXT[scope.receiveWay] || "-" }}</span>
      </template>
      <template #userInfo="{ scope }">
        <el-tooltip class="item" effect="dark" placement="right">
          <div slot="content">
            <div class="name">
              姓名：{{ scope.name || scope.receipteName || "-" }}
            </div>
            <div class="address" v-if="!orderTypeData.isAfterSale">
              <span>地址：{{ scope | filtersAddress(addressKey) }}</span>
            </div>
            <div class="phone">
              联系方式：{{ scope.mobile || scope.receiptePhone || "-" }}
            </div>
          </div>
          <div class="userInfo">
            <div class="name">
              姓名：{{ scope.name || scope.receipteName || "-" }}
            </div>
            <div class="address" v-if="!orderTypeData.isAfterSale">
              <span>地址：{{ scope | filtersAddress(addressKey) }}</span>
            </div>
            <div class="phone">
              联系方式：{{ scope.mobile || scope.receiptePhone || "-" }}
            </div>
          </div>
        </el-tooltip>
      </template>
      <template #courierName="{ scope }">
        <span>{{ scope.courierName || "-" }}</span>
      </template>
      <!-- 状态/售前状态 -->
      <template #orderStatus="{ scope }">
        <el-tag
          :type="
            orderTypeData.isAfterSale
              ? scope.preSaleStatus
              : scope.orderStatus | statusTabType
          "
          >{{
            orderTypeData.isAfterSale
              ? CONST.ORDER_STATE_TEXT[scope.preSaleStatus]
              : CONST.ORDER_STATE_TEXT[scope.orderStatus]
          }}</el-tag
        >
      </template>
<<<<<<< HEAD
=======
      <!-- 自提时间 -->
      <template #pickingTime="{ scope }">
        <span>{{
          (scope.pickingTime || "")
            .replace("今天", "")
            .replace("明天", "")
            .replace("后天", "")
        }}</span>
      </template>
>>>>>>> d0739a6b459e4945672b0a74ebdfd09268e7f1ae
      <!-- 售后类型 -->
      <template #type="{ scope }">
        <el-tag>{{ CONST.A_S_RETURNS_TYPE_TEXT[scope.type] }}</el-tag>
      </template>
      <!-- 售后状态 -->
      <template #operStatus="{ scope }">
        <el-tag :type="scope.operStatus | ASstatusTabType">{{
          CONST.A_S_ORDER_STATE_TEXT[scope.operStatus]
        }}</el-tag>
      </template>
      <!-- 操作 -->
      <template #action="{ scope }">
        <div class="action-groud">
          <el-button type="text" @click="lookDetail(scope)">查看</el-button>
          <el-button
            v-if="
              showSendBtn &&
              scope.orderStatus === CONST.ORDER_STATE.WAIT_SEND &&
              scope.receiveWay === CONST.DELIVERY_TYPE.HOME_DELIVERY
            "
            type="text"
            @click="$emit('showOrderDialog', scope, 'SetCourierPeople')"
            >配送</el-button
          >
          <slot name="action-btn" :scope="scope"></slot>
        </div>
      </template>
    </TablePanel>
  </div>
</template>

<script>
import CONST from "@/constants/index";
import { column, afterSaleColumn } from "./config";
import GoodsList from "./GoodsList.vue";

export default {
  name: "ListMain",
  components: { GoodsList },
  props: {
    isShowCheckbox: Boolean,
    // 订单列表
    orderList: {
      type: Array,
      default: () => [],
    },
    orderTypeData: {
      type: Object,
      default: () => ({}),
    },
    // isAfterSale: Boolean, // 是否是售后
    // isSendOrder: Boolean, // 是否是配送单
    // isSelfPickupOrder: Boolean, // 是否是自提单
    // isGroupOrder: Boolean, // 是否是拼团订单
    // isPointsOrder: Boolean, // 是否是积分订单
  },
  data() {
    return {
      CONST,
      column,
      afterSaleColumn,
      selectDataMap: {},
      addressKey: ["provinceName", "cityName", "districtName", "address"],
    };
  },
  watch: {
    orderList() {
      this.initSelection();
    },
  },
  computed: {
    tableHead({ column, orderTypeData, afterSaleColumn }) {
      if (orderTypeData?.isAfterSale) return afterSaleColumn;
      const filterPropStr = `${
        orderTypeData?.isSendOrder ||
        orderTypeData?.isPointsOrder ||
        orderTypeData?.isGroupOrder
          ? ""
          : "userInfo,courierName,courierServiceAmount"
      },${orderTypeData?.isPointsOrder ? "" : "creditByPoints"},${
        orderTypeData?.isSelfPickupOrder ||
        orderTypeData?.isGroupOrder ||
        orderTypeData?.isPointsOrder
          ? ""
          : "pickingAddress,pickingTime"
      }`;
      return column.filter((item) => !filterPropStr.includes(item.prop));
    },
    // 订单类型
    orderType({ orderTypeData }) {
      // 配送订单
      if (orderTypeData?.isSendOrder) return CONST.ORDER_SOURCE.SEND_ORDER;
      // 自提订单
      if (orderTypeData?.isSelfPickupOrder)
        return CONST.ORDER_SOURCE.SELF_PICKUP_ORDER;
      // 积分订单
      if (orderTypeData?.isPointsOrder) return CONST.ORDER_SOURCE.POINTS_ORDER;
      // 拼团订单
      if (orderTypeData?.isGroupOrder) return CONST.ORDER_SOURCE.GROUP_ORDER;
      // 售后订单
      if (orderTypeData?.isAfterSale)
        return CONST.ORDER_SOURCE.AFTER_SALE_ORDER;
      return "";
    },
    showSendBtn({ orderTypeData }) {
      return (
        orderTypeData?.isSendOrder ||
        orderTypeData?.isPointsOrder ||
        orderTypeData?.isGroupOrder
      );
    },
  },
  methods: {
    lookDetail({ id, orderNo }) {
      this.$router.push({
        name: "OrderDetail",
        query: {
          orderId: id || "",
          orderNo: orderNo || "",
          orderType: this.orderType,
        },
      });
    },
    initSelection() {
      if (!this.orderList?.length) return;
      this.orderList.forEach((item) => {
        if (this.selectDataMap[item?.orderNo]) {
          this.$nextTick(() => {
            this.$refs.TablePanel.setSelection(item, true);
          });
        }
      });
    },
    handleSelectionChange(val) {
      this.orderList.forEach((item) => {
        // 存在于当前页以及map 但不存在 val -> 去掉
        const index = val.findIndex((vItem) => vItem?.orderNo === item.orderNo);
        if (this.selectDataMap[item.orderNo] && index < 0)
          delete this.selectDataMap[item.orderNo];
      });
      val.forEach((item) => (this.selectDataMap[item.orderNo] = { ...item }));
    },
  },
  filters: {
    statusTabType(status) {
      if (status === CONST.ORDER_STATE.FINISH) return "success";
      if (
        status === CONST.ORDER_STATE.CANCEL ||
        status === CONST.ORDER_STATE.EXPIRED_CANCEL ||
        status === CONST.ORDER_STATE.PLATFORM_CANCEL
      )
        return "danger";
      if (
        status === CONST.ORDER_STATE.TO_BE_WRITTEN_OFF ||
        status === CONST.ORDER_STATE.AFTER_SALE
      )
        return "warning";
      return "";
    },
    ASstatusTabType(status) {
      if (status === CONST.A_S_ORDER_STATE.RETURN_DOEN) return "success";
      if (
        status === CONST.A_S_ORDER_STATE.USER_WRITTEN_OFF ||
        status === CONST.A_S_ORDER_STATE.FIAL ||
        status === CONST.A_S_ORDER_STATE.AUDIT_FAIL ||
        status === CONST.A_S_ORDER_STATEEXPIRED_CANCEL ||
        status === CONST.A_S_ORDER_STATEAUDIT_FAIL_TO_NEW
      )
        return "danger";
      if (
        status === CONST.A_S_ORDER_STATEWAIT_REFUNDED ||
        status === CONST.A_S_ORDER_STATERETURN_MONEY
      )
        return "warning";
      return "";
    },
  },
  mounted() {
    //
  },
};
</script>
<style lang="scss" scoped>
.userInfo {
  text-align: left;
  .name {
    @include overflow-eps(2);
  }
  .address {
    @include overflow-eps(2);
  }
}
</style>
