<template>
  <div class="c_box">
    <div class="goods_step" v-if="setpList && setpList.length">
      <template v-for="(item, index) in setpList">
        <div class="step_item" :key="index">
          <i
            class="step_state"
            :class="
              activeIndex >= index
                ? 'el-icon-circle-check active'
                : 'el-icon-remove-outline'
            "
          ></i>
          <span
            class="step_label"
            :class="activeIndex >= index ? 'step_item_resolve' : ''"
            >{{ item.label }}</span
          >
          <span class="step_delimiter" v-if="index !== setpList.length - 1">
            <i class="el-icon-arrow-right"></i>
          </span>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    activeIndex: {
      type: Number,
      default: 0,
    },
    setpList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.goods_step {
  display: flex;
  height: 46px;
  background: #f7f8fa;
  font-size: 14px;
  padding: 0 0 0 40px;
}
.step_item {
  display: flex;
  align-items: center;
  color: #cccccc;
  margin: 0 8.8% 0 0;
}
.step_state {
  font-size: 20px;
  margin-top: 4px;
  &.active {
    color: $--color-primary;
  }
}
.step_label {
  width: 150px;
  margin: 0 0 0 10px;
}
.step_item_resolve {
  color: $--color-primary;
}
.step_delimiter {
  font-size: 25px;
}
</style>
