<template>
  <div class="OrderSteps" v-if="stepList.length">
    <el-steps
      :active="activeIndex"
      status="success"
      :align-center="isAlignCenter"
    >
      <el-step
        :title="item.label"
        :description="item.description || ''"
        v-for="(item, index) in stepList"
        :key="index"
        :status="item.label === '审核驳回' ? 'error' : ''"
      >
        <template #icon>
          <div
            class="steps-icon"
            :class="`${activeIndex >= index ? 'icon-succeed' : ''}`"
          />
        </template>
      </el-step>
    </el-steps>
  </div>
</template>

<script>
import CONST from "@/constants/index";

export default {
  name: "OrderSteps",
  props: {
    isAlignCenter: Boolean,
    steps: {
      type: Array,
      default: () => [],
    },
    orderInfo: {
      type: Object,
      default: () => ({}),
    },
    stepsInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {},
  data() {
    return { CONST };
  },
  computed: {
    orderType() {
      return this.$router.currentRoute.query?.orderType || "";
    },
    isAfterSales({ orderType }) {
      return orderType === CONST.ORDER_SOURCE.AFTER_SALE_ORDER;
    },
    stepList({ steps, isAfterSales, defaultStepList, afterSalesStepList }) {
      if (isAfterSales) return afterSalesStepList;
      return steps?.length ? steps : defaultStepList;
    },
    activeIndex({ stepList }) {
      let activeIndex = 0;
      try {
        stepList.forEach((item, index) => {
          if (!item?.description) {
            activeIndex = index - 1;
            throw new Error();
          }
        });
      } catch (error) {
        return activeIndex;
      }
      return activeIndex === 0 ? stepList.length : activeIndex;
    },
    defaultStepList({ orderType, stepsInfo }) {
      const sendTitle =
        orderType === CONST.ORDER_SOURCE.SELF_PICKUP_ORDER
          ? "已出货"
          : "配送中";
      const confirmTitle =
        orderType === CONST.ORDER_SOURCE.SELF_PICKUP_ORDER
          ? "确认核销"
          : "确认收货";
      return [
        {
          label: "已下单",
          description: stepsInfo?.submitDate,
        },
        {
          label: "已付款",
          description: stepsInfo?.payDate,
        },
        {
          label: sendTitle,
          description: stepsInfo?.sendDate,
        },
        {
          label: confirmTitle,
          description: stepsInfo?.confirmReceipt,
        },
        {
          label: "已完成",
          description: stepsInfo?.completeDate,
        },
      ];
    },
    afterSalesStepList({ stepsInfo, orderInfo }) {
      if (orderInfo?.operStatus === CONST.A_S_ORDER_STATE.AUDIT_FAIL)
        return [
          {
            label: "提交申请",
            description: stepsInfo?.applyDate,
          },
          {
            label: "审核驳回",
            description: stepsInfo?.completeDate,
          },
          {
            label: "已完成",
            description: stepsInfo?.completeDate,
          },
        ];
      const tempList = [
        {
          label: "提交申请",
          description: stepsInfo?.applyDate,
        },
        {
          label: "审核通过",
          description: stepsInfo?.passDate,
        },
        {
          label: "确认收货",
          description: stepsInfo?.receiptTime,
        },
        {
          label: "退款",
          description: stepsInfo?.refundDate,
        },
        {
          label: "已完成",
          description: stepsInfo?.completeDate,
        },
      ];
      const keyStr = `${
        orderInfo?.type === CONST.A_S_RETURNS_TYPE.RETURN_M ? "确认收货" : ""
      }`;
      return tempList.filter((item) => !keyStr.includes(item.label));
    },
  },
  methods: {},
  mounted() {
    //
  },
};
</script>
<style lang="scss" scoped>
.OrderSteps {
  padding: 40px 0 20px;
  .steps-icon {
    &.icon-succeed {
      margin: 0 0 0 0;
      &::before {
        content: "\2714";
      }
    }
  }
  ::v-deep {
    .el-step__title {
      font-size: 14px;
    }
    .is-process {
      font-weight: 500;
    }
    .el-step__description {
      font-size: 12px;
    }
  }
}
</style>
