<template>
  <div class="ticketDetails" v-if="ticketInfoArr && ticketInfoArr.length">
    <div class="title">退票费总计</div>
    <div class="content">
      <div class="item" v-for="(item, index) in ticketInfoArr" :key="index">
        <span class="item-label mr-10">{{ item && item.label }}:</span>
        <span
          class="item-value mr-10"
          :class="{
            is: item && item.value,
            dazzling: item && item.isDazzling && item.value,
            info: item && item.isInfo && item.value,
          }"
          >{{ (item && item.value) || "-" }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TicketDetails",
  props: {
    ticketInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    ticketInfoArr({ ticketInfo }) {
      // console.log(ticketInfo);
      return [
        {
          label: "支付对应笔数",
          value: ticketInfo?.ticket_num,
        },
        {
          label: "总退款金额",
          value: "33.2",
          isDazzling: true, // 是否高亮
        },
        {
          label: "拦截金额",
          value: "0",
          isInfo: true,
        },
      ];
    },
  },
};
</script>
<style lang="scss" scoped>
.ticketDetails {
  background-color: #f7f8fa;
  margin-bottom: 20px;
  padding: 20px;
  .title {
    height: 20px;
    font-size: 14px;
    font-weight: 700;
    color: #282828;
    line-height: 20px;
  }
  .content {
    display: flex;
    flex-wrap: wrap;
    padding: 20px 20px 10px;
    .item {
      display: flex;
      align-items: center;
      margin-right: 20px;
      margin-bottom: 10px;
    }
    .item-label {
      color: $sub-font-color;
      font-size: 14px;
    }
    .item-value {
      padding: 5px 20px;
      border-radius: 40px;
      font-weight: bold;
    }
    .item-value.is {
      color: #fff;
      background: $--color-primary;
    }
    .item-value.dazzling {
      color: #fff;
      background: $--color-danger;
    }
    .item-value.info {
      color: #fff;
      background: $--color-info;
    }
  }
}
</style>
