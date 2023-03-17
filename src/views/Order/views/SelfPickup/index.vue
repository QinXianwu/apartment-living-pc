<template>
  <div class="SelfPickup">
    <OrderData ref="OrderData" :orderTypeData="{ isSelfPickupOrder: true }">
      <template #action-btn="{ scope }">
        <el-button
          type="text"
          v-if="scope.orderStatus === CONST.ORDER_STATE.TO_BE_SHIPPED"
          @click="handleConfirm(scope)"
          >确认出货</el-button
        >
        <el-button
          type="text"
          v-if="scope.orderStatus === CONST.ORDER_STATE.TO_BE_WRITTEN_OFF"
          @click="handleConfirm(scope)"
          >确认核销</el-button
        >
      </template>
    </OrderData>
  </div>
</template>

<script>
import CONST from "@/constants/index";
import OrderData from "../../components/OrderList";

export default {
  name: "SelfPickup",
  components: { OrderData },
  data() {
    return { CONST };
  },
  computed: {},
  methods: {
    async handleConfirm(data) {
      const title =
        data?.orderStatus === CONST.ORDER_STATE.TO_BE_SHIPPED
          ? "出货"
          : data?.orderStatus === CONST.ORDER_STATE.TO_BE_WRITTEN_OFF
          ? "核销"
          : "";
      try {
        await this.$confirm(`确认'${title}'该订单吗？`, `${title}提示`, {
          type: "warning",
          showClose: false,
        });
        const [, res] = await this.$http.Order.UpdateOrderByStatus({
          orderNo: data?.orderNo || "",
          orderStatus:
            data?.orderStatus === CONST.ORDER_STATE.TO_BE_SHIPPED
              ? CONST.ORDER_STATE.TO_BE_WRITTEN_OFF
              : data?.orderStatus === CONST.ORDER_STATE.TO_BE_WRITTEN_OFF
              ? CONST.ORDER_STATE.FINISH
              : "",
        });
        const msg = res ? res?.msg || `${title}成功` : `${title}失败`;
        this.$confirm(msg, `${title}提示`, {
          showClose: false,
          showCancelButton: false,
          type: res ? "success" : "error",
        }).then(() => {
          if (res) {
            this.$refs.OrderData.getList();
          }
        });
      } catch (error) {
        console.error(error);
        error;
      }
    },
  },
  mounted() {
    //
  },
};
</script>
<style lang="scss" scoped></style>
