import { MessageBox } from "element-ui";
import { simpleCloneDeep } from "@/utils/index.js";
import { NAVIGATOR_TYPE } from "@@/components/CuComponents/utils/constant.js";
// import api from "@/api/module";
// 处处都要拷贝一下 数据赋值容易绑定上
const getStandard = function () {
  return {
    templateName: "默认页面",
    // 默认的JSON
    jsonData: [],
  };
};

export default {
  namespaced: true,
  state: {
    selectIndex: null, // 当前编辑选中的组件index
    editorJson: [], // 正在编辑的json
    selectingNavigator: null, // 选择跳转地址
    // 页面描述
    confirmForm: {
      Description: "自定义页面",
    },
    // 显示添加链接弹窗
    isShowLinkDialog: false,
    // 打开弹窗的item索引
    selectingItemIndex: -1,
    // 显示商品选择弹窗
    isShowGoodsDialog: false,
    // 建立以商品ID为key的商品信息表，方便在不改变editorJson数据的同时显示商品信息
    goodsInfoHash: {},
    // 商品分类
    goodsCategory: [],
    // 建立以商品分类ID为key的商品分类信息表，方便在不改变editorJson数据的同时显示商品分类信息
    categoryInfoHash: {},
    isShowLiveDialog: false, //显示直播列表弹窗
  },
  mutations: {
    setSelectIndex(state, index) {
      state.selectIndex = index;
    },
    // 设置整个编辑JSON
    setEditorJson(state, data) {
      state.editorJson = data;
    },
    setSelectingNavigator(state, data) {
      state.selectingNavigator = data;
    },
    setConfirmForm(state, data) {
      state.confirmForm = data;
    },
    setIsShowLinkDialog(state, data) {
      state.isShowLinkDialog = data;
    },
    setSelectingItemIndex(state, index) {
      state.selectingItemIndex = index;
    },
    setIsShowGoodsDialog(state, data) {
      state.isShowGoodsDialog = data;
    },
    setGoodsInfoHash(state, data) {
      state.goodsInfoHash = data;
    },
    setGoodsCategory(state, data) {
      state.goodsCategory = data;
    },
    setCategoryHash(state, data) {
      state.categoryInfoHash = data;
    },
    setIsShowLiveDialog(state, data) {
      state.isShowLiveDialog = data;
    },
  },
  actions: {
    // async getRetailProductCategoryAction({ commit }) {
    //   const [err, data] = await api.SiteTemplate.GetRetailProductCategoryApi();
    //   if (err || !data?.Result) return;
    //   // 添加到新的hash表
    //   commit("setGoodsCategory", data?.Result);
    //   return data?.Result;
    // },
    // 更新索引为index的组件数据
    updateComInfoByIndex({ commit, state }, { index, data }) {
      if (index - index !== 0) index = state.selectIndex;
      const newEditorJson = [...state.editorJson];
      newEditorJson[index] = data;
      commit("setEditorJson", newEditorJson);
    },
    // 获取页面JSON
    async getEditorJson({ commit, dispatch }, Key) {
      if (!Key) return;
      // const [, data] = await api.SiteTemplate.GetSiteTemplateApi({ path: Key });
      const data = {};
      let hasError = false; // 出错了
      console.log(data);
      if (data?.site_template?.value) {
        // json处理方法
        try {
          const { templateName, jsonData } = JSON.parse(
            data.site_template.value
          );
          commit("setConfirmForm", {
            Description: templateName,
          });
          console.log(jsonData);
          if (!Array.isArray(jsonData)) {
            hasError = true;
            MessageBox.alert("错误");
          } else {
            commit("setEditorJson", jsonData);
            // 给json添加商品属性,筛选商品id，整理商品数据
            dispatch("handleGoodListID", jsonData);
            if (jsonData?.length > 0) {
              commit("setSelectIndex", 0);
            }
          }
        } catch (error) {
          hasError = true;
          console.log(error);
        }
      } else {
        hasError = true;
      }
      if (hasError) {
        // 系统初始化
        const PageJson = getStandard();
        // api.SiteTemplate.SetSiteTemplateApi({
        //   value: JSON.stringify(PageJson),
        //   path: Key,
        //   title: "首页",
        // });
        commit("setEditorJson", PageJson.jsonData);
        commit("setConfirmForm", { Description: PageJson.templateName });
      }
    },
    // 获取商品列表数据
    async getProductListAction({ commit, state }, options) {
      console.log(options);
      // const [err, data] = await await api.GoodsSpu.GetRangeList(options);
      const data = {};
      const err = null;
      if (err || !data?.spus) return;
      // 建立hash
      const newHash = { ...state.goodsInfoHash };
      for (let i = 0, item; (item = data.spus[i++]); ) {
        if (newHash[item.spu_id]) continue;
        newHash[item.spu_id] = item;
      }
      // 添加到新的hash表
      commit("setGoodsInfoHash", newHash);
      return data;
    },
    /**
     * 处理商品数据
     * 找到type为'custom-goods-list'的项
     * 如果list的长度大于0 调用接口获取数据
     */
    handleGoodListID(editorData) {
      if (!editorData?.length) return;
      let list = [];
      // 收集相关的商品组件
      editorData.forEach((com) => {
        if (!com?.list?.length) return;
        // 商品列表组件
        if (com.cName === "cu-goods-list") {
          list = list.concat([...com.list]);
        }
        // 检查是否有跳转地址
        com.list.forEach((item) => {
          if (item?.navigator?.type === NAVIGATOR_TYPE.GOODS) {
            list.push({ ID: item?.navigator.value });
          }
        });
      });
      if (!list?.length) return;
      // 收集商品ID
      // const IDs = list.map(item => {
      //   return item.spu_id;
      // });
      // dispatch("getProductListAction", {
      //   rows: 200, // 一次最多200条
      //   page: 1,
      //   filters: {
      //     rules: [
      //       {
      //         field: "spu_id",
      //         op: "in",
      //         data: IDs.join(","),
      //       },
      //     ],
      //   },
      // });
    },
    // 插入editorJson
    inserItem({ commit, state }, { index, item }) {
      const newEditorJson = [...state.editorJson];
      newEditorJson.splice(index, 0, item);
      commit("setEditorJson", newEditorJson);
    },
    // 根据ID删除某个组件
    deleteItem({ commit, state }, index) {
      const newEditorJson = [...state.editorJson];
      newEditorJson.splice(index, 1);
      commit("setEditorJson", newEditorJson);
    },
    // 更新某个组件的list属性
    updateEditorJsonList(
      { dispatch, state },
      { index, val, type = "push", updateIndex }
    ) {
      const newCurrentData = simpleCloneDeep(state.editorJson[index]);
      switch (type) {
        case "push":
          newCurrentData.list.push(val);
          break;
        case "splice":
          newCurrentData.list.splice(val, 1);
          break;
        case "update":
          newCurrentData.list[updateIndex] = val;
          break;
      }
      dispatch("updateComInfoByIndex", { data: newCurrentData, index });
    },
    // 根据索引index更新组件的某个属性
    updateEditorJsonAttrByIndex({ dispatch, state }, { index, attr, val }) {
      const newVal = { ...state.editorJson[index] };
      newVal[attr] = val;
      dispatch("updateComInfoByIndex", { data: newVal, index });
    },
    // 弹窗相关
    showLinkDialogAction({ commit }, { index, item }) {
      commit("setSelectingItemIndex", index);
      commit("setIsShowLinkDialog", true);
      commit("setSelectingNavigator", item.navigator);
    },
  },
  getters: {
    // 当前编辑选择的组件
    selectComInfo(state) {
      return state.editorJson[state.selectIndex] || {};
    },
  },
};
