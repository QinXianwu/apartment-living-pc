<template>
  <div class="GoodsList view-container">
    <div class="content">
      <SearchForm
        isReturnFormData
        :formData="searchForm"
        @on-search="onSearch"
      />
      <div class="action" v-if="!isService">
        <el-button type="primary" @click="handleAdd">新增商品</el-button>
        <el-button
          type="primary"
          plain
          @click="handleBatchStatus(CONST.GOODS_OPER_STATE.REMOVAL)"
          >批量上架</el-button
        >
        <el-button
          type="primary"
          plain
          @click="handleBatchStatus(CONST.GOODS_OPER_STATE.LISTING)"
          >批量下架</el-button
        >
        <el-button type="danger" @click="handleBatchDelete">批量删除</el-button>
      </div>
      <TagPage :tabs="tabs" :state.sync="query.operStatus" @getList="getList" />
      <TablePanel
        ref="TablePanel"
        :tableData="list"
        :tableHead="column"
        :checkbox="true"
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
        <!-- 商品标签 -->
        <template #goodsTab="{ scope }">
          <span v-if="!scope.productTag">-</span>
          <div class="goodsTab" v-else>
            <el-tooltip
              class="goodsTab-item"
              effect="dark"
              :content="item"
              placement="right"
              v-for="(item, index) in scope.productTag.split(',') || []"
              :key="index"
            >
              <el-tag class="mr-10 mb-10">{{ item }}</el-tag>
            </el-tooltip>
          </div>
        </template>
        <!-- 活动标签 -->
        <template #activityTab="{ scope }">
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
        <!-- 供应价 -->
        <template #originalPrice="{ scope }">
          <span>{{
            scope | priceRange("originalPriceMin", "originalPriceMax")
          }}</span>
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
        <!-- 上下架状态 -->
        <template #operStatus="{ scope }">
          <div class="status">
            <el-tag
              :type="
                scope.operStatus === CONST.GOODS_OPER_STATE.REMOVAL ||
                scope.operStatus === CONST.GOODS_OPER_STATE.FAIL_CHECK
                  ? 'danger'
                  : ''
              "
              >{{ CONST.GOODS_OPER_STATE_TEXT[scope.operStatus] }}</el-tag
            >
            <el-tooltip
              class="item"
              effect="dark"
              :content="`驳回原因：${scope.remark}`"
              placement="right-start"
              v-if="
                scope.operStatus === CONST.GOODS_OPER_STATE.FAIL_CHECK &&
                scope.remark
              "
            >
              <i class="el-icon-warning ml-10" />
            </el-tooltip>
          </div>
        </template>
        <!-- 操作 -->
        <template #action="{ scope }">
          <div class="action-groud">
            <el-button type="text" @click="handleEdit(scope)">{{
              !isService && scope.operStatus !== CONST.GOODS_OPER_STATE.NO_CHECK
                ? "编辑"
                : "查看"
            }}</el-button>
            <el-button
              type="text"
              @click="
                changeStatus({ ids: [scope.id], operStatus: scope.operStatus })
              "
              v-if="
                !isService &&
                scope.operStatus !== CONST.GOODS_OPER_STATE.NO_CHECK
              "
              >{{
                scope.operStatus === CONST.GOODS_OPER_STATE.LISTING
                  ? CONST.GOODS_OPER_STATE_TEXT[CONST.GOODS_OPER_STATE.REMOVAL]
                  : CONST.GOODS_OPER_STATE_TEXT[CONST.GOODS_OPER_STATE.LISTING]
              }}</el-button
            >
            <el-button
              type="text"
              @click="handleProcured(scope)"
              v-if="
                isService && scope.operStatus === CONST.GOODS_OPER_STATE.LISTING
              "
              >采购</el-button
            >
            <el-button
              type="text"
              @click="handleDelete([scope.id])"
              v-if="!isService"
            >
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
    <ProcurementGoodsDiaog
      @close="close"
      :editInfo="editInfo"
      :show.sync="showProcurementGoods"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CONST from "@/constants/index";
import TagPage from "@/components/TagPage";
import ProcurementGoodsDiaog from "./components/ProcurementGoodsDiaog.vue";
import { formData, column, tabs, activityTab } from "./config";

export default {
  name: "GoodsList",
  components: { TagPage, ProcurementGoodsDiaog },
  data() {
    return {
      CONST,
      formData,
      tabs,
      column,
      list: [],
      page: {
        pageNum: 1,
        pageSize: 10,
      },
      query: {
        operStatus: "",
      },
      total: 0,
      editInfo: "",
      selectDataMap: {},
      showProcurementGoods: false,
    };
  },
  computed: {
    ...mapGetters({
      isVendor: "user/isVendor",
      isService: "user/isService",
      categoryAllOptions: "goods/CategoryAllOptions",
      supplierOptions: "accountRoleManage/supplierOptions",
    }),
    searchForm({ isVendor, categoryAllOptions, supplierOptions }) {
      const filterPropStr = `${isVendor ? "supplierId" : ""}`;
      const filterColumn = formData.filter(
        (item) => !filterPropStr.includes(item.prop)
      );
      const categoryItem = filterColumn.find(
        (item) => item.prop === "categoryId"
      );
      if (categoryItem) categoryItem.options = categoryAllOptions;
      const supplierItem = filterColumn.find(
        (item) => item.prop === "supplierId"
      );
      if (supplierItem) supplierItem.options = supplierOptions;
      return filterColumn;
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
    handleAdd() {
      this.$store.commit("goods/SET_IS_SERVER_EDIT", 0);
      this.$store.commit("goods/SET_IS_DISABLE_FORM", 0);
      this.$router.push({
        name: "GoodsEdit",
        query: {},
      });
    },
    handleEdit({ productNo, operStatus }) {
      this.$store.commit("goods/SET_IS_SERVER_EDIT", 0);
      this.$store.commit(
        "goods/SET_IS_DISABLE_FORM",
        this.isService || operStatus === CONST.GOODS_OPER_STATE.NO_CHECK ? 1 : 0
      );
      this.$router.push({
        name: "GoodsEdit",
        query: { productNo: productNo || "" },
      });
    },
    // 批量上下架
    handleBatchStatus(operStatus) {
      if (!Object.keys(this.selectDataMap)?.length)
        return this.$message.error("请选择商品后再试");
      const tempGoodsList = Object.values(this.selectDataMap).filter(
        (item) => item.operStatus !== CONST.GOODS_OPER_STATE.NO_CHECK
      );
      if (!tempGoodsList?.length)
        return this.$message.error("请选择审核通过的商品后再试");
      const ids = tempGoodsList.map((item) => item.id);
      this.changeStatus({ ids, operStatus });
    },
    async changeStatus({ ids, operStatus }) {
      const title =
        operStatus === CONST.GOODS_OPER_STATE.LISTING
          ? CONST.GOODS_OPER_STATE_TEXT[CONST.GOODS_OPER_STATE.REMOVAL]
          : CONST.GOODS_OPER_STATE_TEXT[CONST.GOODS_OPER_STATE.LISTING];
      try {
        await this.$confirm(
          `是否确认${title}商品ID为${ids}的数据项？`,
          `${title}提示`,
          {
            type: "warning",
            showClose: false,
          }
        );
        const [, res] = await this.$http.Goods[
          operStatus === CONST.GOODS_OPER_STATE.LISTING
            ? "UpdateOffGoods"
            : "UpdateUpGoods"
        ](JSON.stringify(ids));
        const msg = res ? res?.msg || `${title}成功` : `${title}失败`;
        this.$confirm(msg, `${title}提示`, {
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
    handleProcured({ productNo }) {
      this.showProcurementGoods = true;
      this.editInfo = { productNo };
    },
    close(isRefresh = false) {
      this.editInfo = "";
      this.showProcurementGoods = false;
      if (isRefresh) this.getList();
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
      const keyArr = [...activityTab()];
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
      const data = res?.rows?.length ? res.rows : [];
      this.list = data;
      this.total = res?.total || 0;
      this.initSelection();
    },
    initSelection() {
      if (!this.list?.length) return;
      this.list.forEach((item) => {
        if (this.selectDataMap[item?.id]) {
          this.$nextTick(() => {
            this.$refs.TablePanel.setSelection(item, true);
          });
        }
      });
    },
    handleSelectionChange(val) {
      this.list.forEach((item) => {
        // 存在于当前页以及map 但不存在 val -> 去掉
        const index = val.findIndex((vItem) => vItem?.id === item.id);
        if (this.selectDataMap[item.id] && index < 0)
          delete this.selectDataMap[item.id];
      });
      val.forEach((item) => (this.selectDataMap[item.id] = { ...item }));
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
    this.hasMounted = true;
    this.getList();
    this.$store.dispatch("goods/GetCategoryAllAction");
    this.$store.dispatch("accountRoleManage/GetSupplierListAction");
  },
  // 激活的时候重新获取列表
  activated() {
    if (this.hasMounted) {
      this.hasMounted = false; // 防止页面第一次进入的时候触发两次
    } else {
      this.getList();
    }
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
.goodsTab {
  display: flex;
  flex-wrap: wrap;
  &-item {
    display: block !important;
    @include overflow-eps(1);
  }
}
.action {
  padding: 0 0 15px;
}
</style>
