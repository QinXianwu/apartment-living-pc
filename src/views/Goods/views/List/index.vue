<template>
  <div class="GoodsList view-container">
    <div class="content">
      <SearchForm
        isReturnFormData
        :formData="searchForm"
        @on-search="onSearch"
      />
      <div class="action">
        <el-button type="primary" @click="handleAdd">新增商品</el-button>
        <el-button type="primary" plain>批量上架</el-button>
        <el-button type="primary" plain>批量下架</el-button>
      </div>
      <TablePanel :tableData="list" :tableHead="column">
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
        <!-- 商品标签 -->
        <template #goodsTab="{ scope }">
          <span v-if="!scope.productTag">-</span>
          <el-tag
            v-else
            class="mr-10 mb-10"
            v-for="(item, index) in scope.productTag.split(',') || []"
            :key="index"
            >{{ item }}</el-tag
          >
        </template>
        <!-- 活动标签 -->
        <template #activityTab="{ scope }">
          <div class="activityTab">
            <el-tag
              class="mr-10 mb-10"
              :type="item.tabType"
              v-for="(item, index) in getActivityTab(scope)"
              :key="index"
              >{{ item.label }}</el-tag
            >
          </div>
        </template>
        <!-- 售价 -->
        <template #sellPrice="{ scope }">
          <span>{{ scope | priceRange("sellPriceMin", "sellPriceMax") }}</span>
        </template>
        <!-- 折扣 -->
        <template #discount="{ scope }">
          <span> {{ scope | DiscountFilter }} </span>
        </template>
        <!-- 折扣价 -->
        <template #discountPrice="{ scope }">
          <span v-if="scope.discountIs !== CONST.DISCOUNTED_TYPE.YES">-</span>
          <span v-else>{{
            scope | priceRange("discountPriceMin", "discountPriceMax")
          }}</span>
        </template>
        <!-- 秒杀价 -->
        <template #spikePrice="{ scope }">
          <span>
            {{ scope | priceRange("spikePriceMin", "spikePriceMax") }}
          </span>
        </template>
        <template #operStatus="{ scope }">
          <el-tag
            :type="
              scope.operStatus === $CONST.GOODS_OPER_STATE.REMOVAL
                ? 'danger'
                : ''
            "
            >{{ $CONST.GOODS_OPER_STATE_TEXT[scope.operStatus] }}</el-tag
          >
        </template>
        <!-- 操作 -->
        <template #action="{ scope }">
          <div class="action-groud">
            <el-button type="text" @click="handleEdit(scope)"> 编辑 </el-button>
            <el-button type="text" @click="handleEdit(scope)"> 详情 </el-button>
            <el-button type="text" @click="handleEdit(scope)"> 上架 </el-button>
            <el-button type="text" @click="handleEdit(scope)"> 下架 </el-button>
            <el-button type="text" @click="handleEdit(scope)"> 采购 </el-button>
            <el-button type="text" @click="handleDelete([scope.id])">
              删除
            </el-button>
          </div>
        </template>
      </TablePanel>
      <!-- 分页 -->
      <Pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-size="page.pageSize"
        :current-page="page.pageNum"
        :total="total"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CONST from "@/constants/index";
// import filters from "@/filters/index";
import { formData, column, activityTab } from "./config";

export default {
  name: "GoodsList",
  components: {},
  data() {
    return {
      CONST,
      activityTab,
      formData,
      column,
      list: [],
      page: {
        pageNum: 1,
        pageSize: 10,
      },
      query: {},
      total: 0,
      selectDataMap: {},
    };
  },
  computed: {
    ...mapGetters({
      categoryAllOptions: "goods/CategoryAllOptions",
      supplierOptions: "accountRoleManage/supplierOptions",
    }),
    searchForm({ categoryAllOptions, supplierOptions }) {
      const categoryItem = formData.find((item) => item.prop === "categoryId");
      if (categoryItem) categoryItem.options = categoryAllOptions;
      const supplierItem = formData.find((item) => item.prop === "supplierId");
      if (supplierItem) supplierItem.options = supplierOptions;
      return formData;
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
      this.query = { ...data };
      this.getList(true);
    },
    handleAdd() {
      this.$router.push({
        name: "GoodsEdit",
        query: {},
      });
    },
    handleEdit({ productNo }) {
      this.$router.push({
        name: "GoodsEdit",
        query: { productNo: productNo || "" },
      });
    },
    // 批量删除
    handleBatchDelete() {
      if (!Object.keys(this.selectDataMap)?.length)
        return this.$message.error("请选择商品后再试");
      const ids = Object.keys(this.selectDataMap);
      this.handleDelete(ids);
    },
    async handleDelete(ids) {
      try {
        await this.$confirm(
          `是否确认删除商品ID为${ids}的数据项？`,
          "删除提示",
          {
            type: "warning",
            showClose: false,
          }
        );
        const [, res] = await this.$http.Goods.DeleteGoods(JSON.stringify(ids));
        const msg = res ? res?.msg || `删除成功` : `删除失败`;
        this.$confirm(msg, "删除提示", {
          showClose: false,
          showCancelButton: false,
          type: res ? "success" : "error",
        }).then(() => {
          if (res) {
            this.selectDataMap = {};
            this.getList();
          }
        });
      } catch (error) {
        console.error(error);
        error;
      }
    },
    getActivityTab(data) {
      const keyArr = [...activityTab];
      return keyArr
        .filter((item) => data[item.key] === item.is)
        .map((item) => ({ ...item, value: data[item.key] }));
    },
    async getList(isClear) {
      if (isClear) this.page.pageNum = 1;
      const query = {
        ...this.page,
        ...this.query,
      };
      const [, res] = await this.$http.Goods.GetList(query);
      if (res?.code !== this.AJAX_CODE.SUCCESS) {
        this.$message.error(res?.msg || "获取商品列表异常");
      }
      this.list = res?.rows || [];
      this.total = res?.total || 0;
    },
  },
  filters: {
    DiscountFilter(item) {
      if (item?.discountIs !== CONST.DISCOUNTED_TYPE.YES) return "-";
      if (!item?.discountMin && item.discountMin !== 0) return "-";
      if (
        (!item?.discountMax && item.discountMax !== 0) ||
        item.discountMin === item.discountMax
      )
        return item.discountMin;
      return item.discountMin + "~" + item.discountPriceMax;
    },
  },
  mounted() {
    this.getList();
    this.$store.dispatch("goods/GetCategoryAllAction");
    this.$store.dispatch("accountRoleManage/GetSupplierListAction");
  },
};
</script>
<style lang="scss" scoped>
.view-container {
  background: #fff;
}
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
.activityTab {
  text-align: left;
}
.action {
  padding: 0 0 15px;
}
</style>
