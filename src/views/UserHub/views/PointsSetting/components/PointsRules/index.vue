<template>
  <!-- 积分规则 -->
  <div class="PointsRules">
    <Rules />
    <!-- 底部按钮 -->
    <FooterView :isShowSave="false" :cancelType="true" :showCancelBtn="false">
      <template>
        <el-button type="primary" @click="handleSubmit">保存</el-button>
      </template>
    </FooterView>
  </div>
</template>

<script>
import Rules from "./Rules.vue";
import FooterView from "@/components/Footer/";
export default {
  name: "PointsRules",
  components: { Rules, FooterView },
  data() {
    return {};
  },
  computed: {},
  methods: {
    async handleSubmit() {
      //
    },
  },
  mounted() {
    //
  },
};
</script>
<style lang="scss" scoped></style>
