<template>
  <div class="NewcomerGoods">
    <span class="sub-title">第二重好礼（指定添加满减券与配送券）</span>
    <div class="action">
      <el-button type="primary" @click="handleAddGoods">添加商品</el-button>
    </div>
    <TablePanel
      ref="TablePanel"
      :tableData="
        list.slice(
          (page.pageNum - 1) * page.pageSize,
          page.pageNum * page.pageSize
        )
      "
      :tableHead="column"
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
      <!-- 新人价 -->
      <template #couple="{ scope }">
        <span>
          {{ scope | priceRange("coupleMin", "coupleMax") }}
        </span>
      </template>
      <!-- 操作 -->
      <template #action="{ index }">
        <div class="action-groud">
          <el-button type="text" @click="handleDelete(index)"> 删除 </el-button>
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
    <ChooseGoodsDiaog
      :selectIds="ids"
      :show.sync="showGoodsDiaog"
      @close="close"
      @on-success="chooseGoodsSuccess"
    />
  </div>
</template>

<script>
import { GoodsColumn } from "../config";
import CONST from "@/constants/index";
// import { digits2Str } from "@/utils/index";
import ChooseGoodsDiaog from "@/components/ChooseGoodsDiaog";

export default {
  name: "NewcomerGoods",
  components: { ChooseGoodsDiaog },
  data() {
    return {
      CONST,
      column: GoodsColumn,
      showGoodsDiaog: false,
      list: [],
      page: {
        pageNum: 1,
        pageSize: 5,
      },
    };
  },
  computed: {
    ids({ list }) {
      if (!list?.length) return [];
      return list.map((item) => item.id);
    },
  },
  methods: {
    // init() {
    //   this.formData.applyProductType =
    //     this.couponsInfo?.applyProductType || CONST.APPLY_PRODUCT_TYPE.ALL;
    //   if (this.couponsInfo?.applyProductType === CONST.APPLY_PRODUCT_TYPE.ALL) {
    //     this.list = [];
    //     return;
    //   }
    //   const goodsList = this.couponsInfo?.productList || [];
    //   goodsList.forEach((item) =>
    //     digits2Str(item, ["id", "categoryId", "supplierId"])
    //   );
    //   this.list = [].concat(goodsList);
    // },
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.page.pageNum = 1;
    },
    handleCurrentChange(val) {
      this.page.pageNum = val;
    },
    handleAddGoods() {
      this.showGoodsDiaog = true;
    },
    handleDelete(index) {
      this.list.splice(index, 1);
    },
    chooseGoodsSuccess(data) {
      this.list = data?.length ? data : [];
    },
    close(isRefresh = false) {
      this.showGoodsDiaog = false;
      if (isRefresh) this.$emit("close", true);
    },
  },
  filters: {},
  mounted() {
    //
  },
};
</script>
<style lang="scss" scoped>
.NewcomerGoods {
  padding: 20px 20px 5px;

  .title {
    font-size: 15px;
    font-weight: bold;
    color: $main-font-color;
  }
  .sub-title {
    font-size: 13px;
    font-weight: bold;
    color: $sub-font-color;
    margin-bottom: 20px;
  }
  .action {
    padding: 10px 0 20px;
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
