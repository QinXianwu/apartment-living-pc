<template>
  <div class="slide-verify">
    <SliderVerifyContainer />
    <SliderVerifyBlock />
  </div>
</template>

<script>
import SliderVerifyContainer from "./SliderVerifyContainer.vue";
import SliderVerifyBlock from "./SliderVerifyBlock.vue";
export default {
  name: "SlideVerify",
  components: { SliderVerifyContainer, SliderVerifyBlock },
  data() {
    return {};
  },
  computed: {},
  methods: {},
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
</style>
