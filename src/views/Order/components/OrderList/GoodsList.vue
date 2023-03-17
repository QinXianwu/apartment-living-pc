<template>
  <div class="GoodsList">
    <div class="content">
      <div
        class="goods-item"
        v-for="(item, index) in list"
        :key="index"
        v-show="index < showNum || showAll"
      >
        <ImageView customClass="table-img" :src="item.mainImage" />
        <div class="goods-item-info">
          <div class="name">
            <el-tooltip
              class="item"
              effect="dark"
              :content="item.productName || '-'"
              placement="right"
            >
              <span>{{ item.productName || "-" }}</span>
            </el-tooltip>
          </div>
          <div class="specification" v-if="item.specificationName">
            <el-tag>{{ item.specificationName || "" }}</el-tag>
          </div>
        </div>
      </div>
      <div
        class="pointer theme-color-text"
        @click="showAll = !showAll"
        v-if="list && list.length > showNum"
      >
        <el-button type="text">{{
          !showAll ? "查看更多商品" : "收起"
        }}</el-button>
        <i :class="showAll ? 'el-icon-arrow-up' : 'el-icon-arrow-down'" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsList",
  components: {},
  props: {
    goodsList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      showAll: false,
      showNum: 3,
    };
  },
  computed: {
    list({ goodsList }) {
      return goodsList?.length ? goodsList : [];
    },
  },
  methods: {},
  mounted() {
    //
  },
};
</script>
<style lang="scss" scoped>
.content {
  display: flex;
  flex-wrap: wrap;
}
.goods-item {
  display: flex;
  align-items: center;
  padding: 0 25px 12px 0px;
  &-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 10px;
  }
  .table-img {
    width: 60px;
    height: 60px;
  }
  .name {
    text-align: left;
    margin-bottom: 5px;
    @include overflow-eps(2);
  }
}
</style>
