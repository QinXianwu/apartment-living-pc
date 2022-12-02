<template>
  <!-- 选择表格中的一行数据(单选) -->
  <div id="choose_row_table_data">
    <div class="head">
      <div class="selected">
        已选 <span>{{ selectNumber }}</span>
      </div>
      <div class="search">
        <!-- 绑定回车键若执行onSearch同时会触发失焦事件 -->
        <el-input
          class="input-small"
          :placeholder="searchPlaceholder"
          clearable
          v-model="table_data_key_word"
          @clear="onClearSearch"
          @keyup.enter.native="onSearch"
        />
        <el-button class="search-btn" type="primary" @click="onSearch"
          >搜索</el-button
        >
      </div>
    </div>
    <TablePanel
      ref="TablePanel"
      maxHeight="400"
      :isShowTopCheck="false"
      :table-head="tableHead"
      :table-data="tableData"
    >
      <!-- 复选框(只允许选中一个) -->
      <template slot-scope="scoped" slot="custom_checkbox">
        <div class="checkbox">
          <el-checkbox
            :value="scoped.scope[onlyKey] | isChecked(selectKeys)"
            @change="handleSelectionChange(scoped.scope)"
          >
          </el-checkbox>
        </div>
      </template>
      <!-- 操作 -->
      <template #action="{ scope }">
        <div class="action-groud">
          <el-button @click="$emit('edit', scope)" type="text">编辑</el-button>
          <el-button @click="$emit('del', scope)" type="text">删除</el-button>
        </div>
      </template>
    </TablePanel>
  </div>
</template>

<script>
export default {
  props: {
    // 选中的唯一标识key
    onlyKey: {
      type: String,
      default: "",
    },
    // 选中的数据
    selectData: {
      type: Array,
      default() {
        return [];
      },
    },
    tableData: {
      type: Array,
      default() {
        return [];
      },
    },
    tableHead: {
      type: Array,
      default() {
        return [];
      },
    },
    // 搜索的展位符
    searchPlaceholder: {
      type: String,
      default: "搜索活动名称",
    },
    // 是否是单选
    isRadio: {
      type: Boolean,
      default: true, // 默认单选
    },
  },
  data() {
    return {
      table_data_key_word: "", // 活动关键字
      selectMap: {}, // 选择的活动
    };
  },
  computed: {
    selectKeys() {
      return Object.keys(this.selectMap).filter((key) => !!this.selectMap[key]);
    },
    selectNumber() {
      return this.selectKeys.length;
    },
    // 数组形式
    selectList() {
      return this.selectKeys.map((key) => this.selectMap[key]);
    },
  },
  watch: {
    selectData: {
      deep: true,
      handler() {
        this.initSelectMap();
      },
    },
  },
  mounted() {
    this.initSelectMap();
  },
  methods: {
    // 初始化已经选择的值
    initSelectMap() {
      this.selectMap = {};
      this.selectData.forEach((item) => {
        // id 作为key
        this.selectMap[item[this.onlyKey]] = item;
      });
    },
    // 选中数据
    handleSelectionChange(item) {
      // 因为单选
      if (this.isRadio) {
        if (this.selectMap[item[this.onlyKey]]) {
          this.selectMap = {};
        } else {
          this.selectMap = {
            [item[this.onlyKey]]: item,
          };
        }
      } else {
        // 多选
        this.$set(
          this.selectMap,
          item[this.onlyKey],
          this.selectMap[item[this.onlyKey]] ? null : item
        );
      }
      this.$emit("select", this.selectMap);
    },
    // 搜索
    onSearch() {
      this.$emit("search", this.table_data_key_word);
    },
    // 清空搜索框
    onClearSearch() {
      this.table_data_key_word = "";
      this.onSearch();
    },
  },
  filters: {
    // 是否已选择
    isChecked(id, selectKeys) {
      return selectKeys.includes(String(id));
    },
  },
};
</script>

<style lang="scss" scoped>
.head {
  height: 32px;
  margin: 0 0 10px;
  .selected {
    float: left;
    font-size: 14px;
    font-weight: 500;
    color: $sub-font-color;
    line-height: 24px;
    span {
      color: #ff5600;
    }
  }
  .search {
    display: flex;
    float: right;
    &-btn {
      margin: 0 0 0 10px;
    }
  }
}
</style>
