<template>
  <el-card class="box-card">
    <div class="header" slot="header">
      <span>线上热门搜索</span>
      <el-dropdown>
        <span class="el-dropdown-link">
          <i class="el-icon-more"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>黄金糕</el-dropdown-item>
          <el-dropdown-item>狮子头</el-dropdown-item>
          <el-dropdown-item>螺蛳粉</el-dropdown-item>
          <el-dropdown-item>双皮奶</el-dropdown-item>
          <el-dropdown-item>蚵仔煎</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div>
      <el-row :gutter="10">
        <el-col :span="12"> <lineCharts></lineCharts></el-col>
        <el-col :span="12"> <lineCharts></lineCharts></el-col>
      </el-row>
      <el-table style="width: 100%" border size="mini">
        <el-table-column type="index" label="排名" align="center" width="80">
        </el-table-column>
        <el-table-column prop="prop" label="搜索关键字" width="width">
        </el-table-column>
        <el-table-column prop="prop" label="用户数" sortable> </el-table-column>
        <el-table-column prop="prop" label="周涨幅" sortable> </el-table-column>
      </el-table>
      <el-pagination align="right" layout="prev, pager, next" :total="1000"> </el-pagination>
    </div>
  </el-card>
</template>

<script>
import lineCharts from "./lineCharts";
export default {
  components: {
    lineCharts,
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
</style>