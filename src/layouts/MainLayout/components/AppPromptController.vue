<template>
  <!-- 全局提示控制器 -->
  <div class="AppPromptController">
    <!--  -->
  </div>
</template>

<script>
import { mapState } from "vuex";
import neworder from "assets/media/neworder.wav";

export default {
  name: "AppPromptController",
  components: {},
  data() {
    return {
      timeoutId: "",
      neworderAudio: new Audio(neworder), // // 新订单提示
    };
  },
  computed: {
    ...mapState({
      token: (state) => state.authorization.state,
      isAudio: (state) => state.app.isAudio, // 是否开启声音
      userInfo: (state) => state.user.userInfo,
      pointSaleAction: (state) => state.agent.pointSaleAction,
    }),
    receiveOrderLimit({ userInfo }) {
      return userInfo?.receiveOrderLimit || 1;
    },
    audioSrc() {
      return neworder;
    },
    pointSaleInit({ pointSaleAction }) {
      if (!pointSaleAction?.length) return [];
      return pointSaleAction.map((item) => ({
        code: item.code,
        lastId: 0,
      }));
    },
  },
  methods: {
    // 处理新订单提示
    async handleNewOrderTip(query) {
      const [, res] = await this.$http.Order.GetNewOrderCount({
        current: 1,
        size: this.receiveOrderLimit,
        paramData: {
          orderParamList: [...query],
        },
      });
      const tempArr = [...this.pointSaleInit];
      if (res?.length) {
        tempArr.forEach((item) => {
          const ele = res.find((e) => e.code === item.code);
          if (ele) item.lastId = ele.lastId;
        });
      }
      const newItem = tempArr.find((item) => Number(item.count) >= 1);
      if (newItem && this.isAudio) {
        this.$message.success("你有一个新订单，请及时处理");
        this.neworderAudio.play();
      }
      this.$nextTick(() => {
        this.timeoutId = setTimeout(() => {
          if (this.token) this.handleNewOrderTip(tempArr);
          else if (this.timeoutId) clearInterval(this.timeoutId);
        }, 5000);
      });
    },
  },
  mounted() {
    this.handleNewOrderTip(this.pointSaleInit);
  },
};
</script>
<style lang="scss" scoped></style>
