// async 方法的处理
export const createCatchAsyncFun = (errorHandle) => {
  return async (fn) => {
    try {
      return [null, await fn];
    } catch (error) {
      typeof errorHandle === "function" && errorHandle(error);
      return [error, null];
    }
  };
};

/**
 * 参数处理
 * @param {*} params  参数
 */
export function tansParams(params) {
  let result = "";
  for (const propName of Object.keys(params)) {
    const value = params[propName];
    var part = encodeURIComponent(propName) + "=";
    if (value !== null && value !== "" && typeof value !== "undefined") {
      if (typeof value === "object") {
        for (const key of Object.keys(value)) {
          if (
            value[key] !== null &&
            value[key] !== "" &&
            typeof value[key] !== "undefined"
          ) {
            let params = propName + "[" + key + "]";
            var subPart = encodeURIComponent(params) + "=";
            result += subPart + encodeURIComponent(value[key]) + "&";
          }
        }
      } else {
        result += part + encodeURIComponent(value) + "&";
      }
    }
  }
  return result;
}

function checkType(type) {
  return (a) => {
    return Object.prototype.toString.call(a) === `[object ${type}]`;
  };
}

export const isObject = checkType("Object");

// 深拷贝
export function deepCopy(objA, objB) {
  var result = {};
  var map = new Map();
  for (let key in objA) {
    if (isObject(objA[key]) && isObject(objB[key])) {
      map.set(key, true);
      result[key] = deepCopy(objA[key], objB[key]);
    } else {
      result[key] = objA[key];
    }
  }
  for (let key in objB) {
    if (!map.has(key)) {
      result[key] = objB[key];
    }
  }
  return result;
}

// 简单的深拷贝，只针对简单对象和Array，且不存在循环引用
export function simpleCloneDeep(value) {
  if (Object.prototype.toString.call(value) === "[object Object]") {
    const obj = {};
    for (let key in value) {
      obj[key] = simpleCloneDeep(value[key]);
    }
    return obj;
  } else if (Array.isArray(value)) {
    const arr = [];
    value.forEach((item, i) => {
      arr[i] = simpleCloneDeep(item);
    });
    return arr;
  } else {
    return value;
  }
}

// 分转元
export function cent2yuan(price) {
  return Number(price || 0) / 100;
}
// 元转分
export function yuan2cent(price) {
  return Math.round(Number(price || 0) * 100);
}
// 获取对象值
export function getObjectValue(obj, data) {
  if (data instanceof Array) {
    return data.map((val) => {
      return obj[val] || undefined;
    });
  } else if (typeof data === "string" || typeof data === "number") {
    return obj[data] || undefined;
  } else {
    // 需要再拓展
    return undefined;
  }
}
// 校验保留两位小数数值
export function isNumber(value) {
  const reg = /^(-?\d+)(\.\d{1,2})?$/;
  return reg.test(Number(value));
}

// 是否在对象中存在当前字段
export function isField(data, key) {
  if (typeof data !== "object") return;
  return Object.prototype.hasOwnProperty.call(data, key);
}

// 获取连接全部参数对象
export function getQueryObj(url) {
  let targetStr = url.split("?")[1];
  let query = {};
  if (targetStr) {
    let arr = targetStr.split("&");
    arr.forEach((q) => {
      const strArr = q.split("=");
      query[strArr[0]] = strArr[1];
    });
  }
  return query;
}
// options的生成方法
export const getOptionsByText = (textHash) => {
  return Object.keys(textHash).map((key) => ({
    label: textHash[key],
    value: /^\d+$/.test(key) ? Number(key) : key, // 如果是全数字字符串转为数字类型
  }));
};

/**
 * @desc 函数节流
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param type 1 使用表时间戳，在时间段开始的时候触发 2 使用表定时器，在时间段结束的时候触发
 */
export function throttle(func, wait = 1000, type = 1) {
  let previous = 0;
  let timeout;
  return function () {
    let context = this;
    let args = arguments;
    if (type === 1) {
      let now = Date.now();

      if (now - previous > wait) {
        func.apply(context, args);
        previous = now;
      }
    } else if (type === 2) {
      if (!timeout) {
        timeout = setTimeout(() => {
          timeout = null;
          func.apply(context, args);
        }, wait);
      }
    }
  };
}

/**
 * @desc 函数防抖
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param immediate true 表立即执行，false 表非立即执行
 */
export function debounce(func, wait, immediate = false) {
  let timerId;
  return function () {
    let context = this;
    let args = arguments;

    if (timerId) clearTimeout(timerId);
    if (immediate) {
      let callNow = !timerId;
      timerId = setTimeout(function () {
        timerId = null;
      }, wait);
      if (callNow) func.apply(context, args);
    } else {
      timerId = setTimeout(() => {
        func.apply(context, args);
      }, wait);
    }
  };
}

/**
 * 构造树型结构数据
 * @param {*} data 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 */
export function handleTree(data, id, parentId, children) {
  let config = {
    id: id || "id",
    parentId: parentId || "parentId",
    childrenList: children || "children",
  };

  var childrenListMap = {};
  var nodeIds = {};
  var tree = [];

  for (let d of data) {
    let parentId = d[config.parentId];
    if (!childrenListMap[parentId]) {
      childrenListMap[parentId] = [];
    }
    nodeIds[d[config.id]] = d;
    childrenListMap[parentId].push(d);
  }

  for (let d of data) {
    let parentId = d[config.parentId];
    if (!nodeIds[parentId]) {
      tree.push(d);
    }
  }

  for (let t of tree) {
    adaptToChildrenList(t);
  }

  function adaptToChildrenList(o) {
    if (childrenListMap[o[config.id]]) {
      o[config.childrenList] = childrenListMap[o[config.id]];
    }
    if (o[config.childrenList]) {
      for (let c of o[config.childrenList]) {
        adaptToChildrenList(c);
      }
    }
  }
  return tree;
}
