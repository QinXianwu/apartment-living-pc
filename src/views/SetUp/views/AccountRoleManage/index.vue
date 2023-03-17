<template>
  <div class="view-container" v-if="isPermission">
    <el-tabs v-model="activeName">
      <template v-for="(item, index) in tabPaneList">
        <el-tab-pane
          :label="item.label"
          :name="item.name"
          :key="index"
          v-if="$hasPermission(item.permission)"
        />
      </template>
    </el-tabs>

    <div class="content">
      <UserManage v-if="activeName === 'UserManage'" />
      <RoleManage v-if="activeName === 'RoleManage'" />
    </div>
  </div>
  <Page401 v-else />
</template>
<script>
import Page401 from "@/views/ErrorPage/401";
import RoleManage from "./components/RoleManage/index.vue";
import UserManage from "./components/UserManage/index.vue";

export default {
  name: "AccountRoleManage",
  components: {
    UserManage,
    RoleManage,
    Page401,
  },
  data() {
    return {
      isPermission: false,
      activeName: "UserManage",
      tabPaneList: [
        {
          label: "账号管理",
          name: "UserManage",
          permission: this.$PERMISSION_ID.SetUp_AccountManage,
        },
        {
          label: "角色管理",
          name: "RoleManage",
          permission: this.$PERMISSION_ID.SetUp_RoleManage,
        },
      ],
    };
  },
  methods: {},
  mounted() {
    try {
      this.tabPaneList.forEach((item) => {
        if (this.$hasPermission(item.permission)) {
          this.isPermission = true;
          this.activeName = item.name;
          throw new Error();
        }
      });
    } catch (error) {
      //
    }
  },
};
</script>

<style lang="scss" scoped>
.view-container {
  background: #ffffff;
  .content {
    padding: 20px 0;
  }
}
</style>
