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
      <SessionCount v-if="activeName === 'SessionCount'" />
      <ActivityList v-if="activeName === 'ActivityList'" />
    </div>
  </div>
  <Page401 v-else />
</template>
<script>
import Page401 from "@/views/ErrorPage/401";
import ActivityList from "./components/ActivityList/index.vue";
import SessionCount from "./components/SessionCount/index.vue";

export default {
  name: "FastDeals",
  components: {
    SessionCount,
    ActivityList,
    Page401,
  },
  data() {
    return {
      isPermission: false,
      activeName: "SessionCount",
      tabPaneList: [
        {
          label: "秒杀活动场次",
          name: "SessionCount",
          permission:
            this.$PERMISSION_ID.OperationsManage_FastDeals_SessionCount,
        },
        {
          label: "秒杀活动列表",
          name: "ActivityList",
          permission:
            this.$PERMISSION_ID.OperationsManage_FastDeals_ActivityList,
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
