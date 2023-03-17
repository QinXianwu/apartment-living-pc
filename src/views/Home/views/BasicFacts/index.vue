<template>
  <div class="view-container">
    <div class="hello">
      <div class="title">{{ title }}</div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      statisticInfo: {},
    };
  },
  computed: {
    title() {
      return `欢迎回来！`;
    },
  },
  methods: {},
  mounted() {
    //
  },
};
</script>

<style lang="scss" scoped>
.view-container {
  background-color: #fff;
}
.title {
  font-size: 18px;
  padding: 0 0 20px;
  margin: 0 0 20px;
  border-bottom: 1px solid #eee;
}
.statistic {
  padding: 0 10px 20px;
  margin: 0 0 20px;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
}
</style>
