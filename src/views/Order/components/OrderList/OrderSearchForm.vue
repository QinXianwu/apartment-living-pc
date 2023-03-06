<template>
  <div class="OrderSearchForm">
    <SearchForm isReturnFormData :formData="searchForm" @on-search="onSearch" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "OrderSearchForm",
  props: {
    // 默认的搜索数据
    default: Object,
    orderTypeData: {
      type: Object,
      default: () => ({}),
    },
    // isAfterSale: Boolean, // 是否是售后
    // isSendOrder: Boolean, // 是否是配送单
    // isSelfPickupOrder: Boolean, // 是否是自提单
    // isGroupOrder: Boolean, // 是否是拼团订单
    // isPointsOrder: Boolean, // 是否是积分订单
  },
  computed: {
    ...mapGetters({
      isVendor: "user/isVendor",
      isService: "user/isService",
      supplierOptions: "accountRoleManage/supplierOptions",
      serviceStationOptions: "accountRoleManage/serviceStationOptions",
    }),
    formData({ defaultFormData, afterFormData, orderTypeData }) {
      if (orderTypeData?.isAfterSale) return afterFormData;
      return defaultFormData;
    },
    searchForm({ isVendor, isService, formData }) {
      const filterPropStr = `${isService ? "serviceId" : ""},${
        isVendor ? "supplierId" : ""
      }`;
      return formData.filter((item) => !filterPropStr.includes(item.prop));
    },
    // 默认表单
    defaultFormData({ supplierOptions, serviceStationOptions }) {
      return [
        {
          label: "订单号",
          prop: "orderNo",
          type: "text",
          value: "",
          placeholder: "请输入订单号",
        },
        {
          label: "商品名称",
          prop: "productName",
          type: "text",
          value: "",
          placeholder: "请输入商品名称",
        },
        {
          label: "供应商",
          prop: "supplierId",
          type: "select",
          value: "",
          options: supplierOptions,
          placeholder: "请选择供应商",
        },
        {
          label: "服务点",
          prop: "serviceId",
          type: "select",
          value: "",
          options: serviceStationOptions,
          placeholder: "请选择服务点",
        },
        {
          label: "收货人姓名",
          prop: "receipteName",
          type: "text",
          value: "",
          placeholder: "请输入收货人姓名",
        },
        {
          label: "收货人手机号",
          prop: "receiptePhone",
          type: "text",
          value: "",
          placeholder: "请输入收货人手机号",
        },
        {
          label: "订单时间",
          prop: "orderDate",
          type: "datetimerange",
          value: "",
          placeholder: "请选择订单时间",
        },
      ];
    },
    // 售后
    afterFormData({ serviceStationOptions }) {
      return [
        {
          label: "订单号",
          prop: "orderNo",
          type: "text",
          value: "",
          placeholder: "请输入订单号",
        },
        {
          label: "商品名称",
          prop: "productName",
          type: "text",
          value: "",
          placeholder: "请输入商品名称",
        },
        {
          label: "服务点",
          prop: "serviceId",
          type: "select",
          value: "",
          options: serviceStationOptions,
          placeholder: "请选择服务点",
        },
        {
          label: "收货人姓名",
          prop: "nickName",
          type: "text",
          value: "",
          placeholder: "请输入收货人姓名",
        },
        {
          label: "收货人手机号",
          prop: "mobile",
          type: "text",
          value: "",
          placeholder: "请输入收货人手机号",
        },
        {
          label: "订单时间",
          prop: "orderDate",
          type: "datetimerange",
          value: "",
          placeholder: "请选择订单时间",
        },
      ];
    },
  },
  data() {
    return {};
  },
  methods: {
    onSearch(val) {
      const query = { ...(val || {}) };
      const orderDate = query?.orderDate || [];
      if (orderDate?.length >= 2) {
        query.startTime = orderDate[0];
        query.endTime = orderDate[1];
      } else {
        query.startTime = "";
        query.endTime = "";
      }
      delete query.orderDate;
      this.$emit("on-search", query);
    },
  },
  created() {
    this.$store.dispatch("accountRoleManage/GetServiceStationListAction");
    this.$store.dispatch("accountRoleManage/GetSupplierListAction");
  },
};
</script>
