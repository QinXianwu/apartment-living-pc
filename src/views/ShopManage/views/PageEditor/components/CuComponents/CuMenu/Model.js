import { NAVIGATOR_TYPE } from "@@/components/CuComponents/utils/constant.js";
import Com from "./Index.vue";
export default {
  cName: Com.name,
  label: "图文导航",
  tips: "",
  color: Com.props?.color.default,
  paddingTB: Com.props?.paddingTB.default,
  paddingLR: Com.props?.paddingLR.default,
  backgroundImage: Com?.props.backgroundImage.default,
  height: Com?.props.height.default,
  itemWidth: Com?.props.itemWidth.default,
  itemHeight: Com?.props.itemHeight.default,
  list: [
    {
      image: "",
      name: "标题",
      navigator: {
        type: NAVIGATOR_TYPE.URL, // 跳转到商品
        value: "", // 商品ID
        goodsType: "", //商品类型
        category_id: "", //商品分类id
      },
    },
    {
      image: "",
      name: "标题",
      navigator: {
        type: NAVIGATOR_TYPE.URL, // 跳转到商品
        value: "", // 商品ID
        goodsType: "", //商品类型
        category_id: "", //商品分类id
      },
    },
    {
      image: "",
      name: "标题",
      navigator: {
        type: NAVIGATOR_TYPE.URL, // 跳转到商品
        value: "", // 商品ID
        goodsType: "", //商品类型
        category_id: "", //商品分类id
      },
    },
    {
      image: "",
      name: "标题",
      navigator: {
        type: NAVIGATOR_TYPE.URL, // 跳转到商品
        value: "", // 商品ID
        goodsType: "", //商品类型
        category_id: "", //商品分类id
      },
    },
  ],
};
