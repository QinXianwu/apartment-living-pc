<template>
  <div class="ApplicableGoods">
    <div class="title">适用商品</div>
    <div class="content">
      <el-form ref="form" :model="formData" :rules="rules" label-width="135px">
        <el-form-item label="适用商品类型" prop="productType">
          <el-radio-group v-model="formData.productType">
            <el-radio-button
              v-for="(item, index) in CONST.APPLY_PRODUCT_TYPE_OPTIONS()"
              :label="item.value"
              :value="item.value"
              :key="index"
              >{{ item.label }}</el-radio-button
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="适用商品"
          v-if="formData.productType === $CONST.APPLY_PRODUCT_TYPE.PART"
        >
          <el-button type="text" @click="chooseGoods">选择商品</el-button>
          <TablePanel
            ref="TablePanel"
            :tableData="
              list.slice(
                (page.pageNum - 1) * page.pageSize,
                page.pageNum * page.pageSize
              )
            "
            :tableHead="column"
          >
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
  </div>
</template>

<script>
import CONST from "@/constants/index";
import { GoodsColumn } from "./config/index";
import { digits2Str } from "@/utils/index";
export default {
  name: "ApplicableGoods",
  components: {},
  props: {
    selectGoods: {
      type: Array,
      default: () => [],
    },
    infoData: {
      type: Object,
      default: () => ({}),
    },
  },
  watch: {
    selectGoods(val) {
      this.list = val?.length ? val : [];
    },
    infoData(val) {
      if (val) this.init();
    },
  },
  data() {
    return {
      CONST,
      column: GoodsColumn,
      formData: {
        productType: CONST.APPLY_PRODUCT_TYPE.ALL,
      },
      rules: {},
      list: [],
      page: {
        pageNum: 1,
        pageSize: 5,
      },
    };
  },
  computed: {
    ids({ list }) {
      if (!list?.length) return [];
      return list.map((item) => item.id);
    },
  },
  methods: {
    init() {
      this.formData.productType =
        this.infoData?.productType || CONST.APPLY_PRODUCT_TYPE.ALL;
      if (this.infoData?.productType === CONST.APPLY_PRODUCT_TYPE.ALL) {
        this.list = [];
        return;
      }
      const goodsList = this.infoData?.productList || [];
      // this.formData.productType = CONST.APPLY_PRODUCT_TYPE.ALL;
      // const goodsList = [];
      goodsList.forEach((item) =>
        digits2Str(item, ["categoryId", "supplierId"])
      );
      this.list = [].concat(goodsList);
    },
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.page.pageNum = 1;
    },
    handleCurrentChange(val) {
      this.page.pageNum = val;
    },
    chooseGoods() {
      this.$emit("chooseGoods", this.ids);
    },
    handleDelete(index) {
      this.list.splice(index, 1);
    },
    async getQuery() {
      // eslint-disable-next-line
      return new Promise(async (resolve) => {
        // 表单校验
        try {
          const valid = await this.$refs.form.validate();
          if (!valid) {
            return null;
          }
        } catch (error) {
          return error;
        }
        const productType = this.formData.productType;
        if (
          productType === CONST.APPLY_PRODUCT_TYPE.PART &&
          !this.list?.length
        ) {
          return this.$message.error("请选择商品后再试");
        }
        resolve({
          ...this.formData,
          productIds:
            productType === CONST.APPLY_PRODUCT_TYPE.ALL
              ? ""
              : this.list.map((item) => item.productNo).join(","),
        });
      });
    },
  },
  mounted() {
    //
  },
};
</script>
<style lang="scss" scoped>
.ApplicableGoods {
  background: #fff;
  padding: 0 10px;
  margin: 0 0 60px;
  .title {
    font-size: 15px;
    font-weight: bold;
    color: $main-font-color;
    margin-bottom: 20px;
  }
  .goodsInfo {
    width: 100%;
    display: flex;
    align-items: center;
<<<<<<< HEAD
    justify-content: center;
=======
>>>>>>> d0739a6b459e4945672b0a74ebdfd09268e7f1ae
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
