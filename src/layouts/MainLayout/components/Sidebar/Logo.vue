<template>
  <div class="sidebar-logo-container" :class="{ collapse: collapse }">
    <transition name="sidebarLogoFade">
      <router-link
        v-if="collapse"
        to="/Home"
        key="collapse"
        v-slot="{ navigate }"
        class="sidebar-logo-link"
        custom
      >
        <span @click="navigate" @keypress.enter="navigate">
          <img
            v-if="tenantInfo.logo"
            :src="tenantInfo.logo"
            class="sidebar-logo"
          />
          <h1 v-else class="sidebar-title">{{ tenantInfo.name }}</h1>
        </span>
      </router-link>
      <router-link
        v-else
        to="/Home"
        key="expand"
        v-slot="{ navigate }"
        class="sidebar-logo-link"
        custom
      >
        <span @click="navigate" @keypress.enter="navigate">
          <img
            v-if="tenantInfo.logo"
            :src="tenantInfo.logo"
            class="sidebar-logo"
          />
          <h1 class="sidebar-title">{{ tenantInfo.name }}</h1>
        </span>
      </router-link>
    </transition>
  </div>
</template>

<script>
export default {
  name: "SidebarLogo",
  props: {
    collapse: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    // 租户信息
    tenantInfo() {
      return this.$store.getters.tenantInfo;
    },
  },
};
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #2b2f3a;
  text-align: center;
  overflow: hidden;
  cursor: pointer;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
