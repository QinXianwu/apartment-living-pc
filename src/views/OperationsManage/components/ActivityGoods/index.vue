<template>
  <div class="ActivityGoods">
    <div class="title">适用商品</div>
    <div class="content">
      <el-form ref="form" :model="formData" :rules="rules" label-width="110px">
        <el-form-item label="适用商品">
          <el-button type="text" @click="chooseGoods" v-if="isAction"
            >选择商品</el-button
          >
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
            <!-- 秒杀价 -->
            <template #spikePrice="{ scope }">
              <span>
                {{ scope | priceRange("spikePriceMin", "spikePriceMax") }}
              </span>
            </template>
            <!-- 拼团价 -->
            <template #groupPrice="{ scope }">
              <span>
                {{ scope | priceRange("groupPriceMin", "groupPriceMax") }}
              </span>
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
            v-if="!isRadio"
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
  name: "ActivityGoods",
  components: {},
  props: {
    isAction: {
      type: Boolean,
      default: true,
    },
    // 是否是单选
    isRadio: {
      type: Boolean,
      default: false, // 默认多选
    },
    // 显示秒杀价
    showSpikePrice: {
      type: Boolean,
      default: false,
    },
    // 显示拼团价
    showGroupPrice: {
      type: Boolean,
      default: false,
    },
    selectGoods: {
      type: Array,
      default: () => [],
    },
    goodsList: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    selectGoods(val) {
      this.list = val?.length ? val : [];
    },
    goodsList(val) {
      if (val) this.init();
    },
  },
  data() {
    return {
      CONST,
      GoodsColumn,
      formData: {},
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
    column({ isAction, showSpikePrice, showGroupPrice, GoodsColumn }) {
      const filterPropStr = `${isAction ? "" : "action"},${
        showSpikePrice ? "" : "spikePrice"
      },${showGroupPrice ? "" : "groupPrice"}`;
      return GoodsColumn.filter((item) => !filterPropStr.includes(item.prop));
    },
  },
  methods: {
    init() {
      const goodsList = this.goodsList?.length ? this.goodsList : [];
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
      this.$emit("updateSelectList", this.list);
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
        if (!this.list?.length) return this.$message.error("请选择商品后再试");
        const product = this.list[0];
        const radioData = {
          product,
          productId: product.id,
          productNo: product.productNo,
        };
        const noRadioData = {
          productIds: this.ids,
          productList: this.list,
        };

        resolve({
          ...this.formData,
          ...(this.isRadio ? radioData : noRadioData),
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
.ActivityGoods {
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
    justify-content: center;
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
