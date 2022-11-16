import { NAVIGATOR_TYPE } from "@@/components/CuComponents/utils/constant.js";
import Com from "./Index.vue";
export default {
  cName: Com.name,
  label: "列表(横)",
  paddingT: Com.props.paddingT.default,
  paddingB: Com.props.paddingB.default,
  paddingL: Com.props.paddingL.default,
  paddingR: Com.props.paddingR.default,
  height: Com.props.height.default,
  itemWidth: Com.props.itemWidth.default,
  itemHeight: Com.props.itemHeight.default,
  backgroundColor: Com.props.backgroundColor.default,
  borderWidth: Com.props.borderWidth.default,
  boxPaddingB: Com.props.boxPaddingB.default,
  boxPaddingL: Com.props.boxPaddingL.default,
  backgroundImage:
    typeof Com.props.backgroundImage.default === "function"
      ? Com.props.backgroundImage.default()
      : Com.props.backgroundImage.default,
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
  ],
};
