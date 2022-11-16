<template>
  <div class="menu" :class="opened ? '' : 'menu-closed'">
    <div class="menu-wrapper" :class="opened ? '' : 'menu-closed'">
      <div class="wrapper-inner">
        <h2 class="menu-title">{{ title }}</h2>
        <div class="menu-list">
          <menu-item :menus="Menus"></menu-item>
        </div>
      </div>
    </div>

    <div
      class="open-btn"
      :class="opened ? 'opened' : 'closed'"
      @click="changeOpen"
      v-show="Menus.length > 0"
    >
      <span
        class="icon mtFont"
        :class="opened ? 'mtui-icon-shouqi_L' : 'mtui-icon-shouqi_R'"
      ></span>
    </div>
  </div>
</template>

<script>
// import menuItem from "./menuItem.vue";
import { mapState } from "vuex";
export default {
  name: "mt-menu",
  props: {
    title: {
      type: String,
    },
    menus: {
      type: Array,
      defalult() {
        return [];
      },
    },
  },
  data() {
    return {
      Menus: null,
      // opened: true, //菜单默认打开
      Title: "",
      inited: false,
    };
  },
  watch: {
    menus(val) {
      this.onMenusWatch(val);

      if (
        !val ||
        val.length === 0 ||
        (this.$route.meta && this.$route.meta.hideTagView)
      ) {
        this.$store.dispatch("menu/closeMenu");
      } else if (!this.$route.meta || !this.$route.meta.hideTagView) {
        this.$store.dispatch("menu/openMenu");
      }
    },
  },
  created() {
    this.onMenusWatch(this.menus);
  },

  computed: {
    ...mapState({
      opened: (state) => state.menu.menuSlider.opened,
    }),
  },
  components: {
    // menuItem,
  },
  methods: {
    //
    onMenusWatch(val) {
      if (val && val.length > 0) {
        this.Menus = JSON.parse(JSON.stringify(val));
        if (!this.inited) {
          this.Menus = this.Maps(this.Menus);
          this.inited = true;
        }
      } else {
        this.Menus = [];
      }
    },
    Maps(arr) {
      // console.log("初始化id", arr);
      arr.forEach((item) => {
        item.id = item.Id.split("-")[0]; // 取每个Id的头一组数值
        // item.isOpen = false; //是否打开进货商
        if (item.ChildNode.length > 0) {
          //循环遍历进货商
          this.Maps(item.ChildNode);
        }
      });
      return arr;
    },
    changeOpen() {
      this.$store.dispatch("menu/toggleMenu");
    },
  },
};
</script>

<style lang="scss" scoped>
.menu-closed {
  width: 0 !important;
  .menu-title {
    width: 0 !important;
    padding: 0 !important;
  }
}
.menu {
  width: $sideBarWidth;
  position: relative;
  flex-shrink: 0;
  transition: width 0.3s linear;
}
.menu-wrapper {
  width: $sideBarWidth;
  height: 100%;
  color: $sub-font-color;
  background: #ffffff;
  transition: width 0.3s linear;
  overflow: hidden;
  border-right: 1px solid #e5e5e5;
  box-sizing: border-box;

  .wrapper-inner {
    width: $sideBarWidth;
    height: 100%;
    overflow-y: auto;
    &::-webkit-scrollbar-track-piece,
    &::-webkit-scrollbar-thumb {
      background-color: transparent;
      transition: all 0.9s linear;
    }

    &:hover {
      &::-webkit-scrollbar-track-piece,
      &::-webkit-scrollbar-thumb {
        background-color: #f9f9f9;
      }
    }
  }

  .menu-title {
    position: absolute;
    z-index: 4;
    width: $sideBarWidth;
    line-height: 37px;
    font-size: 14px;
    font-weight: bold;
    background: #edf0ee;
    border-bottom: 1px solid #e5e5e5;
    box-sizing: border-box;
    padding: 0 30px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    transition: all 0.3s linear;
  }

  .menu-list {
    padding-top: 37px;
  }
}

.open-btn {
  position: absolute;
  top: 50%;
  z-index: 8;
  width: 20px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  background: #eeeeee;
  box-shadow: -5px 0px 10px #ccc;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s linear;

  &:hover {
    background: #e5e5e5;
  }
}

.opened {
  transform: translate($sideBarWidth - 10, -50%);
}

.closed {
  transform: translate(-10px, -50%);
  &:hover {
    width: 28px;
    font-size: 16px;
  }
}
</style>
