<template>
  <div>
    <el-form>
      <el-form-item>
        <el-input
          style="width: 200px; margin-right: 10px"
          placeholder="用户名"
        ></el-input>
        <el-button type="primary" icon="el-icon-zoom-in">查询</el-button>
        <el-button>清空</el-button>
      </el-form-item>
    </el-form>
    <div> 
        <el-button type="primary">添加</el-button>
        <el-button style="background: pink; color: white">批量删除</el-button>
    </div>
    <el-table
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      border
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column type="index" label="序号" width="50"> </el-table-column>
      <el-table-column prop="name" label="用户名" width="100">
      </el-table-column>
      <el-table-column prop="me" label="用户昵称" width="100">
      </el-table-column>
      <el-table-column prop="sale" label="权限列表" width="width">
      </el-table-column>
      <el-table-column prop="time" label="创建时间" width="width">
      </el-table-column>
      <el-table-column prop="updaTime" label="更新时间" width="width">
      </el-table-column>
      <el-table-column label="操作" width="width">
        <template slot-scope="{ row }">
          <el-button type="info" icon="el-icon-s-check" size="mini"></el-button>
          <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      layout="prev, pager, next, jumper,->,sizes,total"
      align="left"
      :page-size="3"
      current-page="1"
      pager-count="7"
      :page-sizes="[3, 5, 7]"
      :total="0"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "User",
  data() {
    return {
      tableData: [
        {
          name: "张三",
          me: "奥特曼",
          sale: "ssss",
          time: "12",
          updaTime: "13",
        },
      ],
    };
  },
};
</script>

<style scoped>
</style>