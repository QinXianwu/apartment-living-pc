<template>
  <div class="main">
    <div class="main-title">
      <span>出票明细</span>
    </div>
    <div class="content">
      <div
        class="ticketing-item"
        v-for="(ticketing, key) in ticketingList"
        :key="key"
      >
        <span class="item-title">
          {{ $CONST.TICKET_TYPE_TEXT[ticketing.ticketType] }}
        </span>
        <div class="ticketing-item-content">
          <!-- 出票头部信息 -->
          <HeadView :info="ticketing" />
          <div class="content-info">
            <div class="remark">
              <span>可接受席位：{{ ticketing.acceptSeatRemark || "空" }}</span>
            </div>
            <div
              class="info"
              :key="index"
              v-for="(item, index) in ticketing.passengerList"
            >
              <div class="credential-type">
                <span
                  >{{ index + 1 }}.{{
                    $CONST.PASSPORT_TYPE_TEXT[item.passportType]
                  }}</span
                >
              </div>
              <PassengerInfo
                :key="index"
                :ticketInfo="ticketing"
                :passengerInfo="item"
                :ref="`PassengerInfo-${item.id}`"
                :seatTypeOptions="getSeatTypeOptions(ticketing.acceptSeatName)"
              />
            </div>
          </div>
        </div>
      </div>
      <FooterView
        :amount="getTicketTotalAmount()"
        :alipayAccount="alipayAccount"
        :eorderNumber.sync="eorderNumber"
        :payTradeInfo.sync="payTradeInfo"
        :mobilePhone="orderInfo.contactMobile"
        :partnerOrderId="orderInfo.partnerOrderId"
        @onSubmit="onSubmit"
      />
    </div>
    <SelectNoTicketType
      :show.sync="showSelectNoTicketType"
      :noTicketResult.sync="noTicketResult"
      @on-success="ticketingAction"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import CONST from "@/constants/index";
import filters from "@/filters/index";
import HeadView from "./Head.vue";
import FooterView from "./Footer.vue";
import PassengerInfo from "./PassengerInfo.vue";
import SelectNoTicketType from "./SelectNoTicketType.vue";
export default {
  name: "IssueTicketingDetails",
  components: { HeadView, PassengerInfo, FooterView, SelectNoTicketType },
  props: {
    alipayAccount: {
      type: String,
      default: "",
    },
    orderInfo: {
      type: Object,
      default: () => ({}),
    },
    ticketingList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      eorderNumber: "", // 电子订单号
      payTradeInfo: {}, // 支付流水号信息
      formPassengerMap: {}, // 乘客表单map
      noTicketResult: {}, // 无票原因
      validationMethodsList: [], // 校验方法列表
      showSelectNoTicketType: false, // 显示选择无票类型
    };
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo,
    }),
    eorderCode({ userInfo }) {
      return userInfo?.eOrderNumberPrefix || "";
    },
    // 订单表单数据
    formOrderData({ orderInfo, payTradeInfo, eorderCode, eorderNumber }) {
      return {
        id: orderInfo.id,
        agentCode: orderInfo.agentCode,
        agentName: orderInfo.agentName,
        contactMobile: orderInfo.contactMobile,
        currentTime: orderInfo.currentTime,
        orderPrice: orderInfo.orderPrice,
        partnerOrderId: orderInfo.partnerOrderId,
        resultMsg: orderInfo.resultMsg || "出票失败",
        eorderNumber: eorderCode + eorderNumber,
        payTradeNumber: payTradeInfo?.paymentNumber,
        ...payTradeInfo,
      };
    },
    // 出票行程数据
    formTicketList({ ticketingList, formPassengerMap }) {
      if (!ticketingList?.length) return [];
      return ticketingList.map((item) => {
        const passengerList = item?.passengerList?.map((pItem) => {
          return {
            id: pItem.id,
            passengerId: pItem.passengerId,
            passengerName: pItem.passengerName,
            passengerType: pItem.passengerType,
            passportNumber: pItem.passportNumber,
            passportType: pItem.passportType,
            passportTypeName: pItem.passportTypeName,
            ticketName: formPassengerMap[pItem.id].ticketName,
            realTicketPrice: formPassengerMap[pItem.id].realTicketPrice,
            carriageNo: formPassengerMap[pItem.id].carriageNo,
            seatName: formPassengerMap[pItem.id].seatName,
            seatNo: formPassengerMap[pItem.id].seatNo,
          };
        });
        return {
          id: item.id,
          arriveTime: item.arriveTime,
          deliveryTicketId: item.deliveryTicketId,
          departTime: item.departTime,
          fromStationName: item.fromStationName,
          toStationName: item.toStationName,
          trainNumber: item.trainNumber,
          ticketType: item.ticketType,
          ticketCount: item.ticketCount,
          passengerList: passengerList || [],
        };
      });
    },
  },
  methods: {
    // 获取座位类型
    getSeatTypeOptions(arrJson) {
      const arr =
        typeof arrJson === "string" ? JSON.parse(arrJson || `[]`) : [];
      return arr.map((item, index) => ({
        label: item,
        value: index,
      }));
    },
    // 出票总金额
    getTicketTotalAmount() {
      let totalAmount = 0;
      const values = Object.values(this.formPassengerMap);
      values.forEach(
        (item) => (totalAmount += Number(item?.realTicketPrice) || 0)
      );
      return totalAmount;
    },
    // 处理PassengerInfo组件进行校验数据
    handlePassengerInfo() {
      if (!this.ticketingList?.length) return;
      this.ticketingList.map((ticketing) => {
        const passengerList = ticketing?.passengerList || [];
        passengerList.forEach(async (item) => {
          // dom中使用for -> PassengerInfo组件只有一个
          const index = 0;
          const PassengerInfo = this.$refs[`PassengerInfo-${item.id}`][index];
          // 存储校验方法
          this.validationMethodsList.push(PassengerInfo.formValidation);
          this.formPassengerMap[item.id] = PassengerInfo.formData;
        });
      });
    },
    async onSubmit(result) {
      const expireTime = new Date(this.orderInfo?.expireTime).getTime();
      if (Date.now() > expireTime) return this.$message.error("订单已超时");
      this.handlePassengerInfo();
      if (!this.validationMethodsList?.length) return;
      // 校验是否全部输入乘客信息
      for (const index in this.validationMethodsList) {
        try {
          const validation = await this.validationMethodsList[index]();
          if (!validation) throw new Error(validation);
        } catch (error) {
          console.error(error);
          return error;
        }
      }
      // 校验乘客座号是否存在重复的
      const seatNoArr = [];
      let isSeatNoExist = false;
      this.formTicketList.map((item) => {
        if (item?.passengerList?.length) {
          item?.passengerList.forEach((ele) => {
            if (seatNoArr.find((seatNo) => seatNo === ele?.seatNo)) {
              try {
                isSeatNoExist = true;
                this.$message.error(`乘客座号(${ele?.seatNo})不能重复`);
                throw new Error(`乘客座号(${ele?.seatNo})不能重复`);
              } catch (error) {
                console.error(error);
                return error;
              }
            } else seatNoArr.push(ele.seatNo);
          });
        }
      });
      if (isSeatNoExist) return;
      if (!this.alipayAccount) return this.$message.error("请选择支付宝账号");
      if (!this.payTradeInfo?.paymentNumber)
        return this.$message.error("请匹配或手填支付流水号");
      if (!result) return (this.showSelectNoTicketType = true);
      this.ticketingAction(result);
    },
    // 有票/无票
    async ticketingAction(type) {
      const fmt = "yyyy-MM-dd hh:mm:ss";
      const query = { ...this.formOrderData };
      query.orderPrice = String(this.getTicketTotalAmount()); // 获取实际出票总金额
      const state = type // 出票状态
        ? CONST.ORDER_RESULT_CODE.SUCCESS
        : this.noTicketResult.type;
      query.resultMsg =
        state === CONST.ORDER_RESULT_CODE.SUCCESS
          ? "出票成功"
          : this.noTicketResult.resultMsg || query.resultMsg;
      query.orderResultCode = String(state);
      query.failCode = String(state);
      query.ticketSuccessTime = filters.formatDate(Date.now(), fmt); // 出票成功时间
      query.ticketList = this.formTicketList;
      console.log(query);
      const [, res] = await this.$http.Order.OperationTicketing({
        bodyInfo: query,
      });
      this.$message[res ? "success" : "error"](`操作${res ? "成功" : "失败"}`);
      if (res) this.$emit("success", this.orderInfo);
    },
  },
  mounted() {
    this.handlePassengerInfo();
  },
};
</script>
<style lang="scss" scoped>
.main {
  background-color: #f7f8fa;
  padding: 10px;

  &-title {
    font-size: 13px;
    font-weight: 600;
    color: $main-font-color;
    line-height: 20px;
    padding: 0 0 5px;
  }
  .content {
    padding: 16px 20px;
    background-color: #fff;
    .item-title {
      height: 32px;
      font-size: 18px;
      font-weight: 400;
      color: $main-font-color;
      line-height: 32px;
    }
  }
  .ticketing-item {
    margin: 0 0 12px;
  }
  .ticketing-item-content {
    border: 1px solid #eee;
    margin: 5px 0 0;
  }
  .content-info {
    padding: 24px;
    background-color: #fff;
    .remark {
      padding: 9px 12px;
      line-height: 22px;
      font-size: 16px;
      font-weight: 700;
      color: $--color-danger;
      background-color: #ff49491a;
    }
    .info {
      display: flex;
      align-items: baseline;
      padding: 10px 0 0;
    }
    .credential-type {
      min-width: fit-content;
      font-size: 16px;
      font-weight: 400;
      color: $sub-font-color;
      margin-top: 15px;
    }
  }
}
</style>
