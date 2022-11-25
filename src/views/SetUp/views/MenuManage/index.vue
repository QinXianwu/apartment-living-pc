<template>
  <div class="MenuManage">
    <div class="content view-container">
      <SearchForm isReturnFormData :formData="formData" @on-search="onSearch" />
      <div class="action">
        <el-button type="primary" @click="handleAdd"> 新增菜单 </el-button>
        <el-button type="primary" @click="handleExpandAll" plain>
          {{ isExpandAll ? "折叠菜单列表" : "展开菜单列表" }}
        </el-button>
      </div>
      <TablePanel
        v-if="refreshTable"
        rowKey="menuId"
        :tableData="list"
        :tableHead="column"
        :isExpandAll="isExpandAll"
      >
        <template #status="{ scope }">
          <el-tag
            :type="scope.status === $CONST.MENU_STATE.OFF ? 'danger' : ''"
            >{{ $CONST.MENU_STATE_TEXT[scope.status] }}</el-tag
          >
        </template>
        <!-- 操作 -->
        <template #action="{ scope }">
          <div class="action-groud">
            <el-button type="text" @click="handleEdit(scope)"> 编辑 </el-button>
            <el-button type="text" @click="handleDelete(scope)">
              删除
            </el-button>
            <el-dropdown trigger="click">
              <span class="el-dropdown-link more"> 更多 </span>
              <el-dropdown-menu
                slot="dropdown"
                style="min-width: 100px; text-align: center"
              >
                <el-dropdown-item>
                  <div @click.stop="handleSubAdd(scope)">
                    <span>新增子菜单</span>
                  </div>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </template>
      </TablePanel>
      <!-- 分页 -->
      <!-- <Pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-size="page.pageSize"
        :current-page="page.pageNum"
        :total="total"
      /> -->
    </div>
    <UpdateMenuDiaog
      :editInfo="editInfo"
      :show.sync="isUpdateMenu"
      @close="close"
    />
  </div>
</template>

<script>
import { column, formData } from "./config";
import { handleTree } from "@/utils";
import UpdateMenuDiaog from "./components/UpdateMenuDiaog.vue";
export default {
  name: "MenuManage",
  components: { UpdateMenuDiaog },
  data() {
    return {
      formData,
      column, //表格头
      editInfo: "",
      isUpdateMenu: false,
      isExpandAll: false,
      refreshTable: true, // 重新渲染表格状态
      list: [],
      page: {
        pageNum: 1,
        pageSize: 10,
      },
      total: 0,
      query: {}, //过滤规则
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
    handleExpandAll() {
      this.refreshTable = false;
      this.isExpandAll = !this.isExpandAll;
      this.$nextTick(() => (this.refreshTable = true));
    },
    handleAdd() {
      this.editInfo = "";
      this.isUpdateMenu = true;
    },
    handleSubAdd({ menuId }) {
      this.editInfo = { parentId: menuId };
      this.isUpdateMenu = true;
    },
    handleEdit({ menuId }) {
      this.editInfo = { menuId: menuId };
      this.isUpdateMenu = true;
    },
    async handleDelete({ menuId }) {
      try {
        await this.$confirm("确定要删除该菜单吗?", "删除提示", {
          type: "warning",
          showClose: false,
        });
        const [, res] = await this.$http.MenuManage.DeleteMenu({
          menuId,
        });
        const msg = res ? res?.msg || `删除成功` : `删除失败`;
        this.$confirm(msg, "删除提示", {
          showClose: false,
          showCancelButton: false,
          type: res ? "success" : "error",
        }).then(() => {
          if (res) {
            this.getList();
            this.$store.dispatch(
              "accountRoleManage/GetMenuTreeListAction",
              true
            );
          }
        });
      } catch (error) {
        console.error(error);
        error;
      }
    },
    close(isRefresh = false) {
      this.editInfo = "";
      this.isUpdateMenu = false;
      if (isRefresh) this.getList();
    },
    async getList(isClear) {
      if (isClear) this.page.pageNum = 1;
      const query = {
        // ...this.page,
        ...this.query,
      };
      const [, res] = await this.$http.MenuManage.GetMenuList(query);
      this.list = res?.length ? handleTree(res, "menuId") : [];
      // this.total = res?.total || 0;
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
  padding: 10px 0 15px;
}
.action-groud {
  .more {
    color: $menuActiveText;
    cursor: pointer;
  }
}
</style>
