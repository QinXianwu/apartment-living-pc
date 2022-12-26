<template>
  <div class="SimilarSuggest">
    <div class="title">相似推荐</div>
    <div class="content">
      <el-form ref="form" :model="formData" label-width="120px">
        <el-form-item label="相似推荐">
          <el-button type="text" @click="chooseGoods">选择商品</el-button>
          <TablePanel
            :tableData="list"
            :tableHead="serveColumn"
            :checkbox="true"
            :isShowTopCheck="false"
            @selection-change="handleSelectionChange"
          >
            <!-- 操作 -->
            <template #action="{ scope }">
              <div class="action-groud">
                <el-button type="text" @click="handleDelete(scope.id)">
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
import { serveColumn } from "../config/index";

export default {
  name: "SimilarSuggest",
  components: {},
  props: {},
  data() {
    return {
      serveColumn,
      formData: {},
      list: [],
      selectDataMap: {},
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
    chooseGoods() {
      this.$emit("chooseGoods", {
        key: "SimilarSuggest",
        selectDataMap: this.selectDataMap,
      });
    },
    handleDelete() {
      //
    },
    handleSelectionChange(val) {
      this.list.forEach((item) => {
        // 存在于当前页以及map 但不存在 val -> 去掉
        const index = val.findIndex((vItem) => vItem?.id === item.id);
        if (this.selectDataMap[item.id] && index < 0)
          delete this.selectDataMap[item.id];
      });
      val.forEach((item) => (this.selectDataMap[item.id] = { ...item }));
      this.isDisabledDelete = !Object.keys(this.selectDataMap).length;
    },
    initSelection() {
      if (!this.list?.length) return;
      this.list.forEach((item) => {
        if (this.selectDataMap[item?.id]) {
          this.$nextTick(() => {
            this.$refs.TablePanel.setSelection(item, true);
          });
        }
      });
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
