<template>
  <div class="UpdateGoods">
    <div class="title">
      {{ editInfo && editInfo.id ? "编辑商品" : "新增商品" }}
    </div>
    <div class="content">
      <GoodsStep :activeIndex="activeIndex" :setpList="setpList" />
      <GoodsInfo />
    </div>
    <!-- 底部按钮 -->
    <FooterView
      :activeIndex="activeIndex"
      :isUpdate="!!editInfo.id"
      :setpAll="setpList.length - 1"
      @cancel="$emit('close', false)"
      @next="next"
      @goBack="goBack"
    />
  </div>
</template>

<script>
import GoodsStep from "./GoodsStep.vue";
import GoodsInfo from "./GoodsInfo.vue";
import FooterView from "./Footer.vue";

export default {
  name: "UpdateGoods",
  components: { GoodsStep, GoodsInfo, FooterView },
  props: {
    editInfo: {
      type: [Object, String],
      default: () => ({}),
    },
  },
  data() {
    return {
      activeIndex: 0, // 当前进度
      isLoading: false,
      isLoadingGoods: false,
      setpList: [{ label: "编辑商品信息" }, { label: "商品关联信息" }],
    };
  },
  computed: {},
  methods: {
    async getGoodsInfo() {
      if (!this.editInfo?.id) return;
      this.isLoadingGoods = true;
      // const [, res] = await this.$http.ProtocolManage.GetAgreementInfo({
      //   id: this.editInfo?.id || "",
      // });
      this.isLoadingGoods = false;
      // this.formData = { ...this.formData, ...(res || {}) };
    },
    async next() {
      if (this.activeIndex < this.setpList.length - 1) this.activeIndex++;
      if (this.activeIndex === 0) {
        //编辑基本信息
        // const data1 = await this.$refs.CommodityType.getQuery();
        // const data2 = await this.$refs.BaseInfo.getQuery();
        // const data3 = await this.$refs.DetailsInfo.getQuery();
        // this.BaseInfo = { ...data1, ...data2, ...data3 };
        // this.activeIndex++;
      } else if (this.activeIndex === 1) {
        //编辑详情
        // const SpecificaData = await this.$refs.Specifica.getQuery();
        // if (!SpecificaData) return;
        // if (!SpecificaData.is_multiple_specs) {
        //   SpecificaData.skus[0].sku_image = this.BaseInfo.image;
        // }
        // this.SpecificaData = SpecificaData;
        // this.activeIndex++;
      }
    },
    goBack() {
      this.activeIndex--;
    },
    async handleSubmit() {
      // 表单校验
      try {
        const valid = await this.$refs.form.validate();
        if (!valid) {
          return;
        }
      } catch (error) {
        return;
      }
      this.isLoading = true;
      // const [, res] = await this.$http.ProtocolManage.UpdateAgreement({
      //   type: this.editInfo?.type || "",
      //   agreement: this.formData?.agreement,
      // });
      this.isLoading = false;
      // this.$message[res ? "success" : "error"](
      //   res?.msg || `修改账号密码${res ? "成功" : "失败"}`
      // );
      // if (res) this.$emit("close", true);
    },
  },
  mounted() {
    this.getGoodsInfo();
  },
};
</script>
<style lang="scss" scoped>
.title {
  font-size: 14px;
  font-weight: bold;
  color: $main-font-color;
}
.content {
  padding: 10px 0;
}
</style>
