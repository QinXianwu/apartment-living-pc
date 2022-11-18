<template>
  <div class="login">
    <div
      class="container"
      :style="`background-image: url(${backgroundImage})`"
    />
    <div class="loginCollections">
      <div class="main">
        <div class="el-card box-card is-always-shadow">
          <div class="el-card__body">
            <div class="head">
              <span class="title">密码登录</span>
            </div>
            <el-form ref="form" :model="formData" :rules="rules">
              <el-form-item label="" prop="username">
                <el-input
                  class=""
                  clearable
                  placeholder="账号"
                  v-model="formData.username"
                  @keyup.enter.native="onSumbit"
                ></el-input>
              </el-form-item>
              <el-form-item label="" prop="password">
                <el-input
                  show-password
                  type="password"
                  placeholder="密码"
                  v-model="formData.password"
                  @keyup.enter.native="onSumbit"
                ></el-input>
              </el-form-item>
              <el-form-item label="" prop="code">
                <div class="code">
                  <el-input
                    type="text"
                    placeholder="验证码"
                    v-model="formData.code"
                    @keyup.enter.native="onSumbit"
                  ></el-input>
                  <div class="code" @click="getVerifyCode">
                    <ImageView
                      :src="codeUrl"
                      class="code-img"
                      :isPreviewImg="false"
                    />
                  </div>
                </div>
              </el-form-item>
            </el-form>
            <el-button class="sumbit-button" type="primary" @click="onSumbit"
              >登录</el-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import backgroundImage from "./images/backgroundImage.jpg";
export default {
  name: "Login",
  components: {},
  data() {
    return {
      backgroundImage,
      formData: {},
      codeUrl: "",
      isLoadingCode: false,
      rules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
      },
    };
  },
  computed: {
    ...mapState({
      token: (state) => state.authorization.state,
    }),
  },
  created() {
    if (this.token) {
      this.$router.push("/Home/BasicFacts");
    }
    this.getVerifyCode();
  },
  methods: {
    // 获取验证码
    async getVerifyCode() {
      if (this.isLoadingCode) return;
      this.isLoadingCode = true;
      const [, res] = await this.$http.Authorization.GetVerifyCode();
      this.isLoadingCode = false;
      if (res?.code !== this.AJAX_CODE.SUCCESS || !res?.img || !res?.uuid)
        return this.$message.error(res?.msg || "获取验证码失败");
      this.codeUrl = `data:image/gif;base64,${res.img}`;
      this.formData.uuid = res.uuid || "";
    },
    async onSumbit() {
      try {
        const valid = await this.$refs.form.validate();
        if (!valid) {
          return;
        }
        await this.$store.dispatch("authorization/Login", this.formData);
      } catch (error) {
        console.log(error);
        if (error && typeof error === "boolean") this.getVerifyCode();
        return;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100vh;
  position: fixed;
  background-size: cover;
  background-repeat: no-repeat;
}

.loginCollections {
  position: absolute;
  top: 208px;
  left: 50%;
  transform: translateX(-50%);
  .head {
    text-align: center;
    .title {
      font-size: 24px;
      display: inline-block;
      margin: 31px 0 49px -4px;
      font-weight: 700;
      color: #333;
      line-height: 33px;
    }
  }
  .box-card {
    width: 480px;
    height: 510px;
    text-align: center;
    margin: 0 auto;
    padding: 0 32px;
    border-radius: 10px;
    ::v-deep .el-form-item {
      width: 100%;
      margin-bottom: 30px;
    }
    ::v-deep .el-input .el-input__inner {
      height: 48px;
      color: #333;
      border: 1px solid #e9e9e9;
      padding: 12px 7px;
    }
    .code {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .code-img {
      width: 150px;
      // height: 100px;
      margin: 0 0 0 20px;
      cursor: pointer;
    }
  }
  .sumbit-button {
    width: 100%;
    height: 55px;
    font-size: 16px;
    padding: 13px 0 14px 0;
    border-radius: 40px;
  }
}
</style>
