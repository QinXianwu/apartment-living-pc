<template>
  <div class="Coupons view-container">
    <div class="content">
      <SearchForm isReturnFormData :formData="formData" @on-search="onSearch" />
      <div class="action">
        <el-button type="primary" @click="handleAdd">新增优惠劵</el-button>
      </div>
      <TagPage :state.sync="query.type" @getList="getList">
        <template>
          <el-button type="primary" @click="handleActivityRule"
            >活动说明</el-button
          >
        </template>
      </TagPage>
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
            <el-button type="text" @click="handleEdit(scope)">编辑</el-button>
            <el-button type="text" @click="changeStatus(scope)">{{
              scope.status === CONST.COUPONS_STATE.SHOW
                ? CONST.COUPONS_STATE_TEXT[CONST.COUPONS_STATE.HIDE]
                : CONST.COUPONS_STATE_TEXT[CONST.COUPONS_STATE.SHOW]
            }}</el-button>
            <!-- <el-button type="text" @click="handleDelete(scope)">删除</el-button> -->
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
    <ChooseGoodsDiaog
      :selectIds="selectGoodsIds"
      :show.sync="showGoodsDiaog"
      @close="chooseClose"
      @on-success="chooseGoodsSuccess"
    />
    <ChooseStationDiaog
      :selectIds="selectStationIds"
      :show.sync="showStationDiaog"
      @close="chooseClose"
      @on-success="chooseStationSuccess"
    />
    <ActivityRuleDiaog :show.sync="showActivityRuleDiaog" @close="close" />
    <DrawerPopup v-model="isDrawerPopup">
      <CouponsDetail
        v-if="showCouponsDetail"
        :editInfo="editInfo"
        @close="close"
      />
      <UpdateCoupon
        v-if="showUpdateCoupon"
        :editInfo="editInfo"
        :selectGoods="selectGoods"
        :selectStation="selectStation"
        @close="close"
        @chooseGoods="chooseGoods"
        @chooseStation="chooseStation"
      />
    </DrawerPopup>
  </div>
</template>

<script>
import CONST from "@/constants/index";
import { formData, column } from "./config";
// import { digits2Str } from "@/utils/index";
import TagPage from "../../components/TagPage.vue";
import UpdateCoupon from "./components/UpdateCoupon";
import ActivityRuleDiaog from "./components/ActivityRuleDiaog.vue";
import CouponsDetail from "../../components/CouponsDetail";
import ChooseGoodsDiaog from "@/components/ChooseGoodsDiaog";
import ChooseStationDiaog from "@/components/ChooseStationDiaog";

export default {
  name: "Coupons",
  components: {
    TagPage,
    UpdateCoupon,
    CouponsDetail,
    ActivityRuleDiaog,
    ChooseGoodsDiaog,
    ChooseStationDiaog,
  },
  data() {
    return {
      CONST,
      formData,
      column,
      list: [],
      selectGoods: [],
      selectGoodsIds: [],
      selectStation: [],
      selectStationIds: [],
      page: {
        pageNum: 1,
        pageSize: 10,
      },
      query: {
        type: String(CONST.COUPONS_TYPE.FULL_MINUS),
        relationType: CONST.COUPONS_RELATION_TYPE.COLLECTION_ACTIVITY,
      },
      total: 0,
      editInfo: "",
      isDrawerPopup: false,
      showCouponsDetail: false,
      showUpdateCoupon: false,
      showGoodsDiaog: false,
      showStationDiaog: false,
      showActivityRuleDiaog: false,
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
      this.isDrawerPopup = false;
      this.showCouponsDetail = false;
      this.showUpdateCoupon = false;
      this.showGoodsDiaog = false;
      this.showActivityRuleDiaog = false;
      if (isRefresh) this.getList();
    },
    lookDetail({ id }) {
      this.editInfo = { id };
      this.isDrawerPopup = true;
      this.showCouponsDetail = true;
    },
    handleActivityRule() {
      this.showActivityRuleDiaog = true;
    },
    handleAdd() {
      this.editInfo = {};
      this.isDrawerPopup = true;
      this.showUpdateCoupon = true;
    },
    handleEdit({ id }) {
      this.editInfo = { id };
      this.isDrawerPopup = true;
      this.showUpdateCoupon = true;
    },
    async changeStatus({ id, name, status }) {
      const title =
        status === CONST.COUPONS_STATE.SHOW
          ? CONST.COUPONS_STATE_TEXT[CONST.COUPONS_STATE.HIDE]
          : CONST.COUPONS_STATE_TEXT[CONST.COUPONS_STATE.SHOW];
      try {
        await this.$confirm(
          `是否确认‘${title}${name}‘优惠劵的数据项？`,
          `${title}提示`,
          {
            type: "warning",
            showClose: false,
          }
        );
        const [, res] = await this.$http.Coupons[
          status === CONST.COUPONS_STATE.SHOW
            ? "DisabledCoupons"
            : "EnableCoupons"
        ]({
          id,
        });
        const msg = res ? res?.msg || `${title}成功` : `${title}失败`;
        this.$confirm(msg, `${title}提示`, {
          showClose: false,
          showCancelButton: false,
          type: res ? "success" : "error",
        }).then(() => {
          if (res) this.getList();
        });
      } catch (error) {
        console.error(error);
        error;
      }
    },
    async handleDelete({ id, name }) {
      try {
        await this.$confirm(`确定要删除‘${name}’优惠劵吗?`, "删除提示", {
          type: "warning",
          showClose: false,
        });
        const [, res] = await this.$http.Coupons.DeleteCoupons({
          id,
        });
        const msg = res ? res?.msg || `删除成功` : `删除失败`;
        this.$confirm(msg, "删除提示", {
          showClose: false,
          showCancelButton: false,
          type: res ? "success" : "error",
        }).then(() => {
          if (res) this.getList();
        });
      } catch (error) {
        error;
      }
    },
    chooseGoods(data) {
      this.showGoodsDiaog = true;
      this.selectGoodsIds = data?.length ? data : [];
    },
    chooseStation(data) {
      this.showStationDiaog = true;
      this.selectStationIds = data?.length ? data : [];
    },
    chooseGoodsSuccess(data) {
      this.selectGoods = data?.length ? data : [];
    },
    chooseStationSuccess(data) {
      this.selectStation = data?.length ? data : [];
    },
    chooseClose() {
      this.showGoodsDiaog = false;
      this.showStationDiaog = false;
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
