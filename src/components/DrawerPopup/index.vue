<template>
  <transition name="deawer">
    <div
      class="drawer-popup"
      :class="{
        'drawer-popup-pb': isAdaptFooterPaging,
      }"
      v-if="currentVal"
    >
      <div v-if="defaultBox" class="drawer-popup-box">
        <slot></slot>
      </div>
      <slot v-else></slot>
    </div>
  </transition>
</template>

<script>
import vModelMixin from "@/mixins/vModelMixin";
export default {
  mixins: [vModelMixin],
  props: {
    // 是否适应底部有分页的边距
    isAdaptFooterPaging: {
      type: Boolean,
      default: false,
    },
    //
    defaultBox: {
      type: Boolean,
      default: true,
    },
  },
  watch: {
    value(val) {
      this.currentVal = val;
      this.$emit(val ? "open" : "close");
    },
  },
};
</script>

<style lang="scss" scoped>
.drawer-popup {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 20px;
  overflow-y: auto;
  background: #f7f8fa;
  box-sizing: border-box;
  z-index: $z-index3;
  overscroll-behavior: none;
}
.drawer-popup-pb {
  padding-bottom: $paddingBottom;
}
.drawer-popup-box {
  min-height: 100%;
  padding: 15px;
  background: #ffffff;
  font-size: 14px;
  color: $sub-font-color;
  line-height: 20px;
  box-sizing: border-box;
}
.deawer-enter,
.deawer-leave-to {
  left: 100%;
}
.deawer-enter-active,
.deawer-leave-active {
  transition: all 0.3s ease;
}
.deawer-enter-to,
.deawer-leave {
  left: 0;
}
</style>
