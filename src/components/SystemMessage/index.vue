<template>
  <div class="SystemMessage">
    <ElDropdown trigger="click">
      <div>
        <i class="icon el-icon-chat-dot-round"></i>
        <span class="label">系统通知</span>
      </div>
      <ElDropdownMenu slot="dropdown">
        <ElDropdownItem
          divided
          :key="index"
          v-for="(item, index) in messageList"
        >
          <span style="display: block" @click="handleClick(item)">
            {{ item.title }}
          </span>
        </ElDropdownItem>
      </ElDropdownMenu>
    </ElDropdown>
  </div>
</template>

<script>
export default {
  name: "SystemMessage",
  components: {},
  data() {
    return {};
  },
  computed: {
    messageList() {
      const messageArr = [
        { title: "广州市公告一" },
        { title: "广州市公告二" },
        { title: "广州市公告三" },
        { title: "广州市公告四" },
        { title: "广州市公告五" },
        { title: "广州市公告六" },
      ];
      const length = messageArr?.length;
      if (length > 5) messageArr.splice(5, length, { title: "点击查看更多" });

      return messageArr;
    },
  },
  methods: {
    handleClick() {
      this.$router.push({
        name: "SystemNotification",
        query: {},
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.SystemMessage {
  display: flex;
  align-items: center;
  color: $sub-font-color;
  padding: 0 20px;
  margin-right: 10px;
  cursor: pointer;
  line-height: 20px;
  border-right: 1px solid #d9d9d9;
  .label {
    font-size: 14px;
    margin-left: 4px;
  }
  .icon {
    font-size: 16px;
  }
}
</style>
