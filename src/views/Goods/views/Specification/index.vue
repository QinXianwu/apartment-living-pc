<template>
  <div class="Specification view-container">
    <div class="content">
      <SearchForm isReturnFormData :formData="formData" @on-search="onSearch" />
      <div class="action">
        <el-button type="primary" @click="handleAdd">新增规格</el-button>
        <el-button type="danger" @click="handleBatchDelete">批量删除</el-button>
      </div>
      <TablePanel
        :tableData="list"
        :tableHead="column"
        :checkbox="true"
        :isShowTopCheck="false"
        @selection-change="handleSelectionChange"
      >
        <template #status="{ scope }">
          <el-tag
            :type="scope.status === $CONST.SPECIFICA_TYPE.OFF ? 'danger' : ''"
            >{{ $CONST.SPECIFICA_TYPE_TEXT[scope.status] }}</el-tag
          >
        </template>
        <!-- 操作 -->
        <template #action="{ scope }">
          <div class="action-groud">
            <el-button type="text" @click="handleEdit(scope)"> 编辑 </el-button>
            <el-button type="text" @click="handleDelete([scope.id])">
              删除
            </el-button>
            <el-button type="text" @click="handleSpecifica(scope)">
              规格值管理
            </el-button>
          </div>
        </template>
      </TablePanel>
      <!-- 分页 -->
      <Pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-size="page.pageSize"
        :current-page="page.pageNum"
        :total="total"
      />
    </div>
    <UpdateSpecificaDiaog
      :editInfo="editInfo"
      :show.sync="showUpdataSpecifica"
      @close="close"
    />
    <UpdateSpecificaValDiaog
      :editInfo="editValInfo"
      :show.sync="showUpdataSpecificaVal"
      @close="closeVal"
    />
    <DrawerPopup v-model="showSpecificaValue">
      <!-- 管理规格值 -->
      <UpdateSpecificaValue
        ref="UpdateSpecificaValue"
        v-if="showSpecificaValue"
        :editInfo="editInfo"
        @close="close"
        @showSpecificaVal="updateSpecificaVal"
      />
    </DrawerPopup>
  </div>
</template>

<script>
import { formData, column } from "./config";
import UpdateSpecificaDiaog from "./components/UpdateSpecificaDiaog.vue";
import UpdateSpecificaValue from "./components/UpdateSpecificaValue.vue";
import UpdateSpecificaValDiaog from "./components/UpdateSpecificaValDiaog.vue";
export default {
  name: "Specification",
  components: {
    UpdateSpecificaDiaog,
    UpdateSpecificaValue,
    UpdateSpecificaValDiaog,
  },
  data() {
    return {
      formData,
      column,
      list: [],
      page: {
        pageNum: 1,
        pageSize: 10,
      },
      query: {},
      total: 0,
      editInfo: {},
      editValInfo: {},
      selectDataMap: {},
      showUpdataSpecifica: false,
      showSpecificaValue: false,
      showUpdataSpecificaVal: false,
    };
  },
  computed: {},
  methods: {
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.page.pageNum = 1;
      this.getList(true);
    },
    handleCurrentChange(val) {
      this.page.pageNum = val;
      this.getList(false);
    },
    onSearch(data) {
      this.query = { ...data };
      this.getList(true);
    },
    handleAdd() {
      this.editInfo = "";
      this.showUpdataSpecifica = true;
    },
    handleEdit({ id }) {
      this.editInfo = { id };
      this.showUpdataSpecifica = true;
    },
    handleSpecifica({ id }) {
      this.editInfo = { id };
      this.showSpecificaValue = true;
    },
    updateSpecificaVal(data) {
      this.editValInfo = data || {};
      this.showUpdataSpecificaVal = true;
    },
    closeVal(isRefresh = false) {
      this.editValInfo = "";
      this.showUpdataSpecificaVal = false;
      if (isRefresh) this.$refs.UpdateSpecificaValue.getList(isRefresh);
    },
    close(isRefresh = false) {
      this.editInfo = "";
      this.showUpdataSpecifica = false;
      this.showSpecificaValue = false;
      if (isRefresh) this.getList(isRefresh);
    },
    // 批量删除
    handleBatchDelete() {
      if (!Object.keys(this.selectDataMap)?.length)
        return this.$message.error("请选择规格后再试");
      const ids = Object.keys(this.selectDataMap);
      this.handleDelete(ids);
    },
    async handleDelete(ids) {
      try {
        await this.$confirm(
          `是否确认删除规格ID为${ids}的数据项？`,
          "删除提示",
          {
            type: "warning",
            showClose: false,
          }
        );
        const [, res] = await this.$http.GoodsSpecification.DeleteSpecifica(
          JSON.stringify(ids)
        );
        const msg = res ? res?.msg || `删除成功` : `删除失败`;
        this.$confirm(msg, "删除提示", {
          showClose: false,
          showCancelButton: false,
          type: res ? "success" : "error",
        }).then(() => {
          if (res) {
            this.selectDataMap = {};
            this.getList();
            this.$store.dispatch("goods/GetSpecificaListAction", true);
          }
        });
      } catch (error) {
        console.error(error);
        error;
      }
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
    async getList(isClear) {
      if (isClear) this.page.pageNum = 1;
      const query = {
        ...this.page,
        ...this.query,
      };
      const [, res] = await this.$http.GoodsSpecification.GetList(query);
      if (res?.code !== this.AJAX_CODE.SUCCESS) {
        this.$message.error(res?.msg || "获取商品规格列表异常");
      }
      this.list = res?.rows || [];
      this.total = res?.total || 0;
      this.initSelection();
    },
  },
  mounted() {
    this.getList();
  },
};
</script>
<style lang="scss" scoped>
.view-container {
  background: #fff;
}
.action {
  padding: 0 0 15px;
}
</style>
