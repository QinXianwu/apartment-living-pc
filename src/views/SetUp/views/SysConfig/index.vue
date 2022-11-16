<template>
  <div class="view-container">
    <div class="content">
      <TablePanel :tableData="list" :tableHead="column">
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
        :page-size="page.size"
        :current-page="page.current"
        :total="total"
      />
    </div>
    <UpdateSysConfigDiaog
      :editInfo="editInfo"
      :show.sync="isUpdateSysConfig"
      @close="close"
    />
  </div>
</template>

<script>
import { column } from "./config";
import UpdateSysConfigDiaog from "./components/UpdateSysConfigDiaog.vue";
export default {
  name: "SysConfig",
  components: { UpdateSysConfigDiaog },
  data() {
    return {
      column, //表格头
      list: [],
      editInfo: {},
      isUpdateSysConfig: false,
      page: {
        size: 10,
        current: 1,
      },
      query: {},
      total: 0,
    };
  },
  computed: {},
  methods: {
    handleSizeChange(val) {
      this.page.size = val;
      this.page.current = 1;
      this.getList(true);
    },
    handleCurrentChange(val) {
      this.page.current = val;
      this.getList(false);
    },
    handleEdit(item) {
      this.editInfo = item;
      this.isUpdateSysConfig = true;
    },
    close(isRefresh = false) {
      this.editInfo = {};
      this.isUpdateSysConfig = false;
      if (isRefresh) this.getList();
    },
    async getList(isClear) {
      if (isClear) this.page.current = 1;
      const [, res] = await this.$http.SysConfig.GetSysConfigList({
        ...this.page,
        paramData: { ...this.query },
      });
      this.list = res?.list?.length ? res.list : [];
      this.total = res.total;
    },
  },
  mounted() {
    this.getList();
  },
};
</script>
<style lang="scss" scoped>
.view-container {
  background-color: #fff;
}
.bulk-operations {
  padding: 10px 0;
}
.batch {
  padding: 10px 0;
}
</style>
