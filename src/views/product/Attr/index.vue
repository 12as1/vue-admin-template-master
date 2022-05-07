<template>
  <div>
    <el-card style="margin: 20px 0">
      <CategorySelect
        :isShowTable="isShowTable"
        @getgoryId="getgoryId"
      ></CategorySelect>
    </el-card>
    <el-card>
      <div v-show="isShowTable">
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!category3Id"
          @click="addAttr"
          >添加属性</el-button
        >
        <el-table border style="width: 100%" :data="attrList">
          <el-table-column
            label="序号"
            type="index"
            width="100px"
            align="center"
          >
          </el-table-column>
          <el-table-column label="属性名称" prop="attrName" width="150px">
          </el-table-column>
          <el-table-column label="属性值列表" prop="prop" width="width">
            <template slot-scope="{ row }">
              <el-tag
                type="success"
                v-for="attrvalue in row.attrValueList"
                :key="attrvalue.id"
                style="margin: 0 10px"
              >
                {{ attrvalue.valueName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" prop="prop" width="150px">
            <template slot-scope="{ row, $index }">
              <el-button
                title="修改"
                type="warning"
                icon="el-icon-edit"
                size="mini"
                @click="updteAttr(row)"
              ></el-button>
              <el-button
                title="删除"
                type="danger"
                icon="el-icon-delete"
                size="mini"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="!isShowTable">
        <el-form :inline="true" class="demo-form-inline" :model="attrInfo">
          <el-form-item label="属性名">
            <el-input
              placeholder="请输入属性名"
              v-model="attrInfo.attrName"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!attrInfo.attrName"
          @click="addAttrValue"
          >添加属性</el-button
        >
        <el-button @click="isShowTable = true">取消</el-button>
        <el-table
          style="width: 100%; margin: 20px 0"
          border
          :data="attrInfo.attrValueList"
        >
          <el-table-column
            label="序号"
            align="center"
            type="index"
            width="80px"
          >
          </el-table-column>
          <el-table-column label="属性值" prop="prop" width="width">
            <template slot-scope="{ row, $index }">
              <el-input
                v-if="row.flag"
                @blur="toolook(row)"
                @keyup.native.enter="toolook(row)"
                ref="refInfut"
                placeholder="请输入属性值"
                size="mini"
                v-model="row.valueName"
              ></el-input>
              <span style="display: block" v-else @click="toEdit(row)">{{
                row.valueName
              }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" prop="prop" width="width">
            <template slot-scope="{ row, $index }">
              <el-popconfirm
                :title="`你确定删除${row.valueName}`"
                @onConfirm="deleteAttr($index)"
              >
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  slot="reference"
                ></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="addOrUpdateAttr" :disabled="attrInfo.attrValueList.length<=0">保存</el-button>
        <el-button @click="isShowTable = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
//引入深拷贝插件
import cloneDeep from "lodash/cloneDeep";
export default {
  name: "Attr",
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      attrList: [],
      //展示或隐藏修改添加属性页面
      isShowTable: true,
      //收集属性|修改属性的参数
      attrInfo: {
        attrName: "", //属性名
        attrValueList: [
          //属性值
        ],
        categoryId: 0, //三级分类的id
        categoryLevel: 3, //区分几级分类
      },
    };
  },
  methods: {
    async getgoryId({ categoryId, level }) {
      if (level == 1) {
        this.category2Id = "";
        this.category3Id = "";
        this.attrList = [];
        this.category1Id = categoryId;
      } else if (level == 2) {
        this.category3Id = "";
        this.attrList = [];
        this.category2Id = categoryId;
      } else {
        this.category3Id = categoryId;
        let { category1Id, category2Id, category3Id } = this;
        let result = await this.$api.reqAttrInfoList(
          category1Id,
          category2Id,
          category3Id
        );
        if (result.code == 200) {
          this.attrList = result.data;
        }
      }
    },
    //添加属性的按钮
    addAttr() {
      this.isShowTable = false;
      this.attrInfo = {
        attrName: "", //属性名
        attrValueList: [
          //属性值
        ],
        categoryId: this.category3Id, //三级分类的id
        categoryLevel: 3, //区分几级分类
      };
    },
    //添加属性
    addAttrValue() {
      this.attrInfo.attrValueList.push({
        attrId: this.attrInfo.id,
        valueName: "",
        flag: true, //用于切换查看属性值和编辑属性值
      });
      this.$nextTick(() => {
        this.$refs.refInfut.focus();
      });
    },
    //修改属性
    updteAttr(row) {
      this.isShowTable = false;
      // this.attrInfo = JSON.parse(JSON.stringify(row))
      this.attrInfo = cloneDeep(row);
      this.attrInfo.attrValueList.forEach((element) => {
        this.$set(element, "flag", false);
      });
    },
    //切换查看模式
    toolook(row) {
      if (row.valueName.trim() == "") {
        this.$message("属性值不能为空");
        return;
      }
      let isRepat = this.attrInfo.attrValueList.some((item) => {
        if (row != item) {
          return row.valueName.trim() == item.valueName.trim();
        }
      });
      if (isRepat) {
        this.$message("属性值不能重复");
        return;
      }
      row.flag = false;
    },
    //编辑模式
    toEdit(row) {
      row.flag = true;
      this.$nextTick(() => {
        this.$refs.refInfut.focus();
      });
    },
    //删除属性值
    deleteAttr(index) {
      this.attrInfo.attrValueList.splice(index, 1);
    },
    //添加或者修改属性的操作
    async addOrUpdateAttr() {
      //属性值为空不提交 提交时去掉flag属性
      this.isShowTable = true;
      this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(
        (item) => {
          if (item.valueName != "") {
            delete item.flag;
            return true;
          }
        }
      );
      try {
        await this.$api.reqAddOrUpdateAttr(this.attrInfo);
        this.$message({ type: "success", message: "保存成功" });
        this.getgoryId({categoryId:this.category3Id,level:3})
      } catch (error) {console.log(error.message)}
    },
  },
};
</script>

<style>
</style>