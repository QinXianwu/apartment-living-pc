<template>
  <div class="WeChatUser">
    <div class="title">微信用户信息</div>
    <div class="content">
      <TableBlock :tableData="tableData1" :valueWidth="250" />
    </div>
  </div>
</template>

<script>
import CONST from "@/constants/index";
import TableBlock from "@/components/TableBlock";
export default {
  name: "WeChatUser",
  components: { TableBlock },
  props: {
    userInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      CONST,
      column: [],
    };
  },
  computed: {
    tableData1({ userInfo }) {
      return [
        { label: "授权头像", value: userInfo?.wxAvatarUrl, type: "image" },
        { label: "授权昵称", value: userInfo?.nickName },
        { label: "授权手机号", value: userInfo?.mobile },
      ];
    },
  },
  methods: {},
  filters: {},
  mounted() {
    //
  },
};
</script>
<style lang="scss" scoped>
.WeChatUser {
  padding: 20px 0;
  .title {
    font-size: 14px;
    font-weight: bold;
    color: $sub-font-color;
    margin-bottom: 20px;
  }
  .content {
    margin-bottom: 20px;
  }
}
</style>
