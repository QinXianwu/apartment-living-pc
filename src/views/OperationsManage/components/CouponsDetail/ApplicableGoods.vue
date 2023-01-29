<template>
  <div class="ApplicableGoods">
    <div class="title">适用商品</div>
    <div class="content">
      <TableBlock :tableData="tableData1" :valueWidth="250" />
      <div
        class="goods-list"
        v-if="couponsInfo.applyProductType === CONST.APPLY_PRODUCT_TYPE.PART"
      >
        <TablePanel ref="TablePanel" :tableData="list" :tableHead="column">
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
    </div>
  </div>
</template>

<script>
import CONST from "@/constants/index";
import { GoodsColumn } from "./config/index";
import { digits2Str } from "@/utils/index";
import TableBlock from "@/components/TableBlock";

export default {
  name: "ApplicableGoods",
  components: { TableBlock },
  props: {
    couponsInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      CONST,
      column: GoodsColumn,
      page: {
        pageNum: 1,
        pageSize: 5,
      },
    };
  },
  computed: {
    tableData1({ couponsInfo }) {
      return [
        {
          label: "适用商品类型",
          value: couponsInfo?.applyProductType
            ? CONST.APPLY_PRODUCT_TYPE_TEXT[couponsInfo.applyProductType]
            : "",
        },
      ];
    },
    list({ couponsInfo, page }) {
      if (couponsInfo?.applyProductType === CONST.APPLY_PRODUCT_TYPE.ALL)
        return [];
      const goodsList = couponsInfo?.productList || [];
      goodsList.forEach((item) =>
        digits2Str(item, ["categoryId", "supplierId"])
      );
      return goodsList.slice(
        (page.pageNum - 1) * page.pageSize,
        page.pageNum * page.pageSize
      );
    },
  },
  methods: {
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
.ApplicableGoods {
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
}
</style>
