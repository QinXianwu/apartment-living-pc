<template>
  <div class="VendorList view-container">
    <div class="content">
      <SearchForm isReturnFormData :formData="formData" @on-search="onSearch" />
      <div class="action">
        <el-button type="primary" @click="handleAdd">新增服务点</el-button>
      </div>
      <TablePanel :tableData="list" :tableHead="column">
        <template #address="{ scope }">
          <div class="address">
            <el-tooltip
              class="item"
              effect="dark"
              :content="scope | addressFilter"
              placement="right"
            >
              <span>{{ scope | addressFilter }}</span>
            </el-tooltip>
          </div>
        </template>
        <template #status="{ scope }">
          <el-tag
            :type="
              scope.status === CONST.SERVICE_STATION_STATE.OFF ? 'danger' : ''
            "
            >{{ CONST.SERVICE_STATION_STATE_TEXT[scope.status] }}</el-tag
          >
        </template>
        <!-- 操作 -->
        <template #action="{ scope }">
          <div class="action-groud">
            <el-button type="text" @click="handleEdit(scope)"> 编辑 </el-button>
            <el-button type="text" @click="switchStatus(scope)">
              {{
                scope.status === CONST.SERVICE_STATION_STATE.ON
                  ? CONST.SERVICE_STATION_STATE_TEXT[
                      CONST.SERVICE_STATION_STATE.OFF
                    ]
                  : CONST.SERVICE_STATION_STATE_TEXT[
                      CONST.SERVICE_STATION_STATE.ON
                    ]
              }}
            </el-button>
            <el-button type="text" @click="handleDelete(scope)">
              删除
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
    <DrawerPopup v-model="showServiceDetail">
      <UpdateService
        v-if="showServiceDetail"
        :editInfo="editInfo"
        @close="close"
      />
    </DrawerPopup>
  </div>
</template>

<script>
import { formData, column } from "./config";
import CONST from "@/constants/index";
import UpdateService from "./components/UpdateService.vue";
export default {
  components: { UpdateService },
  data() {
    return {
      CONST,
      formData,
      column, //表格头
      list: [],
      page: {
        pageNum: 1,
        pageSize: 10,
      },
      query: {},
      editInfo: {},
      total: 0,
      showServiceDetail: false,
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
      this.editInfo = {};
      this.showServiceDetail = true;
    },
    handleEdit(item) {
      this.editInfo = { id: item?.id || "" };
      this.showServiceDetail = true;
    },
    async handleDelete({ id, name }) {
      try {
        await this.$confirm(`确认删除 '${name}' 服务点吗？`, "删除提示", {
          type: "warning",
          showClose: false,
        });
        const [, res] = await this.$http.ServiceStation.DeleteServiceStation({
          id,
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
              "accountRoleManage/GetServiceStationListAction",
              true
            );
          }
        });
      } catch (error) {
        console.error(error);
        error;
      }
    },
    async switchStatus({ id, name, status }) {
      const tempStatus =
        status === CONST.SERVICE_STATION_STATE.ON
          ? CONST.SERVICE_STATION_STATE.OFF
          : CONST.SERVICE_STATION_STATE.ON;
      const title = CONST.SERVICE_STATION_STATE_TEXT[tempStatus];
      try {
        await this.$confirm(`${title}'${name}' 服务点状态吗？`, "修改状态", {
          type: "warning",
          showClose: false,
        });
        const [, res] =
          await this.$http.ServiceStation.UpdateServiceStationStatus({
            id,
            status: tempStatus,
          });
        const msg = res ? res?.msg || `${title}成功` : `${title}失败`;
        this.$confirm(msg, "修改状态", {
          showClose: false,
          showCancelButton: false,
          type: res ? "success" : "error",
        }).then(() => {
          if (res) {
            this.getList();
            this.$store.dispatch(
              "accountRoleManage/GetServiceStationListAction",
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
      this.showServiceDetail = false;
      if (isRefresh) this.getList();
    },
    async getList(isClear) {
      if (isClear) this.page.pageNum = 1;
      const query = {
        ...this.page,
        ...this.query,
      };
      const [, res] = await this.$http.ServiceStation.GetServiceStationList(
        query
      );
      if (res?.code !== this.AJAX_CODE.SUCCESS) {
        this.$message.error(res?.msg || "获取服务点列表异常");
      }
      const data = res?.rows?.length ? res?.rows : [];
      this.list = data || [];
      this.total = res?.total || 0;
    },
  },
  filters: {
    addressFilter(data) {
      let address = "";
      const keyArr = ["province", "city", "district", "detailAddress"];
      keyArr.forEach((key) => {
        if (data[key]) address += data[key];
      });
      return address;
    },
  },
  mounted() {
    this.getList();
  },
};
</script>
<style lang="scss" scoped>
.VendorList {
  background: #fff;
  .userInfo {
    display: flex;
    align-items: center;
    .user-avatar {
      width: 60px;
      height: 60px;
    }
    .user-name {
      @include overflow-eps(1);
    }
  }
  .address {
    @include overflow-eps(2);
  }
  .action {
    padding: 0 0 15px;
  }
}
</style>
