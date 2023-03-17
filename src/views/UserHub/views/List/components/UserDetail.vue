<template>
  <div class="UserDetail">
    <div class="title">基本信息</div>
    <div class="content">
      <TableBlock :tableData="tableData1" :valueWidth="350" />
    </div>
    <div class="title">消费信息</div>
    <div class="content">
      <TableBlock :tableData="tableData2" :valueWidth="350" />
    </div>
    <div class="title">优惠券</div>
    <div class="content">
      <TableBlock :tableData="tableData3" :valueWidth="350" />
    </div>
    <div class="title">积分</div>
    <div class="content">
      <TableBlock :tableData="tableData4" :valueWidth="350" />
    </div>
    <div class="title">分销佣金</div>
    <div class="content">
      <TableBlock :tableData="tableData5" :valueWidth="350" />
    </div>
    <FooterView
      :isShowSave="false"
      :cancelType="true"
      @cancel="$emit('close', false)"
    />
  </div>
</template>

<script>
import { digits2Str } from "@/utils/index";
import TableBlock from "@/components/TableBlock";
import FooterView from "@/components/Footer";
export default {
  name: "UserDetail",
  components: { TableBlock, FooterView },
  props: {
    editInfo: {
      type: [Object, String],
      default: () => ({}),
    },
  },
  data() {
    return {
      userInfo: {},
    };
  },
  computed: {
    tableData1({ userInfo }) {
      return [
        { label: "ID", value: userInfo?.userId },
        { label: "头像", value: userInfo?.wxAvatarUrl || "", type: "image" },
        {
          label: "姓名",
          value: userInfo?.name,
        },
        {
          label: "账号",
          value: userInfo?.nickName,
        },
        { label: "创建时间", value: userInfo?.createDate },
        { label: "更新时间", value: userInfo?.updateDate },
        { label: "备注", value: userInfo?.remark },
      ];
    },
    tableData2({ userInfo }) {
      console.log(userInfo);
      return [
        { label: "总消费金额", value: "", type: "money" },
        { label: "总消费", value: "", type: "money" },
      ];
    },
    tableData3() {
      return [
        { label: "未使用", value: "" },
        { label: "已使用", value: "" },
        { label: "已过期", value: "" },
      ];
    },
    tableData4() {
      return [
        { label: "当前积分", value: "" },
        { label: "累计积分", value: "" },
        { label: "消耗积分", value: "" },
      ];
    },
    tableData5() {
      return [
        { label: "当前余额", value: "", type: "money" },
        { label: "累计佣金", value: "", type: "money" },
        { label: "累计提现", value: "", type: "money" },
      ];
    },
  },
  methods: {
    async getUserDetail() {
      if (!this.editInfo?.userId) return;
      const [, res] = await this.$http.UserHub.GetUserDetail({
        userId: this.editInfo.userId,
      });
      this.userInfo = res || {};
      const keys = ["userId"];
      digits2Str(this.userInfo, keys);
    },
  },
  mounted() {
    this.getUserDetail();
  },
};
</script>
<style lang="scss" scoped>
.UserDetail {
  padding: 20px 0 100px;
  .title {
    font-size: 14px;
    font-weight: bold;
    color: $sub-font-color;
    margin-bottom: 20px;
  }
  .content {
    margin-bottom: 20px;
  }
  .goodsInfo {
    display: flex;
    align-items: center;
    .goods-name {
      margin-left: 10px;
    }
  }
  .table-img {
    width: 60px;
    height: 60px;
  }
}
</style>
