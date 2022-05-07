<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="6">
        <el-card><Detail title="总销售额" count="￥126560">
          <template slot="charts">
               <span style="font-size:14px;font-weight:bold">周同比  56.67%<svg style="margin:0 5px" t="1649906388906" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3465" width="16" height="16"><path d="M960 704L512 256l-448 448z" fill="#1afa29" p-id="3466"></path></svg></span>
               <span style="font-size:14px;font-weight:bold">日同化 19.96%<svg style="margin:0 5px" t="1649906677895" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4413" width="16" height="16"><path d="M64 320l448 448 448-448z" fill="#d81e06" p-id="4414"></path></svg></span>
          </template>
          <template slot="footer">
              <span style="font-size:14px;font-weight:bold"> 日销售量￥12423</span>
          </template>
          </Detail></el-card>
      </el-col>
      <el-col :span="6">
        <el-card><Detail title="访问量" count="88460">
          <template slot="charts">
           <LineChart />
          </template>
        <template  slot="footer">
              <span style="font-size:14px;font-weight:bold"> 日访问量 1234</span>
          </template>
           </Detail>          
          </el-card></el-col>
      <el-col :span="6">
        <el-card><Detail title="支付笔数" count="88460">
          <template slot="charts">
            <BarCard/>
          </template>
        <template slot="footer">
              <span style="font-size:14px;font-weight:bold"> 转化率 65%</span>
          </template></Detail></el-card
      ></el-col>
      <el-col :span="6">
        <el-card><Detail title="运营活动效果" count="78%">
          <template slot="charts">
            <ProgressCharts/>
          </template>
        <template slot="footer">
              <span style="font-size:14px;font-weight:bold">周同比  12%<svg style="margin:0 5px" t="1649906388906" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3465" width="16" height="16"><path d="M960 704L512 256l-448 448z" fill="#1afa29" p-id="3466"></path></svg></span>
               <span style="font-size:14px;font-weight:bold">日同化 11%<svg style="margin:0 5px" t="1649906677895" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4413" width="16" height="16"><path d="M64 320l448 448 448-448z" fill="#d81e06" p-id="4414"></path></svg></span>
          </template></Detail></el-card
      ></el-col>
    </el-row>
  </div>
</template>

<script>
import Detail from "./Detail";
import LineChart from './lineChart'
import BarCard from './barCard'
import ProgressCharts from './progressCharts'
export default {
  name: "Card",
  components: { Detail ,LineChart ,BarCard,ProgressCharts},
};
</script>

<style>

</style>