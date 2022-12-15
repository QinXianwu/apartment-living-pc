import api from "@/api/module";
import JSONbig from "json-bigint"; // 解决超过 16 位数字精度丢失问题

const state = {
  categoryListAll: [], // 商品分类级联
  specificaListAll: [], // 商品规格列表
};

const mutations = {
  SET_CATEGORY_LIST_ALL(state, data) {
    state.categoryListAll = data;
  },
  SET_SPECIFICA_LIST_ALL(state, data) {
    state.specificaListAll = data;
  },
};

const actions = {
  // 商品分类级联
  async GetCategoryAllAction({ commit, state }, isRefresh = false) {
    if (state.categoryListAll.length !== 0 && !isRefresh)
      return state.categoryListAll;
    const [, data] = await api.GoodsCategory.GetCategoryAll();
    commit("SET_CATEGORY_LIST_ALL", data?.length ? data : []);
    return data?.length ? data : [];
  },
  // 商品规格列表
  async GetSpecificaListAction({ commit, state }, isRefresh = false) {
    if (state.specificaListAll.length !== 0 && !isRefresh)
      return state.specificaListAll;
    const [, data] = await api.GoodsSpecification.GetListAll();
    const list = data?.length ? data : [];
    list.forEach((item) => (item.id = JSONbig.stringify(item.id)));
    commit("SET_SPECIFICA_LIST_ALL", list);
    return list;
  },
};

const getters = {
  CategoryAllOptions(state) {
    const option = state.categoryListAll;
    if (!option?.length) return [];
    return option.map((item) => {
      const first_options = {
        label: item.name,
        value: item.id,
      };
      if (!item.children?.length) return first_options;
      first_options.children = [];
      item.children.forEach((secondItem) => {
        const second_options = {
          label: secondItem.name,
          value: secondItem.id,
        };
        if (secondItem.children?.length) {
          second_options.children = [];
          secondItem.children.forEach((thirdItem) => {
            const third_options = {
              label: thirdItem.name,
              value: thirdItem.id,
            };
            second_options.children.push(third_options);
          });
        }
        first_options.children.push(second_options);
      });
      return first_options;
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
