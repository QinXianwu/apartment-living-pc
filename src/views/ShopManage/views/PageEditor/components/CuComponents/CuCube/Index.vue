<template>
  <!-- 魔方组件 -->
  <div v-if="newList.length" class="custom-cube" :style="boxStyle">
    <template v-if="teplateType === 1">
      <div class="effect_box_1">
        <div v-for="(item, index) in newList" :key="index">
          <ImageView
            class="effect_box_img"
            :src="item.image | imgFormat"
            :style="imgStyle"
          />
        </div>
      </div>
    </template>
    <template v-if="teplateType === 2">
      <div class="effect_box_2">
        <div v-for="(item, index) in newList" :key="index">
          <ImageView
            class="effect_box_img"
            :src="item.image | imgFormat"
            :style="imgStyle"
          />
        </div>
      </div>
    </template>
    <template v-if="teplateType === 3">
      <div class="effect_box_3">
        <div class="effect_box_3-maxBox">
          <ImageView
            class="effect_box_img"
            :src="newList[0].image | imgFormat"
            :style="imgStyle"
          />
        </div>
        <div class="effect_box_3-minBox">
          <ImageView
            class="effect_box_img"
            :src="newList[1].image | imgFormat"
            :style="imgStyle"
          />
          <ImageView
            class="effect_box_img"
            :src="newList[2].image | imgFormat"
            :style="imgStyle"
          />
        </div>
      </div>
    </template>
    <template v-if="teplateType === 4 || teplateType === 5">
      <div class="effect_box_4">
        <div v-for="(item, index) in newList" :key="index">
          <ImageView
            class="effect_box_img"
            :src="item.image | imgFormat"
            :style="imgStyle"
          />
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import deafultImage from "@@/images/block.png";
export default {
  name: "cu-cube",
  props: {
    // 图片列表
    list: {
      type: Array,
      default() {
        return [];
      },
    },
    teplateType: {
      type: Number,
      deafult: 1,
    },
    boxPadding: {
      type: Number,
      deafult: 0,
    },
    imgPadding: {
      type: Number,
      deafult: 0,
    },
  },
  data() {
    return {
      deafultImage,
    };
  },
  computed: {
    newList({ teplateType, list }) {
      if (teplateType === 1) return list.slice(0, 2);
      else if (teplateType === 2 || teplateType === 5) return list.slice(0, 4);
      else if (teplateType === 3 || teplateType === 4) return list.slice(0, 3);
      else return [];
    },
    boxStyle() {
      return {
        padding: `${this.boxPadding * 50}px`,
      };
    },
    imgStyle() {
      return {
        padding: `${this.imgPadding * 50}px`,
      };
    },
  },
  methods: {
    // 点击事件
    toClick(url) {
      this.$emit("click", url);
    },
  },
  filters: {
    imgFormat(val) {
      if (val && val.url) {
        return val.url;
      } else {
        return deafultImage;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.effect_box_1 {
  display: flex;
  > div {
    flex: 1;
  }
}
.effect_box_2 {
  display: flex;
  flex-wrap: wrap;
  > div {
    width: 50%;
  }
}
.effect_box_3 {
  display: flex;
  &-maxBox {
    flex: 0 0 50%;
  }
  &-minBox {
    flex: 0 0 50%;
    height: 100%;
  }
}
.effect_box_4 {
  display: flex;
  > div {
    flex: 1;
  }
}
.effect_box_img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  box-sizing: border-box;
}
</style>
