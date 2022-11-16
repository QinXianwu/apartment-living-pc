<template>
  <div class="main">
    <div class="main-title">
      <span>订单查询</span>
    </div>
    <div class="content" v-loading="isLoading">
      <div class="ticketing-list">
        <div
          class="ticketing-item"
          v-for="(ticketing, key) in ticketList"
          :key="key"
        >
          <div class="item-title">
            <div class="eorderNumber">
              <span>
                {{ $CONST.TICKET_TYPE_TEXT[ticketing.ticketType] }}
              </span>
              <span> ：{{ ticketing.eOrderNumber || "-" }} </span>
            </div>
            <div class="eorderNumber-update">
              <span class="mr-10">{{ eorderCode }}</span>
              <el-input
                v-model="eorderNumber"
                class="mr-10"
                placeholder="请输入取票号"
              />
              <el-button type="primary" @click="UpdateEorderNumber(ticketing)"
                >修改取票号</el-button
              >
            </div>
          </div>
          <div class="ticketing-item-content">
            <!-- 车次信息 -->
            <HeadView :info="ticketing" />
            <!-- 乘客信息 -->
            <PassengerInfo
              :passengerList="ticketing.orderPassengerHandleList"
            />
          </div>
        </div>
      </div>
      <FooterView :payTradeNumber="orderDetail.payTradeNumber" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import HeadView from "./Head.vue";
import PassengerInfo from "./PassengerInfo.vue";
import FooterView from "./Footer.vue";
export default {
  name: "ExpandTicketDetails",
  components: { HeadView, PassengerInfo, FooterView },
  props: {
    ticketingId: {
      type: [String, Number],
      default: "",
    },
  },
  data() {
    return {
      isLoading: false,
      eorderNumber: "",
      orderDetail: {},
      ticketList: [],
    };
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo,
    }),
    eorderCode({ userInfo }) {
      return userInfo?.eOrderNumberPrefix || "";
    },
  },
  methods: {
    // 修改取票号
    async UpdateEorderNumber({ orderHandleId }) {
      if (this.isLoading) return;
      if (!this.eorderNumber) return this.$message.error("请输入取票号后再试");
      this.isLoading = true;
      const [, res] = await this.$http.OrderQuery.UpdateTicketingEorderNumber({
        id: orderHandleId,
        enumber: this.eorderCode + this.eorderNumber,
      });
      this.isLoading = false;
      this.$message[res ? "success" : "error"](`修改${res ? "成功" : "失败"}`);
      if (res) {
        this.eorderNumber = "";
        this.getTicketDetail();
      }
    },
    async getTicketDetail() {
      if (this.isLoading) return;
      this.isLoading = true;
      const [, res] = await this.$http.OrderQuery.GetTicketingDetail({
        id: this.ticketingId || "",
      });
      this.isLoading = false;
      this.orderDetail = res || {};
      this.ticketList = res?.orderTicketHandleVo || [];
      console.log(res);
    },
  },
  mounted() {
    this.getTicketDetail();
  },
};
</script>
<style lang="scss" scoped>
.main {
  background-color: #f7f8fa;
  padding: 10px;

  &-title {
    display: flex;
    font-size: 13px;
    font-weight: 600;
    color: $main-font-color;
    line-height: 20px;
    padding: 0 0 5px;
  }
  .content {
    padding: 10px;
    background-color: #fff;
    .item-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 32px;
      font-size: 18px;
      font-weight: 400;
      color: $main-font-color;
      line-height: 32px;
    }
    .eorderNumber-update {
      display: flex;
      align-items: center;
    }
  }
  .ticketing-list {
    display: flex;
    flex-wrap: wrap;
  }
  .ticketing-item {
    padding: 20px;
    margin: 0 12px 12px;
    background-color: #f7f8fa;
  }
  .ticketing-item-content {
    margin: 5px 0 0;
  }
}
</style>
