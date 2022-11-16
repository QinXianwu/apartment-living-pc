<template>
  <div class="PassengerInfo" v-if="passengerList && passengerList.length">
    <div class="content" v-for="(item, index) in passengerList" :key="index">
      <div class="ticketInfo">
        <span class="passengerType">{{
          item.passengerType
            ? $CONST.PASSENGER_TYPE_TEXT[item.passengerType]
            : "-"
        }}</span>
        <span class="seatName">{{ item.seatName || "-" }}</span>
        <span class="carriageNo">{{ item.carriageNo || "-" }} 车厢</span>
        <span class="seatNo">{{ item.seatNo || "-" }} 座号</span>
        <span class="realTicketPrice">{{
          item.realTicketPrice | formatCurrency
        }}</span>
      </div>
      <div class="userInfo">
        <span>{{ index + 1 }}.{{ item.passportTypeName || "" }}</span>
        <span class="name">{{ item.passengerName || "-" }}</span>
        <span class="passportNumber">{{ item.passportNumber || "-" }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PassengerInfo",
  props: {
    passengerList: {
      type: Array,
      default: () => [],
    },
  },
  components: {},
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>
<style lang="scss" scoped>
.PassengerInfo {
  margin: 10px 0 0;
  background: #fff;
  padding: 16px 24px 10px;
}
.content {
  display: flex;
  flex-direction: column;
  margin: 0 0 20px;

  .ticketInfo,
  .userInfo {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin: 0 0 10px;
    font-size: 15px;
    span {
      margin-right: 70px;
    }
  }
  .userInfo {
    line-height: 20px;
  }
  .passengerType {
    background: #ffefe2;
    color: $--color-warning;
    border-radius: 4px 4px 4px 4px;
    padding: 4px 8px;
  }
  .carriageNo,
  .seatNo {
    background: $menuActiveText;
    color: #fff;
    border-radius: 4px 4px 4px 4px;
    padding: 4px 8px;
  }
  .realTicketPrice {
    display: flex;
    align-items: center;
    color: $--color-danger;
    font-weight: 700;
    &::after {
      content: "元";
      display: block;
      margin: 0 3px;
    }
  }
  .name,
  .passportNumber {
    color: #000;
  }
}
</style>
