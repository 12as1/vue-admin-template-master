<template>
  <div>
    <el-form ref="form" label-width="80px" :data="skuInfo">
      <el-form-item label="SPU名称">{{ name }}</el-form-item>
      <el-form-item label="SKU名称">
        <el-input v-model="skuInfo.skuName" placeholder="SKU名称"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input
          v-model="skuInfo.price"
          type="number"
          placeholder="价格(元)"
        ></el-input>
      </el-form-item>
      <el-form-item label="重量(千克)">
        <el-input
          v-model="skuInfo.weight"
          type="number"
          placeholder="重量(千克)"
        ></el-input>
      </el-form-item>
      <el-form-item label="规格描述">
        <el-input
          v-model="skuInfo.skuDesc"
          type="textarea"
          rows="4"
          placeholder="规格描述"
        ></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form :inline="true" label-width="80px">
          <el-form-item
            :label="attr.attrName"
            v-for="attr in attrInfoList"
            :key="attr.id"
          >
            <el-select placeholder="请选择" v-model="attr.attrIdAndattrValID">
              <el-option
                :label="attrVal.valueName"
                :value="`${attr.id}:${attrVal.id}`"
                v-for="attrVal in attr.attrValueList"
                :key="attrVal.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form :inline="true">
          <el-form-item
            :label="sale.saleAttrName"
            v-for="sale in spuSaleAttrList"
            :key="sale.id"
          >
            <el-select placeholder="请选择" v-model="sale.attrIdAndValueId">
              <el-option
                :label="list.saleAttrValueName"
                :value="`${sale.id}:${list.id}`"
                v-for="list in sale.spuSaleAttrValueList"
                :key="list.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片列表">
        <el-table
          style="width: 100%"
          border
          :data="spuImagList"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="80px" prop="prop">
          </el-table-column>
          <el-table-column label="图片" prop="prop">
            <template slot-scope="{ row }">
              <img
                :src="row.imgUrl"
                alt=""
                style="width: 100px; height: 100px"
              />
            </template>
          </el-table-column>
          <el-table-column label="名称" prop="imgName"> </el-table-column>
          <el-table-column label="操作" prop="prop">
            <template slot-scope="{ row }">
              <el-button
                type="primary"
                size="mini"
                v-if="row.isDefault == 0"
                @click="dafalueImg(row)"
                >设置默认</el-button
              >
              <el-button v-else size="mini">默认</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveSku">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "SkuForm",
  data() {
    return {
      name: "",
      imgList: [],
      //存储图片的信息
      spuImagList: [],
      //存储销售的属性
      spuSaleAttrList: [],
      //存储平台属性的数据
      attrInfoList: [],
      //收集sku的数据
      skuInfo: {
        category3Id: "",
        price: "",
        spuId: "",
        tmId: "",
        skuName: "",
        weight: "",
        skuDesc: "",
        skuDafalueImg:"",
        //平台属性
        skuAttrValueList: [
          // {
          //   valueId: "",
          //   attrId: "",
          // },
        ],
        skuImageList: [
          // {
          //   id: "",
          //   imgName: "",
          //   imgUrl: "",
          //   isDefault: "",
          //   skuId: "",
          //   spuImgId: "",
          // },
        ],
        //销售属性
        skuSaleAttrValueList: [
          // {
          //   id: "",
          //   saleAttrId: "",
          //   saleAttrName: "",
          //   saleAttrValueId: "",
          //   saleAttrValueName: "",
          //   skuId: "",
          //   spuId: "",
          // },
        ],
      },
    };
  },
  methods: {
    async getData(category1Id, category2Id, spu) {
     Object.assign(this._data, this.$options.data());
      this.skuInfo.category3Id = spu.category3Id;
      this.skuInfo.spuId = spu.id;
      this.skuInfo.tmId = spu.tmId;
      this.name = spu.spuName;
      let result = await this.$api.reqspuImgList(spu.id);
      if (result.code == 200) {
        let list = result.data;
        list.forEach((item) => {
          item.isDefault = 0;
        });
        this.spuImagList = list;
      }
      let result1 = await this.$api.reqSpuSaleAttrList(spu.id);
      if (result1.code == 200) {
        this.spuSaleAttrList = result1.data;
      }
      let result2 = await this.$api.reqSpuAtttrList(
        category1Id,
        category2Id,
        spu.category3Id
      );
      if (result2.code == 200) {
        this.attrInfoList = result2.data;
      }
       
    },
    //table表格复选框的事件
    handleSelectionChange(selection) {
      this.imgList = selection;
    },
    //默认图片
    dafalueImg(row) {
      this.spuImagList.forEach((item) => {
        item.isDefault = 0;
      });
      row.isDefault = 1;
      this.skuInfo.skuDafalueImg = row.imgUrl;
    },
    //取消按钮
    cancel() {
      this.$emit("updataScene", { scene: 0, flag: true });
    },
    //保存sku
    async saveSku(){
      const { skuInfo, attrInfoList, spuSaleAttrList, imgList } = this;
      skuInfo.skuAttrValueList = attrInfoList.reduce((total, cur) => {
        if (cur.attrIdAndattrValID) {
          let [attrId, valueId] = cur.attrIdAndattrValID.split(":");
          total.push({ attrId, valueId });
        }
        return total;
      }, []);

      skuInfo.skuSaleAttrValueList = spuSaleAttrList.reduce((total, cur) => {
        if (cur.attrIdAndValueId) {
          let [saleAttrId, saleAttrValueId] = cur.attrIdAndValueId.split(":");
          total.push({ saleAttrId, saleAttrValueId });
        }
        return total;
      }, []);
      skuInfo.skuImageList = imgList.map((item) => {
        return {
          imgName: item.imgName,
          imgUrl: item.imgUrl,
          isDefault: item.isDefault,
          spuImgId: item.id,
        };
      });
      //发请求
      let res = await this.$api.reqAddSku(this.skuInfo);
      if(res.code==200){
        this.$message({type:'success',message:'添加sku成功'})
          this.$emit("updataScene", { scene: 0, flag: true });
      }
    },
  },
};
</script>

<style>
</style>