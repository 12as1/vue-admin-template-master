<template>
  <el-card class="box-card">
    <div class="header-category" slot="header">
      <span>销售类别占比</span>
      <el-radio-group size="mini" style="margin-top: -10px" v-model="value">
        <el-radio-button label="全部渠道"></el-radio-button>
        <el-radio-button label="线上"></el-radio-button>
        <el-radio-button label="门店"></el-radio-button>
      </el-radio-group>
    </div>
    <div>
      <div class="echarts" ref="each"></div>
    </div>
  </el-card>
</template>

<script>
import * as echarts from "echarts";
export default {
  data() {
    return {
      value: "全部渠道",
    };
  },
  mounted() {
    let myecharts = echarts.init(this.$refs.each);
    myecharts.setOption({
      title:{
       text:'',
       subtext:'',
       left:'center',
       top:'center'
      },
      tooltip: {
        trigger: "item",
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: ["45", "70%"],
          avoidLabelOverlap:false,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },
          data: [
            { value: 1048, name: "Search Engine"},
            { value: 735, name: "Direct" },
            { value: 580, name: "Email" },
            { value: 484, name: "Union Ads" },
            { value: 300, name: "Video Ads" },
          ],
        },
      ],
    });
    myecharts.on('mouseover', function (params) {
  const {name,value} = params.data
  this.setOption({
    title:{
       text:name,
       subtext:value,
       left:'center',
       top:'center',
       textStyle:{
           fontSize:12,
           fontWeight:'bold'
       }
    }
  })
});
 myecharts.on('mouseout', function () {
  this.setOption({
    title:{
       text:'',
       subtext:'',
       left:'center',
       top:'center'
    }
  })
});
  },
};
</script>

<style>
.header-category {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.echarts {
  width: 100%;
  height: 300px;
}
</style>