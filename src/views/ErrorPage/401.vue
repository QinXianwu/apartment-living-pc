<template>
  <div class="errPage-container">
    <img :src="errGif" width="461" alt="Girl has dropped her ice cream." />
    <p class="err_p">抱歉！你没有权限去该页面，请联系管理员！</p>
    <el-button class="err_btn" type="text" @click="back">返回首页</el-button>
    <el-button class="err_btn" type="text" @click="LogoutAsync"
      >重新登录</el-button
    >
  </div>
</template>

<script>
import errGif from "./images/401.png";
import { mapActions } from "vuex";
export default {
  name: "Page401",
  data() {
    return {
      errGif: errGif + "?" + +new Date(),
    };
  },
  methods: {
    ...mapActions({
      LogoutAsync: "authorization/LogoutAsync",
    }),
    back() {
      // 没有cookie，则登录
      if (!document.cookie.includes("user_sessino")) {
        this.$store.dispatch("authorization/LoginAsync");
      } else {
        this.$router.replace({ name: "BasicFacts" }); // 跳转首页
        // this.$router.go(-1);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.errPage-container {
  width: 800px;
  max-width: 100%;
  margin: 100px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.err_p {
  margin: 81px 0 20px 0;
  color: $main-font-color;
  font-size: 16px;
}
.err_btn {
  font-size: 16px;
  text-align: center;
  margin: 0;
}
</style>
