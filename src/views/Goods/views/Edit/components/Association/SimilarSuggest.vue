<template>
  <div class="SimilarSuggest">
    <div class="title">相似推荐</div>
    <div class="content">
      <el-form ref="form" :model="formData" label-width="120px">
        <el-form-item label="相似推荐">
          <el-button type="text" @click="chooseGoods">选择商品</el-button>
          <TablePanel :tableData="list" :tableHead="column">
            <template #goodsInfo="{ scope }">
              <div class="goodsInfo">
                <ImageView customClass="table-img" :src="scope.mainImage" />
                <div class="name">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="scope.productName"
                    placement="right"
                  >
                    <span>{{ scope.productName }}</span>
                  </el-tooltip>
                </div>
              </div>
            </template>
            <!-- 操作 -->
            <template #action="{ index }">
              <div class="action-groud">
                <el-button type="text" @click="handleDelete(index)">
                  删除
                </el-button>
              </div>
            </template>
          </TablePanel>
          <!-- 分页 -->
          <Pagination
            :fixed="false"
            :pageSizes="[5, 10, 20, 50, 100]"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-size="page.pageSize"
            :current-page="page.pageNum"
            :total="list.length"
          />
        </el-form-item>
      </el-form>
    </div>
    <ChooseServeGoodsDiaog
      :selectIds="selectIds"
      :show.sync="showServeGoods"
      @close="close"
      @on-success="handleChooseGoods"
    />
  </div>
</template>

<script>
import { column } from "./config/index";
import { isField, digits2Str } from "@/utils/index";
import ChooseServeGoodsDiaog from "./ChooseServeGoodsDiaog.vue";
export default {
  name: "SimilarSuggest",
  components: { ChooseServeGoodsDiaog },
  props: {
    productInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      column,
      formData: {},
      list: [],
      page: {
        pageNum: 1,
        pageSize: 5,
      },
      showServeGoods: false,
      productNo: "",
    };
  },
  watch: {
    productInfo(val) {
      if (val) this.init();
    },
  },
  computed: {
    selectIds({ list }) {
      return list.map((item) => item.id);
    },
  },
  methods: {
    init() {
      const data = this.productInfo?.similarProductList?.length
        ? this.productInfo.similarProductList
        : [];
      data.forEach((item) => {
        digits2Str(item, ["productId"]);
        if (!isField(item, "id")) item.id = item.productId;
      });
      this.list = data;
    },
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.page.pageNum = 1;
    },
    handleCurrentChange(val) {
      this.page.pageNum = val;
    },
    chooseGoods() {
      this.showServeGoods = true;
    },
    handleDelete(index) {
      this.list.splice(index, 1);
    },
    handleChooseGoods(data) {
      this.list = data?.length ? data : [];
    },
    close() {
      this.showServeGoods = false;
    },
    async getQuery() {
      // eslint-disable-next-line
      return new Promise(async (resolve) => {
        // 表单校验
        try {
          const valid = await this.$refs.form.validate();
          if (!valid) {
            return false;
          }
        } catch (error) {
          //
        }
        resolve({
          similarProductList: this.list.map((item) => ({
            categoryName: item.categoryName,
            productId: item.id,
            mainImage: item.mainImage,
            productName: item.productName,
            productNo: item.productNo,
          })),
        });
      });
    },
  },
  mounted() {
    const { query } = this.$route;
    this.productNo = query?.productNo || "";
    this.init();
  },
};
</script>
<style lang="scss" scoped>
.SimilarSuggest {
  padding: 20px 20px 0;
  .title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .content {
    width: 1000px;
  }
  ::v-deep .el-radio-button__inner {
    padding: 9px 20px;
  }
  .goodsInfo {
    display: flex;
    align-items: center;
    .table-img {
      width: 60px;
      height: 60px;
    }
    .name {
      margin-left: 10px;
      @include overflow-eps(2);
    }
  }
}
</style>
