import axios from "axios";
import * as ELEMENT from "element-ui";
const { Loading, Message } = ELEMENT;
import CONST from "@/constants/index";
import store from "@/store/index";
import { isField } from "@/utils";
import CookieStore from "@/utils/common";
let requestNum = 0, // 累计请求数
  loadingInstance = null, // loading实例
  un_login = false; // 是否未登陆，用于判断提示登陆的次数
// lastMsg = ""; //上一条消息 用来判断是否重复消息
const service = axios.create({
  // baseURL: import.meta.env.VITE_APP_BASE_API_URL,
  baseURL: "/", // 本地局域网开发
  timeout: 60000,
  withCredentials: false, // 是否允许带cookie这些
  headers: {
    "Content-Type": "application/json",
    Authorization: CookieStore.getCookie("user_sessino")
      ? `Bearer ${CookieStore.getCookie("user_sessino")}`
      : "",
  },
});

service.interceptors.request.use(
  (config) => {
    requestNum++;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    requestNum--;
    if (requestNum <= 0) {
      loadingInstance && loadingInstance.close();
      loadingInstance = null;
    }
    const { data, config } = response;

    // 判断此接口是否需要完整返回后端返回的数据
    if (config.isReturnAll) return data;

    // 对本地环境以及线上环境返回不一样字段名进行处理
    if (data) {
      if (!isField(data, "message") && isField(data, "msg"))
        data.message = data.msg;
      // if (!isField(data, "Data") && isField(data, "data"))
      //   data.Data = data.data; // 封装响应体
      if (!data.message && data?.code !== CONST.AJAX_CODE.SUCCESS)
        data.message = "未知错误";
    }

    // 判断是否返回正确的业务编码，返回正确的时候则直接返回主体
    if (data?.code === CONST.AJAX_CODE.SUCCESS) return data.data || true;

    config.isErrorTips && Message.error(data?.message || "未知错误");
    if (data?.code === 401) {
      if (!un_login) {
        // 只需提示一次
        // 授权过期
        store.dispatch("authorization/LoginAsync");
        un_login = true;
      }
    }
    return Promise.reject(data || { message: "未知错误" });
  },

  (error) => {
    requestNum--;
    if (requestNum <= 0) {
      loadingInstance.close();
      loadingInstance = null;
    }
    // 错误的请求结果处理，这里的代码根据后台的状态码来决定错误的输出信息
    var state;
    if (error.response.data.msg || error?.response?.data?.message) {
      state = error.response.data.code;
      error.message = error.response.data.msg || error.response.data.message;
    } else if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = "错误请求";
          break;
        case 401:
          state = 401;
          error.message = "未授权，请重新登录";
          break;
        case 403:
          error.message = "拒绝访问";
          break;
        case 404:
          error.message = "请求错误,未找到该资源";
          break;
        case 405:
          error.message = "请求方法未允许";
          break;
        case 408:
          error.message = "请求超时";
          break;
        case 500:
          error.message = "服务器端出错";
          break;
        case 501:
          error.message = "网络未实现";
          break;
        case 502:
          error.message = "网络错误";
          break;
        case 503:
          error.message = "服务不可用";
          break;
        case 504:
          error.message = "网络超时";
          break;
        case 505:
          error.message = "http版本不支持该请求";
          break;
        default:
          error.message = `连接错误${error.response.status}`;
      }
    } else {
      error.message = "连接到服务器失败";
    }
    if (state === 401 || error?.response?.status === 401) {
      if (!un_login) {
        // 只需提示一次
        // 授权过期
        store.dispatch("authorization/LoginAsync");
        un_login = true;
      }
    } else {
      Message.error(error.message);
    }
    return Promise.reject(error.message);
  }
);

// apiFetch
export function apiFetch(objData) {
  let data = {
    method: "post",
    isLoading: true, // 是否显示加载
    isReturnAll: false, // 是否返回全部接受数据
    isQueryAll: true, // 是否传输全部请求参数
    isErrorTips: true, // 接口报错时是否弹窗提示
    ...objData,
  };
  if (data.isLoading && !loadingInstance) {
    loadingInstance = Loading.service({
      target: ".main-container", // 不包括侧边栏和头部操作栏
      background: "rgba(1,1,1,0.1)",
    });
  }

  let method = data.method;
  if (!method || typeof method !== "string") method = "POST";
  method = method.toUpperCase();
  if (method === "POST") {
    return service.post(
      data.url,
      data.isQueryAll ? data.params : { Data: data.params },
      { ...data, params: undefined }
    );
  }
  if (method === "GET") {
    return service.get(data.url, {
      ...data,
      params: data.isQueryAll ? data.params : { Data: data.params },
    });
  }
  if (method === "PUT") {
    return service.put(
      data.url,
      data.isQueryAll ? data.params : { Data: data.params },
      { ...data, params: undefined }
    );
  }
  if (method === "DELETE") {
    return service.delete(data.url, {
      ...data,
      params: data.isQueryAll ? data.params : { Data: data.params },
    });
  }
  console.error("异常请求类型");
}

//手动清除
export function clearNum() {
  requestNum = 0;
}

/**
 * 自定义jsonp
 * @param  {...any} args
 */
export function jsonp(url, params) {
  if (!url) {
    console.error("JSONP 至少需要一个url参数!");
    return;
  }
  if (params) {
    url += "?";
    for (let k in params) {
      url += `${k}=${encodeURIComponent(params[k])}&`;
    }
    url = url.slice(0, url.length - 1);
  }
  return new Promise((resolve) => {
    let suffix = new Date().getTime();
    window["json_" + suffix] = (result) => {
      resolve(result);
    };

    var JSONP = document.createElement("script");
    JSONP.type = "text/javascript";
    JSONP.src = `${url}&callback=json_${suffix}`;
    document.getElementsByTagName("head")[0].appendChild(JSONP);
    setTimeout(() => {
      document.getElementsByTagName("head")[0].removeChild(JSONP);
    }, 1000);
  });
}

// 接口前缀
export const apiPrefix = import.meta.env.VITE_APP_API_PREFIX;
