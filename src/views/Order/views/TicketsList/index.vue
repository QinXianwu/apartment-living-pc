<template>
  <div class="view-container">
    <div class="content">
      <HeadContent :alipayAccount.sync="alipayAccount" />
      <TicketDetails :ticketInfo="ticketInfo" />

      <div class="ticketing">
        <div class="title">
          <span class="mr-10">出票明细</span>
          <span class="tip"
            >[允许出票证件包括：港内、台内、外留、二代、护照]</span
          >
        </div>
        <TablePanel :tableData="list" :tableHead="column" expand isExpandAll>
          <!-- 发车时间 -->
          <template #departure_time="{ scope }">
            <p v-for="(item, index) in scope.ticketList || [{}]" :key="index">
              <span>{{ item["departTime"] || "-" }}</span>
            </p>
          </template>
          <!-- 车次 -->
          <template #trips_number="{ scope }">
            <p v-for="(item, index) in scope.ticketList || [{}]" :key="index">
              <span>{{ item["trainNumber"] || "-" }}</span>
            </p>
          </template>
          <!-- 发/到站 -->
          <template #start_end_station="{ scope }">
            <p v-for="(item, index) in scope.ticketList || [{}]" :key="index">
              <span> {{ item["fromStationName"] || "-" }} </span>
              <span>{{ " - " }}</span>
              <span> {{ item["toStationName"] || "-" }} </span>
            </p>
          </template>
          <!-- 订单标记 -->
          <template #order_mark="{ scope }">
            {{ $CONST.ORDER_FLAG_TEXT[scope.orderFlag] || "无" }}
          </template>
          <!-- 处理时间倒计时 -->
          <template #process_countdown="{ scope }">
            <TimeDown
              :reminderTime="120"
              :targerTime="scope.expireTime"
              @on-reminder="onReminder"
              @on-change="onCountdownOver(scope)"
            />
          </template>
          <!-- 展开行-出票详情 -->
          <template #expand="{ scope }">
            <IssueTicketingDetails
              :orderInfo="scope"
              :alipayAccount="alipayAccount"
              :ticketingList="scope.ticketList"
              v-if="scope.ticketList && scope.ticketList.length"
              @success="
                (val) => {
                  getStatistics();
                  onCountdownOver(val);
                }
              "
            />
            <div class="nothing-ticketing" v-else>暂无数据</div>
          </template>
          <!-- 操作 -->
          <template #action="{}">
            <div class="action-groud">
              <!-- <el-button type="text" @click="sendMessage"> 发送通知 </el-button> -->
            </div>
          </template>
        </TablePanel>
      </div>

      <!-- 分页 -->
      <!-- <Pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-size="page.size"
        :current-page="page.current"
        :pageSizes="[10, 20, 50, 100]"
        :total="total"
      /> -->
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { column } from "./config";
import neworder from "assets/media/neworder.wav";
import timeout from "assets/media/timeout.wav";
import TimeDown from "@/components/TimeDown/index";
import HeadContent from "./components/HeadContent.vue";
import TicketDetails from "./components/TicketDetails.vue";
import IssueTicketingDetails from "./components/IssueTicketingDetails/index";
export default {
  name: "TicketsList",
  components: { HeadContent, TicketDetails, TimeDown, IssueTicketingDetails },
  data() {
    return {
      neworderAudio: new Audio(neworder), // 新订单提示
      timeoutAudio: new Audio(timeout), // 即将超时提示
      column, //表格头
      list: [],
      page: {
        current: 1,
        size: 1,
      },
      query: {
        agentCode: this.$router.currentRoute.meta.agentCode,
      },
      total: 0,
      ticketInfo: {},
      alipayAccount: "", // 支付宝账号
      timeId: "",
    };
  },
  computed: {
    ...mapState({
      token: (state) => state.authorization.state,
      isAudio: (state) => state.app.isAudio, // 是否开启声音
      userInfo: (state) => state.user.userInfo,
      pointSaleList: (state) => state.agent.pointSaleList,
      pointSaleAction: (state) => state.agent.pointSaleAction,
    }),
    receiveOrderLimit({ userInfo }) {
      return userInfo?.receiveOrderLimit || 1;
    },
  },
  methods: {
    handleSizeChange(val) {
      this.page.size = val;
      this.page.current = 1;
      this.getList(true);
    },
    handleCurrentChange(val) {
      this.page.current = val;
      this.getList(false);
    },
    sendMessage() {
      console.log("sendMessage");
    },
    // 即将超时处理提示
    onReminder() {
      // this.$message.error("你有一个订单即将超时，请及时处理");
      this.$notify({
        title: "订单即将超时",
        message: "你有一个订单即将超时，请及时处理",
        type: "error",
        offset: 50,
      });
      if (this.isAudio) this.timeoutAudio.play();
    },
    // 过期删除
    onCountdownOver(val) {
      this.$nextTick(() => {
        setTimeout(() => {
          const index = this.list.findIndex((item) => item.id === val?.id);
          if (index >= 0) this.list.splice(index, 1);
        }, 200);
      });
    },
    async getList(isClear) {
      if (isClear) this.page.current = 1;
      const query = {
        ...this.page,
        size: this.receiveOrderLimit,
        paramData: { ...this.query },
      };
      const [, res] = await this.$http.Order.GetOrderWaitList(query);
      const idsStr = this.list.map((item) => item.id).join(",");
      const tempList = res?.list?.length ? res?.list : [];
      const joinList = tempList.filter((item) => !idsStr.includes(item.id));
      const tempArr = [].concat(this.list, joinList);
      if (tempArr?.length > this.list?.length) {
        // this.$message.success("你有一个新订单，请及时处理");
        this.$notify({
          title: "新订单",
          message: "你有一个新订单，请及时处理",
          type: "success",
          offset: 50,
        });
        if (this.isAudio) this.neworderAudio.play();
      }
      this.list = [...tempArr];
      this.total = res?.total || 0;
      this.$nextTick(() => {
        this.timeId = setTimeout(() => {
          if (this.token) this.getList(true);
          else if (this.timeId) clearInterval(this.timeId);
        }, 5000);
      });
    },
    // 获取代售点数据
    async getStatistics() {
      const [, res] = await this.$http.Order.GetOrderStatistics({
        agentCode: this.$router.currentRoute.meta.agentCode,
      });
      this.ticketInfo = res ? res : {};
    },
  },
  mounted() {
    this.getList();
    this.getStatistics();
    // 更新新订单通知code列表
    const tempArr = this.pointSaleAction.filter(
      (item) => item.code !== this.query.agentCode
    );
    this.$store.commit("agent/SET_POINT_SALE_ACTION", tempArr || []);
    // 获取支付宝账号列表
    this.$store.dispatch("agent/GetAlipayAccountListAction");
  },
  beforeDestroy() {
    // 清除定时器
    if (this.timeId) clearInterval(this.timeId);
    // 更新新订单通知code列表
    const pointItem = this.pointSaleList.find(
      (item) => item.code === this.query.agentCode
    );
    this.$store.commit(
      "agent/SET_POINT_SALE_ACTION",
      [...this.pointSaleAction, pointItem] || []
    );
  },
};
</script>
<style lang="scss" scoped>
.view-container {
  background-color: #fff;
}
.ticketing {
  margin: 20px 0 0;
  .title {
    height: 20px;
    margin: 20px;
    font-size: 14px;
    font-weight: 700;
    color: #282828;
    line-height: 20px;
    .tip {
      color: $--color-success;
    }
  }
  .nothing-ticketing {
    padding: 10px 0;
    text-align: center;
    color: $tip-font-color;
  }
}
</style>
