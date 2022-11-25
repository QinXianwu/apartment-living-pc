<template>
  <div
    class="SearchForm"
    :class="{
      inlineBtnForm: isInlineBtn,
    }"
    v-if="form"
  >
    <el-form ref="form" :inline="inline">
      <el-form-item v-for="(item, index) in form" :key="index">
        <!-- 左边label栏 -->
        <div slot="label" :style="{ width: item.labelWidth }">
          <el-select v-model="item.prop" v-if="Array.isArray(item.label)">
            <el-option
              v-for="(lab, i) in item.label"
              :key="i"
              :label="lab.label"
              :value="lab.value"
              :disabled="lab.disabled"
            >
            </el-option>
          </el-select>
          <template v-else> {{ item.label }}</template>
        </div>
        <div class="form-item">
          <!-- 文本 START -->
          <template v-if="item.type === 'text'">
            <el-input
              :type="item.textType || 'text'"
              v-model="item.value"
              :placeholder="item.placeholder"
              @keyup.enter.native="searchFn"
              :clearable="item.disabledClear ? false : true"
            ></el-input>
          </template>
          <!-- 文本 END -->

          <!-- 文本区间 START -->
          <template v-if="item.type === 'textrange'">
            <div class="textrange">
              <el-input
                :type="item.textType || 'text'"
                v-model="item.value[0]"
                :placeholder="item.placeholder"
                @keyup.enter.native="searchFn"
                :clearable="item.disabledClear ? false : true"
              ></el-input>
              <span>至</span>
              <el-input
                :type="item.textType || 'text'"
                v-model="item.value[1]"
                :placeholder="item.placeholder"
                @keyup.enter.native="searchFn"
                :clearable="item.disabledClear ? false : true"
              ></el-input>
            </div>
          </template>
          <!-- 文本区间 END -->

          <!-- 级联选择器 START -->
          <template v-if="item.type === 'cascader'">
            <el-cascader
              :options="item.options"
              v-model="item.value"
              :placeholder="item.placeholde"
              :clearable="item.disabledClear ? false : true"
              :props="item.props || {}"
            >
            </el-cascader>
          </template>
          <!-- 级联选择器 END -->

          <!-- 时间选择 START -->
          <template v-else-if="item.type === 'time'">
            <el-time-picker
              v-model="item.value"
              :picker-options="{ selectableRange: item.selectableRange }"
              :placeholder="item.placeholder"
            >
            </el-time-picker>
          </template>
          <!-- 时间选择 END -->

          <!-- 日期 at 日期时间选择 START -->
          <template
            v-else-if="
              item.type === 'date' ||
              item.type === 'datetime' ||
              item.type === 'week' ||
              item.type === 'month' ||
              item.type === 'year'
            "
          >
            <el-date-picker
              v-model="item.value"
              align="right"
              :type="item.type"
              :placeholder="item.placeholder"
              :value-format="item.valueFormat || 'yyyy-MM-dd HH:mm:ss'"
              :picker-options="item.pickerOptions || pickerOptions"
              :clearable="item.disabledClear ? false : true"
            >
            </el-date-picker>
          </template>
          <!-- 日期 at 日期时间选择 END -->

          <!-- 日期时间区间选择 START -->
          <!-- 选择日期date没有时间 -->
          <template v-else-if="item.type === 'daterange'">
            <el-date-picker
              v-model="item.value"
              align="right"
              type="daterange"
              :placeholder="item.placeholder"
              :range-separator="item.rangePlaceholder || '至'"
              :start-placeholder="item.startPlaceholder || '开始日期'"
              :end-placeholder="item.endPlaceholder || '结束日期'"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </template>

          <template v-else-if="item.type === 'datetimerange'">
            <el-date-picker
              v-model="item.value"
              align="right"
              type="datetimerange"
              :placeholder="item.placeholder"
              :range-separator="item.rangePlaceholder || '至'"
              :start-placeholder="item.startPlaceholder || '开始日期'"
              :end-placeholder="item.endPlaceholder || '结束日期'"
              :picker-options="item.pickerOptions || pickerOptions2"
              :default-time="item.defaultTime || ['00:00:00', '23:59:59']"
              value-format="yyyy-MM-dd HH:mm:ss"
              :clearable="item.disabledClear ? false : true"
            >
            </el-date-picker>
          </template>
          <!-- 日期时间区间选择 END -->

          <!-- 选择器 START -->
          <template v-else-if="item.type === 'select'">
            <el-select
              v-model="item.value"
              :clearable="item.disabledClear ? false : true"
              :placeholder="item.placeholder"
              @change="(val) => $emit('selectChange', { prop: item.prop, val })"
            >
              <el-option
                v-for="opr in item.options"
                :key="opr.value"
                :label="opr[item.labelKey || 'label']"
                :value="opr[item.valueKey || 'value']"
                :disabled="opr.disabled"
              >
              </el-option>
            </el-select>
            <!-- 选择器 END -->
          </template>

          <!-- 单选框 START -->
          <template v-else-if="item.type === 'radio'">
            <el-radio-group v-model="item.value">
              <template v-if="item.buttonType === 'button'">
                <el-radio-button
                  v-for="opr in item.options"
                  :key="opr.value"
                  :label="opr.value"
                  :disabled="opr.disabled"
                >
                  {{ opr.label }}
                </el-radio-button>
              </template>
              <template v-else>
                <el-radio
                  v-for="opr in item.options"
                  :key="opr.value"
                  :label="opr.value"
                  :disabled="opr.disabled"
                >
                  {{ opr.label }}
                </el-radio>
              </template>
            </el-radio-group>
          </template>
          <!-- 单选框 END -->

          <!-- 多选框 START -->
          <template v-else-if="item.type === 'checkbox'">
            <el-checkbox-group v-model="item.value">
              <template v-if="item.buttonType === 'button'">
                <el-checkbox-button
                  v-for="opr in item.options"
                  :key="opr.value"
                  :label="opr.value"
                  :disabled="opr.disabled"
                >
                  {{ opr.label }}
                </el-checkbox-button>
              </template>
              <template v-else>
                <el-checkbox
                  v-for="opr in item.options"
                  :key="opr.value"
                  :label="opr.value"
                  :disabled="opr.disabled"
                >
                  {{ opr.label }}
                </el-checkbox>
              </template>
            </el-checkbox-group>
          </template>
          <!-- 多选框 END -->

          <!-- 多选框 START -->
          <template v-else-if="item.type === 'switch'">
            <el-switch
              v-model="item.value"
              :active-text="item.activeText"
              :inactive-text="item.inactiveText"
              :active-value="item.activeValue"
              :inactive-value="item.inactiveValue"
              :active-color="item.activeColoe"
              :inactive-color="item.inactiveColoe"
            >
            </el-switch>
          </template>
          <!-- 多选框 END -->

          <el-tooltip v-if="item.tip" :content="item.tip" placement="right">
            <i class="ml-10 el-icon-warning-outline"></i>
          </el-tooltip>
        </div>
      </el-form-item>

      <el-form-item v-if="isInlineBtn">
        <div>
          <el-button
            v-if="isShowFilter"
            size="mini"
            type="primary"
            @click="searchFn"
          >
            查询
          </el-button>
          <el-button v-if="isShowExport" size="mini" @click="exportFn">
            导出
          </el-button>
          <el-button v-if="isShowExportPass" size="mini" @click="exportPassFn">
            导出证件
          </el-button>
          <slot name="buttonR"></slot>
          <el-button
            v-if="isShowExport && isShowExportList"
            type="text"
            @click="seeRxoprt"
          >
            查看已导出列表
          </el-button>
          <el-button
            v-if="isShowFilter && isShowReset"
            type="text"
            @click="resetFn"
          >
            重置筛选内容
          </el-button>
        </div>
        <div>
          <slot></slot>
        </div>
      </el-form-item>
    </el-form>
    <div v-if="!isInlineBtn" class="SearchForm-bottom">
      <div>
        <el-button v-if="isShowFilter" type="primary" @click="searchFn">
          查询
        </el-button>
        <el-button v-if="isShowExport" @click="exportFn">导出</el-button>
        <el-button v-if="isShowExportPass" @click="exportPassFn"
          >导出证件</el-button
        >
        <slot name="buttonR"></slot>
        <el-button
          v-if="isShowExport && isShowExportList"
          type="text"
          @click="seeRxoprt"
        >
          查看已导出列表
        </el-button>
        <el-button
          v-if="isShowFilter && isShowReset"
          type="text"
          @click="resetFn"
        >
          重置筛选内容
        </el-button>
      </div>
      <div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { simpleCloneDeep } from "@/utils/index";
import CONST from "@/constants/index";
export default {
  props: {
    // 筛选表单
    formData: {
      type: Array,
      default: () => [],
    },
    // 行内表单模式
    inline: {
      type: Boolean,
      default: true,
    },
    // 是否显示筛选按钮
    isShowFilter: {
      type: Boolean,
      default: true,
    },
    // 是否显示导出按钮
    isShowExport: {
      type: Boolean,
      default: false,
    },
    // 是否显示导出证件按钮
    isShowExportPass: {
      type: Boolean,
      default: false,
    },
    // 是否显示查看已导出列表
    isShowExportList: {
      type: Boolean,
      default: false,
    },
    // 是否显示重置按钮
    isShowReset: {
      type: Boolean,
      default: true,
    },
    // 是否正常返回表单数据
    isReturnFormData: {
      type: Boolean,
      default: false,
    },
    // 是否操作按钮跟表单一行
    isInlineBtn: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // 时间选择快捷区间
      pickerOptions: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
      // 时间选择区快捷区间
      pickerOptions2: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      form: null,
    };
  },
  watch: {
    formData: {
      deep: true,
      handler() {
        this.handlerFormData(false);
      },
    },
  },
  methods: {
    /**
     * 处理搜索表单
     * @param {Boolean} isReset 是否重置 为true时会判断有没有默认值 有就使用默认值 没有就用源数据直接覆盖
     */
    handlerFormData(isReset = false) {
      this.form = simpleCloneDeep(this.formData);
      this.form.forEach((element) => {
        if (element.type === "datetimerange" && element?.value?.length) {
          this.$set(element, "value", element.value);
        } else if (
          element.type === "textrange" ||
          element.type === "datetimerange"
        ) {
          this.$set(element, "value", []);
        }
        // 如果存在 defaultValue 默认值，使用默认值
        if (isReset && element.defaultValue !== undefined) {
          this.$set(element, "value", element.defaultValue);
        }
      });
    },
    emitTemp(eventName) {
      if (this.isReturnFormData) {
        let obj = {};
        this.form.map((item) => {
          if (item.value) {
            obj[item.prop] = item.value;
          }
        });
        this.$emit(eventName, obj);
        return;
      }
      var rulesData = [];
      this.form.map((item) => {
        if (!item.value && item.value !== 0) return;
        if (item.type === "datetimerange" || item.type === "textrange") {
          if (item.value.length) {
            item.value[0] &&
              rulesData.push({
                field: item.prop,
                op: CONST.S_RULE.GT, // 大于
                data: item.value[0],
              });
            item.value[1] &&
              rulesData.push({
                field: item.prop,
                op: CONST.S_RULE.LT, // 小于等于
                data: item.value[1],
              });
          }
        } else {
          rulesData.push({
            field: item.prop,
            op: item.op || CONST.S_RULE.CN,
            data: item.value,
          });
        }
      });
      this.$emit(eventName, rulesData);
    },
    // 搜索
    searchFn() {
      this.emitTemp("on-search");
    },
    // 导出
    exportFn() {
      this.emitTemp("on-export");
    },
    // 导出证件
    exportPassFn() {
      this.emitTemp("on-exportPass");
    },
    // 重置为默认值
    resetFn() {
      this.handlerFormData(true);
      this.searchFn();
    },
    seeRxoprt() {
      this.$emit("see-rxoprt");
    },
  },
  created() {
    this.handlerFormData(false);
  },
};
</script>

<style lang="scss" scoped>
$paddingW: 18px;
.SearchForm {
  background-color: #f7f8fa;
  margin-bottom: 20px;
  padding: 20px;
  &.inlineBtnForm {
    padding-bottom: 0;
  }
  .el-form-item {
    padding: 0 $paddingW;
  }
  &-bottom {
    display: flex;
    justify-content: space-between;
    padding: 0 $paddingW;
    box-sizing: border-box;
  }
  .compose_item {
    display: flex;
    ::v-deep .el-input {
      margin-right: 10px;
      width: 215px;
    }
  }
  .form-item {
    display: flex;
    align-items: center;
  }
}
.textrange {
  display: flex;
  width: 300px;
  span {
    padding: 0 6px;
  }
}
</style>
