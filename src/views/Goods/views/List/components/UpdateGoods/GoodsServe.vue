<template>
  <div class="GoodsServe">
    <div class="title">商品服务</div>
    <div class="content">
      <el-form label-width="120px">
        <el-form-item label="商品服务">
          <TablePanel :tableData="list" :tableHead="column">
            <template #serviceName="{ scope }">
              <el-input
                v-model="scope.serviceName"
                placeholder="请输入服务名称"
              />
            </template>
            <template #serviceDescribe="{ scope }">
              <el-input
                v-model="scope.serviceDescribe"
                placeholder="请输入服务介绍"
              />
            </template>
            <!-- 操作 -->
            <template #action="{ index }">
              <div class="action-groud">
                <el-button type="text" @click="handleDelete(index)">
                  删除
                </el-button>
              </div>
            </template>
          </TablePanel>
          <div class="action">
            <el-button type="primary" @click="addServe">新增服务</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import CONST from "@/constants/index";

export default {
  name: "GoodsServe",
  components: {},
  props: {},
  data() {
    return {
      CONST,
      column: [
        {
          label: "服务名称",
          prop: "serviceName",
          type: "custom",
        },
        {
          label: "服务介绍",
          prop: "serviceDescribe",
          type: "custom",
        },
        {
          label: "操作",
          prop: "action",
          type: "custom",
          fixed: "right",
          width: 160,
        },
      ],
      formData: {},
      list: [],
    };
  },
  watch: {},
  computed: {},
  methods: {
    addServe() {
      this.list.push({
        serviceName: "",
        serviceDescribe: "",
      });
    },
    handleDelete(index) {
      this.list.splice(index, 1);
    },
    async getQuery() {
      // eslint-disable-next-line
      return new Promise(async (resolve) => {
        try {
          for (const index in this.list) {
            if (!this.list[index]?.serviceName) {
              throw new Error("请输入服务名称");
            } else if (!this.list[index]?.serviceDescribe) {
              throw new Error("请输入服务介绍");
            }
          }
        } catch (error) {
          return this.$message.error(error);
        }
        // 表单校验
        resolve({
          productSerList: this.list,
        });
      });
    },
  },
  mounted() {
    //
  },
};
</script>
<style lang="scss" scoped>
.GoodsServe {
  padding: 20px 20px 0;
  .title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .content {
    width: 800px;
  }
  .action {
    padding: 10px 0;
  }
  ::v-deep .el-radio-button__inner {
    padding: 9px 20px;
  }
}
</style>
