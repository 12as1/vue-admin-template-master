import requests from '@/utils/request';

//获取品牌管理数据 /admin/product/baseTrademark/{page}/{limit}  get

const reqTradeMarkList = (page, limit) => requests({ url: `/admin/product/baseTrademark/${page}/${limit}`, method: 'get' })

//添加品牌 /admin/product/baseTrademark/save  post   携带品牌名称和logo参数

//修改品牌 /admin/product/baseTrademark/update  put 携带id、品牌名称和logo参数

const reqAddOrUpdateTradeMark = (tradeMark) => {
  if (tradeMark.id) {
    return requests({ url: '/admin/product/baseTrademark/update', data:tradeMark, method: 'put' })
  } else {
    return requests({ url: '/admin/product/baseTrademark/save', data: tradeMark, method: 'post' })
  }
}

//删除品牌 /admin/product/baseTrademark/remove/{id}  delete

const reqDeleteTradeMark = (id)=>requests({url:`/admin/product/baseTrademark/remove/${id}`,method:'delete'})

//品牌属性管理
//获取一级分类数据接口 /admin/product/getCategory1  get
const reqCategory1List = ()=>requests({url:'/admin/product/getCategory1',method:'get'})
//获取二级分类数据接口 /admin/product/getCategory2/{category1Id}  get
const reqCategory2List = (category1Id)=>requests({url:`/admin/product/getCategory2/${category1Id}`,method:'get'})
//获取三级分类数据接口 /admin/product/getCategory3/{category2Id}  get
const reqCategory3List = (category2Id)=>requests({url:`/admin/product/getCategory3/${category2Id}`,method:'get'})

//获取平台属性接口 /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id} get

const reqAttrInfoList = (category1Id,category2Id,category3Id)=>requests({url:`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,method:'get'})

//添加属性与属性值接口 /admin/product/saveAttrInfo  post

const reqAddOrUpdateAttr = (data)=>requests({url:'/admin/product/saveAttrInfo',data,method:'post'})

//展示spu数据 /admin/product/{page}/{limit} get

const reqSpuList = (page,limit,category3Id)=>requests({url:`/admin/product/${page}/${limit}`,method:'get',params:{category3Id}})

//获取spu信息展示 /admin/product/getSpuById/{spuId} get

const reqSpu = (spuId)=>requests({url:`/admin/product/getSpuById/${spuId}`,method:'get'})

//获取spu品牌的信息 /admin/product/baseTrademark/getTrademarkList get

const reqTrademark = ()=>requests({url:'/admin/product/baseTrademark/getTrademarkList',method:'get'})

//获取spu图片展示 /admin/product/spuImageList/{spuId} get
const reqSpuImageList = (spuId)=>requests({url:`/admin/product/spuImageList/${spuId}`,method:'get'})

//获取平台全部销售属性 --整个平台销售属性一共三个 /admin/product/baseSaleAttrList get

const reqBaseSaleAttrList = ()=>requests({url:'/admin/product/baseSaleAttrList',method:'get'})

//修改或者是添加spu 

const reqAddOrUpdateSpu = (spuInfo)=>{
  if(spuInfo.id){
    return requests({url:'/admin/product/updateSpuInfo',method:'post',data:spuInfo})
  }else{
    return requests({url:'/admin/product/saveSpuInfo',method:'post',data:spuInfo})
  }
}

//删除spu /admin/product/deleteSpu/{spuId}  delete

const reqDeleteSpu = (spuId)=>requests({url:`/admin/product/deleteSpu/${spuId}`,method:'delete'})

//获取添加sku 图片的数据 /admin/product/spuImageList/{spuId} get

const reqspuImgList = (spuId)=>requests({url:`/admin/product/spuImageList/${spuId}`,method:'get'})

//获取添加sku 销售属性的数据 /admin/product/spuSaleAttrList/{spuId} get

const  reqSpuSaleAttrList= (spuId)=>requests({url:`/admin/product/spuSaleAttrList/${spuId}`,method:'get'})

//获取添加sku 平台属性的数据 /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id} get

const  reqSpuAtttrList= (category1Id,category2Id,category3Id)=>requests({url:`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,method:'get'})

//添加sku /admin/product/saveSkuInfo post

const reqAddSku = (skuInfo)=>requests({url:'/admin/product/saveSkuInfo',data:skuInfo,method:'post'})

//获取sku列表 /admin/product/findBySpuId/{spuId} get

const reqSkuList = (spuId)=>requests({url:`/admin/product/findBySpuId/${spuId}`,method:'get'})

//sku列表的接口 /admin/product/list/{page}/{limit}

const reqSkuNoList = (page,limit)=>requests({url:`/admin/product/list/${page}/${limit}`,method:'get'})

//上架sku /admin/product/onSale/{skuId} get

const reqSale = (skuId)=>requests({url:`/admin/product/onSale/${skuId}`,method:'get'})

//下架sku /admin/product/cancelSale/{skuId} get

const reqCanel = (skuId)=>requests({url:`/admin/product/cancelSale/${skuId}`,method:'get'})

//sku详情 /admin/product/getSkuById/{skuId} get

const reqSkuById=(skuId)=>requests({url:`/admin/product/getSkuById/${skuId}`,method:'get'})

export default { reqTradeMarkList, reqAddOrUpdateTradeMark ,reqDeleteTradeMark,
  reqCategory1List,reqCategory2List,reqCategory3List,
  reqAttrInfoList,
  reqAddOrUpdateAttr,
  reqSpuList,
  reqSpu,
  reqTrademark,
  reqSpuImageList,
  reqBaseSaleAttrList,
  reqAddOrUpdateSpu,
  reqDeleteSpu,
  reqspuImgList,
  reqSpuSaleAttrList,
  reqSpuAtttrList,
  reqAddSku,
  reqSkuList,
  reqSkuNoList,
  reqSale,reqCanel,reqSkuById
 }