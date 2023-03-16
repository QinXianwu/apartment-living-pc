<template>
  <div class="MembershipAging">
    <div class="title">会员卡时效</div>
    <div class="content">
      <el-form label-width="120px">
        <el-form-item label="会员卡时效">
          <TablePanel :tableData="list" :tableHead="column">
            <template #price="{ scope }">
              <el-input
                v-model="scope.price"
                :placeholder="`请输入${MEMBERSHIP_TYPE_TEXT[scope.type]}价格`"
                @input="(val) => onInputPrice(val, scope)"
              />
            </template>
            <template #day="{ scope }">
              <el-input
                v-model="scope.day"
                :placeholder="`请输入${MEMBERSHIP_TYPE_TEXT[scope.type]}天数`"
                @input="(val) => onInputDay(val, scope)"
              />
            </template>
            <template #showApplet="{ scope }">
              <el-switch
                v-model="scope.showApplet"
                :active-value="$CONST.MEMBERSHIP_SHOW_STATE.SHOW"
                :inactive-value="$CONST.MEMBERSHIP_SHOW_STATE.HIDE"
              />
            </template>
          </TablePanel>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
const MEMBERSHIP_TYPE = {
  MONTHLY: 1, // 月卡
  SEASON: 2, // 季卡
  ANNUAL: 3, // 年卡
};
const MEMBERSHIP_TYPE_TEXT = {
  [MEMBERSHIP_TYPE.MONTHLY]: "月卡",
  [MEMBERSHIP_TYPE.SEASON]: "季卡",
  [MEMBERSHIP_TYPE.ANNUAL]: "年卡",
};
import CONST from "@/constants/index";
import { simpleCloneDeep } from "@/utils";

export default {
  name: "MembershipAging",
  components: {},
  props: {
    infoData: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      CONST,
      MEMBERSHIP_TYPE,
      MEMBERSHIP_TYPE_TEXT,
      column: [
        {
          label: "名称",
          prop: "name",
        },
        {
          label: "价格",
          prop: "price",
          type: "custom",
        },
        {
          label: "时效(天)",
          prop: "day",
          type: "custom",
        },
        {
          label: "是否展示",
          prop: "showApplet",
          type: "custom",
        },
      ],
      formData: {},
      list: [],
    };
  },
  watch: {
    infoData(val) {
      if (val) this.init();
    },
  },
  computed: {
    initList({ infoData }) {
      const valKey = Object.values(MEMBERSHIP_TYPE);
      return valKey.map((val) => {
        const tempData = {
          day: "",
          price: "",
          showApplet: CONST.MEMBERSHIP_SHOW_STATE.HIDE,
        };
        if (val === MEMBERSHIP_TYPE.MONTHLY) {
          tempData.day = infoData?.monthDay || "";
          tempData.price = infoData?.monthPrice || "";
          if (infoData?.monthType) tempData.showApplet = infoData.monthType;
        } else if (val === MEMBERSHIP_TYPE.SEASON) {
          tempData.day = infoData?.seasonDay || "";
          tempData.price = infoData?.seasonPrice || "";
          if (infoData?.seasonType) tempData.showApplet = infoData.seasonType;
        } else if (val === MEMBERSHIP_TYPE.ANNUAL) {
          tempData.day = infoData?.yearDay || "";
          tempData.price = infoData?.yearPrice || "";
          if (infoData?.yearType) tempData.showApplet = infoData.yearType;
        }
        return { type: val, name: MEMBERSHIP_TYPE_TEXT[val], ...tempData };
      });
    },
  },
  methods: {
    init() {
      this.list = simpleCloneDeep(this.initList);
    },
    onInputDay(val, item) {
      val = val.match(/^\d*(\d{0})/g)[0];
      this.$nextTick(() => {
        item.day = val;
      });
    },
    onInputPrice(val, item) {
      val = val.match(/^\d*(\d{0,2})/g)[0];
      this.$nextTick(() => {
        item.price = val;
      });
    },
    async getQuery() {
      // eslint-disable-next-line
      return new Promise(async (resolve) => {
        try {
          for (const index in this.list) {
            const item = this.list[index];
            if (!item?.price) {
              throw new Error(`请输入${MEMBERSHIP_TYPE_TEXT[item.type]}价格`);
            } else if (!item?.day) {
              throw new Error(`请输入${MEMBERSHIP_TYPE_TEXT[item.type]}天数`);
            }
          }
        } catch (error) {
          return this.$message.error(error);
        }
        const aging = {};
        this.list.forEach((item) => {
          if (item.type === MEMBERSHIP_TYPE.MONTHLY) {
            aging.monthDay = item.day;
            aging.monthPrice = item.price;
            aging.monthType = item.showApplet;
          } else if (item.type === MEMBERSHIP_TYPE.SEASON) {
            aging.seasonDay = item.day;
            aging.seasonPrice = item.price;
            aging.seasonType = item.showApplet;
          } else if (item.type === MEMBERSHIP_TYPE.ANNUAL) {
            aging.yearDay = item.day;
            aging.yearPrice = item.price;
            aging.yearType = item.showApplet;
          }
        });
        // 表单校验
        resolve({
          ...aging,
        });
      });
    },
  },
  mounted() {
    this.init();
  },
};
</script>
<style lang="scss" scoped>
.MembershipAging {
  padding: 10px;
  .title {
    font-size: 15px;
    font-weight: bold;
    color: $main-font-color;
    margin-bottom: 20px;
  }
  .content {
    width: 800px;
  }
  .action {
    padding: 10px 0;
  }
  ::v-deep .el-radio-button__inner {
    padding: 9px 20px;
  }
}
</style>
