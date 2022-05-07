<template>
  <div>
    <!-- 按钮 -->
    <el-button
      type="primary"
      icon="el-icon-plus"
      style="margin: 10px"
      @click="showDialog"
      >添加</el-button
    >
    <!-- 表格组件 -->
    <el-table style="width: 100%; margin: 10px" border :data="list">
      <el-table-column type="index" label="序号" width="80px" align="center">
      </el-table-column>
      <el-table-column prop="tmName" label="品牌名称" width="width">
      </el-table-column>
      <el-table-column prop="prop" label="品牌LOGO" width="width">
        <template slot-scope="{ row }">
          <img :src="row.logoUrl" alt="" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{ row }">
          <el-button
            type="warning"
            icon="el-icon-edit"
            size="mini"
            @click="updateTradeMark(row)"
            >修改</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="deleteTradeMark(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器
    当前第几页、数据总条数、每一页展示几条数据
    
     -->
    <el-pagination
      align="center"
      :current-page="page"
      :total="total"
      :page-size="limit"
      :pager-count="7"
      :page-sizes="[3, 5, 7]"
      layout="prev,pager,next,jumper,->,sizes,total"
      @current-change="getPageList"
      @size-change="handleSizeChange"
    >
    </el-pagination>
    <!-- 对话框 -->
    <el-dialog
      :title="tmForm.id ? '修改品牌' : '添加品牌'"
      :visible.sync="dialogFormVisible"
    >
      <!-- form表单: :model属性，这个属性的作用是，把表单的数据收集到哪个对象的身上，将来表单验证，也需要这个属性 
      Form 组件提供了表单验证的功能，只需要通过 rules 属性传入约定的验证规则，并将 Form-Item 的 prop 属性设置为需校验的字段名即可。校验规则参见 async-validator
      -->
      <el-form style="width: 70%" :model="tmForm" :rules="rules" ref="fromName">
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input autocomplete="off" v-model="tmForm.tmName"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <!-- 
            action:设置图片上传的地址
           -->
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            accept="image/jpeg,image/jpg,image/png,image/gif" 
          >
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrupdataTradeMark"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    var validatetmName = (rule, value, callback) => {
      if (value.length < 2 || value.length > 10) {
        callback(new Error("品牌名称2-10位"));
      } else {
        callback();
      }
    };
    return {
      //当前第几页
      page: 1,
      //当前页展示数据
      limit: 3,
      //总共数据条数
      total: 0,
      //列表展示的数据
      list: [],
      //对话框显示隐藏的控制属性
      dialogFormVisible: false,
      //收集品牌信息
      tmForm: {
        tmName: "",
        logoUrl: "",
      },
      //表单验证规则
      rules: {
        tmName: [
          //用户行为trigger
          { required: true, message: "请输入品牌名称", trigger: "blur" },
          // {
          //   min: 2,
          //   max: 10,
          //   message: "长度在 2 到 10 个字符",
          //   trigger: "change",
          // },
          //自定义校验规则
          { validator: validatetmName, trigger: "change" },
        ],
        logoUrl: [
          { required: true, message: "请选择品牌图片", trigger: "change" },
        ],
      },
    };
  },
  name: "tradeMark",
  mounted() {
    //获取列表数据
    this.getPageList();
  },
  methods: {
    //改变当前页
    async getPageList(pager = 1) {
      this.page = pager;
      const { page, limit } = this;
      let result = await this.$api.reqTradeMarkList(page, limit);
      if (result.code == 200) {
        this.total = result.data.total;
        this.list = result.data.records;
      }
    },
    //改变当前每页几条数据
    handleSizeChange(limit) {
      this.limit = limit;
      this.getPageList();
    },
    //添加品牌的按钮
    showDialog() {
      this.dialogFormVisible = true;
      this.tmForm = { tmName: "", logoUrl: "" };
    },
    //修改品牌按钮
    updateTradeMark(row) {
      this.dialogFormVisible = true;
      //浅拷贝
      this.tmForm = { ...row };
    },
    //上传品牌logo图片成功
    handleAvatarSuccess(res, file,fileList) {
      this.tmForm.logoUrl = res.data;
    },
    //上传品牌logo图片之前
    beforeAvatarUpload(file) {
      // const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      // if (!isJPG) {
      //   this.$message.error("上传头像图片只能是 JPG 格式!");
      // }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      // return isJPG && isLt2M;
    },
    //添加或修改品牌
    addOrupdataTradeMark() {
      //当全部表单验证完成
      this.$refs.fromName.validate(async (success) => {
        if (success) {
          this.dialogFormVisible = false;
          let result = await this.$api.reqAddOrUpdateTradeMark(this.tmForm);
          if (result.code == 200) {
            //弹出信息:添加品牌成功 修改品牌成功
            this.$message({
              message: this.tmForm.id ? "修改品牌成功" : "添加品牌成功",
              type: "success",
            });
            //添加或修改品牌成功之后再次获取品牌列表展示
            //this.tmForm.id?this.page:1 修改成功停留在当前页面
            this.getPageList(this.tmForm.id ? this.page : 1);
          }
        } else {
          return false;
        }
      });
    },
    //删除品牌
    deleteTradeMark(row) {
      this.$confirm(`你确定删除${row.tmName}`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
      let result =  await this.$api.reqDeleteTradeMark(row.id)
      if(result.code == 200){
        this.$message({
            type: "success",
            message: "删除成功!",
          });
        this.getPageList(this.list.length>1?this.page:this.page-1)
      }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
