<template>
  <div class="GoodsList view-container">
    <div class="content">
      <SearchForm
        isReturnFormData
        :formData="searchForm"
        @on-search="onSearch"
      />
      <!-- <div class="action"></div> -->
      <TagPage :state.sync="query.operStatus" @getList="getList" />
      <TablePanel ref="TablePanel" :tableData="list" :tableHead="column">
        <!--
        :checkbox="true"
        :isShowTopCheck="false"
        @selection-change="handleSelectionChange
        -->
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
        <template #serveInfo="{ scope }">
          <el-tooltip class="item" effect="dark" placement="right">
            <div slot="content">
              <div class="name">名称:{{ scope.serviceName || "-" }}</div>
              <div class="address">地址:{{ scope.serviceAddress || "-" }}</div>
            </div>
            <div class="serveInfo">
              <div class="name">名称:{{ scope.serviceName || "-" }}</div>
              <div class="address">地址:{{ scope.serviceAddress || "-" }}</div>
            </div>
          </el-tooltip>
        </template>
        <!-- 状态 -->
        <template #operStatus="{ scope }">
          <el-tag :type="scope | statusTabType">{{
            CONST.ORDER_PURCHASE_STATE_TEXT[scope.operStatus]
          }}</el-tag>
        </template>
        <!-- 操作 -->
        <template #action="{ scope }">
          <div class="action-groud">
            <el-button type="text" @click="lookDetail(scope)">查看</el-button>
            <el-button
              type="text"
              @click="sendGoods(scope)"
              v-if="
                !isService &&
                scope.operStatus === CONST.ORDER_PURCHASE_STATE.WAIT_SEND
              "
              >配送</el-button
            >
            <el-button
              type="text"
              @click="storageOrder(scope)"
              v-if="
                isService &&
                scope.operStatus === CONST.ORDER_PURCHASE_STATE.WAIT_DELIVERY
              "
              >入库</el-button
            >
            <el-button
              type="text"
              @click="closeOredr(scope)"
              v-if="scope.operStatus === CONST.ORDER_PURCHASE_STATE.WAIT_SEND"
              >关闭订单</el-button
            >
            <el-popover
              placement="bottom-start"
              trigger="manual"
              v-model="showRemarkInputMap[scope.id]"
            >
              <el-button
                class="remark-btn"
                type="text"
                slot="reference"
                @click="
                  showRemarkInputMap = {};
                  showRemarkInputMap[scope.id] = !showRemarkInputMap[scope.id];
                "
                >备注</el-button
              >
              <div class="addVal-input">
                <el-input
                  type="text"
                  placeholder="请输入备注"
                  class="input-small mr-10 mt-10"
                  v-model="remarkInputMap[scope.id]"
                />
                <el-button
                  type="primary"
                  class="mt-10"
                  @click="handleRemark(scope)"
                  v-loading="isLoadingSetRemark"
                  >保存</el-button
                >
                <el-button
                  type="primary"
                  class="mt-10"
                  @click="showRemarkInputMap = {}"
                  >取消</el-button
                >
              </div>
            </el-popover>
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
    <DrawerPopup v-model="showDrawerPopup">
      <ProcurementDetail
        v-if="showProcurementDetail"
        :editInfo="editInfo"
        @close="close"
      />
      <StorageProcurement
        v-if="showProcurementGoods"
        :editInfo="editInfo"
        @close="close"
      />
    </DrawerPopup>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CONST from "@/constants/index";
import { digits2Str } from "@/utils/index";
import { formData, column } from "./config";
import TagPage from "./components/TagPage.vue";
import StorageProcurement from "./components/StorageProcurement.vue";
import ProcurementDetail from "./components/ProcurementDetail/index.vue";

export default {
  name: "GoodsList",
  components: { TagPage, ProcurementDetail, StorageProcurement },
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
        operStatus: "",
      },
      total: 0,
      editInfo: "",
      selectDataMap: {},
      remarkInputMap: {},
      showRemarkInputMap: {},
      showDrawerPopup: false,
      showProcurementDetail: false,
      showProcurementGoods: false,
      isLoadingSetRemark: false,
    };
  },
  computed: {
    ...mapGetters({
      isService: "user/isService",
      supplierOptions: "accountRoleManage/supplierOptions",
      serviceStationOptions: "accountRoleManage/serviceStationOptions",
    }),
    searchForm({ supplierOptions, serviceStationOptions }) {
      const supplierItem = formData.find((item) => item.prop === "supplierId");
      if (supplierItem) supplierItem.options = supplierOptions;
      const serviceItem = formData.find((item) => item.prop === "serviceId");
      if (serviceItem) serviceItem.options = serviceStationOptions;
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
    async sendGoods({ pdOrderNo }) {
      try {
        await this.$confirm(
          `是否确认配送订单号为${pdOrderNo}的数据项？`,
          "配送订单提示",
          {
            type: "warning",
            showClose: false,
          }
        );
        const [, res] = await this.$http.Order.SupplierSendPurchaseOrder({
          pdOrderNo,
        });
        const msg = res ? res?.msg || `配送订单成功` : `配送订单失败`;
        this.$confirm(msg, "配送订单提示", {
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
    storageOrder({ pdOrderNo }) {
      this.editInfo = { pdOrderNo };
      this.showDrawerPopup = true;
      this.showProcurementGoods = true;
    },
    async closeOredr({ pdOrderNo }) {
      try {
        await this.$confirm(
          `是否确认关闭订单号为${pdOrderNo}的数据项？`,
          "关闭订单提示",
          {
            type: "warning",
            showClose: false,
          }
        );
        const [, res] = await this.$http.Order.ClosePurchaseOrder({
          pdOrderNo,
        });
        const msg = res ? res?.msg || `关闭订单成功` : `关闭订单失败`;
        this.$confirm(msg, "关闭订单提示", {
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
    lookDetail({ pdOrderNo }) {
      this.editInfo = { pdOrderNo };
      this.showDrawerPopup = true;
      this.showProcurementDetail = true;
    },
    async handleRemark({ id, pdOrderNo }) {
      if (!this.remarkInputMap[id])
        return this.$message.error("请输入备注后再试");
      if (this.isLoadingSetRemark) return;
      this.isLoadingSetRemark = true;
      const [, res] = await this.$http.Order.AddPurchaseOrderRemark({
        pdOrderNo,
        remark: this.remarkInputMap[id],
      });
      this.isLoadingSetRemark = false;
      this.$message[res ? "success" : "error"](
        res?.msg || `保存${res ? "成功" : "失败"}`
      );
      if (res) {
        this.showRemarkInputMap = {};
        this.getList();
      }
    },
    close(isRefresh = false) {
      this.editInfo = "";
      this.showDrawerPopup = false;
      this.showProcurementGoods = false;
      if (isRefresh) this.getList();
    },
    async getList(isClear) {
      if (isClear) this.page.pageNum = 1;
      const query = {
        ...this.page,
        ...this.query,
      };
      const [, res] = await this.$http.Order.GetPurchaseList(query);
      if (res?.code !== this.AJAX_CODE.SUCCESS) {
        this.$message.error(res?.msg || "获取采购订单列表异常");
      }
      const data = res?.rows?.length ? res.rows : [];
      this.remarkInputMap = {};
      this.showRemarkInputMap = {};
      data.forEach((item) => {
        digits2Str(item, ["id", "serviceId"]);
        this.$set(this.remarkInputMap, item.id, item?.remark || "");
      });
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
    statusTabType({ operStatus }) {
      if (operStatus === CONST.ORDER_PURCHASE_STATE.WAIT_SEND) return "warning";
      else if (operStatus === CONST.ORDER_PURCHASE_STATE.WAIT_DELIVERY)
        return "";
      else if (operStatus === CONST.ORDER_PURCHASE_STATE.FINISH)
        return "success";
      else if (operStatus === CONST.ORDER_PURCHASE_STATE.CANCEL)
        return "danger";
      return "";
    },
  },
  mounted() {
    this.getList();
    this.$store.dispatch("accountRoleManage/GetServiceStationListAction");
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
// .remark-btn {
//   &:after {
//     content: "|";
//     color: $--color-primary;
//     margin: 0 5px;
//   }
// }
.activityTab {
  text-align: left;
}
.serveInfo {
  text-align: left;
  .name {
    @include overflow-eps(2);
  }
  .address {
    @include overflow-eps(2);
  }
}
.action {
  padding: 0 0 15px;
}
</style>
