<template>
  <!-- <component :is="type" v-bind="linkProps(to, query)">
    <slot />
  </component> -->
  <!-- 根据路由版本切换 主导因素v-slot="{ navigate }"-->
  <a v-bind="linkProps(to, query)" v-if="isExternal"><slot /></a>
  <router-link
    v-else
    key="collapse"
    v-slot="{ navigate }"
    class="sidebar-logo-link"
    v-bind="linkProps(to, query)"
    custom
  >
    <span @click="navigate" @keypress.enter="navigate">
      <slot />
    </span>
  </router-link>
</template>

<script>
import { isExternal } from "@/utils/validate";

export default {
  props: {
    to: {
      type: String,
      required: true,
    },
    query: {
      type: Object,
      default: () => null,
    },
  },
  computed: {
    isExternal() {
      return isExternal(this.to);
    },
    type() {
      if (this.isExternal) {
        return "a";
      }
      return "router-link";
    },
  },
  methods: {
    linkProps(to, query) {
      if (this.isExternal) {
        return {
          href: to,
          target: "_blank",
          rel: "noopener",
        };
      }
      return {
        // to: to,
        to: {
          path: to,
          query,
        },
      };
    },
  },
};
</script>
