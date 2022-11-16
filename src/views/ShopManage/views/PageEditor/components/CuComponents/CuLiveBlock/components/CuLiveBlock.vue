// 自定义直播间展示
<template>
  <div class="live_block-item" @click="handleClick(item.LiveRoomId)">
    <div class="live_block-item-main">
      <!-- 主图 -->
      <div class="live_block-item-main-left">
        <ImageView
          class="live_block-item-main-main_image"
          :src="item.FeedsImg"
          isSplicingDemainUrl
          fit="cover"
        />
        <div class="live_block-item-main-left-tip">
          <div class="status">
            <img class="status-img" :src="live_icon" alt="" />
            {{ item.LiveStatus | live_text }}
          </div>
        </div>
      </div>
      <div class="live_block-item-main-right">
        <div class="live_block-item-title multi-ellipsis--l2">
          {{ item.LiveRoomName }}
        </div>
        <div class="live_block-item-time" v-if="liveTimeText">
          {{ liveTimeText }}
        </div>
        <div class="live_block-item-head">
          <ImageView
            v-if="item.AnchorHead"
            class="live_block-item-head-image"
            :src="item.AnchorHead"
            isSplicingDemainUrl
            fit="cover"
          />
          {{ item.AnchorName }}
        </div>
        <div class="live_block-item-sub">
          <template v-for="(good, i) in item.Goods">
            <div class="live_block-item-sub-image" :key="i" v-if="i < 3">
              <ImageView
                :class="['sub_image']"
                :src="good.Cover_Img"
                isSplicingDemainUrl
                fit="cover"
              />
              <div
                class="live_block-item-sub-image_cover"
                v-if="item.Goods.length > 3 && i == 2"
              >
                {{ `+${item.Goods.length - 3}` }}
              </div>
              <div class="live_block-item-sub-price">
                ￥{{ good.Price | cent2yuan }}
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CONST from "@/constants";
import livingIcon from "./images/living.png";
import preIcon from "./images/pre.png";
import reviewIcon from "./images/review.png";
export default {
  name: "block",
  data() {
    return {
      LIVE_STATUS: CONST.LIVE_STATUS,
      shareQuery: {},
    };
  },
  computed: {
    live_icon({ item, LIVE_STATUS }) {
      const { LiveStatus } = item;
      if (LiveStatus === LIVE_STATUS.LIVING) {
        return livingIcon;
      }
      if (LiveStatus === LIVE_STATUS.UNSTARTED) {
        return preIcon;
      }
      if (LiveStatus === LIVE_STATUS.END) {
        return reviewIcon;
      }
      return preIcon;
    },
    liveTimeText({ item, LIVE_STATUS }) {
      const { LiveStatus, StartTimestampStr } = item;
      if (LiveStatus === LIVE_STATUS.LIVING) {
        return "";
      }
      if (LiveStatus === LIVE_STATUS.UNSTARTED) {
        return "开播时间：" + StartTimestampStr;
      }
      if (LiveStatus === LIVE_STATUS.UNSTARTED) {
        return "直播时间：" + StartTimestampStr;
      }
      return "";
    },
  },
  props: {
    item: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    handleClick(id) {
      console.log(id);
    },
  },
  filters: {
    live_text(val) {
      switch (val) {
        case CONST.LIVE_STATUS.LIVING:
          return "直播中";
        case CONST.LIVE_STATUS.UNSTARTED:
          return "预告"; //未开始
        case CONST.LIVE_STATUS.END:
          return "已结束";
        case CONST.LIVE_STATUS.FORBIDEEN:
          return "禁播";
        case CONST.LIVE_STATUS.STOPING:
          return "暂停中";
        case CONST.LIVE_STATUS.ERROR:
          return "异常";
        case CONST.LIVE_STATUS.EXPIRE:
          return "已过期";
        default:
          return "...";
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@@/style/var.scss";
.live_block {
  &-item {
    width: 100%;
    height: 172px;
    border-radius: 8px;
    background-color: #fff;
    margin-bottom: 10px;
    &-main {
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: stretch;
      padding: 10px;
      box-sizing: border-box;
      &-main_image {
        width: 148px;
        height: 100%;
        border-radius: 8px;
      }
      &-left {
        position: relative;
        &-tip {
          top: 8px;
          left: 8px;
          position: absolute;
          display: flex;
          color: #fff;
          border-radius: 9px;
          font-size: 9px;
          line-height: 16px;
          .status {
            border-radius: 9px;
            padding: 0 5px 0 0;
            margin-right: 5px;
            background: rgba($color: #000000, $alpha: 0.33);
            display: flex;
            align-items: center;
            &-img {
              width: 21px;
              height: 16px;
              margin-right: 5px;
            }
          }
        }
      }
      &-right {
        width: 50%;
        height: 100%;
        flex-grow: 1;
        box-sizing: border-box;
        @include flex($direction: column, $align: stretch, $justify: stretch);
      }
    }
    &-title {
      padding: 0 0 10px 10px;
      font-size: 16px;
      font-weight: bold;
      box-sizing: border-box;
      color: $top-title-color;
    }
    &-time {
      font-size: 10px;
      padding: 0 0 10px 10px;
    }
    &-head {
      font-size: 12px;
      padding: 0 0 10px 10px;
      display: flex;
      align-items: center;
      color: $main-font-color;
      &-image {
        width: 24px;
        height: 24px;
        border-radius: 50px;
        margin-right: 10px;
      }
    }
    &-sub {
      flex-grow: 1;
      @include flex($direction: row, $align: flex-end, $justify: flex-start);
      box-sizing: border-box;
      padding: 0 0 0 10px;
      &-image {
        width: 54px;
        height: 54px;
        display: inline-block;
        position: relative;
        margin-right: 9px;
      }
      &-image_cover {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: #000;
        border-radius: 8px;
        opacity: 0.5;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 11px;
        color: #fff;
        z-index: $zIndex2;
      }
      .sub_image {
        width: 100%;
        height: 100%;
        border-radius: 8px;
      }
      &-price {
        width: 100%;
        position: absolute;
        left: 0;
        bottom: 0;
        font-size: 10px;
        font-weight: 500;
        color: #fff;
        text-align: center;
        @include flex($justify: center, $align: center);
        height: 20px;
        background: linear-gradient(
          180deg,
          rgba(0, 0, 0, 0) 0%,
          rgba(0, 0, 0, 0.4) 100%
        );
        border-radius: 0px 0px 4px 4px;
        z-index: $zIndex1;
      }
    }
  }
}
</style>
