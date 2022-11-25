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
      <DepartmentManage v-if="activeName === 'DepartmentManage'" />
      <PostManage v-if="activeName === 'PostManage'" />
    </div>
  </div>
  <Page401 v-else />
</template>
<script>
import Page401 from "@/views/ErrorPage/401";
import PostManage from "./components/PostManage/index.vue";
import DepartmentManage from "./components/DepartmentManage/index.vue";

export default {
  name: "DepartmentPostManage",
  components: {
    DepartmentManage,
    PostManage,
    Page401,
  },
  data() {
    return {
      isPermission: false,
      activeName: "DepartmentManage",
      tabPaneList: [
        {
          label: "部门管理",
          name: "DepartmentManage",
          permission: this.$PERMISSION_ID.SetUp_AccountManage,
        },
        {
          label: "岗位管理",
          name: "PostManage",
          permission: this.$PERMISSION_ID.SetUp_PostManage,
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
