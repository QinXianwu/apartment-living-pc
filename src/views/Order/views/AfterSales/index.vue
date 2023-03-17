<template>
  <div class="AfterSales">
    <OrderData ref="OrderData" :orderTypeData="{ isAfterSale: true }">
      <template #action-btn="{ scope }">
        <el-button
          type="text"
          v-if="scope.operStatus === CONST.A_S_ORDER_STATE.WAIT_AUDITED"
          @click="
            handleReview({
              orderNo: scope.orderNo,
              approveStatus: CONST.ORDER_AUDIT_STATE.SUCCESS_CHECK,
            })
          "
          >通过</el-button
        >
        <el-button
          type="text"
          @click="
            handleReviewFail({
              orderNo: scope.orderNo,
              approveStatus: CONST.ORDER_AUDIT_STATE.FAIL_CHECK,
            })
          "
          v-if="scope.operStatus === CONST.A_S_ORDER_STATE.WAIT_AUDITED"
          >驳回</el-button
        >
        <el-button
          type="text"
          v-if="scope.operStatus === CONST.A_S_ORDER_STATE.WAIT_DELIVERY"
          @click="handleConfirm(scope)"
          >确认收货</el-button
        >
        <el-button
          type="text"
          v-if="scope.operStatus === CONST.A_S_ORDER_STATE.WAIT_REFUNDED"
          @click="handleConfirm(scope)"
          >退款</el-button
        >
      </template>
    </OrderData>
    <AuditFailDialog
      :editInfo="editInfo"
      :show.sync="showAuditFail"
      @close="close"
    />
  </div>
</template>

<script>
import CONST from "@/constants/index";
import OrderData from "../../components/OrderList";
import AuditFailDialog from "./components/AuditFailDialog.vue";

export default {
  name: "AfterSales",
  components: { OrderData, AuditFailDialog },
  data() {
    return {
      CONST,
      editInfo: "",
      showAuditFail: false,
    };
  },
  computed: {},
  methods: {
    handleReviewFail({ orderNo, approveStatus }) {
      this.editInfo = { orderNo, approveStatus };
      this.showAuditFail = true;
    },
    async handleReview({ orderNo, approveStatus }) {
      const title =
        approveStatus === CONST.ORDER_AUDIT_STATE.SUCCESS_CHECK
          ? "通过"
          : "驳回";
      try {
        await this.$confirm(`是否确认'${title}'该售后申请？`, `审核提示`, {
          type: "warning",
          showClose: false,
        });
        const [, res] = await this.$http.Order.ReviewAfterSalesOrder({
          orderNo: orderNo,
          approveStatus: approveStatus,
          reason: "",
        });
        const msg = res ? res?.msg || `审核成功` : `审核失败`;
        this.$confirm(msg, `审核提示`, {
          showClose: false,
          showCancelButton: false,
          type: res ? "success" : "error",
        }).then(() => {
          if (res) {
            this.getList();
          }
        });
      } catch (error) {
        console.error(error);
        error;
      }
    },
    async handleConfirm({ orderNo, operStatus }) {
      const title =
        operStatus === CONST.A_S_ORDER_STATE.WAIT_DELIVERY
          ? "是否确认该售后已收货？"
          : operStatus === CONST.A_S_ORDER_STATE.WAIT_REFUNDED
          ? "是否确认该售后进行退款？"
          : "";
      try {
        await this.$confirm(title, `确认提示`, {
          type: "warning",
          showClose: false,
        });
        const [, res] = await this.$http.Order[
          operStatus === CONST.A_S_ORDER_STATE.WAIT_DELIVERY
            ? "confirmAfterSalesOrderReceipt"
            : operStatus === CONST.A_S_ORDER_STATE.WAIT_REFUNDED
            ? "confirmAfterSalesOrderRefund"
            : ""
        ]({
          orderNo: orderNo,
        });
        const msg = res ? res?.msg || `确认成功` : `确认失败`;
        this.$confirm(msg, `确认提示`, {
          showClose: false,
          showCancelButton: false,
          type: res ? "success" : "error",
        }).then(() => {
          if (res) {
            this.getList();
          }
        });
      } catch (error) {
        console.error(error);
        error;
      }
    },
    close(isRefresh = false) {
      this.editInfo = "";
      this.showAuditFail = false;
      if (isRefresh) this.getList();
    },
    getList() {
      this.$refs.OrderData.getList();
    },
  },
  mounted() {
    //
  },
};
</script>
<style lang="scss" scoped></style>
