<template>
  <div class="custom-edit">
    <ElForm ref="form" :model="formModel" label-width="100px">
      <ElFormItem label="选择模板：">
        <ElRadioGroup v-model="formModel.teplateType" class="edit-goodlist-sel">
          <ElRadio
            v-for="item in TEPLATE_ARR"
            :key="item.value"
            :label="item.value"
          >
            <div class="edit-goodlist-sel-box">
              <img :src="item.img" alt="" />
            </div>
          </ElRadio>
        </ElRadioGroup>
      </ElFormItem>

      <!-- 模板效果图 START -->
      <div class="cube_effect" v-html="teplateHtml"></div>
      <!-- 模板效果图 END -->

      <div class="description">在下方添加图片，建议添加比例一致的图片</div>
      <div class="wrapper">
        <div
          v-for="(item, index) in formModel.list"
          :key="index + '_' + item.img"
        >
          <div class="edit-block-item" v-if="index < arrLength">
            <div class="sortArea">
              <div class="flex align-center flex-item">
                <img
                  v-if="index != 0"
                  src="../../../images/uper.png"
                  alt=""
                  @click="handleAscSortItem(item, index)"
                /><img v-else src="../../../images/uper2.png" alt="" />
              </div>
              <div class="flex align-center flex-item">
                <img
                  v-if="index != arrLength - 1"
                  src="../../../images/down.png"
                  alt=""
                  @click="handleDescSortItem(item, index)"
                /><img v-else src="../../../images/down2.png" alt="" />
              </div>
            </div>
            <div class="edit-img-block">
              <UploadImg
                @handleImgChange="OnHandleImgChange"
                :img="item.image"
                :index="index"
              />
            </div>
            <div class="edit-input-filed">
              <EditNavigatorLink :index="index" :item="item" />
            </div>
          </div>
        </div>
      </div>

      <div class="outer-input">
        <span class="outer-input_label">页面边距：</span>
        <ElSlider
          style="width: 50%; margin-left: 10px"
          :min="0"
          :max="3"
          :step="0.1"
          v-model="formModel.boxPadding"
        ></ElSlider>
        <ElInputNumber
          style="margin-left: 10px"
          v-model="formModel.boxPadding"
          :min="0"
          :max="3"
          :step="0.1"
          controls-position="right"
        ></ElInputNumber>
      </div>
      <div class="outer-input">
        <span class="outer-input_label">图片间隙：</span>
        <ElSlider
          style="width: 50%; margin-left: 10px"
          :min="0"
          :max="3"
          :step="0.1"
          v-model="formModel.imgPadding"
        ></ElSlider>
        <ElInputNumber
          style="margin-left: 10px"
          v-model="formModel.imgPadding"
          :min="0"
          :max="3"
          :step="0.1"
          controls-position="right"
        ></ElInputNumber>
      </div>
    </ElForm>
  </div>
</template>

<script>
import EditNavigatorLink from "@@/components/EditNavigatorLink/Index.vue";
// 图片
import CubeIcon12 from "./images/1@2x.png";
import CubeIcon22 from "./images/2@2x.png";
import CubeIcon32 from "./images/3@2x.png";
import CubeIcon42 from "./images/4@2x.png";
import CubeIcon52 from "./images/5@2x.png";

const TEPLATE_ARR = [
  {
    icon: "",
    text: "模板一",
    value: 1,
    qty: 2,
    img: CubeIcon12,
    teplate:
      '<div class="effect_box_1"><div>宽375px</div><div>宽375px</div></div>',
  },
  {
    icon: "",
    text: "模板二",
    value: 2,
    qty: 4,
    img: CubeIcon22,
    teplate:
      '<div class="effect_box_2"><div>宽375px，高375px</div><div>宽375px，高375px</div><div>宽375px，高375px</div><div>宽375px，高375px</div></div>',
  },
  {
    icon: "",
    text: "模板三",
    value: 3,
    qty: 3,
    img: CubeIcon32,
    teplate:
      '<div class="effect_box_3"><div class="effect_box_3-maxBox">宽375px，高750px</div><div class="flex-item"><div class="effect_box_3-minBox">宽375px，高375px</div><div class="effect_box_3-minBox">宽375px，高375px</div></div></div>',
  },
  {
    icon: "",
    text: "模板四",
    value: 4,
    qty: 3,
    img: CubeIcon42,
    teplate:
      '<div class="effect_box_4"><div>宽250px</div><div>宽250px</div><div>宽250px</div></div>',
  },
  {
    icon: "",
    text: "模板五",
    value: 5,
    qty: 4,
    img: CubeIcon52,
    teplate:
      '<div class="effect_box_5"><div>宽187.5px</div><div>宽187.5px</div><div>宽187.5px</div><div>宽187.5px</div></div>',
  },
];
import EditMixin from "@@/mixins/EditMixin.js"; // 混入公共JS
export default {
  name: "edit-cu-cube",
  mixins: [EditMixin],
  components: {
    EditNavigatorLink,
  },
  data() {
    return {
      TEPLATE_ARR,
    };
  },
  computed: {
    // 返回选择模板效果图
    teplateHtml() {
      let newArr = TEPLATE_ARR.filter(
        (item) => item.value === this.formModel.teplateType
      );
      if (newArr && newArr.length) {
        return newArr[0].teplate;
      } else {
        return [];
      }
    },
    // 图片列表显示数量
    arrLength() {
      let newArr = TEPLATE_ARR.filter(
        (item) => item.value === this.formModel.teplateType
      );
      if (newArr && newArr.length) {
        return newArr[0].qty;
      } else {
        return 0;
      }
    },
  },
};
</script>

<style lang="scss">
@import "@@/style/var.scss";
.cube_effect {
  padding-bottom: 10px;
  .effect_box_1 {
    border: 1px solid #dddddd;
    display: flex;
    margin: 0 100px;
    > div {
      width: 50%;
      padding: 30% 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      color: #999999;
      box-sizing: border-box;
    }
    > div:first-child {
      border-right: 1px solid #dddddd;
    }
  }
  .effect_box_2 {
    border: 1px solid #dddddd;
    display: flex;
    flex-wrap: wrap;
    margin: 0 100px;
    > div {
      width: 50%;
      padding: 25% 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      color: #999999;
      box-sizing: border-box;
    }
    > div:nth-child(1n) {
      border-right: 1px solid #dddddd;
    }
    > div:nth-child(1),
    > div:nth-child(2) {
      border-bottom: 1px solid #dddddd;
    }
  }
  .effect_box_3 {
    border: 1px solid #dddddd;
    display: flex;
    margin: 0 100px;
    &-maxBox {
      width: 50%;
      padding: 50% 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      color: #999999;
      box-sizing: border-box;
      border-right: 1px solid #dddddd;
    }

    &-minBox {
      width: 100%;
      padding: 50% 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      color: #999999;
      box-sizing: border-box;
      &:nth-child(1) {
        border-bottom: 1px solid #dddddd;
      }
    }
  }
  .effect_box_4 {
    border: 1px solid #dddddd;
    display: flex;
    > div {
      width: 33%;
      padding: 24% 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      color: #999999;
      box-sizing: border-box;
      border-right: 1px solid #dddddd;
    }
    > div:last-child {
      border-right: 0;
    }
  }
  .effect_box_5 {
    border: 1px solid #dddddd;
    display: flex;
    > div {
      width: 25%;
      padding: 24% 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      color: #999999;
      box-sizing: border-box;
      border-right: 1px solid #dddddd;
    }
    > div:last-child {
      border-right: 0;
    }
  }
}
</style>
