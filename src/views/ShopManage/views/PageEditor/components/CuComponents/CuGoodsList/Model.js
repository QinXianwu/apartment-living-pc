import Com from "./Index.vue";
import { NAVIGATOR_TYPE } from "@@/components/CuComponents/utils/constant.js";
export default {
  cName: Com.name,
  label: "商品列表",
  tips: "",
  paddingLR: 0,
  paddingTB: 0,
  list: [
    {
      id: `${Com.name}_${new Date().getTime()}`,
      text: "商品标题",
      image: "",
      navigator: {
        type: NAVIGATOR_TYPE.GOODS, // 跳转到商品
        value: "", // 商品ID
        goodsType: "", //商品类型
        category_id: "", //商品分类id
      },
    },
  ],
};
