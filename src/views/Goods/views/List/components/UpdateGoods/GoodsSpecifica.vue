<template>
  <div class="GoodsSpecifica">
    <div class="title">价格与库存</div>
    <div class="content">
      <el-form label-width="120px">
        <el-form-item label="商品规格">
          <div class="specifica">
            <div class="specifica-item">
              <div class="specifica-input">
                <!--  -->
              </div>
            </div>
          </div>
          <div class="action">
            <el-button type="primary" @click="addSpecifica">新增服务</el-button>
          </div>
        </el-form-item>
        <el-form-item label="价格库存">
          <!--  -->
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import CONST from "@/constants/index";

export default {
  name: "GoodsSpecifica",
  components: {},
  props: {},
  data() {
    return {
      CONST,
      formData: {},
      list: [],
      rules: {},
    };
  },
  watch: {},
  computed: {},
  methods: {
    addSpecifica() {
      this.list.push({
        serviceName: "",
        serviceDescribe: "",
      });
    },
    handleDelete(index) {
      this.list.splice(index, 1);
    },
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
      return this.formData;
    },
  },
  mounted() {
    this.$store.dispatch("goods/GetSpecificaListAction");
  },
};
</script>
<style lang="scss" scoped>
.GoodsSpecifica {
  padding: 20px 20px 0;
  .title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .content {
    width: 800px;
  }
  .action {
    padding: 10px 0;
  }
  ::v-deep .el-radio-button__inner {
    padding: 9px 20px;
  }
}
</style>
