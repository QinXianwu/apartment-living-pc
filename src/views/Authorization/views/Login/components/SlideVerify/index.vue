<template>
  <div class="slide-verify">
    <SliderVerifyContainer
      ref="SliderVerifyContainer"
      :blockMoveX="blockMoveX"
      :blockRadius.sync="blockRadius"
      :isVerifyLoading="isVerifyLoading"
    />
    <SliderVerifyBlock
      ref="SliderVerifyBlock"
      :blockRadius="blockRadius"
      :blockMoveX.sync="blockMoveX"
      :isVerifyResult.sync="isVerifyResult"
      :isVerifyLoading.sync="isVerifyLoading"
      @changeVerify="changeVerify"
      @changeResult="changeResult"
    />
  </div>
</template>

<script>
import SliderVerifyContainer from "./SliderVerifyContainer.vue";
import SliderVerifyBlock from "./SliderVerifyBlock.vue";
export default {
  name: "SlideVerify",
  components: { SliderVerifyContainer, SliderVerifyBlock },
  data() {
    return {
      blockMoveX: 0,
      blockRadius: 0,
      isVerifyLoading: false,
      isVerifyResult: false,
    };
  },
  computed: {},
  methods: {
    async changeVerify() {
      const result = await this.$refs.SliderVerifyContainer.handleVerify();
      this.isVerifyResult = !!result;
      this.$nextTick(() => {
        this.$refs.SliderVerifyBlock.handleVerifyResult();
      });
    },
    changeResult(val) {
      console.log(val);
    },
  },
  mounted() {
    //
  },
  beforeDestroy() {
    //
  },
};
</script>
<style lang="scss" scoped>
.slide-verify {
  width: 340px;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 8px 0 rgba(23, 23, 23, 0.1),
    0 6px 20px 0 rgba(23, 23, 23, 0.1);
}
.nb-spinner {
  width: 15px;
  height: 15px;
  margin: 0;
  background: transparent;
  border-top-width: 4px;
  border-top-style: solid;
  border-right: 4px solid transparent;
  border-radius: 50%;
  animation: 1s spin linear infinite;
  margin-left: 10px;
}

// 加载效果 转圈
@keyframes spin {
  from {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  to {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
