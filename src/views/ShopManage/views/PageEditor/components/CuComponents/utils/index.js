// 计算后台返回的px尺寸，转换成适用于H5端的vw 和小程序的 rpx;
const computeSize = function (size) {
  const numSize = parseFloat(size);
  if (
    typeof size !== "number" &&
    (!size?.includes("px") || numSize - numSize !== 0)
  )
    return size;
  let result = "";
  // 小程序端的单位
  result = `${numSize}px`;
  return result;
};

export const computeSizeWithStyle = function (style) {
  if (!style) return style;
  const newStyle = {};
  for (let key in style) {
    newStyle[key] = computeSize(style[key]);
  }
  return newStyle;
};
