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
      <Membership v-if="activeName === 'Membership'" />
    </div>
  </div>
  <Page401 v-else />
</template>
<script>
import Page401 from "@/views/ErrorPage/401";
import Membership from "./components/Membership/index.vue";

export default {
  name: "Client",
  components: {
    Membership,
    Page401,
  },
  data() {
    return {
      isPermission: false,
      activeName: "Membership",
      tabPaneList: [
        {
          label: "会员卡管理",
          name: "Membership",
          permission: this.$PERMISSION_ID.UserHub_Client_Membership,
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
}
</style>
