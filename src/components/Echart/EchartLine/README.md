# Echarts 折线图

```js
 <EchartLine
  ref="EchartLine"
  chartTitle="折线图"
  :chartsData="chartsData"
  :chartsXAxisData="chartsXAxisData"
/>

// 每条折线数据
chartsData:[
  {
    data: [80, 550, 100, 256, 720, 499],
    name: "测试一",
    showXMarkPoint: false, // 组件默认 true
    showYMarkLine: false, // 组件默认 true
    isSmooth: false, // 组件默认 false
  },
  {
    data: [150, 240, 200, 856, 800, 599],
    name: "测试二",
  },
]
// x轴数据
chartsXAxisData:[
  "2022/10/1",
  "2022/10/2",
  "2022-10-3",
  "2022-10-4",
  "2022-10-5",
  "2022-10-6",
]

// 动态设置折线图数据
set() {
  let count = 0;
  setInterval(() => {
    this.chartsXAxisData.shift();
    const date = new Date();
    date.setDate(date.getDate() + count);
    this.chartsXAxisData.push(date.toLocaleDateString());
    count++;
    const chartsDataList = this.chartsData.map((item) => {
      item.data.shift();
      item.data.push(Math.round(Math.random() * 1000));
      return item.data;
    });
    // console.log(this.chartsXAxisData, chartsDataList);
    this.$refs.EchartLine.setChartsDate({
      xAxis: this.chartsXAxisData,
      chartsDataList: chartsDataList,
    });
  }, 2000);
}

```
