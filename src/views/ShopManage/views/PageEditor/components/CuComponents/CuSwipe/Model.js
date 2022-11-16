import { NAVIGATOR_TYPE } from "@@/components/CuComponents/utils/constant.js";
import Com from "./Index.vue";
export default {
  cName: Com?.name,
  label: "轮播图",
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
  options: {
    showDots: true, // 是否显示分页器
    interval: 3000, // 轮播间隔时间，默认3s
    autoplay: true, // 是否自动播放
  },
  height: 240,
  paddingLR: 0,
  paddingTB: 0,
  borderRadius: 0,
};
