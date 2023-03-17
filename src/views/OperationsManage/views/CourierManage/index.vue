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
      <CourierList v-if="activeName === 'CourierList'" />
      <CourierWithdrawals v-if="activeName === 'CourierWithdrawals'" />
    </div>
  </div>
  <Page401 v-else />
</template>
<script>
import Page401 from "@/views/ErrorPage/401";
import CourierList from "./components/CourierList/index.vue";
import CourierWithdrawals from "./components/CourierWithdrawals/index.vue";

export default {
  name: "CourierManage",
  components: {
    CourierList,
    CourierWithdrawals,
    Page401,
  },
  data() {
    return {
      isPermission: false,
      activeName: "CourierList",
      tabPaneList: [
        {
          label: "配送员列表",
          name: "CourierList",
          permission: this.$PERMISSION_ID.OperationsManage_CourierList,
        },
        {
          label: "配送员提现",
          name: "CourierWithdrawals",
          permission: this.$PERMISSION_ID.OperationsManage_CourierWithdrawals,
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
