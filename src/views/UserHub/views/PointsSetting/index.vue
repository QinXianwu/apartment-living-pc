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
      <PointsSignIn v-if="activeName === 'PointsSignIn'" />
      <PointsRules v-if="activeName === 'PointsRules'" />
      <TeamSharePoints v-if="activeName === 'TeamSharePoints'" />
    </div>
  </div>
  <Page401 v-else />
</template>
<script>
import Page401 from "@/views/ErrorPage/401";
import PointsSignIn from "./components/PointsSignIn/index.vue";
import PointsRules from "./components/PointsRules/index.vue";
import TeamSharePoints from "./components/TeamSharePoints/index.vue";

export default {
  name: "PointsSetting",
  components: {
    PointsSignIn,
    PointsRules,
    TeamSharePoints,
    Page401,
  },
  data() {
    return {
      isPermission: false,
      activeName: "PointsSignIn",
      tabPaneList: [
        {
          label: "积分签到",
          name: "PointsSignIn",
          permission: this.$PERMISSION_ID.UserHub_PointsSetting_PointsSignIn,
        },
        {
          label: "积分规则",
          name: "PointsRules",
          permission: this.$PERMISSION_ID.UserHub_PointsSetting_PointsRules,
        },
        {
          label: "组队瓜分积分",
          name: "TeamSharePoints",
          permission: this.$PERMISSION_ID.UserHub_PointsSetting_TeamSharePoints,
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
