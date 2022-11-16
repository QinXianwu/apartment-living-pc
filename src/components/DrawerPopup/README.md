### 抽屉弹窗使用案列

```html
<DrawerPopup v-model="currentVal" @open="open" @close="close">
  <div>显示的内容</div>
</DrawerPopup>
```

```javascript
  import vModelMixin from "@/mixins/vModelMixin";
  export default {
    mixins: [vModelMixin],
    methods: {
      // 打开事件
      open() {}
      // 关闭事件
      close() {}
    }
  }
```
