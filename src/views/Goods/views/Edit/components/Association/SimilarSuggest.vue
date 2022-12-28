<template>
  <div class="SimilarSuggest">
    <div class="title">相似推荐</div>
    <div class="content">
      <el-form ref="form" :model="formData" label-width="120px">
        <el-form-item label="相似推荐">
          <el-button type="text" @click="chooseGoods">选择商品</el-button>
          <TablePanel :tableData="list" :tableHead="column">
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
    <ChooseServeGoodsDiaog :show.sync="showServeGoods" @close="close" />
  </div>
</template>

<script>
import { column } from "./config/index";
import ChooseServeGoodsDiaog from "./ChooseServeGoodsDiaog.vue";
export default {
  name: "SimilarSuggest",
  components: { ChooseServeGoodsDiaog },
  props: {},
  data() {
    return {
      column,
      formData: {},
      list: [],
      selectDataMap: {},
      page: {
        pageNum: 1,
        pageSize: 5,
      },
      showServeGoods: false,
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
    chooseGoods() {
      this.showServeGoods = true;
    },
    handleDelete(index) {
      this.list.splice(index, 1);
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
          ...this.formData,
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
}
</style>
