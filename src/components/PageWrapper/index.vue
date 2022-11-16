<template>
  <section
    class="warpper"
    :class="{
      adaptWarpper: isAdaptBottom,
    }"
  >
    <div class="container">
      <slot></slot>
    </div>
  </section>
</template>

<script>
export default {
  name: "PageWrapper",
  props: {
    isAdaptBottom: {
      type: Boolean,
      default: true,
    },
  },
};
</script>
<style lang="scss" scoped>
.warpper {
  padding: 20px;
  .container {
    padding: 16px;
    background: #ffffff;
  }
  &.adaptWarpper {
    padding-bottom: $paddingBottom;
  }
}
</style>
