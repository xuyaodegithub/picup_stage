/**
 * Created by Yan on 2019-12-21
 **/
import https from './request'
/**
 * 登录
 **/
 export const userLogin=(data)=> https.get('/admin/user/login',data);
