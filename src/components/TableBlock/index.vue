<template>
  <div class="table">
    <div class="table-item" v-for="(item, index) in tableList" :key="index">
      <div class="item-label">
        <div>{{ item.label || "-" }}</div>
      </div>
      <div class="item-value" :style="itemStyle(item)">
        <span v-if="item.type === 'image'">
          <ImageView
            customClass="table-img"
            :src="item[item.prop] || item.value || ''"
          />
        </span>
        <span
          v-else-if="
            item.type === 'image-list' &&
            ((item[item.prop] && item[item.prop].length) ||
              (item.value && item.value.length))
          "
        >
          <div class="flex flex-center flex-wrap">
            <ImageView
              v-for="(img, i) in item[item.prop] || item.value"
              :key="i"
              :src="img"
              class="table-img img_many"
              v-show="i < (item.showImgIndex || 3) || item.showAll"
              :srcList="item[item.prop] || item.value"
            />
          </div>
          <div
            class="pointer theme-color-text"
            @click="$set(item, 'showAll', !item.showAll)"
            v-if="
              (item[item.prop] &&
                item[item.prop].length > (item.showImgIndex || 3)) ||
              (item.value && item.value.length > (item.showImgIndex || 3))
            "
          >
            {{ !item.showAll ? "查看更多图片" : "收起" }}
            <i
              :class="item.showAll ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"
            ></i>
          </div>
        </span>
        <span v-else-if="item.type === 'money'">
          ￥{{ item[item.prop] || item.value | formatCurrency }}
        </span>
        <span v-else-if="item.type !== 'custom'">
          {{ item[item.prop] || item.value || "-" }}
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
    valueWidth: {
      type: [String, Number],
      default: "",
    },
  },
  watch: {
    tableData() {
      this.init();
    },
  },
  data() {
    return {
      tableList: [],
    };
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
        : this.valueWidth
        ? typeof this.valueWidth === "number"
          ? `${this.valueWidth}px`
          : this.valueWidth
        : "";
      return `min-width: ${minWidth};width: ${width}`;
    },
    init() {
      this.tableList = this.tableData;
    },
  },
  mounted() {
    this.init();
  },
};
</script>
<style lang="scss" scoped>
.table {
  display: flex;
  flex-wrap: wrap;
  margin: 0 0 20px;
  font-size: 14px;
  &-item {
    display: flex;
    flex-wrap: wrap;
    border: 1px solid #eee;
    // border-right: none;
    padding: 0;
    margin-right: 0px;
    margin-bottom: 0px;
    line-height: 24px;
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
    display: flex;
    align-items: center;
    min-width: 200px;
    color: $main-font-color;
    padding: 14px;
  }
  .table-img {
    width: 60px;
    height: 60px;
    margin: 4px;
  }
  .pointer {
    cursor: pointer;
  }
}
</style>
