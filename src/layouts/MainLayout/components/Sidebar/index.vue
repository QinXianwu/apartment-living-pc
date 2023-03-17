<template>
  <div class="has-logo">
    <Logo :collapse="isCollapse" />
    <ElScrollbar wrap-class="scrollbar-wrapper">
      <ElMenu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="'#304156'"
        :text-color="'#bfcbd9'"
        :unique-opened="false"
        :active-text-color="'#409eff'"
        :collapse-transition="false"
        mode="vertical"
      >
        <SidebarItem
          v-for="(route, i) in routesList"
          :key="`${route.path}-${i}`"
          :item="route"
          :base-path="route.path"
        />
      </ElMenu>
    </ElScrollbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
// import { asyncRoutes } from "@/router";
export default {
  components: { Logo, SidebarItem },
  computed: {
    ...mapGetters(["sidebar"]),
    routesList() {
      // return asyncRoutes;
      // return this.$router.options.routes; // 展示使用路由的结构
      return this.$store.state.permission.routes; // 计算权限后的路由
    },
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    isCollapse() {
      return !this.sidebar.opened;
    },
  },
};
</script>
