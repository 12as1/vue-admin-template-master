<template>
  <div class="charts" ref="chart">11</div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "lineChart",
  mounted() {
    let lineChart = echarts.init(this.$refs.chart);
    lineChart.setOption({
      xAxis: { show: false, type: "category" },
      yAxis: { show: false },
      series: [
        {
          type: "line",
          data: [2,23,34,12,34,21,56,32,65],
          itemStyle: {//拐点隐藏
            opacity: 0,
          },
          smooth: true,//拐角平滑
          lineStyle: { //线条颜色
            color: "purple",
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
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
    });
  },
};
</script>

<style>
.charts {
  width: 100%;
  height: 100%;
}
</style>