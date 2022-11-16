<template>
  <div class="head-info">
    <span class="date">
      {{ info.departTime | formatDate }}
    </span>
    <span class="car-num">{{ info.trainNumber || "-" }} 次</span>
    <span class="start-end">
      <span class="start">
        <span>{{ info.fromStationName }}</span>
        <span>({{ info.departTime | formatDate("hh:mm") }})</span>
      </span>
      <span class="end">
        <span>{{ info.toStationName }}</span>
        <span class="endDate">
          <span
            :data-attr="afterDay"
            :class="{ 'after-day': isShowAfterDay }"
            >{{ info.arriveTime | formatDate("hh:mm") }}</span
          >
        </span>
      </span>
    </span>
    <span class="seat-class ml-10">{{ info.seatName || "-" }}</span>
    <span class="ticketing-num ml-10">{{ info.ticketCount || "-" }}张</span>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    info: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    afterDay({ info }) {
      if (info?.departTime && info?.arriveTime) {
        const stateDate = this.$options.filters.formatDate(info.departTime);
        const endDate = this.$options.filters.formatDate(info.arriveTime);
        const stateTime = new Date(stateDate).getTime();
        const endTime = new Date(endDate).getTime();
        const day = (endTime - stateTime) / (1 * 24 * 60 * 60 * 1000);
        return `+${Number.parseInt(day > 0 ? day : 0)}`;
      } else {
        return 0;
      }
    },
    isShowAfterDay({ afterDay }) {
      return afterDay > 0 ? true : false;
    },
  },
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
.head-info {
  display: flex;
  flex-wrap: wrap;
  padding: 16px 24px;
  background: #f7f8fa;
  font-size: 18px;
  color: $main-font-color;
  border-bottom: 1px solid #eee;
  .date {
    margin-right: 32px;
  }
  .car-num {
    margin-right: 64px;
  }
  .start-end,
  .start {
    display: flex;
    align-items: center;
  }
  .start::after {
    content: "";
    display: block;
    width: 40px;
    height: 2px;
    background-color: $main-font-color;
    margin: 0 15px;
  }
  .endDate {
    &::before {
      content: "(";
    }
    &::after {
      content: ")";
    }
    .after-day::after {
      content: attr(data-attr);
      position: relative;
      top: -10px;
      color: #000;
      font-size: 14px;
    }
  }
}
</style>
