<template>
  <div>
    <el-form :inline="true" class="demo-form-inline" :model="cForm">
      <el-form-item label="一级分类">
        <el-select
          placeholder="请选择"
          v-model="cForm.category1Id"
          @change="handler1"
          :disabled="!isShowTable"
        >
          <el-option
            v-for="list1 in cateGory1List"
            :key="list1.id"
            :label="list1.name"
            :value="list1.id" 
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          placeholder="请选择"
          v-model="cForm.category2Id"
          @change="handler2"
           :disabled="!isShowTable"
        >
          <el-option
            v-for="list2 in cateGory2List"
            :key="list2.id"
            :label="list2.name"
            :value="list2.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select
          placeholder="请选择"
          v-model="cForm.category3Id"
          @change="handler3"
          :disabled="!isShowTable"
        >
          <el-option
            v-for="list3 in cateGory3List"
            :key="list3.id"
            :label="list3.name"
            :value="list3.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "CategorySelect",
  data() {
    return {
      cateGory1List: [],
      cateGory2List: [],
      cateGory3List: [],
      cForm: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
      },
    };
  },
  props:['isShowTable'],
  mounted() {
    this.getCategory1List();
  },
  methods: {
    async getCategory1List() {
      let result = await this.$api.reqCategory1List();
      if (result.code == 200) {
        this.cateGory1List = result.data;
      }
    },
    async handler1() {
      this.cateGory2List = ''
      this.cateGory3List = ''
      this.cForm.category2Id=''
       this.cForm.category3Id=''
       this.$emit('getgoryId',{categoryId:this.cForm.category1Id,level:1})
      let result = await this.$api.reqCategory2List(this.cForm.category1Id);
      if (result.code == 200) {
        this.cateGory2List = result.data;
      }
    },
    async handler2() {
       this.cateGory3List = ''
       this.cForm.category3Id=''
        this.$emit('getgoryId',{categoryId:this.cForm.category2Id,level:2})
      let result = await this.$api.reqCategory3List(this.cForm.category2Id);
      if (result.code == 200) {
        this.cateGory3List = result.data;
      }
    },
    handler3(){
    this.$emit('getgoryId',{categoryId:this.cForm.category3Id,level:3})
    }
  },
};
</script>

<style>
</style>