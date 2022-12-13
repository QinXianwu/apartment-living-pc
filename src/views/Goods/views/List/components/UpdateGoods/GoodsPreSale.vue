<template>
  <div class="GoodsPreSale">
    <div class="title">商品预售</div>
    <div class="content">
      <el-form ref="form" :rules="rules" :model="formData" label-width="120px">
        <el-form-item label="开启预售" prop="isPre">
          <el-radio-group v-model="formData.isPre">
            <el-radio-button
              v-for="(item, index) in CONST.PRE_SALE_TYPE_OPTIONS()"
              :label="item.value"
              :value="item.value"
              :key="index"
              >{{ item.label }}</el-radio-button
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="指定日期"
          v-if="formData.isPre === CONST.PRE_SALE_TYPE.YES"
          prop="preFhDate"
        >
          <el-date-picker
            v-model="formData.preFhDate"
            type="date"
            :picker-options="preDatePickerOptions"
            placeholder="选择日期时间"
            value-format="yyyy-MM-dd"
          />
          <span class="form-tip ml-10">之后开始发货，超过日期后正常售卖</span>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import CONST from "@/constants/index";

export default {
  name: "GoodsPreSale",
  components: {},
  props: {
    isPre: {
      type: Boolean,
      default: false,
    },
    preFhDate: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      CONST,
      formData: {
        isPre: CONST.PRE_SALE_TYPE.NOT,
        preFhDate: "",
      },
      preDatePickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7; //如果没有后面的-8.64e7就是不可以选择今天的
        },
      },
      rules: {
        preFhDate: [
          {
            required: true,
            message: "请选择商品预售日期",
            trigger: "blur",
          },
        ],
      },
    };
  },
  watch: {
    "formData.isPre"(val) {
      if (val === this.CONST.PRE_SALE_TYPE.NOT) {
        this.$set(this.formData, "preFhDate", "");
        this.$emit("update:preFhDate", "");
      }
    },
  },
  computed: {},
  methods: {
    async handleSubmit() {
      // 表单校验
      try {
        const valid = await this.$refs.form.validate();
        if (!valid) {
          return false;
        }
      } catch (error) {
        return false;
      }
      this.$emit("success", this.formData);
      this.$emit("update:isPre", this.formData.isPre);
      this.$emit("update:preFhDate", this.formData.preFhDate);
      return this.formData;
    },
  },
  mounted() {
    //
  },
};
</script>
<style lang="scss" scoped>
.GoodsPreSale {
  padding: 20px 20px 0;
  .title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  ::v-deep .el-radio-button__inner {
    padding: 9px 20px;
  }
}
</style>
