<template>
  <section class="app-main">
    <AppPromptController />
    <!-- 主视图 -->
    <transition name="fadeLeft">
      <keep-alive :include="watchViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
import AppPromptController from "./AppPromptController.vue";
export default {
  name: "AppMain",
  components: {
    AppPromptController,
  },
  data() {
    return {
      watchViews: [],
    };
  },
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews;
    },
    key() {
      return this.$route.fullPath;
    },
  },
  watch: {
    cachedViews: {
      deep: true,
      handler(val) {
        if (val && val.length) {
          this.watchViews = [...val];
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.app-main {
  width: 100%;
  position: relative;
  overflow: hidden;
  min-height: calc(100vh - 88px);
  background-color: #f7f8fa;
}

.fixed-header + .app-main {
  margin-top: 50px;
}

.hasTagsView {
  .app-main {
    margin-top: 37px;
    // min-height: calc(100vh - 127px);
  }
  .fixed-header + .app-main {
    margin-top: 84px;
  }
}
.fadeLeft-enter {
  opacity: 0;
  transform: translateX(-50px);
}
.fadeLeft-leave {
  opacity: 1;
  transform: translateX(0);
}

.fadeLeft-enter-active {
  transition: transform 0.5s ease-in-out, opacity 0.9s 0.2s linear;
}
.fadeLeft-leave-active {
  opacity: 0;
  transition: opacity 0.3s;
}
</style>
