<template>
  <div>
    <div class="headers">
      <span>11111</span>
    <svg
      style="vertical-align: middle; margin-left: 20px"
      t="1649905341653"
      class="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="2569"
      width="16"
      height="16"
    >
      <path
        d="M536 480v192a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16V480a16 16 0 0 1 16-16h16a16 16 0 0 1 16 16z m-32-128h16a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16v-32a16 16 0 0 1 16-16z m8 448c159.056 0 288-128.944 288-288s-128.944-288-288-288-288 128.944-288 288 128.944 288 288 288z m0 48c-185.568 0-336-150.432-336-336s150.432-336 336-336 336 150.432 336 336-150.432 336-336 336z"
        p-id="2570"
      ></path>
    </svg>
    </div>
    <div class="main">
      <span style="margin-right:20px">122</span>
      <span style="margin-right:20px"> 17.1</span><svg style="margin:0 5px" t="1649906388906" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3465" width="16" height="16"><path d="M960 704L512 256l-448 448z" fill="#1afa29" p-id="3466"></path></svg><svg style="margin:0 5px" t="1649906677895" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4413" width="16" height="16"><path d="M64 320l448 448 448-448z" fill="#d81e06" p-id="4414"></path></svg>
    </div>
    <div class="footer">
      <div class="carts" ref="chart"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  mounted() {
    let lineChart = echarts.init(this.$refs.chart);
    lineChart.setOption({
      xAxis: { show: false, type: "category" },
      yAxis: { show: false },
      series: [
        {
          type: "line",
          data: [30,25,20,30,25],
          itemStyle: {//拐点隐藏
            opacity: 0,
          },
          smooth: true,//拐角平滑
          lineStyle: { //线条颜色
            color: "blue",
          },
          areaStyle: {
            color: {//区域填充颜色 ，渐变
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "purple", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#fff", // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
        },
      ],
      grid: {
        left: -20,
        top: 0,
        right: -10,
        bottom: 0,
      },
    });
  },
};

</script>

<style scoped>
.headers {
  display: flex;
  align-items: center;
}
.footer{
  width: 100%;
}
.carts{
  margin-top: 10px;
  width: 100%;
  height: 30px;
}
</style>