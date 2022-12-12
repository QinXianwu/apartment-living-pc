import api from "@/api/module";

const state = {
  categoryAll: [], // 商品分类级联
};

const mutations = {
  SET_CATEGORY_ALL(state, data) {
    state.categoryAll = data;
  },
};

const actions = {
  // 商品分类级联
  async GetCategoryAllAction({ commit, state }, isRefresh = false) {
    if (state.categoryAll.length !== 0 && !isRefresh) return state.categoryAll;
    const [, data] = await api.GoodsCategory.GetCategoryAll();
    commit("SET_CATEGORY_ALL", data?.length ? data : []);
    return data?.length ? data : [];
  },
};

const getters = {
  CategoryAllOptions(state) {
    const option = state.categoryAll;
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
