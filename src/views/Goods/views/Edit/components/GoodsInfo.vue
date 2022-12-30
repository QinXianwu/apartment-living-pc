<template>
  <div class="GoodsInfo">
    <div class="title">商品信息</div>
    <div class="content">
      <el-form ref="form" :rules="rules" :model="formData" label-width="120px">
        <el-form-item label="商品分类" prop="categoryId">
          <el-cascader
            v-model="formData.categoryId"
            class="input-medium"
            :options="categoryAllOptions"
            :props="{
              emitPath: false,
              checkStrictly: true,
            }"
          />
        </el-form-item>
        <el-form-item label="商品名称" prop="productName">
          <el-input
            v-model="formData.productName"
            class="input-medium"
            placeholder="请输入商品名称"
          />
        </el-form-item>
        <el-form-item label="副标题" prop="title">
          <el-input
            v-model="formData.title"
            class="input-medium"
            placeholder="请输入副标题"
          />
        </el-form-item>
        <el-form-item label="商品标签" prop="productTag">
          <el-select
            v-model="formData.productTag"
            class="input-medium"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="请输入商品标签"
          >
            <el-option
              v-for="item in []"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <div class="form-tip">
            <span>在输入框输入标签内容后点击回车（enter）按键可新增标签</span>
          </div>
        </el-form-item>
        <el-form-item
          label="供应商"
          prop="supplierId"
          v-if="isAdmin || isService"
        >
          <el-select
            v-model="formData.supplierId"
            placeholder="请选择供应商"
            class="input-medium"
          >
            <el-option
              v-for="item in supplierOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="上下架" prop="operStatus">
          <el-radio-group v-model="formData.operStatus">
            <el-radio-button
              v-for="(item, index) in operStatusOptions"
              :label="item.value"
              :value="item.value"
              :key="index"
              >{{ item.label }}</el-radio-button
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否为特价商品" prop="bargainIs">
          <el-radio-group v-model="formData.bargainIs">
            <el-radio-button
              v-for="(item, index) in CONST.SPECIALS_TYPE_OPTIONS()"
              :label="item.value"
              :value="item.value"
              :key="index"
              >{{ item.label }}</el-radio-button
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否进行折扣" prop="discountIs">
          <el-radio-group v-model="formData.discountIs">
            <el-radio-button
              v-for="(item, index) in CONST.DISCOUNTED_TYPE_OPTIONS()"
              :key="index"
              :value="item.value"
              :label="item.value"
              >{{ item.label }}</el-radio-button
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否进行限购" prop="isLimit">
          <el-radio-group v-model="formData.isLimit">
            <el-radio-button
              v-for="(item, index) in CONST.RESTRICTED_TYPE_OPTIONS()"
              :label="item.value"
              :value="item.value"
              :key="index"
              >{{ item.label }}</el-radio-button
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="限购"
          prop="productName"
          v-if="formData.isLimit === CONST.RESTRICTED_TYPE.YES"
        >
          <el-input-number
            class="input-medium"
            v-model="formData.limitNum"
            :step="1"
            :min="1"
            :max="999999"
          />
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CONST from "@/constants/index";

export default {
  name: "GoodsInfo",
  components: {},
  props: {
    productInfo: {
      type: Object,
      default: () => ({}),
    },
    discountIs: {
      type: [Number, String],
      default: CONST.DISCOUNTED_TYPE.NOT,
    },
  },
  data() {
    return {
      CONST,
      formData: {
        productTag: [],
      },
      rules: {
        categoryId: [
          {
            required: true,
            message: "请选择商品分类",
            trigger: "blur",
          },
        ],
        productName: [
          {
            required: true,
            message: "请输入商品名称",
            trigger: "blur",
          },
        ],
      },
    };
  },
  watch: {
    productInfo(val) {
      if (val) this.init();
    },
    "formData.isLimit"(val) {
      if (val === this.CONST.RESTRICTED_TYPE.NOT)
        this.$set(this.formData, "limitNum", 0);
      else if (val === this.CONST.RESTRICTED_TYPE.YES)
        this.$set(this.formData, "limitNum", 1);
    },
    "formData.discountIs"(val) {
      this.$emit("update:discountIs", val);
    },
  },
  computed: {
    ...mapGetters({
      isAdmin: "user/isAdmin",
      isService: "user/isService",
      categoryAllOptions: "goods/CategoryAllOptions",
      supplierOptions: "accountRoleManage/supplierOptions",
    }),
    operStatusOptions() {
      return [
        {
          label: CONST.GOODS_OPER_STATE_TEXT[CONST.GOODS_OPER_STATE.LISTING],
          value: CONST.GOODS_OPER_STATE.LISTING,
        },
        {
          label: CONST.GOODS_OPER_STATE_TEXT[CONST.GOODS_OPER_STATE.REMOVAL],
          value: CONST.GOODS_OPER_STATE.REMOVAL,
        },
      ];
    },
  },
  methods: {
    init() {
      const data = {
        categoryId: "",
        productName: "",
        title: "",
        supplierId: "",
        limitNum: "",
        operStatus: CONST.GOODS_OPER_STATE.LISTING,
        bargainIs: CONST.SPECIALS_TYPE.NOT,
        discountIs: CONST.DISCOUNTED_TYPE.NOT,
        isLimit: CONST.RESTRICTED_TYPE.NOT,
      };
      const keyArr = Object.keys(data);
      keyArr.forEach((key) => {
        if (this.productInfo[key]) data[key] = this.productInfo[key];
      });
      if (this.productInfo?.productTag)
        data.productTag = this.productInfo.productTag.split(",");
      this.formData = { ...data };
    },
    async getQuery() {
      // console.log(this.formData);
      // eslint-disable-next-line
      return new Promise(async (resolve) => {
        // 表单校验
        try {
          const valid = await this.$refs.form.validate();
          if (!valid) {
            return null;
          }
        } catch (error) {
          if (!this.formData?.categoryId)
            return this.$message.error("请选择商品分类");
          if (!this.formData?.productName)
            return this.$message.error("请输入商品名称");
        }
        resolve({
          ...this.formData,
        });
      });
    },
  },
  mounted() {
    this.init();
    this.$store.dispatch("goods/GetCategoryAllAction");
    this.$store.dispatch("accountRoleManage/GetSupplierListAction");
  },
};
</script>
<style lang="scss" scoped>
.GoodsInfo {
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
