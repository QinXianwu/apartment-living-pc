import { NAVIGATOR_TYPE } from "@@/components/CuComponents/utils/constant.js";
import Com from "./Index.vue";
export default {
  cName: Com.name,
  label: "图片",
  unit: "px",
  align: "center",
  paddingLR: 0,
  paddingTB: 0,
  borderRadius: 0,
  list: [
    {
      image: "",
      navigator: {
        type: NAVIGATOR_TYPE.URL, // 跳转到商品
        value: "", // 商品ID
        goodsType: "", //商品类型
        category_id: "", //商品分类id
      },
    },
  ],
};
