export default {
  props: {
    value: true,
  },
  data() {
    return {
      currentVal: this.value,
    };
  },
  watch: {
    currentVal(val) {
      this.$emit("input", val);
    },
    value(val) {
      this.currentVal = val;
    },
  },
};
