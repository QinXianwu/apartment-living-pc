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
      <AlibabaPay v-if="activeName === 'AlibabaPay'" />
    </div>
  </div>
  <Page401 v-else />
</template>

<script>
import Page401 from "@/views/ErrorPage/401";
import AlibabaPay from "./components/AlibabaPay/index.vue";
export default {
  name: "PayConfig",
  components: {
    AlibabaPay,
    Page401,
  },
  data() {
    return {
      isPermission: false,
      activeName: "AlibabaPay",
      tabPaneList: [
        {
          label: "支付宝账号管理",
          name: "AlibabaPay",
          permission: this.$PERMISSION_ID.SetUp_AliPayManagement,
        },
      ],
    };
  },
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
  background: #fff;
  .content {
    padding: 20px 0;
  }
}
</style>
