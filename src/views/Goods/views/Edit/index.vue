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
        <div class="association" v-if="isService && isServerEdit">
          <!-- 相似推荐 -->
          <SimilarSuggest ref="SimilarSuggest" :productInfo="productInfo" />
          <!-- 推荐购买 -->
          <SuggestPurchase ref="SuggestPurchase" :productInfo="productInfo" />
          <!-- 经常购买 -->
          <FrequentlyPurchased
            ref="FrequentlyPurchased"
            :productInfo="productInfo"
          />
        </div>
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
import { activityTab } from "./config";
import GoodsStep from "./components/GoodsStep.vue";
import GoodsInfo from "./components/GoodsInfo.vue";
import GoodsPreSale from "./components/GoodsPreSale.vue";
import GoodsServe from "./components/GoodsServe.vue";
import PricesStocks from "./components/PricesStocks";
import GoodsDetail from "./components/GoodsDetail";
import SimilarSuggest from "./components/Association/SimilarSuggest.vue";
import SuggestPurchase from "./components/Association/SuggestPurchase.vue";
import FrequentlyPurchased from "./components/Association/FrequentlyPurchased.vue";
import FooterView from "@/components/Footer";

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
      activityTab,
      activeIndex: 0, // 当前进度
      isLoading: false,
      isLoadingGoods: false,
      discountIs: "",
      BaseInfo: {},
      AssociationInfo: [],
      productNo: "", // 商品编码
      productInfo: {},
    };
  },
  computed: {
    ...mapState({
      isDisableForm: (state) => state.goods.isDisableForm,
      isServerEdit: (state) => state.goods.isServerEdit,
    }),
    ...mapGetters({
      isService: "user/isService",
      serviceStationId: "user/serviceStationId",
    }),
    setpList({ isService, isServerEdit }) {
      const setpArr = [
        { label: "编辑商品信息", key: "base" },
        { label: "商品关联信息", key: "association" },
      ];
      return isService && isServerEdit ? setpArr : [setpArr[0]];
    },
  },
  methods: {
    async getGoodsInfo() {
      if (!this.productNo || this.isLoadingGoods) return;
      this.isLoadingGoods = true;
      const query = {
        productNo: this.productNo || "",
      };
      if (this.isServerEdit && this.serviceStationId)
        query.serviceId = this.serviceStationId;
      const [, res] = await this.$http.Goods[
        this.isServerEdit && this.serviceStationId
          ? "GetServerGoodsInfo"
          : "GetGoodsInfo"
      ](query);
      this.isLoadingGoods = false;
      if (!res) return this.$message.error("获取商品详情异常");
      const JSONbigKeyArr = ["categoryId", "supplierId"];
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
        // 编辑商品关联信息
        const associationData1 = await this.$refs.SimilarSuggest.getQuery();
        const associationData2 = await this.$refs.SuggestPurchase.getQuery();
        const associationData3 =
          await this.$refs.FrequentlyPurchased.getQuery();
        this.AssociationInfo = {
          ...associationData1,
          ...associationData2,
          ...associationData3,
        };
        this.handleSubmit();
      }
    },
    goBack() {
      this.activeIndex--;
    },
    getActivityTab(data) {
      const keyArr = [...activityTab()];
      return keyArr
        .filter((item) => data[item.key] === item.is && item.label)
        .map((item) => item.label);
    },
    async DeleteGoodsService() {
      if (!this.productNo) return;
      const oldServiceList = this.productInfo?.productSerList || [];
      let oldIds = oldServiceList.map((item) => item?.id).join(",");
      const serviceList = this.BaseInfo?.productSerList || [];
      const ids = serviceList.filter((item) => item?.id);
      ids.map((item) => {
        oldIds = oldIds.replace(item.id, "");
      });
      const queryIds = oldIds.split(",").filter((id) => id);
      if (!queryIds?.length) return;
      const [, res] = await this.$http.Goods.DeleteGoodsService(
        JSON.stringify(queryIds)
      );
      if (!res) {
        this.$message.error(res?.msg || `更新商品服务失败`);
      }
    },
    async handleSubmit() {
      // 表单校验
      this.isLoading = true;
      const query = {
        ...this.productInfo,
        ...this.BaseInfo,
        ...this.AssociationInfo,
      };
      query.activeLabels = this.getActivityTab(query).join(",");
      if (this.isService) query.stationId = this.serviceStationId;
      const { REVIEW_TYPE } = this.$route?.query || {};
      const [, res] = await this.$http.Goods[
        REVIEW_TYPE === "REFRESH_REVIEW"
          ? "RefreshAuditGoods"
          : this.productNo
          ? "UpdateGoods"
          : "AddGoods"
      ](query);
      await this.DeleteGoodsService();
      this.$message[res ? "success" : "error"](
        res?.msg || `发布商品${res ? "成功" : "失败"}`
      );
      if (res) {
        this.$store.dispatch("tagsView/delView", this.$route);
        this.$router.push({
          name:
            REVIEW_TYPE === "REFRESH_REVIEW"
              ? "Audit"
              : this.isService
              ? "ServerGoodsList"
              : "GoodsList",
        });
      }
      this.isLoading = false;
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
