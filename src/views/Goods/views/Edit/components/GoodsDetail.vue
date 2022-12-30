<template>
  <div class="GoodsDetail">
    <div class="title">商品详情</div>
    <div class="content">
      <el-form ref="form" :model="formData" label-width="120px">
        <el-form-item label="主图" prop="mainImage">
          <Uploader
            :list.sync="formData.mainImage"
            tip="建议尺寸：800 x 800像素，小于1M，支持jpg、png、jpeg格式"
          />
        </el-form-item>
        <el-form-item label="轮播图" prop="bannerImage">
          <Uploader
            tip="最多上传9张，建议尺寸：1000 x 600像素，小于1M，支持jpg、png、jpeg格式"
            :list.sync="formData.bannerImage"
            :count="9"
          />
        </el-form-item>
        <el-form-item label="商品详情" prop="productDetails">
          <Tinymce
            ref="Editor"
            v-model="formData.productDetails"
            :height="500"
          />
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Uploader from "@/components/Uploader";
import Tinymce from "@/components/Tinymce";

export default {
  name: "GoodsDetail",
  components: { Uploader, Tinymce },
  props: {
    productInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      formData: {},
    };
  },
  watch: {
    productInfo(val) {
      if (val) this.init();
    },
  },
  computed: {},
  methods: {
    init() {
      const data = {
        mainImage: [],
        bannerImage: [],
        productDetails: "",
      };
      const keyStr = "mainImage,bannerImage";
      const keyArr = Object.keys(data);
      keyArr.forEach((key) => {
        if (keyStr.includes(key) && this.productInfo[key])
          data[key] = [{ url: this.productInfo[key] }];
        else if (this.productInfo[key]) data[key] = this.productInfo[key];
      });
      this.formData = { ...data };
    },
    async getQuery() {
      // eslint-disable-next-line
      return new Promise(async (resolve) => {
        if (!this.formData?.mainImage || !this.formData?.mainImage?.length)
          return this.$message.error("请上传商品主图");
        const data = { ...this.formData };
        data.mainImage = data.mainImage[0].url;
        data.bannerImage = data.bannerImage?.length
          ? data.bannerImage.map((item) => item.url).join(",")
          : "";
        // 表单校验
        resolve({
          ...data,
        });
      });
    },
  },
  mounted() {
    this.init();
  },
};
</script>
<style lang="scss" scoped>
.GoodsDetail {
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
