<template>
  <div>
    <el-form ref="form" label-width="80px" :data="spu">
      <el-form-item label="SPU名称">
        <el-input placeholder="SPU名称" v-model="spu.spuName"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <el-select placeholder="请选择品牌" v-model="spu.tmId">
          <el-option
            :label="tm.tmName"
            v-for="tm in tradeMarkList"
            :value="tm.id"
            :key="tm.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input
          type="textarea"
          :rows="4"
          placeholder="SPU描述"
          v-model="spu.description"
        ></el-input>
      </el-form-item>
      <el-form-item label="SPU图片">
        <!-- 
          file-list:上传文件的列表 [{name: '', url: ''}]
          on-preview ：预览回调
          on-remove：删除回调
         -->
        <el-upload
          action="/dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleAvatarSuccess"
          :file-list="spuImageList"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select
          :placeholder="`还有${unSelectSaleAttr.length}未选择`"
          v-model="attrId"
        >
          <el-option
            v-for="res in unSelectSaleAttr"
            :key="res.id"
            :label="res.name"
            :value="`${res.id}:${res.name}`"
          ></el-option>
        </el-select>
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!attrId"
          @click="addSaleAttr"
          >添加销售属性</el-button
        >
        <el-table style="width: 100%" border :data="spu.spuSaleAttrList">
          <el-table-column
            type="index"
            label="序号"
            width="80px"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="saleAttrName" label="属性名" width="180px">
          </el-table-column>
          <el-table-column prop="prop" label="属性值名称列表">
            <template slot-scope="{ row }">
              <el-tag
                :key="tag.id"
                v-for="(tag, index) in row.spuSaleAttrValueList"
                closable
                :disable-transitions="false"
                @close="handleClose(row, index)"
              >
                {{ tag.saleAttrValueName }}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="row.inputVisible"
                v-model="row.inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm(row)"
                @blur="handleInputConfirm(row)"
              >
              </el-input>
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="showInput(row)"
                >添加</el-button
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="150px">
            <template slot-scope="{ row, $index }">
              <el-popconfirm
                :title="`确定删除${row.saleAttrName}吗？`"
                @onConfirm="deleteAttrName($index)"
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
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addOrUpdateSpu">保存</el-button>
        <el-button @click="$emit('updataScene', {scene:0,flag:true})">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "SpuForm",
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      //spu信息的数据
      spu: {
        //三级分类的Id
        category3Id: 0,
        //描述
        description: "",
        //收集spu图片的信息
        spuImageList: [
          // {
          //   id:0,
          //   imgName:'',
          //   imgUrl:'',
          //   spuId:0
          // }
        ],
        //spu名称
        spuName: "",
        //平台属性与属性值收集
        spuSaleAttrList: [
          // {
          //   baseSaleAttrId: 1,
          //   id: 3646,
          //   saleAttrName: "颜色",
          //   spuId: 1336,
          //   spuSaleAttrValueList: [
          //     {
          //       baseSaleAttrId: 1,
          //       id: 1711,
          //       isChecked: null,
          //       saleAttrName: "颜色",
          //       saleAttrValueName: "蓝色",
          //       spuId: 1336,
          //     },
          //   ],
          // },
        ],
        //平台的id
        tmId: "",
      },
      //获取品牌的信息
      tradeMarkList: [],
      //获取spu图片的数据
      spuImageList: [],
      //获取平台全部销售属性
      spuBaseSaleAttr: [],
      attrId: "", //未选择销售属性的id和name
    };
  },
  computed: {
    //计算出还未选择的销售属性
    unSelectSaleAttr() {
      let result = this.spuBaseSaleAttr.filter((item) => {
        return this.spu.spuSaleAttrList.every((item1) => {
          return item.name != item1.saleAttrName;
        });
      });
      return result;
    },
  },
  methods: {
    //图片删除的钩子
    handleRemove(file, fileList) {
      this.spuImageList = fileList;
    },
    //图片预览的钩子
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //图片上传的钩子
    handleAvatarSuccess(response, file, fileList) {
      this.spuImageList = fileList;
    },
    //添加按钮的回调
    showInput(row) {
      this.$set(row, "inputVisible", true);
      this.$set(row, "inputValue", "");
      this.$nextTick(() => {
        this.$refs.saveTagInput.focus();
        this.$refs.saveTagInput.value = "";
      });
    },
    //文本框失去焦点回调
    handleInputConfirm(row) {
      //属性值不能为空
      if (row.inputValue) {
        //属性值不能重复
        if (row.spuSaleAttrValueList.length < 1) {
          row.spuSaleAttrValueList.push({
            baseSaleAttrId: row.baseSaleAttrId,
            saleAttrValueName: row.inputValue.trim(),
          });
        } else {
          let flsgs = row.spuSaleAttrValueList.every((item) => {
            return item.saleAttrValueName != row.inputValue.trim();
          });
          if (flsgs) {
            row.spuSaleAttrValueList.push({
              baseSaleAttrId: row.baseSaleAttrId,
              saleAttrValueName: row.inputValue.trim(),
            });
          } else {
            this.$message({ type: "info", message: "不能重复" });
          }
        }
      } else {
        this.$message({ type: "info", message: "不能为空" });
      }
      row.inputVisible = false;
    },
    //添加销售属性
    addSaleAttr() {
      const id = this.attrId.split(":")[0];
      const saleAttrName = this.attrId.split(":")[1];
      this.spu.spuSaleAttrList.push({
        id,
        saleAttrName,
        spuSaleAttrValueList: [],
      });
      this.attrId = "";
    },
    //删除属性值
    handleClose(row, index) {
      row.spuSaleAttrValueList.splice(index, 1);
    },
    //删除属性
    deleteAttrName(index) {
      this.spu.spuSaleAttrList.splice(index, 1);
      this.$message({
        type:'success',
        message:'删除成功'
      })
    },
    //添加或者修改spu
    async addOrUpdateSpu() {
      this.spuImageList.forEach((item) => {
        item.imgName = item.name;
        item.imgUrl = (item.response && item.response.data) || item.url;
      });
      this.spu.spuImageList = this.spuImageList;
      let result = await this.$api.reqAddOrUpdateSpu(this.spu);
      console.log(result)
      if (result.code == 200) {
        this.$message({
          type: "success",
          message: this.spu.id ? "修改成功" : "添加成功",
        });
        this.$emit("updataScene", {scene:0,flag:this.spu.id?true:false});
      }
    },
    async initSpuData(spu) {
      //获取spu信息的数据
      let spuResult = await this.$api.reqSpu(spu.id);
      if (spuResult.code == 200) {
        this.spu = spuResult.data;
      }
      //获取品牌的信息
      let tradeMarkResult = await this.$api.reqTrademark();
      if (tradeMarkResult.code == 200) {
        this.tradeMarkList = tradeMarkResult.data;
      }
      //获取spu图片的数据
      let spuImageResult = await this.$api.reqSpuImageList(spu.id);
      if (spuImageResult.code == 200) {
        let listArr = spuImageResult.data;
        listArr = listArr.filter((item) => {
          if (item.imgName && item.imgUrl) {
            item.name = item.imgName;
            item.url = item.imgUrl;
            return true;
          }
        });
        this.spuImageList = listArr;
      }
      //获取平台全部销售属性
      let spuBaseSaleAttrResult = await this.$api.reqBaseSaleAttrList();
      if (spuBaseSaleAttrResult.code == 200) {
        this.spuBaseSaleAttr = spuBaseSaleAttrResult.data;
      }
    },
    //添加spu
    async addSpuData(category3Id) {
      this.spu.category3Id = category3Id;
      //this.$options.data()
      //用于当前 Vue 实例的初始化选项。需要在选项中包含自定义 property 时会有用处：
        Object.assign(this._data,this.$options.data())
      
      //获取品牌的信息
      let tradeMarkResult = await this.$api.reqTrademark();
      if (tradeMarkResult.code == 200) {
        this.tradeMarkList = tradeMarkResult.data;
      }
      //获取平台全部销售属性
      let spuBaseSaleAttrResult = await this.$api.reqBaseSaleAttrList();
      if (spuBaseSaleAttrResult.code == 200) {
        this.spuBaseSaleAttr = spuBaseSaleAttrResult.data;
      }
    },
  },
};
</script>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>