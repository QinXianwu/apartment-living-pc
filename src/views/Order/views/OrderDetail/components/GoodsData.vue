<template>
  <div class="GoodsData">
    <div class="title">商品信息</div>
    <div class="content">
      <div class="goods-list">
        <TablePanel ref="TablePanel" :tableData="list" :tableHead="column">
          <!-- 活动标签 -->
          <template #activityType="{ scope }">
            <div class="activityTab" v-if="getActivityTab(scope).length">
              <el-tag
                class="mr-10 mb-10"
                :type="item.tabType"
                v-for="(item, index) in getActivityTab(scope)"
                :key="index"
                >{{ item.label }}</el-tag
              >
            </div>
            <span v-else>-</span>
          </template>
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
        </TablePanel>
        <!-- 分页 -->
        <Pagination
          :fixed="false"
          :pageSizes="[5, 10, 20, 50, 100]"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-size="page.pageSize"
          :current-page="page.pageNum"
          :total="list.length"
        />
      </div>
      <div class="pay-data">
        <div class="pay-item" v-for="(item, index) in payDataList" :key="index">
          <span class="pay-label">{{ item.label }}</span>
          <span class="pay-value">￥{{ item.value | formatCurrency }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CONST from "@/constants/index";
import { GoodsColumn, activityTab } from "./config/index";

export default {
  name: "GoodsData",
  components: {},
  props: {
    goodsList: {
      type: Array,
      default: () => [],
    },
    payInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      CONST,
      column: GoodsColumn,
      activityTab,
      page: {
        pageNum: 1,
        pageSize: 5,
      },
    };
  },
  computed: {
    list({ goodsList, page }) {
      const tempList = goodsList?.length ? goodsList : [];
      return tempList.slice(
        (page.pageNum - 1) * page.pageSize,
        page.pageNum * page.pageSize
      );
    },
    payDataList({ payInfo }) {
      return [
        { label: "商品总额：", value: payInfo?.totalAmount },
        { label: "优惠金额：", value: payInfo?.couponAmount },
        { label: "配送费：", value: payInfo?.sendAmount },
        { label: "配送优惠金额：", value: payInfo?.voucherSendAmount },
        { label: "分销费：", value: "" },
        { label: "实付款：", value: payInfo?.orderAmount },
      ];
    },
  },
  methods: {
    getActivityTab({ activeLabels }) {
      const labels = activeLabels || "";
      const keyArr = [...activityTab()];
      return keyArr.filter((item) => labels.includes(item.label));
    },
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.page.pageNum = 1;
    },
    handleCurrentChange(val) {
      this.page.pageNum = val;
    },
  },
  mounted() {
    //
  },
};
</script>
<style lang="scss" scoped>
.GoodsData {
  padding: 20px 0;

  .title {
    font-size: 15px;
    font-weight: bold;
    color: $main-font-color;
    margin-bottom: 20px;
  }
  .goodsInfo {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .table-img {
      width: 60px;
      height: 60px;
    }
    .name {
      margin-left: 10px;
      @include overflow-eps(2);
    }
  }
  .pay-data {
    display: flex;
    flex-direction: column;
    margin: 50px 50px 50px 0;
    .pay-item {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      color: $main-font-color;
      font-size: 15px;
      line-height: 30px;
    }
    .pay-value {
      font-weight: bold;
    }
  }
}
</style>
