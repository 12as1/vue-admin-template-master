<template>
  <div class="charts" ref="chart"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "barChart",
  mounted() {
    let lineChart = echarts.init(this.$refs.chart);
    lineChart.setOption({
      xAxis: { show: false,
      //均分
      type: "category" },
      yAxis: { show: false },
        tooltip: {},
      series: [
        {
          type: "bar",
          data: [33, 44, 22, 2, 23, 34, 12, 34, 21, 56, 32, 65],
          itemStyle: { color: "pink" },
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