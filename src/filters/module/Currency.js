import { cent2yuan, yuan2cent } from "@/utils";
function formatCurrency(num) {
  if (!num) return "0.00";
  num = num.toString().replace(/\$|,/g, "");
  if (isNaN(num)) num = "0";
  let sign = Number(num) === (num = Math.abs(num));
  num = Math.floor(num * 100 + 0.50000000001);
  let cents = num % 100;
  num = Math.floor(num / 100).toString();
  if (cents < 10) cents = "0" + cents;
  for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
    num =
      num.substring(0, num.length - (4 * i + 3)) +
      "," +
      num.substring(num.length - (4 * i + 3));
  return (sign ? "" : "-") + num + "." + cents;
}
// 金钱单位 分转元
export default {
  cent2yuan,
  yuan2cent,
  // 金钱格式化
  formatCurrency,
  showPrice(data, key = "sale_price") {
    if (!data || !data.length) return "¥0.00";
    let minPrice = null,
      maxPrice = null;
    data.map((item) => {
      if (!minPrice) minPrice = item[key];
      else if (minPrice > item[key]) minPrice = item[key];
      if (!maxPrice) maxPrice = item[key];
      else if (maxPrice < item[key]) maxPrice = item[key];
    });
    if (minPrice === maxPrice) {
      return `¥${formatCurrency(cent2yuan(minPrice))}`;
    } else {
      return `¥${formatCurrency(cent2yuan(minPrice))}-¥${formatCurrency(
        cent2yuan(maxPrice)
      )}`;
    }
  },
  // 价格区间过滤
  priceRange(item, key1, key2) {
    const itemData = item || {};
    const p1 = itemData[key1] || 0;
    const p2 = itemData[key2] || 0;
    if (!p1 && p1 !== 0) return "-";
    if ((!p2 && p2 !== 0) || p1 === p2) return "￥" + formatCurrency(p1);
    const price1 = formatCurrency(p1);
    const price2 = formatCurrency(p2);
    return "￥" + price1 + "~￥" + price2;
  },
};
