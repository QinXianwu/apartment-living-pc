<template>
  <div class="head">
    <!-- <div class="head-title"></div> -->
    <div class="head-content">
      <div class="item">
        <span class="item-label mr-10">是否开启接单:</span>
        <ElSwitch
          v-model="isReceiveOrders"
          @change="onOpenReceiveOrders"
          active-icon-class="el-icon-success"
          inactive-icon-class="el-icon-error"
        />
        <ElPopover width="380" trigger="hover" placement="right-start">
          <i class="el-icon-question ml-10" slot="reference"></i>
          <div class="receiveOrders-tip">
            <p>出票订单均由系统分配，账户必须开启开关才可能接到订单。</p>
            <p>停止出票后请关闭开关，否则会影响该账户进单量。</p>
            <p>若长时间未处理订单，系统会自动关闭接单。</p>
          </div>
        </ElPopover>
      </div>
      <div class="item">
        <span class="item-label mr-10">是否开启声音:</span>
        <ElSwitch
          ref="openSound"
          :value="isAudio"
          @change="onOpenSound"
          active-icon-class="el-icon-message-solid"
          inactive-icon-class="el-icon-close-notification"
        />
        <ElPopover width="200" trigger="hover" placement="right-start">
          <i class="el-icon-question ml-10" slot="reference"></i>
          <div class="receiveOrders-tip">
            <p>点击将关闭所有代售点声音</p>
          </div>
        </ElPopover>
      </div>
      <div class="item">
        <span class="item-label mr-10"
          >请选择“匹配流水号”功能对应的支付宝账号:</span
        >
        <ElSelect
          clearable
          v-model="account"
          placeholder="请选择支付宝账号"
          @change="onSelectAlipayAccount"
        >
          <ElOption
            v-for="item in alipayAccountOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </ElOption>
        </ElSelect>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  name: "HeadContent",
  props: {
    alipayAccount: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      account: "",
      isReceiveOrders: false, // 是否开启接受订单
    };
  },
  computed: {
    ...mapState({
      pointSaleList: (state) => state.agent.pointSaleList,
      isAudio: (state) => state.app.isAudio, // 是否开启声音
    }),
    ...mapGetters({
      alipayAccountOptions: "agent/alipayAccountOptions",
    }),
    agentCode() {
      return this.$router.currentRoute.meta.agentCode;
    },
  },
  watch: {
    alipayAccountOptions(val) {
      if (val?.length && !this.account) {
        this.account = val[0].value;
        this.$emit("update:alipayAccount", this.account || "");
      }
    },
  },
  methods: {
    async onOpenReceiveOrders(val) {
      const [, res] = await this.$http.Order.UpdateTicketingSwitch({
        agentCode: this.agentCode,
        bodyInfo: {
          action: val ? "on" : "off",
        },
      });
      if (Number(res?.code) !== this.AJAX_CODE.SUCCESS) {
        this.isReceiveOrders = !val;
        this.$message.error(`${val ? "开启" : "关闭"}接单失败`);
        return;
      }
      // 修改成功需同步vuex中的pointSaleList
      const tempList = [...this.pointSaleList];
      const item = tempList.find((item) => item.code === this.agentCode);
      item.openOrderReceiving = val;
      this.isReceiveOrders = val;
      this.$store.commit("agent/SET_POINT_SALE_LIST", tempList);
      this.$message.success(`${val ? "开启" : "关闭"}接单成功`);
    },
    onOpenSound(val) {
      this.$store.commit("app/SET_IS_AUDIO", val);
    },
    onSelectAlipayAccount(val) {
      const item = this.alipayAccountOptions.find((item) => item.value === val);
      this.$emit("update:alipayAccount", item?.label || "");
    },
  },
  mounted() {
    // this.$refs.openSound.$el.click();

    const tempList = [...this.pointSaleList];
    const item = tempList.find((item) => item.code === this.agentCode);
    this.isReceiveOrders = item.openOrderReceiving;
  },
};
</script>
<style lang="scss" scoped>
.head {
  background-color: #f7f8fa;
  margin-bottom: 20px;
  padding: 20px;
  &-title {
    height: 20px;
    font-size: 14px;
    font-weight: 700;
    color: #282828;
    line-height: 20px;
  }
  &-content {
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
  }
}
.receiveOrders-tip {
  color: $--color-warning;
}
</style>
