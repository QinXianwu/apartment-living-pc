<template>
  <div class="Goods view-container">
    <div class="content">
      <SearchForm isReturnFormData :formData="formData" @on-search="onSearch" />
      <TablePanel :tableData="list" :tableHead="column">
        <template #goodsTab="{ scope }">
          {{ $CONST.PROTOCOL_TYPE_TEXT[scope.type] }}
        </template>
        <!-- 操作 -->
        <template #action="{ scope }">
          <div class="action-groud">
            <el-button type="text" @click="handleEdit(scope)"> 编辑 </el-button>
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
      <DrawerPopup v-model="showUpdataGoods">
        <!-- 更新商品 -->
        <!-- <UpdateProtocol
          v-if="showUpdateProtocol"
          :editInfo="editInfo"
          @close="close"
        /> -->
      </DrawerPopup>
    </div>
  </div>
</template>

<script>
import { formData, column } from "./config";

export default {
  name: "Goods",
  components: {},
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
      selectDataMap: {},
      showUpdataGoods: false,
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
    handleEdit() {
      //
    },
    async handleDelete() {
      const ids = Object.keys(this.selectDataMap).join(",");
      try {
        await this.$confirm(
          `是否确认删除日志编号为${ids}的数据项？`,
          "删除提示",
          {
            type: "warning",
            showClose: false,
          }
        );
        const [, res] = await this.$http.OperationalLogs.DeleteOperLog({
          operId: ids,
        });
        const msg = res ? res?.msg || `删除成功` : `删除失败`;
        this.$confirm(msg, "删除提示", {
          showClose: false,
          showCancelButton: false,
          type: res ? "success" : "error",
        }).then(() => {
          if (res) {
            this.selectDataMap = {};
            this.getList();
          }
        });
      } catch (error) {
        console.error(error);
        error;
      }
    },
  },
  mounted() {
    //
  },
};
</script>
<style lang="scss" scoped></style>
