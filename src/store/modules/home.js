import CONST from "@/constants";
import filters from "@/filters";
const nowTime = new Date();
const state = {
  todoData: {}, //代办事项
  dateType: CONST.STATISTICS_TYPE.TODAY, //类型
  dateRange: [filters.formatDate(nowTime), filters.formatDate(nowTime)], //时间范围
  orderList: [], //各种订单的统计信息
  allOrder: {}, //所有订单
  moneyStatistics_data: {}, //统计
  graphical_list: [], //图表
};

const mutations = {
  SET_TODO_DATA(state, data) {
    state.todoData = data;
  },
  SET_DATE_TYPE(state, data) {
    state.dateType = data;
  },
  SET_DATE_RANGE(state, data) {
    state.dateRange = data;
  },
  // 数据处理
  SET_HOME_DATA(state, data) {
    const {
      orderStatistics_list = [],
      moneyStatistics_list = [],
      graphical_list = [],
    } = data;

    state.orderList = orderStatistics_list;

    // 其它数据
    state.moneyStatistics_data = moneyStatistics_list?.length
      ? moneyStatistics_list[0]
      : {};
    state.graphical_list = graphical_list;
  },
};

const actions = {};

const getters = {
  // 对比显示文本
  showText({ dateType }) {
    if (
      dateType === CONST.STATISTICS_TYPE.TODAY ||
      dateType === CONST.STATISTICS_TYPE.DAY
    ) {
      return "较昨日";
    }
    if (dateType === CONST.STATISTICS_TYPE.WEEK) {
      return "较前一周";
    }
    if (dateType === CONST.STATISTICS_TYPE.MONTH) {
      return "较前一月";
    }
    // 自定义不显示对比
    if (dateType === CONST.STATISTICS_TYPE.CUSTOM) {
      return "";
    }
    // 其它全都显示周期
    return "较前一周期";
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
