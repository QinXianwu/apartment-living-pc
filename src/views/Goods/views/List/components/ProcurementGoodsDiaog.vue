<template>
  <el-dialog
    title="采购单"
    :visible.sync="visible"
    width="900px"
    v-loading="isLoading"
    @close="handleClose(false)"
  >
    <el-form ref="form" label-width="100px" v-loading="isLoadingGoods">
      <el-form-item label="商品名称">
        <span>{{ productInfo.productName || "" }}</span>
      </el-form-item>
      <el-form-item label="商品图片">
        <ImageView customClass="goods-img" :src="productInfo.mainImage" />
      </el-form-item>
      <el-form-item label="采购商品规格">
        <TablePanel
          ref="TablePanel"
          :tableData="
            list.slice(
              (page.pageNum - 1) * page.pageSize,
              page.pageNum * page.pageSize
            )
          "
          :tableHead="ProcurementColumn"
        >
          <template #procurementNum="{ scope }">
            <el-input-number
              class="procurementNum"
              v-model="scope.num"
              placeholder="采购数量"
              :min="0"
              :controls="false"
              :precision="0"
              :step="1"
            />
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
      <el-form-item label="合计采购价">
        <span class="totalAmount">￥{{ totalAmount | formatCurrency }}</span>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button type="primary" :loading="isLoading" @click="handleSubmit">
        保存
      </el-button>
      <el-button @click="handleClose(false)"> 取消 </el-button>
    </span>
  </el-dialog>
</template>
<script>
import { digits2Str } from "@/utils/index";
import dialogMixin from "@/mixins/dialogMixin";
import { ProcurementColumn } from "../config/index";
export default {
  name: "ProcurementGoodsDiaog",
  mixins: [dialogMixin],
  props: {
    editInfo: {
      type: [Object, String],
      default: () => ({}),
    },
  },
  watch: {
    visible(val) {
      if (val && this.editInfo?.productNo) {
        this.getGoodsInfo();
      } else {
        this.productInfo = {};
      }
    },
  },
  data() {
    return {
      ProcurementColumn,
      isLoading: false,
      isLoadingGoods: false,
      list: [],
      productInfo: {},
      page: {
        pageNum: 1,
        pageSize: 5,
      },
    };
  },
  computed: {
    totalAmount({ list }) {
      if (!list.length) return 0;
      let amount = 0;
      list.forEach((item) => {
        amount += (item?.originalPrice || 0) * (item?.num || 0);
      });
      return amount;
    },
  },
  methods: {
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.page.pageNum = 1;
    },
    handleCurrentChange(val) {
      this.page.pageNum = val;
    },
    async getGoodsInfo() {
      if (!this.editInfo?.productNo || this.isLoadingGoods) return;
      this.isLoadingGoods = true;
      const [, res] = await this.$http.Goods.GetGoodsInfo({
        productNo: this.editInfo.productNo || "",
      });
      this.isLoadingGoods = false;
      if (!res) return this.$message.error("获取商品详情异常");
      const keys1 = ["categoryId"];
      digits2Str(res, keys1);
      this.productInfo = { ...res };
      this.list = this.productInfo?.productStockPriceList?.length
        ? this.productInfo.productStockPriceList
        : [];
    },
    async handleVerify() {
      // eslint-disable-next-line
      return new Promise(async (resolve) => {
        try {
          let sum = 0;
          for (const index in this.list) {
            // if (!Number(this.list[index]?.num)) {
            //   throw new Error("请输入相关规格采购数量");
            // }
            sum += Number(this.list[index]?.num || 0);
          }
          if (!sum) throw new Error("请输入相关规格采购数量");
        } catch (error) {
          this.$message.error(error);
          return false;
        }
        // 表单校验
        resolve(true);
      });
    },
    // 处理提交
    async handleSubmit() {
      if (!this.list?.length)
        return this.$message.error("该商品暂无规格可采购");
      const verify = await this.handleVerify();
      if (!verify) return;
      this.isLoading = true;
      const queryData = this.list.map((item) => ({
        num: item?.num || 0,
        productStockPriceId: item.id,
        productNo: this.editInfo.productNo,
      }));
      const [, res] = await this.$http.ProcurementManage.ProcurementGoods(
        JSON.stringify(queryData)
      );
      this.isLoading = false;
      this.$message[res ? "success" : "error"](
        res?.msg || `提交采购单${res ? "成功" : "失败"}`
      );
      if (res) this.handleClose(true);
    },
  },
};
</script>
<style lang="scss" scoped>
.goods-img {
  width: 100px;
  height: 100px;
}
.totalAmount {
  color: #000;
  font-size: 18px;
  font-weight: bold;
}
.procurementNum {
  width: 120px;
}
</style>
