<template>
  <div>
    <el-card class="box-card">
      <CategorySelect :isShowTable="scene == 0" @getgoryId="getgoryId" />
    </el-card>
    <el-card style="margin-top: 20px" class="box-card">
      <div v-show="scene == 0">
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="addSpu"
          :disabled="!category3Id"
          >添加SPU</el-button
        >
        <el-table style="width: 100%" border :data="records">
          <el-table-column
            type="index"
            label="序号"
            width="80px"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="prop" label="spu名称">
            <template slot-scope="{ row }">{{ row.spuName }} </template>
          </el-table-column>
          <el-table-column prop="prop" label="spu描述">
            <template slot-scope="{ row }">{{ row.description }} </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作">
            <template slot-scope="{ row }">
              <el-button
                type="success"
                icon="el-icon-plus"
                size="mini"
                title="添加sku"
                @click="addSku(row)"
              ></el-button>
              <el-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                title="修改spu"
                @click="updateSpu(row)"
              ></el-button>
              <el-button
                type="info"
                icon="el-icon-info"
                size="mini"
                title="查看当前spu全部sku列表"
                @click="handlerSkuList(row)"
              ></el-button>
              <el-dialog
                :title="`${spu.spuName}的SKU`"
                :visible.sync="dialogVisible"
                width="60%"
              >
                <el-table :data="skuList" border style="width:100%" v-loading="loading">
                  <el-table-column prop="skuName" label="名称">
                  </el-table-column>
                  <el-table-column prop="price" label="价格">
                  </el-table-column>
                  <el-table-column prop="weight" label="重量">
                  </el-table-column>
                  <el-table-column  label="默认图片">
                    <template slot-scope="{row}">
                       <img :src="row.skuDefaultImg" alt="" style="width:100px;height:100px;"> 
                    </template>
                  </el-table-column>
                </el-table>
              </el-dialog>
              <el-popconfirm
                style="margin-left: 10px"
                :title="`确定删除SPU${row.spuName}吗？`"
                @onConfirm="deleteSpu(row)"
              >
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  title="删除spu"
                  slot="reference"
                ></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @current-change="getSpuList"
          @size-change="handleSizeChange"
          :current-page="page"
          :page-sizes="[2, 3, 4]"
          :page-size="limit"
          layout=" prev, pager, next,jumper,->,sizes,total"
          :total="total"
          align="center"
        >
        </el-pagination>
      </div>
      <SpuForm
        @updataScene="updataScene"
        ref="spu"
        v-show="scene == 1"
        :scene="scene"
      />
      <SkuForm ref="sku" @updataScene="updataScene" v-show="scene == 2" />
    </el-card>
  </div>
</template>

<script>
import SpuForm from "./SpuForm";
import SkuForm from "./SkuForm";
export default {
  name: "Spu",
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      //第几页
      page: 1,
      //一页展示几条数据
      limit: 2,
      total: 0,
      //spu数据
      records: [],
      //控制显示隐藏spu
      scene: 0,
      //是否显示sku列表对话框
      dialogVisible: false,
      spu: {},
      skuList: [],
      loading:true,
    };
  },
  components: { SpuForm, SkuForm },
  methods: {
    updataScene({ scene, flag }) {
      this.scene = scene;
      this.getSpuList(flag ? this.page : 1);
    },
    getgoryId({ categoryId, level }) {
      if (level == 1) {
        this.category2Id = "";
        this.category3Id = "";
        this.category1Id = categoryId;
      } else if (level == 2) {
        this.category3Id = "";
        this.category2Id = categoryId;
      } else {
        this.category3Id = categoryId;
        this.getSpuList();
      }
    },
    //获取spu列表
    async getSpuList(page = 1) {
      this.page = page;
      try {
        let result = await this.$api.reqSpuList(
          this.page,
          this.limit,
          this.category3Id
        );
        this.records = result.data.records;
        this.total = result.data.total;
      } catch (error) {
        console.log(error.message);
      }
    },
    //分页器每页数据条数变化的回调
    handleSizeChange(limit) {
      this.limit = limit;
      this.getSpuList();
    },
    //添加某一个spu
    addSpu() {
      this.scene = 1;
      this.$refs.spu.addSpuData(this.category3Id);
    },
    //修改某一个spu
    updateSpu(row) {
      this.scene = 1;
      this.$refs.spu.initSpuData(row);
    },
    //删除spu
    async deleteSpu(row) {
      let result = await this.$api.reqDeleteSpu(row.id);
      if (result.code == 200) {
        this.$message({ type: "success", message: "删除成功" });
        this.getSpuList(this.records.length > 1 ? this.page : this.page - 1);
      }
    },
    //添加sku
    addSku(row) {
      this.scene = 2;
      this.$refs.sku.getData(this.category1Id, this.category2Id, row);
    },
    //sku列表对话框
    async handlerSkuList(row) {
      this.loading = true
      this.skuList = []
      this.dialogVisible = true;
      this.spu = row;
      let result = await this.$api.reqSkuList(row.id);
      if (result.code == 200) {
        this.skuList = result.data;
        this.loading = false
      }
    },
  },
};
</script>

<style>
</style>