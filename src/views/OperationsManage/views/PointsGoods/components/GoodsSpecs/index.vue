<template>
  <div class="GoodsSpecs">
    <div class="title">商品规格</div>
    <div class="content">
      <el-form ref="form" :model="formData" :rules="rules" label-width="110px">
        <el-form-item label="商品规格">
          <el-button type="text" @click="chooseSpecs">选择商品规格</el-button>
          <TablePanel
            :tableData="
              list.slice(
                (page.pageNum - 1) * page.pageSize,
                page.pageNum * page.pageSize
              )
            "
            :tableHead="tableHead"
          >
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
import { column } from "./config/index";
// import { digits2Str } from "@/utils/index";

export default {
  name: "GoodsSpecs",
  components: {},
  props: {
    productNo: {
      type: String,
      default: "",
    },
    // 是否是单选
    isRadio: {
      type: Boolean,
      default: false, // 默认多选
    },
    selectSpecs: {
      type: Array,
      default: () => [],
    },
    specsList: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    selectSpecs(val) {
      this.list = val?.length ? val : [];
    },
    specsList(val) {
      if (val) this.init();
    },
  },
  data() {
    return {
      CONST,
      column,
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
    tableHead({ column, list }) {
      let isDeleteId2 = true;
      try {
        list.forEach((item) => {
          if (item?.specificationValueName2) {
            isDeleteId2 = false;
            throw new Error();
          }
        });
      } catch (error) {
        //
      }
      const filterPropStr = `custom_checkbox,${
        isDeleteId2 ? "specificationValueName2" : ""
      }`;
      return column.filter((item) => !filterPropStr.includes(item.prop));
    },
    ids({ list }) {
      if (!list?.length) return [];
      return list.map((item) => item.id);
    },
  },
  methods: {
    init() {
      const specsList = this.specsList?.length ? this.specsList : [];
      // specsList.forEach((item) =>
      //   digits2Str(item, ["categoryId", "supplierId"])
      // );
      this.list = [].concat(specsList);
    },
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.page.pageNum = 1;
    },
    handleCurrentChange(val) {
      this.page.pageNum = val;
    },
    chooseSpecs() {
      if (!this.productNo) return this.$message.error("请选择商品后再试");
      this.$emit("chooseSpecs", this.ids);
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
        if (!this.list?.length) return this.$message.error("请选择规格后再试");
        const specsData = this.list[0];
        resolve({
          ...this.formData,
          productStockPriceId: specsData.id,
          stock: specsData?.stock || 0,
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
.GoodsSpecs {
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
