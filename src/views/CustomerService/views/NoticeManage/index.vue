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
      <BookingSuccess v-if="activeName === 'BookingSuccess'" />
      <AfreshBooking v-if="activeName === 'AfreshBooking'" />
    </div>
  </div>
  <Page401 v-else />
</template>

<script>
import Page401 from "@/views/ErrorPage/401";
import BookingSuccess from "./components/BookingSuccess/index.vue";
import AfreshBooking from "./components/AfreshBooking/index.vue";

export default {
  name: "NoticeManage",
  components: {
    BookingSuccess,
    AfreshBooking,
    Page401,
  },
  data() {
    return {
      isPermission: false,
      activeName: "BookingSuccess",
      tabPaneList: [
        {
          label: "出票-回复客服",
          name: "BookingSuccess",
          // permission: this.$PERMISSION_ID.SetUp_AliPayManagement,
        },
        {
          label: "改签-回复客服",
          name: "AfreshBooking",
          // permission: this.$PERMISSION_ID.SetUp_AliPayManagement,
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
