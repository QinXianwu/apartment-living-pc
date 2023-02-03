// 常量的一些处理方法

// options的生成方法
export const getOpitonsByText = (textHash) => {
  return Object.keys(textHash).map((key) => ({
    label: textHash[key],
    value: /^\d+$/.test(key) ? Number(key) : key, // 如果是全数字字符串转为数字类型
  }));
};
