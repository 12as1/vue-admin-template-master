<template>
  <div>
    <el-card>
      <el-table style="width: 100%" border :data="records">
        <el-table-column label="序号" width="80px" align="center" type="index">
        </el-table-column>
        <el-table-column prop="skuName" label="名称"> </el-table-column>
        <el-table-column prop="skuDesc" label="描述"> </el-table-column>
        <el-table-column width="100px" label="默认图片">
          <template slot-scope="{ row }">
            <img
              :src="row.skuDefaultImg"
              style="width: 70px; height: 70px"
              alt=""
            />
          </template>
        </el-table-column>
        <el-table-column prop="weight" width="100px" label="重量(KG)">
        </el-table-column>
        <el-table-column prop="price" width="80px" label="价格(元)">
        </el-table-column>
        <el-table-column prop="date" label="操作">
          <template slot-scope="{ row }">
            <el-button
              type="success"
              size="mini"
              icon="el-icon-sort-up"
              v-if="row.isSale == 0"
              @click="sale(row)"
            ></el-button>
            <el-button
              type="info"
              size="mini"
              icon="el-icon-sort-down"
              v-else
              @click="cancel(row)"
            ></el-button>
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="edit"
            ></el-button>
            <el-button
              type="info"
              size="mini"
              icon="el-icon-warning"
              @click="getSkuById(row)"
              style="margin-right: 10px"
            ></el-button>
            <el-drawer  :show-close="false" :visible.sync="drawer" size="50%">
              <el-row>
                <el-col :span="5">名称</el-col>
                <el-col :span="16">{{ skuInfo.skuName }}</el-col>
              </el-row>
              <el-row>
                <el-col :span="5">描述</el-col>
                <el-col :span="16">{{ skuInfo.skuDesc }}</el-col>
              </el-row>
              <el-row>
                <el-col :span="5">价格</el-col>
                <el-col :span="16">{{ skuInfo.price }}元</el-col>
              </el-row>
              <el-row>
                <el-col :span="5">平台属性</el-col>
                <el-col :span="16">
                  <el-tag
                    style="margin: 0 5px 5px 0"
                    type="success"
                    :key="sku.id"
                    v-for="sku in skuInfo.skuAttrValueList"
                    >{{ sku.attrName }}-{{ sku.valueName }}</el-tag
                  >
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="5">商品图片</el-col>
                <el-col :span="10">
                  <el-carousel  height="200px" style="border:1px solid red;">
                    <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item.id">
                      <img class="small" :src="item.imgUrl" alt="" style="width:100%;height:200px">
                    </el-carousel-item>
                  </el-carousel>
                </el-col>
              </el-row>
            </el-drawer>
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="getData"
        align="center"
        :page-size="limit"
        :pager-count="5"
        :page-sizes="[5, 7, 10]"
        :current-page="page"
        layout="prev,pager,next,jumper,->,sizes,total"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Sku",
  data() {
    return {
      page: 1,
      limit: 5,
      total: 0,
      records: [],
      skuInfo: {},
      drawer: false,
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData(pages = 1) {
      this.page = pages;
      const { page, limit } = this;
      let result = await this.$api.reqSkuNoList(page, limit);
      if (result.code == 200) {
        this.total = result.data.total;
        this.records = result.data.records;
      }
    },
    handleSizeChange(limit) {
      this.limit = limit;
      this.getData();
    },
    //上架
    async sale(row) {
      let result = await this.$api.reqSale(row.id);
      if (result.code) {
        row.isSale = 0;
        this.$message({ type: "success", message: "上架成功" });
        this.getData(this.page);
      }
    },
    //下架
    async cancel(row) {
      let result = await this.$api.reqCanel(row.id);
      if (result.code) {
        row.isSale = 1;
        this.$message({ type: "success", message: "下架成功" });
        this.getData(this.page);
      }
    },
    edit() {
      this.$message({ type: "info", message: "正在开发中" });
    },
    //sku详情
    async getSkuById(row) {
      let result = await this.$api.reqSkuById(row.id);
      if ((result.code = 200)) {
        this.skuInfo = result.data;
        this.drawer = true;
      }
    },
  },
};
</script>
<style scoped>
  .el-row .el-col-5 {
  font-size: 17px;
  font-weight: bolder;
  text-align: right;
}

.el-row .el-col {
  margin: 10px;
  line-height: 30px;
}




  >>>.el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  >>>.el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
  >>>.el-carousel__button{
    width: 20px;
    height: 20px;
    border-radius:50%;
    background-color: pink;
  }
</style>