TablePanel

| 字段           | 类型     | 是否必传 | 作用           | 默认值 |     |     |     |     |
| -------------- | -------- | -------- | -------------- | ------ | --- | --- | --- | --- |
| tableData      | Array    | 是       | 行值           |        |     |     |     |     |
| column         | Array    | 是       | 行标题         |        |     |     |     |     |
| height         | String   | 否       | 高度           |        |     |     |     |     |
| checkbox       | Boolean  | 否       | 是否需要选框   |        |     |     |     |     |
| disableHandler | Boolean  | 否       | 禁用操作栏     |        |     |     |     |     |
| hidePagination | Boolean  | 否       | 隐藏分页器     |        |     |     |     |     |
| onPageChange   | Function | 否       | 分页器回调函数 |        |     |     |     |     |
| pageOptions    | Object   | 否       | 分页器参数     |        |     |     |     |     |
| getFormValues  | Function | 否       | 获取勾选的值   |        |     |     |     |     |

| column | 类型   | 是否必传 | 示例             | 作用       | 默认值 |     |     |     |     |
| ------ | ------ | -------- | ---------------- | ---------- | ------ | --- | --- | --- | --- |
| prop   | String | 是       | 'userName'       | 表格列的值 |        |     |     |     |     |
| label  | String | 是       | ‘用户名’         | 表格列标题 |        |     |     |     |     |
| type   | String | 否       | ‘image’,'custom' | 插槽作用域 |        |     |     |     |     |
|        |        |          |                  |            |        |     |     |     |     |
|        |        |          |                  |            |        |     |     |     |     |

注意如果要在不改动组件的情况下添加自定义 column,那么请看下面代码

```html
原则： 不改动组件使用自定义插槽 方式：column 加入参数 type:'custom' 如：
tableColumn: [ { label: "默认等级", prop: "isDefault", // 对应slot="prop" type:
"custom", }, ] 使用：
<template slot-scope="include" slot="custom-isDefault">
  <el-button type="text" @click="setDefaultLevel(include.scope.id)"
    >{{ include.scope.isDefault ? "默认等级" : "取消默认" }}</el-button
  >
</template>

那么组件就会认为这是自定义标签
<!-- 高级自定义插槽，特么爱怎么定义怎么定义 -->
tablePanel实现代码
<slot
  v-if="item.type === 'custom'"
  :name="`custom-${item.prop}`"
  :scope="scoped.row"
/>
引用组件
```

```html
<TablePanel
  :column="tableColumn"
  :dataSource="tableData"
  height="550"
  @onPageChange="onPageChange"
  :pageOptions="page"
>
  <template slot-scope="include" slot="custom-isDefault">
    <el-button type="text" @click="setDefaultLevel(include.scope.id)"
      >{{ include.scope.isDefault ? "默认等级" : "取消默认" }}</el-button
    >
  </template>

  <template slot-scope="scoped" slot="handler">
    <el-button type="text" @click="handleUpdate(scoped.Id, 1)"
      >查看会员列表</el-button
    >
    <el-button type="text" @click="handleUpdate(scoped.Id, 2)">编辑</el-button>
    <el-button type="text" @click="handleUpdate(scoped.Id, 3)">删除</el-button>
  </template>
</TablePanel>
```

```js
import TablePanel from "@/components/TablePanel";
export default {
  components: {
    TablePanel,
  },
  data() {
    return {
      tableColumn: [
        { label: "会员等级", prop: "Brand" },
        { label: "会员总数", prop: "ImageUrls" },
        { label: "默认等级", prop: "isDefault", type: "custom" },
      ],
      tableData: [
        {
          Brand: 1,
          ImageUrls: "2",
          Prices: "1",
          isDefault: 1,
          disable: 1, // 0 || 1， 如果为1 此项不可选
        },
      ],
      page: {
        current: 1, // 当前页
        size: 10, // 条数
        total: 50, // 总条数
        limit: [10, 20], // 非必传
      },
    };
  },
  methods: {
    onPageChange(data) {
      this.page.current = data.current; // 当前页
      this.page.size = data.size; // 当前条数
    },

    getSelectKeys(selection) {
      console.log(selection); // list
    },
  },
};
```
