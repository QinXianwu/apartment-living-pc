<template>
  <div class="orther">
    <div class="item">
      <span class="label">今日进单时间：</span>
      <span class="vale">{{ "无" }}</span>
      <el-tooltip
        effect="dark"
        content="退票采取分配制和抢单制结合的模式，分配制的订单只在当日进单时间内分配，抢单制的订单有票即可抢（不限当日进单时间）"
        placement="right"
      >
        <span>
          <i class="el-icon-question ml-10"></i>
        </span>
      </el-tooltip>
    </div>
    <div class="item">
      <span class="label">是否开启声音：</span>
      <ElSwitch
        :vlaue="isAudio"
        @change="onOpenSound"
        active-icon-class="el-icon-message-solid"
        inactive-icon-class="el-icon-close-notification"
      />
      <el-tooltip
        effect="dark"
        content="点击将关闭所有代售点声音"
        placement="right"
      >
        <span>
          <i class="el-icon-question ml-10"></i>
        </span>
      </el-tooltip>
    </div>
    <div class="item">
      <span class="label">现金退票抢单池订单数量</span>
      <span class="value ml-10 mr-10" :class="{ 'no-single': isNoSingle }">{{
        "无单"
      }}</span>
      <el-button type="primary" @click="onGrabOrder">抢票</el-button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Orther",
  components: {},
  data() {
    return {
      isNoSingle: true,
    };
  },
  computed: {
    ...mapState({
      isAudio: (state) => state.app.isAudio, // 是否开启声音
    }),
  },
  methods: {
    onGrabOrder() {
      console.log("onGrabOrder");
    },
    onOpenSound(val) {
      this.$store.commit("app/SET_IS_AUDIO", val);
    },
  },
};
</script>
<style lang="scss" scoped>
.orther {
  background-color: #f7f8fa;
  margin-bottom: 20px;
  padding: 20px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  .item {
    display: flex;
    align-items: center;
    padding: 10px 0;
    margin-right: 20px;
  }
  .label {
    color: $sub-font-color;
    font-size: 14px;
  }
  .no-single {
    color: $--color-danger;
  }
}
</style>
