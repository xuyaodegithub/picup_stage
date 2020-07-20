/**
 * Created by Yan on 2019-12-21
 **/
import https from './request'
/**
 * 产品列表
 **/
 export const productList=(data)=> https.get('/index.php?mod=api/Product&code=getSellerProducts',data);
/**
 * 商品上下架
 **/
 export const UpperDPro=(data)=> https.get('/index.php?mod=api/Product&code=modifyOnsale',data);
/**
 * 商品删除
 **/
 export const deleteProduct=(data)=> https.get('/index.php?mod=api/Product&code=delProduct',data);
/**
 * 获取sku信息
 **/
 export const skuMsgss=(data)=> https.get('/index.php?mod=api/Product&code=skuInfo',data);
/**
 *
 * 颜色编辑
 **/
 export const colorEdir=(data)=> https.get('/index.php?mod=api/Product&code=saveColor',data);
/**
 *
 * 尺码编辑
 **/
 export const sizeEdir=(data)=> https.get('/index.php?mod=api/Product&code=saveSize',data);
/**
 *
 * 删除sku
 **/
 export const deleteSku=(data)=> https.get('/index.php?mod=api/Product&code=deleteAttr',data);
/**
 *
 * 获取简易信息
 **/
 export const productInfo=(data)=> https.get('/index.php?mod=api/Product&code=simpleInfo',data);
/**
 *
 * 编辑商品信息
 **/
 export const updataInfo=(data)=> https.get('/index.php?mod=api/Product&code=modifySimpleInfo',data);
/**
 *
 * 添加下架sku
 **/
 export const addOffsaleSku=(data)=> https.get('/index.php?mod=api/Product&code=addOffsaleSku',data);
/**
 *
 * 删除下架sku
 **/
 export const deleteOffsaleSku=(data)=> https.get('/index.php?mod=api/Product&code=delOffsaleSku',data);
/**
 *
 * 档口信息
 **/
 export const sellerInfo=(data)=> https.get('/index.php?mod=api/Account&code=sellerInfo',data);
