<template>
  <div class="table">
    <div class="table-item" v-for="(item, index) in tableData" :key="index">
      <div class="item-label">
        <div>{{ item.label || "-" }}</div>
      </div>
      <div class="item-value" :style="itemStyle(item)">
        <span v-if="item.type !== 'custom'">
          {{ item[item.prop] || item.value || "-" }}
        </span>
        <span v-if="item.type === 'image'">
          <ImageView
            customClass="table-img"
            :src="item[item.prop] || item.value || ''"
          />
        </span>
        <!-- 自定义插槽 -->
        <slot
          v-if="item.type === 'custom'"
          :name="item.prop"
          :scope="item"
          :index="index"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TableBlock",
  components: {},
  props: {
    tableData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    itemStyle(data) {
      const minWidth = data?.minWidth
        ? typeof data.minWidth === "number"
          ? `${data.minWidth}px`
          : data.minWidth
        : "180px";
      const width = data?.width
        ? typeof data.width === "number"
          ? `${data.width}px`
          : data.width
        : "";
      return `min-width: ${minWidth};width: ${width}`;
    },
  },
  mounted() {
    //
  },
};
</script>
<style lang="scss" scoped>
.table {
  display: flex;
  flex-wrap: wrap;
  margin: 0 0 20px;
  &-item {
    display: flex;
    flex-wrap: wrap;
    border: 1px solid #eee;
    // border-right: none;
    padding: 0;
    margin-right: 0px;
    margin-bottom: 0px;
  }
  .item-label {
    display: flex;
    align-items: center;
    min-width: 180px;
    padding: 14px;
    color: $sub-font-color;
    background: #f7f8fa;
    border-right: 1px solid #eee;
  }
  .item-value {
    min-width: 200px;
    color: $main-font-color;
    padding: 14px;
  }
  .table-img {
    width: 60px;
    height: 60px;
  }
}
</style>
