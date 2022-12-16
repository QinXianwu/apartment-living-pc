<template>
  <div class="GoodsSpecifica">
    <div class="specifica" v-if="list && list.length">
      <div
        class="specifica-item"
        v-for="(specifica, _index_) in list"
        :key="_index_ + 'ss'"
      >
        <div class="specifica-select">
          <div class="specifica-item-l">
            <el-select
              clearable
              class="input-medium"
              placeholder="请选择商品规格"
              v-model="specifica.id"
              @change="selectSpecifica"
            >
              <el-option
                v-for="(item, index) in specificaListAll"
                :key="index"
                :label="item.specificationName"
                :value="item.id"
                :disabled="isDisabled(item.id)"
              >
              </el-option>
            </el-select>
          </div>
          <div class="specifica-item-r">
            <el-button type="danger" @click="deleteSpecifica(_index_)"
              >移除规格</el-button
            >
          </div>
        </div>
        <div class="specifica-content" v-if="specifica.id">
          <div class="specificaVal">
            <el-tag
              closable
              v-for="(tag, i) in specificaValMap[specifica.id]"
              :key="i + 'tab'"
              class="mr-10"
              @close="handleTagClose(specifica.id, i)"
            >
              {{ tag.specificationValueName }}
            </el-tag>
          </div>
          <el-popover placement="bottom-start" trigger="click">
            <el-button type="text" slot="reference">添加规格值</el-button>
            <div class="specifica-addVal">
              <div class="addVal-input">
                <el-input
                  type="text"
                  placeholder="请输入规格值"
                  class="input-small"
                  v-model="specificaValInputMap[specifica.id]"
                />
                <el-button
                  type="primary"
                  @click="addSpecificaVal(specifica.id)"
                  v-loading="isLoadingSpecifica"
                  >新增规格值</el-button
                >
              </div>
              <div class="select-val">
                <el-checkbox-group
                  v-model="specificaValCheckboxMap[specifica.id]"
                >
                  <el-checkbox
                    border
                    :key="ele.id"
                    :disabled="isDisabledCheckbox(specifica.id, ele.id)"
                    :label="ele.id"
                    v-for="ele in specificaValMapOld[specifica.id]"
                    @change="(val) => handleCheckbox(val, specifica.id, ele)"
                    >{{ ele.specificationValueName }}</el-checkbox
                  >
                </el-checkbox-group>
              </div>
            </div>
          </el-popover>
        </div>
      </div>
    </div>
    <el-button type="primary" @click="addSpecifica">新增规格</el-button>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CONST from "@/constants/index";
import { simpleCloneDeep } from "@/utils/index";

export default {
  name: "GoodsSpecifica",
  components: {},
  props: {},
  data() {
    return {
      CONST,
      list: [],
      specificaValMap: {},
      specificaValMapOld: {},
      specificaValInputMap: {},
      specificaValCheckboxMap: {},
      isLoadingSpecifica: false,
    };
  },
  computed: {
    ...mapState({
      specificaListAll: (state) => state.goods.specificaListAll,
    }),
  },
  watch: {},
  methods: {
    isDisabled(id) {
      return !!this.list.find((item) => item?.id === id);
    },
    isDisabledCheckbox(specificaId, id) {
      return !!this.specificaValMap[specificaId].find(
        (item) => item?.id === id
      );
    },
    addSpecifica() {
      this.list.push({});
    },
    deleteSpecifica(index) {
      const id = this.list[index].id;
      const tempList = simpleCloneDeep(this.specificaValMapOld[id]);
      this.$set(this.specificaValMap, id, tempList);
      this.$set(
        this.specificaValCheckboxMap,
        id,
        tempList.map((item) => item.id)
      );
      this.list.splice(index, 1);
    },
    async selectSpecifica(val) {
      if (val && !this.specificaValMap[val]) {
        const list = await this.getSpecificaValList({ id: val });
        this.$set(this.specificaValMap, val, simpleCloneDeep(list));
        this.$set(this.specificaValMapOld, val, simpleCloneDeep(list));
        this.$set(
          this.specificaValCheckboxMap,
          val,
          list.map((item) => item.id)
        );
      }
    },
    handleTagClose(id, index) {
      const _index_ = this.specificaValCheckboxMap[id].findIndex(
        (item) => item === this.specificaValMap[id][index].id
      );
      this.specificaValCheckboxMap[id].splice(_index_, 1);
      this.specificaValMap[id].splice(index, 1);
    },
    handleCheckbox(val, id, data) {
      const index = this.specificaValMap[id].findIndex(
        (item) => item?.id === data?.id
      );
      if (val && index === -1) {
        this.specificaValMap[id].push({
          ...data,
        });
      }
    },
    async addSpecificaVal(id) {
      if (!this.specificaValInputMap[id])
        return this.$message.error("请输入规格值后再试");
      this.isLoadingSpecifica = true;
      const [, res] = await this.$http.GoodsSpecification.AddSpecificaValue({
        specificationId: id,
        specificationValueName: this.specificaValInputMap[id],
      });
      this.isLoadingSpecifica = false;
      this.$message[res ? "success" : "error"](
        res?.message || `新增规格值${res ? "成功" : "失败"}`
      );
      if (!res) return;
      const list = await this.getSpecificaValList({
        id,
        isUpdateCheckboxMap: false,
      });
      this.$set(this.specificaValMapOld, id, simpleCloneDeep(list));
    },
    async getSpecificaValList({ id, isUpdateCheckboxMap = true }) {
      if (!id) return;
      const [, res] = await this.$http.GoodsSpecification.GetSpecificaValueList(
        {
          specificationId: id,
        }
      );
      const data = res?.length ? res : [];
      data.forEach((item) => {
        if (item?.id) item.id = this.$JSONbig.stringify(item.id);
        if (item?.specificationId)
          item.specificationId = this.$JSONbig.stringify(item.specificationId);
        this.$set(this.specificaValInputMap, id, "");
        if (isUpdateCheckboxMap)
          this.$set(this.specificaValCheckboxMap, id, []);
      });
      return data;
    },
    async handleSubmit() {
      this.$emit("success", this.formData);
      return this.formData;
    },
  },
  mounted() {
    this.$store.dispatch("goods/GetSpecificaListAction");
  },
};
</script>
<style lang="scss" scoped>
.specifica {
  padding: 10px;
  &-select {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &-content {
    background: #fff;
    margin: 20px 0 0;
    padding: 10px;
  }
  &-item {
    background: #f7f8fa;
    padding: 20px;
    margin-bottom: 20px;
  }
  &-addVal {
    width: 500px;
    padding: 0 0 10px;
    .addVal-input {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 0;
      margin-bottom: 10px;
    }
  }
}
</style>
