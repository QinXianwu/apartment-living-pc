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
        <div class="goodsInfo">
          <ImageView customClass="table-img" :src="scope.mainImage" />
          <div class="name">
            <el-tooltip
              class="item"
              effect="dark"
              :content="scope.productName"
              placement="right"
            >
              <span>{{ scope.productName }}</span>
            </el-tooltip>
          </div>
        </div>
      </template>
      <template #userInfo="{ scope }">
        <el-tooltip class="item" effect="dark" placement="right">
          <div slot="content">
            <div class="name">姓名：{{ scope.receipteName || "-" }}</div>
            <div class="address">
              <span>地址：{{ scope | filtersAddress(addressKey) }}</span>
            </div>
            <div class="phone">联系方式：{{ scope.receiptePhone || "-" }}</div>
          </div>
          <div class="userInfo">
            <div class="name">姓名：{{ scope.receipteName || "-" }}</div>
            <div class="address">
              <span>地址：{{ scope | filtersAddress(addressKey) }}</span>
            </div>
            <div class="phone">联系方式：{{ scope.receiptePhone || "-" }}</div>
          </div>
        </el-tooltip>
      </template>
      <!-- 状态 -->
      <template #orderStatus="{ scope }">
        <el-tag :type="scope | statusTabType">{{
          CONST.ORDER_STATE_TEXT[scope.orderStatus]
        }}</el-tag>
      </template>
      <!-- 操作 -->
      <template #action="{ scope }">
        <div class="action-groud">
          <el-button type="text" @click="lookDetail(scope)">查看</el-button>
        </div>
      </template>
    </TablePanel>
  </div>
</template>

<script>
import CONST from "@/constants/index";
import { column, afterSaleColumn } from "./config";

export default {
  name: "ListMain",
  components: {},
  props: {
    isShowCheckbox: Boolean,
    // 订单列表
    orderList: {
      type: Array,
      default: () => [],
    },
    orderType: {
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
    tableHead({ column, orderType, afterSaleColumn }) {
      if (orderType?.isAfterSale) return afterSaleColumn;
      const filterPropStr = `${
        orderType?.isSendOrder ? "" : "userInfo,cccc1,cccc2"
      },${orderType?.isPointsOrder ? "" : "iiii"},${
        orderType?.isSelfPickupOrder ? "" : "cccData,cccTime"
      }`;
      return column.filter((item) => !filterPropStr.includes(item.prop));
    },
  },
  methods: {
    lookDetail() {
      this.$message.info("功能开发中");
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
    statusTabType() {
      return "";
    },
  },
  mounted() {
    //
  },
};
</script>
<style lang="scss" scoped>
.goodsInfo {
  display: flex;
  align-items: center;
  .table-img {
    width: 60px;
    height: 60px;
  }
  .name {
    margin-left: 10px;
    @include overflow-eps(2);
  }
}
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