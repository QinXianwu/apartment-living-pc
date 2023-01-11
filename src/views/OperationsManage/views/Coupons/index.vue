<template>
  <div class="Coupons view-container">
    <div class="content">
      <SearchForm isReturnFormData :formData="formData" @on-search="onSearch" />
      <!-- <div class="action"></div> -->
      <TagPage :state.sync="query.type" @getList="getList" />
      <TablePanel ref="TablePanel" :tableData="list" :tableHead="column">
        <template #applyProductType="{ scope }">
          <span>
            {{ CONST.APPLY_PRODUCT_TYPE_TEXT[scope.applyProductType] }}
          </span>
        </template>
        <template #applyStationStatus="{ scope }">
          <span>
            {{ CONST.SERVE_TYPE_TEXT[scope.applyStationStatus] }}
          </span>
        </template>
        <template #expireTime="{ scope }">
          <span>{{ scope | couponDateText }}</span>
        </template>
        <template #unitLimitType="{ scope }">
          <span v-if="scope.unitLimitType === CONST.UNIT_LIMIT_TYPE.UNLIMITED">
            {{ CONST.UNIT_LIMIT_TYPE_TEXT[scope.unitLimitType] }}
          </span>
          <span v-else
            >{{ scope.unitLimitCount }}张/{{
              CONST.UNIT_LIMIT_TYPE_TEXT[scope.unitLimitType]
            }}</span
          >
        </template>
        <template #status="{ scope }">
          <el-tag
            :type="scope.status === CONST.COUPONS_STATE.HIDE ? 'danger' : ''"
            >{{ CONST.COUPONS_STATE_TEXT[scope.status] }}</el-tag
          >
        </template>
        <!-- 操作 -->
        <template #action="{ scope }">
          <div class="action-groud">
            <el-button type="text" @click="lookDetail(scope)">查看</el-button>
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
    <DrawerPopup v-model="showCouponsDetail">
      <CouponsDetail
        v-if="showCouponsDetail"
        :editInfo="editInfo"
        @close="close"
      />
    </DrawerPopup>
  </div>
</template>

<script>
import CONST from "@/constants/index";
import { formData, column } from "./config";
// import { digits2Str } from "@/utils/index";
import TagPage from "./components/TagPage.vue";
import CouponsDetail from "../../components/CouponsDetail";

export default {
  name: "Coupons",
  components: { TagPage, CouponsDetail },
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
        type: String(CONST.COUPONS_TYPE.FULL_MINUS),
      },
      total: 0,
      editInfo: "",
      showCouponsDetail: false,
    };
  },
  computed: {},
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
    close(isRefresh = false) {
      this.editInfo = "";
      this.showCouponsDetail = false;
      if (isRefresh) this.getList();
    },
    lookDetail({ id }) {
      this.editInfo = { id };
      this.showCouponsDetail = true;
    },
    async getList(isClear) {
      if (isClear) this.page.pageNum = 1;
      const query = {
        ...this.page,
        ...this.query,
      };
      const [, res] = await this.$http.Coupons.GetCouponsList(query);
      if (res?.code !== this.AJAX_CODE.SUCCESS) {
        this.$message.error(res?.msg || "获取优惠劵列表异常");
      }
      const data = res?.rows?.length ? res.rows : [];
      // data.forEach((item) => digits2Str(item, ["id"]));
      this.list = data;
      this.total = res?.total || 0;
    },
  },
  filters: {
    couponDateText(item) {
      if (item?.expireTimeType === CONST.COUPONS_EXPIRE_TYPE.DESIGNATE_DATE)
        return `${item?.expireTime || "-"} 到期`;
      else if (item?.expireTimeType === CONST.COUPONS_EXPIRE_TYPE.HOLS_AFFETER)
        return `${item.expireTimeCount || "-"} 小时后到期`;
      else if (item?.expireTimeType === CONST.COUPONS_EXPIRE_TYPE.DYCE_AFFETER)
        return `${item?.expireTimeCount || "-"} 天后到期`;
      else return "";
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
.action {
  padding: 0 0 15px;
}
</style>
