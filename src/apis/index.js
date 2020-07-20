/**
 * Created by Yan on 2019-12-21
 **/
import https from './request'
/**
 * 档口信息列表
 **/
 export const stallsList=(data)=> https.get('index.php?mod=api/DuolaSeller&code=lists',data);
