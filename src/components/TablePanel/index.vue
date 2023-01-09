<template>
  <div i="table-box">
    <div class="oper" v-if="checkbox && isShowTopCheck">
      <el-checkbox v-model="isAllSelect" @change="toggleSelection">
        当页全选
      </el-checkbox>
      <slot name="checkbox" :data="selectTableData"></slot>
    </div>
    <el-table
      ref="multipleTable"
      :empty-text="emptyText"
      :border="border"
      :data="tableData"
      :default-sort="defaultSort"
      :height="height"
      :max-height="maxHeight"
      :span-method="spanMethod"
      :show-header="showHeader"
      :row-class-name="rowClassName"
      :row-key="rowKey"
      :default-expand-all="isExpandAll"
      @sort-change="onSortChange"
      @selection-change="selectionChange"
      @select="onSelect"
      @select-all="onSelectAll"
      @expand-change="$emit('expand-change', $event)"
    >
      <!-- 选中框 -->
      <el-table-column
        v-if="checkbox"
        type="selection"
        align="center"
        width="60"
        fixed="left"
        :reserve-selection="reserveSelection"
      ></el-table-column>

      <!-- 展开行 -->
      <el-table-column v-if="expand" type="expand" align="center" width="60">
        <template slot-scope="scoped">
          <slot name="expand" :scope="scoped.row" :index="scoped.$index"></slot>
        </template>
      </el-table-column>

      <!-- 自定义区 -->
      <el-table-column
        v-for="(item, index) in tableHead"
        :key="index"
        :align="item.align || 'center'"
        :label="item.label"
        :sortable="item.sortable"
        :width="item.width"
        :min-width="item.minWidth"
        :fixed="item.fixed || false"
        :show-overflow-tooltip="item.showOverflowTooltip"
      >
        <!-- fixed属性有些版本会导致数据渲染两次 -->
        <!-- https://github.com/ElemeFE/element/issues/12177 -->
        <!-- :fixed="item.fixed || false" -->
        <!-- 带有提示信息的头部 -->
        <template slot="header" v-if="item.headTip">
          <span>
            {{ item.label }}
            <el-tooltip effect="dark" :content="item.headTip" placement="top">
              <i class="el-icon-question"></i>
            </el-tooltip>
          </span>
        </template>

        <!-- 插槽区 -->
        <template slot-scope="scoped">
          <!-- 图片 -->
          <div v-if="item.type === 'image'">
            <ImageView
              v-if="scoped.row[item.prop]"
              customClass="table-img"
              :src="scoped.row[item.prop]"
            />
          </div>

          <!-- 图片 多张 -->
          <div
            v-if="
              item.type === 'image-list' &&
              scoped.row[item.prop] &&
              scoped.row[item.prop].length
            "
          >
            <div class="flex flex-center flex-wrap">
              <ImageView
                v-for="(img, i) in scoped.row[item.prop]"
                :key="i"
                :src="img"
                class="table-img img_many"
                v-show="i < 3 || scoped.row.showAll"
                :srcList="scoped.row[item.prop]"
              />
            </div>
            <div
              class="pointer theme-color-text"
              @click="$set(scoped.row, 'showAll', !scoped.row.showAll)"
              v-if="scoped.row[item.prop] && scoped.row[item.prop].length > 3"
            >
              {{ !scoped.row.showAll ? "查看更多图片" : "收起" }}
              <i
                :class="
                  scoped.row.showAll ? 'el-icon-arrow-up' : 'el-icon-arrow-down'
                "
              ></i>
            </div>
          </div>

          <!-- 自定义插槽 -->
          <slot
            v-if="item.type === 'custom'"
            :name="item.prop"
            :scope="scoped.row"
            :index="scoped.$index"
          />

          <!--  默认直接显示 -->
          <template v-if="item.type === 'money'">
            ￥{{ scoped.row[item.prop] | formatCurrency }}
            <i
              v-if="item.emit"
              class="edit_icon el-icon-edit"
              @click="$emit('emit', { data: scoped.row, item })"
            ></i>
          </template>

          <!--  默认直接显示 -->
          <template v-if="item.type === 'input' || !item.type">
            {{ scoped.row[item.prop] }}
            <i
              v-if="item.emit"
              class="edit_icon el-icon-edit"
              @click="$emit('emit', { data: scoped.row, item })"
            ></i>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <slot
      name="footer"
      :data="{
        isAllSelect,
        selectTableData,
      }"
    ></slot>
  </div>
</template>
<script>
export default {
  props: {
    defaultSort: {
      type: Object,
      default: () => ({}),
    },
    border: {
      type: Boolean,
      default: false,
    },
    // 固定高度
    height: {
      type: [Number, String],
      default: null,
    },
    // 最大高度
    maxHeight: {
      type: [Number, String],
      default: null,
    },
    // 是否显示多选列
    checkbox: {
      type: Boolean,
      default: false,
    },
    // 是否显示展开行
    expand: {
      type: Boolean,
      default: false,
    },
    // 是否显示头部全选
    isShowTopCheck: {
      type: Boolean,
      default: true,
    },
    // 是否显示表头
    showHeader: {
      type: Boolean,
      default: true,
    },
    // 表头
    tableHead: {
      type: Array,
      default() {
        return [];
      },
    },
    // 数据
    tableData: {
      type: Array,
      default() {
        return [];
      },
    },
    //是否合并行或列
    spanMethod: {
      type: Function,
      default: null,
    },
    // 缺省
    emptyText: {
      type: String,
      default: "暂无数据",
    },
    // 行样式
    rowClassName: {
      type: [String, Function],
      default: "",
    },
    // 行数据的Key
    rowKey: {
      type: String,
      default: "",
    },
    // 是否开始数据更新时保留之前选中的数据（需指定 row-key），作用场景，拥有分页功能并且多选数据切换分页时保留原先数据
    reserveSelection: {
      type: Boolean,
      default: false,
    },
    // 显示默认展开所有展开行
    isExpandAll: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isAllSelect: false,
      selectTableData: [],
    };
  },
  methods: {
    // 排序
    onSortChange(span) {
      let _index = this.tableData.findIndex((v) => v.prop === span.prop);
      console.log(span);
      // span.sortType = [null, "ascending", "descending"].indexOf(span.order);
      span.order = span.order ? span.order.replace("ending", "") : span.order;
      span.columnIndex = this.checkbox ? _index + 1 : _index;

      if (!span.prop) {
        const targetCol = this.tableHead.find(
          (v) => v.label === span.column.label
        );
        span.prop = targetCol.prop;
      }
      this.$emit("onSortChange", span);
    },
    // 切换选中
    toggleSelection(Bool) {
      // 全选亦或者全部取消
      if (Bool) {
        this.tableData.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row, true);
        });
      } else {
        this.clearSelection();
      }
    },
    onSelectAll(selection) {
      this.$emit("select-all", selection);
    },
    onSelect(selection, row) {
      this.$emit("select", selection, row);
    },
    // 选择数据
    selectionChange(val) {
      this.selectTableData = val;
      this.isAllSelect = this.tableData.length === this.selectTableData.length;
      this.$emit("selection-change", val);
    },
    // 清除选择
    clearSelection() {
      this.$refs.multipleTable.clearSelection();
    },
    // 设置选中项
    setSelection(row, bool) {
      this.$refs.multipleTable.toggleRowSelection(row, bool);
    },
  },
};
</script>
<style lang="scss" scoped>
[i="table-box"] {
  .table-img {
    width: 60px;
    height: 60px;
    margin: 4px;
  }
  .oper {
    padding: 8px 0 8px 23px;
    .el-button {
      margin-left: 16px;
    }
  }
  // 该element版本的表格 没有el-table__cell类名
  ::v-deep .el-table .el-table__header th {
    // ::v-deep .el-table .el-table__header th.el-table__cell {

    background-color: #f7f8fa;
    .cell {
      font-size: 14px;
      color: $main-font-color;
    }
  }
  ::v-deep .el-table__row {
    .cell {
      font-size: 14px;
      color: $sub-font-color;
    }
  }
  ::v-deep .el-table__empty-text {
    font-size: 14px;
  }
  .edit_icon {
    cursor: pointer;
    &:hover {
      color: $--color-primary;
    }
  }
}
</style>
