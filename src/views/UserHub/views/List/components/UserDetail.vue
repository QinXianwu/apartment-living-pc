<template>
  <div class="UserDetail">
    <div class="content">UserDetail</div>
    <FooterView
      :isShowSave="false"
      :cancelType="true"
      @cancel="$emit('close', false)"
    />
  </div>
</template>

<script>
import FooterView from "@/components/Footer/";
export default {
  name: "UserDetail",
  components: { FooterView },
  props: {
    editInfo: {
      type: [Object, String],
      default: () => ({}),
    },
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    async getUserDetail() {
      if (!this.editInfo?.userId) return;
      const [, res] = await this.$http.UserHub.GetUserDetail({
        userId: this.editInfo.userId,
      });
      console.log(res);
    },
  },
  mounted() {
    this.getUserDetail();
  },
};
</script>
<style lang="scss" scoped>
.action {
  padding: 0 0 15px;
}
</style>
