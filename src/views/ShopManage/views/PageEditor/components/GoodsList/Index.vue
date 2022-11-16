<template>
  <div>
    <!-- 搜索 -->
    <SearchForm :formData="search" @on-search="confirmSearch"></SearchForm>
    <!-- 商品列表 -->
    <ElScrollbar style="height: 46vh">
      <template v-if="proList.length > 0">
        <div
          class="edit-goodlist-list"
          v-for="(item, index) in proList"
          :key="index"
          @click="changeChecked(item)"
        >
          <div class="edit-goodlist-list-check">
            <i v-show="IsChecked(item)" class="el-icon-success"></i>
            <i v-show="!IsChecked(item)" class="empty-check"></i>
          </div>
          <div class="edit-goodlist-list-good">
            <ImageView
              class="itemImg"
              :src="item.image | formatImage"
              alt=""
              srcset=""
            />
            <div class="edit-goodlist-list-good_right">
              <div>{{ item.name }}</div>
              <!-- <div class="goods_r_price">￥ {{ item.Price }}</div> -->
            </div>
          </div>
        </div>
      </template>
      <ElEmpty v-else description="无相关商品"></ElEmpty>
    </ElScrollbar>
    <!-- 分页 -->
    <ElPagination
      @current-change="currentChange"
      @size-change="handleSizeChange"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 40, 60]"
      :page-size="pageSize"
      :total="totalCount"
      background
    >
    </ElPagination>
  </div>
</template>
<script>
import { NAVIGATOR_TYPE } from "@@/components/CuComponents/utils/constant.js";
import { simpleCloneDeep } from "@/utils/index.js";
import { mapActions } from "vuex";
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    // 单选模式
    isOneSelect: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isCheckedAll: this.value,
      searchVal: "",
      pageIndex: 1,
      pageSize: 10,
      totalCount: 0,
      proList: [],
      search: [
        {
          label: "商品名称",
          prop: "name",
          value: "",
          placeholder: "商品名称",
          type: "text",
        },
        // {
        //   label: "商品分类",
        //   key: "W_OrderProductCategory_ID",
        //   value: ["0"],
        //   placeholder: "商品分类",
        //   type: "cascader",
        //   miniWidth: "60%",
        //   options: [
        //     {
        //       value: "0",
        //       label: "全部",
        //     },
        //   ],
        // },
      ],
      rulesObj: [],
    };
  },
  watch: {
    isCheckedAll(val) {
      this.$emit("input", val);
    },
    value(val) {
      this.isCheckedAll = val;
    },
    selectComInfo: {
      deep: true,
      handler(val) {
        if (!this.isOneSelect) {
          this.checkIsAllCheck(val);
        }
      },
    },
  },
  computed: {
    selectingNavigator() {
      return this.$store.state.editor.selectingNavigator;
    },
    selectComInfo() {
      return this.$store.getters["editor/selectComInfo"];
    },
    // 存在的商品ID
    checkedProductIDMap() {
      // 区分单选/多选
      if (this.isOneSelect) {
        const map = {};
        if (this.selectingNavigator?.type === "goods") {
          map[this.selectingNavigator.value] = true;
        }
        return map;
      }
      const map = {};
      this.selectComInfo?.list?.forEach((item) => {
        map[item.ID] = true;
        map[item.spu_id] = true;
      });
      return map;
    },
  },
  created() {
    // this.getRetailProductCategoryAction().then(list => {
    //   if (!list?.length) return;
    //   const dsg = l => {
    //     if (!l?.length) return;
    //     l.forEach(item => {
    //       item.value = item.ID;
    //       item.label = item.Name;
    //       if (!item.children?.length) return (item.children = null);
    //       dsg(item.children);
    //     });
    //   };
    //   dsg(list);
    //   this.search[1].options.push(...list);
    // });
    this.getProductList();
  },
  methods: {
    ...mapActions({
      getProductListAction: "editor/getProductListAction",
      // getRetailProductCategoryAction: "editor/getRetailProductCategoryAction",
    }),
    // 获取左侧商品列表 有choosenList时，设置右侧列表
    async getProductList() {
      const data = await this.getProductListAction({
        rows: this.pageSize,
        page: this.pageIndex,
        order: "sort desc",
        filters: { rules: this.rulesObj },
      });
      if (!data) return;
      this.proList = data.spus;
      if (!this.isOneSelect) {
        this.checkIsAllCheck(this.selectComInfo);
      }
      this.totalCount = data.Attr.RecordCount;
    },
    // 切换选中状态
    changeChecked(item) {
      const IsCheckedBool = this.IsChecked(item);
      IsCheckedBool ? this.remove(item) : this.add(item);
    },
    // 添加选择
    add(item) {
      if (!this.isOneSelect) {
        this.$emit("add", item);
      } else {
        // 跳转地址
        this.$emit("selectChange", {
          type: NAVIGATOR_TYPE.GOODS,
          value: item.spu_id, // 商品ID
          goodsType: item.type,
          name: item.name,
        });
      }
    },
    // 去掉选择
    remove(item) {
      if (!this.isOneSelect) {
        this.$emit("remove", item);
      }
    },
    // 是否被选过了
    IsChecked(item) {
      return this.checkedProductIDMap[item.spu_id];
    },
    // 分页修改
    currentChange(val) {
      this.pageIndex = val;
      this.getProductList();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.pageIndex = 1;
      this.getProductList();
    },
    onSubmit() {
      this.pageIndex = 1;
      this.getProductList();
    },
    confirmSearch(obj) {
      this.rulesObj = obj;
      this.pageIndex = 1;
      this.getProductList();
    },
    handleCheckAll(val) {
      if (!val) {
        this.proList.forEach((pro) => {
          this.remove(pro);
        });
        this.isCheckedAll = false;
      } else {
        this.proList.forEach((pro) => {
          this.selectComInfo.list.forEach((cpro) => {
            if (pro.ID === cpro.ID) {
              pro.isChecked = true;
            }
          });
        });
        this.proList.forEach((pro) => {
          if (!pro.isChecked) {
            this.add(pro);
          }
        });
        this.isCheckedAll = true;
      }
    },
    checkIsAllCheck(val) {
      if (val.list && val.list.length) {
        const copyList = simpleCloneDeep(this.proList);
        val.list.forEach((cpro) => {
          copyList.forEach((pro) => {
            if (pro.ID === cpro.ID) {
              pro.isChecked = true;
            }
          });
        });
        let count = 0;
        copyList.forEach((pro) => {
          if (pro.isChecked) {
            count++;
          }
        });
        this.isCheckedAll = count === copyList.length;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.edit-goodlist-list {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom: #ccc;
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: rgba(6, 6, 6, 0.1);
  }
  &-check {
    cursor: pointer;
    width: 40px;
    .el-icon-success {
      font-size: 20px;
      color: $--color-primary;
    }
    .empty-check {
      &::after {
        content: "";
        width: 15px;
        height: 15px;
        display: block;
        border: 1px solid #ccc;
        border-radius: 50%;
        box-sizing: border-box;
      }
    }
  }
  &-good {
    display: flex;
    .itemImg {
      width: 60px;
      height: 60px;
      border-radius: 4px;
      margin-right: 10px;
    }
    &_right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .goods_r_price {
      color: $--color-primary;
    }
  }
}
</style>
