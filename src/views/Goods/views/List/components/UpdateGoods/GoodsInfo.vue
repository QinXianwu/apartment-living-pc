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
          <el-input v-model="formData.productName" class="input-medium" />
        </el-form-item>
        <el-form-item label="副标题" prop="productName">
          <el-input v-model="formData.productName" class="input-medium" />
        </el-form-item>
        <el-form-item label="商品标签" prop="productName">
          <el-input v-model="formData.productName" class="input-medium" />
        </el-form-item>
        <el-form-item label="供应商名称" prop="productName">
          <el-input v-model="formData.productName" class="input-medium" />
        </el-form-item>
        <el-form-item label="是否为特价商品" prop="productName">
          <el-input v-model="formData.productName" class="input-medium" />
        </el-form-item>
        <el-form-item label="是否进行折扣" prop="discountIs">
          <el-input v-model="formData.discountIs" class="input-medium" />
        </el-form-item>
        <el-form-item label="是否进行限购" prop="isLimit">
          <el-input v-model="formData.isLimit" class="input-medium" />
        </el-form-item>
        <el-form-item label="限购" prop="productName">
          <el-input-number
            v-model="formData.nub"
            :step="1"
            :min="1"
            :max="999999"
          ></el-input-number>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "GoodsInfo",
  components: {},
  data() {
    return {
      formData: {},
      rules: {},
    };
  },
  computed: {
    ...mapGetters({
      categoryAllOptions: "goods/CategoryAllOptions",
    }),
  },
  methods: {},
  mounted() {
    this.$store.dispatch("goods/GetCategoryAllAction");
    console.log(this.categoryAllOptions);
  },
};
</script>
<style lang="scss" scoped>
.GoodsInfo {
  padding: 20px 0;
  .title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 20px;
  }
}
</style>
