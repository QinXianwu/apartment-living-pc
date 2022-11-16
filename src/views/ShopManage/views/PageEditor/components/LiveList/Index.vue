<template>
  <div>
    <!-- 搜索 -->
    <SearchForm
      :formData="search"
      @on-search="confirmSearch"
      isReturnFormData
    ></SearchForm>
    <!-- 商品列表 -->
    <ElScrollbar style="height: 46vh" v-loading="loading">
      <template v-if="liveList.length > 0">
        <div
          class="edit-goodlist-list"
          v-for="(item, index) in liveList"
          :key="index"
          @click="changeChecked(item)"
        >
          <div class="edit-goodlist-list-check">
            <i v-show="IsChecked(item)" class="el-icon-success"></i>
            <i v-show="!IsChecked(item)" class="empty-check"></i>
          </div>
          <div class="edit-goodlist-list-good">
            <ImageView class="itemImg" :src="item.CoverImg" alt="" srcset="" />
            <div class="edit-goodlist-list-good_right">
              <div>{{ item.LiveRoomName }}</div>
              <div>ID：{{ item.LiveRoomId }}</div>
              <!-- <div class="goods_r_price">￥ {{ item.Price }}</div> -->
            </div>
          </div>
        </div>
      </template>
      <ElEmpty v-else description="无相关直播间"></ElEmpty>
    </ElScrollbar>
    <!-- 分页 -->
    <ElPagination
      class="mb-10"
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
      liveList: [],
      search: [
        {
          label: "直播间名称",
          prop: "KeyWords",
          value: "",
          placeholder: "直播间名称",
          type: "text",
        },
      ],
      rulesObj: {},
      loading: false,
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
        map[item.LiveRoomId] = true;
      });
      return map;
    },
  },
  created() {
    this.getProductList();
  },
  methods: {
    // 获取直播列表
    async getProductList() {
      let query = {
        PageIndex: this.pageIndex,
        PageSize: this.pageSize,
        KeyWords: this.rulesObj?.KeyWords || "",
        LiveRoomTagId: 0,
      };
      this.loading = true;
      const [, Data] = await this.$http.LiveRoom.GetLiveRoomList({
        ...query,
      });
      this.loading = false;
      if (!Data?.Result) return;
      this.liveList = Data.Result;
      this.totalCount = Data?.TotalCount || 0;
      if (!this.isOneSelect) {
        this.checkIsAllCheck(this.selectComInfo);
      }
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
          value: item.LiveRoomId, // 商品ID
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
      return this.checkedProductIDMap[item.LiveRoomId];
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
        this.liveList.forEach((pro) => {
          this.remove(pro);
        });
        this.isCheckedAll = false;
      } else {
        this.liveList.forEach((pro) => {
          this.selectComInfo.list.forEach((cpro) => {
            if (pro.ID === cpro.ID) {
              pro.isChecked = true;
            }
          });
        });
        this.liveList.forEach((pro) => {
          if (!pro.isChecked) {
            this.add(pro);
          }
        });
        this.isCheckedAll = true;
      }
    },
    checkIsAllCheck(val) {
      if (val.list && val.list.length) {
        const copyList = simpleCloneDeep(this.liveList);
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
      flex-shrink: 0;
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
