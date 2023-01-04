<template>
  <div class="Edit view-container">
    <div class="title">
      {{ productNo ? "编辑商品" : "新增商品" }}
    </div>
    <div class="content">
      <GoodsStep :activeIndex="activeIndex" :setpList="setpList" />
      <div class="next-0" v-show="activeIndex === 0">
        <!-- 商品基础信息 -->
        <GoodsInfo
          ref="GoodsInfo"
          :productInfo="productInfo"
          :discountIs.sync="discountIs"
        />
        <!-- 商品预售 -->
        <GoodsPreSale ref="GoodsPreSale" :productInfo="productInfo" />
        <!-- 商品服务 -->
        <GoodsServe ref="GoodsServe" :productInfo="productInfo" />
        <!-- 价格与库存 -->
        <PricesStocks
          ref="PricesStocks"
          :productInfo="productInfo"
          :discountIs="discountIs"
        />
        <!-- 商品详情 -->
        <GoodsDetail ref="GoodsDetail" :productInfo="productInfo" />
      </div>
      <div class="next-1" v-show="activeIndex === 1">
        <!-- 相似推荐 -->
        <SimilarSuggest ref="SimilarSuggest" />
        <!-- 推荐购买 -->
        <SuggestPurchase ref="SuggestPurchase" />
        <!-- 经常购买 -->
        <FrequentlyPurchased ref="FrequentlyPurchased" />
      </div>
    </div>
    <!-- 底部按钮 -->
    <FooterView
      :activeIndex="activeIndex"
      :isUpdate="!!productNo"
      :setpAll="setpList.length - 1"
      :isShowSave="true"
      :isDisable="isDisableForm"
      @next="next"
      @goBack="goBack"
    />
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import GoodsStep from "./components/GoodsStep.vue";
import GoodsInfo from "./components/GoodsInfo.vue";
import GoodsPreSale from "./components/GoodsPreSale.vue";
import GoodsServe from "./components/GoodsServe.vue";
import PricesStocks from "./components/PricesStocks";
import GoodsDetail from "./components/GoodsDetail";
import SimilarSuggest from "./components/Association/SimilarSuggest.vue";
import SuggestPurchase from "./components/Association/SuggestPurchase.vue";
import FrequentlyPurchased from "./components/Association/FrequentlyPurchased.vue";
import FooterView from "@/components/Footer/";

export default {
  name: "Edit",
  components: {
    GoodsStep,
    GoodsInfo,
    GoodsPreSale,
    GoodsServe,
    PricesStocks,
    GoodsDetail,
    SimilarSuggest,
    SuggestPurchase,
    FrequentlyPurchased,
    FooterView,
  },
  props: {},
  data() {
    return {
      activeIndex: 0, // 当前进度
      isLoading: false,
      isLoadingGoods: false,
      discountIs: "",
      BaseInfo: {},
      productNo: "", // 商品编码
      productInfo: {},
    };
  },
  computed: {
    ...mapState({
      isDisableForm: (state) => state.goods.isDisableForm,
    }),
    ...mapGetters({
      isService: "user/isService",
      serviceStationId: "user/serviceStationId",
    }),
    setpList({ isService }) {
      const setpArr = [
        { label: "编辑商品信息", key: "base" },
        { label: "商品关联信息", key: "association" },
      ];
      return isService ? setpArr : [setpArr[0]];
    },
  },
  methods: {
    async getGoodsInfo() {
      if (!this.productNo || this.isLoadingGoods) return;
      this.isLoadingGoods = true;
      const [, res] = await this.$http.Goods.GetGoodsInfo({
        productNo: this.productNo || "",
      });
      this.isLoadingGoods = false;
      if (!res) return this.$message.error("获取商品详情异常");
      const JSONbigKeyArr = ["id", "categoryId"];
      JSONbigKeyArr.forEach((key) => {
        if (res[key]) res[key] = this.$JSONbig.stringify(res[key]);
      });
      this.productInfo = { ...res };
    },
    async next() {
      const key = this.setpList[this.activeIndex].key;
      if (key === "base") {
        //编辑基本信息
        const data1 = await this.$refs.GoodsInfo.getQuery();
        const data2 = await this.$refs.GoodsPreSale.getQuery();
        const data3 = await this.$refs.GoodsServe.getQuery();
        const data4 = await this.$refs.PricesStocks.getQuery();
        const data5 = await this.$refs.GoodsDetail.getQuery();
        data1.productTag = data1?.productTag?.length
          ? data1.productTag.join(",")
          : "";
        this.BaseInfo = { ...data1, ...data2, ...data3, ...data4, ...data5 };
        if (!this.isService) {
          this.handleSubmit();
          return;
        }
        this.activeIndex++;
      } else if (key === "association") {
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
      this.isLoading = true;
      const query = {
        ...this.productInfo,
        ...this.BaseInfo,
      };
      if (this.isService) query.stationId = this.serviceStationId;
      const [, res] = await this.$http.Goods[
        this.productNo ? "UpdateGoods" : "AddGoods"
      ](query);
      this.isLoading = false;
      this.$message[res ? "success" : "error"](
        res?.msg || `发布商品${res ? "成功" : "失败"}`
      );
      if (res) {
        this.$store.dispatch("tagsView/delView", this.$route);
        this.$router.push({
          name: "GoodsList",
        });
      }
    },
    // 初始化操作
    async initLoad() {
      const { query } = this.$route;
      this.productNo = query?.productNo || "";
      this.productInfo = {};
      this.getGoodsInfo();
    },
  },
  // 依然需要mounted是为了应对直接按F5刷新的时候不会触发activated，
  mounted() {
    this.hasMounted = true;
    this.initLoad();
  },
  // 激活的时候重新获取列表
  // this.hasMounted 是防止页面正常跳转（非F5刷新）第一次进入的时候触发两次
  activated() {
    if (this.hasMounted) {
      this.hasMounted = false;
    } else {
      this.initLoad();
    }
  },
};
</script>
<style lang="scss" scoped>
.Edit {
  margin-bottom: 60px;
  background: #fff;
  .title {
    font-size: 14px;
    font-weight: bold;
    color: $main-font-color;
  }
  .content {
    padding: 20px 0;
  }
}
</style>
