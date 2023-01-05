<template>
  <div class="GoodsAudit view-container">
    <div class="content">
      <SearchForm
        isReturnFormData
        :formData="searchForm"
        @on-search="onSearch"
      />
      <div class="action">
        <el-button
          type="primary"
          @click="handleBatchReview(CONST.AUDIT_TYPE.SUCCESS_CHECK)"
          >审核通过</el-button
        >
        <el-button
          type="danger"
          @click="handleBatchReview(CONST.AUDIT_TYPE.FAIL_CHECK)"
          >审核驳回</el-button
        >
      </div>
      <TagPage :state.sync="query.approvalStatus" @getList="getList" />
      <TablePanel
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
          <span v-if="!scope.activeLabels">-</span>
          <el-tag
            v-else
            class="mr-10 mb-10"
            v-for="(item, index) in scope.activeLabels.split(',') || []"
            :key="index"
            >{{ item }}</el-tag
          >
        </template>
        <!-- 供应价 -->
        <template #originalPrice="{ scope }">
          <span>{{
            scope | priceRange("originalPriceMin", "originalPriceMax")
          }}</span>
        </template>
        <template #status="{ scope }">
          <el-tag
            :type="
              scope.approvalStatus === CONST.AUDIT_TYPE.FAIL_CHECK
                ? 'danger'
                : ''
            "
            v-if="scope.approvalStatus"
            >{{ CONST.AUDIT_TYPE_TEXT[scope.approvalStatus] }}</el-tag
          >
        </template>
        <!-- 操作 -->
        <template #action="{ scope }">
          <div class="action-groud">
            <el-button type="text" @click="lookDetail(scope)">查看</el-button>
            <el-button
              type="text"
              @click="handleRefreshReview(scope)"
              v-if="scope.approvalStatus !== CONST.AUDIT_TYPE.NO_CHECK"
              >重新审核</el-button
            >
            <el-button
              type="text"
              @click="
                handleReview({
                  ids: [scope.id],
                  datas: [scope],
                  approvalStatus: CONST.AUDIT_TYPE.SUCCESS_CHECK,
                })
              "
              v-if="scope.approvalStatus === CONST.AUDIT_TYPE.NO_CHECK"
              >通过</el-button
            >
            <el-button
              type="text"
              @click="
                handleReviewFail({
                  ids: [scope.id],
                  datas: [scope],
                  approvalStatus: CONST.AUDIT_TYPE.FAIL_CHECK,
                })
              "
              v-if="scope.approvalStatus === CONST.AUDIT_TYPE.NO_CHECK"
              >驳回</el-button
            >
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
import { digits2Str } from "@/utils/index";
import TagPage from "./components/TagPage.vue";
import { formData, column } from "./config";

export default {
  name: "GoodsAudit",
  components: { TagPage },
  data() {
    return {
      CONST,
      formData,
      column,
      list: [],
      page: {
        pageNum: 1,
        pageSize: 10,
      },
      query: {
        approvalStatus: "",
      },
      total: 0,
      selectDataMap: {},
    };
  },
  computed: {
    ...mapGetters({
      supplierOptions: "accountRoleManage/supplierOptions",
      categoryAllOptions: "goods/CategoryAllOptions",
    }),
    searchForm({ formData, categoryAllOptions, supplierOptions }) {
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
      this.query = { ...this.query, ...data };
      this.getList(true);
    },
    lookDetail({ productNo }) {
      this.$store.commit("goods/SET_IS_DISABLE_FORM", 1);
      this.$router.push({
        name: "GoodsEdit",
        query: {
          productNo: productNo,
        },
      });
    },
    // 批量审核
    handleBatchReview(approvalStatus) {
      if (!Object.keys(this.selectDataMap)?.length)
        return this.$message.error("请选择商品后再试");
      const datas = Object.values(this.selectDataMap).filter(
        (item) => item?.approvalStatus === CONST.AUDIT_TYPE.NO_CHECK
      );
      if (!datas?.length) return this.$message.error("请选择待审核商品后再试");
      const ids = datas.map((item) => item.id);
      this.handleReview({ ids, datas, approvalStatus });
    },
    async handleRefreshReview({ productNo }) {
      this.$store.commit("goods/SET_IS_DISABLE_FORM", 0);
      this.$router.push({
        name: "GoodsEdit",
        query: {
          productNo: productNo,
          REVIEW_TYPE: "REFRESH_REVIEW",
        },
      });
    },
    handleReviewFail({ ids, datas = [], approvalStatus }) {
      this.$message.info("功能正在开发中...");
      console.log(ids, datas, approvalStatus);
    },
    async handleReview({ ids, datas = [], approvalStatus }) {
      const queryData = datas?.length
        ? datas.map((item) => ({
            approvalStatus: approvalStatus,
            id: item.id,
            productNo: item.productNo,
            remark: item.remark,
          }))
        : [];
      const title = CONST.AUDIT_TYPE_TEXT[approvalStatus];
      try {
        await this.$confirm(
          `是否确认${title}商品ID为${ids}的数据项？`,
          `${title}提示`,
          {
            type: "warning",
            showClose: false,
          }
        );
        const [, res] = await this.$http.GoodsAudit.AuditGoods(
          JSON.stringify(queryData)
        );
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
    handleSelectionChange(val) {
      this.list.forEach((item) => {
        // 存在于当前页以及map 但不存在 val -> 去掉
        const index = val.findIndex((vItem) => vItem?.id === item.id);
        if (this.selectDataMap[item.id] && index < 0)
          delete this.selectDataMap[item.id];
      });
      val.forEach((item) => (this.selectDataMap[item.id] = { ...item }));
      this.isDisabledDelete = !Object.keys(this.selectDataMap).length;
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
    async getList(isClear) {
      if (isClear) this.page.pageNum = 1;
      const query = {
        ...this.page,
        ...this.query,
      };
      const [, res] = await this.$http.GoodsAudit.GetList(query);
      if (res?.code !== this.AJAX_CODE.SUCCESS) {
        this.$message.error(res?.msg || "获取审核商品列表异常");
      }
      const data = res?.rows?.length ? res.rows : [];
      data.forEach((item) => digits2Str(item, ["id"]));
      this.list = data;
      this.total = res?.total || 0;
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
.action {
  padding: 0 0 15px;
}
</style>
