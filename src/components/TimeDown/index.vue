<!-- 倒计时 -->
<template>
  <div class="time_down">
    <div class="time_groud">
      <div class="time" v-if="showH">
        <div v-if="diffTime > 0">{{ diffTime | formatSeconds("hh") }}</div>
        <div v-else>00</div>
      </div>
      <div class="time" v-if="showM">
        <div v-if="diffTime > 0">{{ diffTime | formatSeconds("mm") }}</div>
        <div v-else>00</div>
      </div>
      <div class="time" v-if="showS">
        <div v-if="diffTime > 0">{{ diffTime | formatSeconds("ss") }}</div>
        <div v-else>00</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TimeDown",
  props: {
    // 倒计时到达时间
    targerTime: {
      type: [String, Number],
      default: "",
    },
    // 距离该时间进行提示 单位s
    reminderTime: {
      type: [String, Number],
      default: "",
    },
    showH: {
      type: Boolean,
      default: true,
    },
    showM: {
      type: Boolean,
      default: true,
    },
    showS: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      diffTime: 0, // 倒计时
      isReminder: false, // 是否已提示
    };
  },
  watch: {
    targerTime() {
      clearTimeout(this.timeId);
      this.getTimeDiff();
    },
  },
  created() {
    this.getTimeDiff();
  },
  methods: {
    // 进行倒计时
    getTimeDiff() {
      if (!this.targerTime) return;
      let targerTimeTemp = new Date();
      if (typeof this.targerTime === "string")
        targerTimeTemp = this.targerTime.replace(/-/g, "/");
      if (typeof this.targerTime === "number") targerTimeTemp = this.targerTime;
      const targerTime = new Date(targerTimeTemp).getTime();
      this.timeId = setTimeout(() => {
        this.diffTime = ((targerTime - Date.now()) / 1000).toFixed(2);
        if (this.diffTime > 0) {
          // 响应提示
          if (this.diffTime < Number(this.reminderTime) && !this.isReminder) {
            // console.log("响应提示");
            this.isReminder = true;
            this.$emit("on-reminder");
          }
          this.getTimeDiff();
        } else {
          this.$emit("on-change");
        }
      }, 1000);
    },
  },
  filters: {
    formatSeconds(result, fmt) {
      var h =
        Math.floor(result / 3600) < 10
          ? "0" + Math.floor(result / 3600)
          : Math.floor(result / 3600);
      var m =
        Math.floor((result / 60) % 60) < 10
          ? "0" + Math.floor((result / 60) % 60)
          : Math.floor((result / 60) % 60);
      var s =
        Math.floor(result % 60) < 10
          ? "0" + Math.floor(result % 60)
          : Math.floor(result % 60);
      if (fmt === "hh") return h;
      if (fmt === "mm") return m;
      if (fmt === "ss") return s;
      return (result = h + ":" + m + ":" + s);
    },
  },
  // 清除定时器
  destroyed() {
    clearInterval(this.timeId);
  },
};
</script>
<style lang="scss" scoped>
.time_groud {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  position: relative;
  left: 5px;
  .time {
    display: flex;
    line-height: 18px;
    div {
      padding: 0 5px;
      min-width: 20px;
      height: 20px;
      line-height: 20px;
      display: flex;
      justify-content: center;
      margin: 0 5px;
      color: #fff;
      background: $--color-danger;
      border-radius: 5px;
      font-size: 12px;
    }
    &::after {
      content: ":";
      color: $--color-danger;
      font-size: 12px;
    }
    &:last-child::after {
      content: "";
    }
  }
}
</style>
