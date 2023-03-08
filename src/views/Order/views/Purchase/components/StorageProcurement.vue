<template>
  <div class="StorageProcurement view-container">
    <div class="title">入库盘点</div>
    <el-form ref="form" label-width="100px">
      <el-form-item label="供应商">
        <span class="label">
          {{ orderInfo.atSupplier && orderInfo.atSupplier.name }}</span
        >
      </el-form-item>
      <el-form-item label="商品名称">
        <span class="label">{{ orderInfo.productName || "" }}</span>
      </el-form-item>
      <el-form-item label="商品图片">
        <ImageView customClass="goods-img" :src="orderInfo.mainImage" />
      </el-form-item>
      <el-form-item label="入库商品规格">
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
          <!-- 采购总金额 -->
          <template #orderNumTotalAmount="{ scope }">
            {{
              (Number(scope.originalPrice || 0) * Number(scope.orderNum || 0))
                | formatCurrency
            }}
          </template>
          <template #putNum="{ scope }">
            <el-input-number
              class="putNum"
              v-model="scope.putNum"
              :placeholder="`采购数量`"
              :controls="false"
              :precision="0"
              :step="1"
            />
          </template>
          <!-- 入库总价 -->
          <template #putNumTotalAmount="{ scope }">
            {{
              (Number(scope.originalPrice || 0) * Number(scope.putNum || 0))
                | formatCurrency
            }}
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
    <FooterView :cancelType="true" @cancel="$emit('close', false)">
      <template>
        <el-button type="primary" :loading="isLoading" @click="handleSubmit">
          保存
        </el-button>
      </template>
    </FooterView>
  </div>
</template>
<script>
import { digits2Str } from "@/utils/index";
import FooterView from "@/components/Footer";
import { ProcurementColumn } from "../config/index";

export default {
  name: "StorageProcurement",
  components: { FooterView },
  props: {
    editInfo: {
      type: [Object, String],
      default: () => ({}),
    },
  },
  watch: {},
  data() {
    return {
      ProcurementColumn,
      isLoading: false,
      list: [],
      orderInfo: {},
      page: {
        pageNum: 1,
        pageSize: 5,
      },
    };
  },
  computed: {},
  methods: {
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.page.pageNum = 1;
    },
    handleCurrentChange(val) {
      this.page.pageNum = val;
    },
    async getOrderDetail() {
      if (!this.editInfo?.pdOrderNo) return;
      const [, res] = await this.$http.Order.GetPurchaseOrderDetail({
        pdOrderNo: this.editInfo.pdOrderNo || "",
      });
      if (!res) return this.$message.error("获取订单详情异常");
      const keys1 = ["serviceId"];
      digits2Str(res, keys1);
      const keys2 = ["productStockPriceId"];
      this.orderInfo = { ...res };
      this.list = this.orderInfo?.orderDetailsList?.length
        ? this.orderInfo.orderDetailsList
        : [];
      this.list.forEach((item) => digits2Str(item, keys2));
    },
    async handleVerify() {
      // eslint-disable-next-line
      return new Promise(async (resolve) => {
        try {
          for (const index in this.list) {
            const putNum = Number(this.list[index]?.putNum);
            const orderNum = Number(this.list[index]?.orderNum);
            if (!this.list[index]?.putNum && this.list[index]?.putNum !== 0) {
              throw new Error("请输入相关规格入库数量");
            } else if (putNum > orderNum)
              throw new Error(
                `相关规格入库数量(${putNum})不得大于采购数量(${orderNum})`
              );
          }
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
      const verify = await this.handleVerify();
      if (!verify) return;
      this.isLoading = true;
      const queryData = this.list.map((item) => ({
        ...item,
        putNum: item?.putNum || 0,
        pdOrderNo: this.editInfo.pdOrderNo,
      }));
      const [, res] = await this.$http.Order.ServiceStationStorageGoods(
        JSON.stringify(queryData)
      );
      this.isLoading = false;
      this.$message[res ? "success" : "error"](
        res?.msg || `提交采购单${res ? "成功" : "失败"}`
      );
      if (res) this.$emit("close", true);
    },
  },
  filters: {},
  mounted() {
    if (this.editInfo?.pdOrderNo) {
      this.orderInfo = {};
      this.getOrderDetail();
    }
  },
};
</script>
<style lang="scss" scoped>
.StorageProcurement {
  background: #fff;
  padding: 0 10px;
  margin: 0 0 60px;
  .title {
    font-size: 14px;
    font-weight: bold;
    color: $main-font-color;
    margin-bottom: 20px;
  }
  .label {
    font-size: 14px;
    color: $main-font-color;
  }
  .goods-img {
    width: 100px;
    height: 100px;
  }
  .putNum {
    width: 120px;
  }
}
</style>
