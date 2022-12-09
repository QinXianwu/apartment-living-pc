<template>
  <div class="GoodsInfo">
    <div class="title">商品信息</div>
    <div class="content">
      <el-form ref="form" :rules="rules" :model="formData" label-width="120px">
        <el-form-item label="商品分类" prop="name">
          <el-cascader v-model="formData.c" :options="[]"></el-cascader>
        </el-form-item>
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="formData.name" class="input-medium" />
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsInfo",
  components: {},
  data() {
    return {
      formData: {},
      rules: {},
    };
  },
  computed: {},
  methods: {},
  mounted() {
    //
  },
};
</script>
<style lang="scss" scoped></style>
