<template>
  <el-card class="card">
    <el-tabs v-model="activeName">
      <el-tab-pane label="销售额" name="first"></el-tab-pane>
      <el-tab-pane label="访问量" name="second"></el-tab-pane>
    </el-tabs>
    <div class="right">
      <span @click="setDay">今日</span>
      <span @click="setWeek">本周</span>
      <span @click="setMonth">本月</span>
      <span @click="setYear">本年</span>
      <el-date-picker
        style="margin-left: 10px; width: 220px"
        type="daterange"
        range-separator="-"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        size="mini"
         v-model="value1"
         value-format="yyyy-MM-dd"
      >
      </el-date-picker>
    </div>
    <div>
      <el-row :gutter="10">
        <el-col :span="18">
          <div class="charts" ref="chr"></div>
        </el-col>
        <el-col :span="6">
          <h3>门店{{title}}排名</h3>
          <ul>
            <li>
              <span class="num">1</span>
              <span>肯德基</span>
              <span class="rindex">123456</span>
            </li>
            <li>
              <span class="num">2</span>
              <span>肯德基</span>
              <span class="rindex">123456</span>
            </li>
            <li>
              <span class="num">3</span>
              <span>肯德基</span>
              <span class="rindex">123456</span>
            </li>
            <li>
              <span>4</span>
              <span>肯德基</span>
              <span class="rindex">123456</span>
            </li>
            <li>
              <span>5</span>
              <span>肯德基</span>
              <span class="rindex">123456</span>
            </li>
            <li>
              <span>6</span>
              <span>肯德基</span>
              <span class="rindex">123456</span>
            </li>
            <li>
              <span>7</span>
              <span>肯德基</span>
              <span class="rindex">123456</span>
            </li>
          </ul>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
import * as echarts from "echarts";
import dayjs from 'dayjs'
export default {
  name: "Sale",
  mounted() {
    this.myecharts = echarts.init(this.$refs.chr);
    this.myecharts.setOption({
      title:{
        text:"销售额趋势"
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "Direct",
          type: "bar",
          barWidth: "60%",
          data: [10, 52, 200, 334, 390, 330, 220,54,145,234,31,65],
          color:'yellowgreen'
        },
      ],
    });
  },
  data() {
    return {
      activeName: "first",
      myecharts:null,
      value1:[],
    };
  },
  computed:{
    title(){
     return this.activeName=="first"?"销售":"访问"
    }
  },
  watch:{
   activeName(){
     this.myecharts.setOption({
       title:{
         text:this.activeName=="first"?"销售额趋势":"访问量趋势"
       }
     })
   }
  },
  methods: {
    setDay(){
      const day = dayjs().format('YYYY-MM-DD')
      this.value1 = [day,day]
    },
    setWeek(){
      const start = dayjs().day(1).format("YYYY-MM-DD")
      const end = dayjs().day(7).format("YYYY-MM-DD")
      this.value1=[start,end]
    },
    setMonth(){
      const start = dayjs().startOf('month').format("YYYY-MM-DD")
      const end = dayjs().endOf('month').format("YYYY-MM-DD")
      this.value1=[start,end]
    },
    setYear(){
      const start = dayjs().startOf('year').format("YYYY-MM-DD")
      const end = dayjs().endOf('month').format("YYYY-MM-DD")
      this.value1=[start,end]
    }
  },
};
</script>

<style scoped>

.card {
  margin-top: 10px;
  position: relative;
}
.right {
  position: absolute;
  top: 25px;
  right: 20px;
}
.right span {
  margin: 0 10px;
}
.charts{
  width: 100%;
  height: 300px;
}
ul{
  list-style: none;
  width: 100%;
  height: 300px;
  padding: 0;
}
ul li{
  height: 11%;
}
.num{
  width: 15px;
  height: 15px;
  background-color: black;
  color: white;
  border-radius: 50%;
  text-align: center;
  line-height: 15px;
  float: left;
}
li span{
  margin: 0 10px;
}
.rindex{
  float:right;
}
</style>