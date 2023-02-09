<template>
  <div class="OrderSteps">
    <el-steps :active="activeIndex" :align-center="isAlignCenter">
      <el-step
        :title="item.label"
        :description="item.description || ''"
        v-for="(item, index) in stepList"
        :key="index"
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
    stepList({ steps, defaultStepList }) {
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
      return activeIndex;
    },
    defaultStepList({ orderType, stepsInfo }) {
      let sendTitle = "配送中";
      let confirmTitle = "确认收货";
      if (
        orderType === CONST.LOOK_ORDER_TYPE.SEND_ORDER ||
        orderType === CONST.LOOK_ORDER_TYPE.POINTS_ORDER
      ) {
        sendTitle = "配送中";
        confirmTitle = "确认收货";
      }
      if (orderType === CONST.LOOK_ORDER_TYPE.SELF_PICKUP_ORDER) {
        sendTitle = "已出货";
        confirmTitle = "确认核销";
      }
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
    .el-step__title,
    .el-step__description {
      font-size: 15px;
    }
  }
}
</style>
