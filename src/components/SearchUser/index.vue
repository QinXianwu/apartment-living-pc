<template>
  <div class="SearchUser" @click="dialogVisible = true">
    <span class="label">搜索</span>
    <i class="icon el-icon-search"></i>

    <el-dialog
      append-to-body
      custom-class="SearchUser-dialog"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-input
        v-model.trim="key"
        type="number"
        oninput="if(value.length>11)value=value.slice(0,11)"
        placeholder="请输入手机号搜索经销商/会员信息"
        @keyup.enter.native="searchFn"
      ></el-input>
      <i class="SearchUser-icon el-icon-search" @click="searchFn"></i>
    </el-dialog>
  </div>
</template>

<script>
import { isPhone } from "@/utils/validate";
export default {
  data() {
    return {
      dialogVisible: false,
      key: "",
    };
  },
  watch: {
    dialogVisible(val) {
      if (!val) this.key = "";
    },
  },
  methods: {
    async searchFn() {
      if (!isPhone(this.key)) {
        this.$notify.error({
          title: "错误",
          message: "请输入正确的手机号",
        });
        return;
      }
      const [err, Data] = await this.$http.User.MobileCheck({
        country_code: "86",
        mobile: this.key,
      });
      if (Data) {
        let user = Data?.user;
        if (!user?.user_id) {
          this.$notify.error({
            title: "错误",
            message: "查无此人",
          });
          return;
        }
        this.$router.push({
          name: "Detail",
          query: {
            id: user.user_id,
            type: user.is_agent ? "agent" : undefined,
          },
        });
        this.dialogVisible = false;
      }

      if (err) {
        this.$notify.error({
          title: "错误",
          message: err.Message || "接口异常",
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.SearchUser {
  display: flex;
  align-items: center;
  color: $sub-font-color;
  padding: 0 10px;
  margin-right: 10px;
  cursor: pointer;
  line-height: 20px;
  border-right: 1px solid #d9d9d9;
  .label {
    font-size: 14px;
    margin-right: 4px;
  }
  .icon {
    font-size: 16px;
  }
}
</style>

<style>
.SearchUser-dialog .el-dialog__header {
  display: none;
}
.SearchUser-dialog .el-dialog__body {
  display: flex;
  align-items: center;
  padding: 0;
}
.SearchUser-dialog .el-input__inner {
  height: 50px;
  line-height: 50px;
  border: 0;
}
.SearchUser-dialog .SearchUser-icon {
  padding: 0 20px;
  cursor: pointer;
}
</style>
