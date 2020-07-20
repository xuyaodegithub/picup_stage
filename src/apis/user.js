/**
 * Created by Yan on 2019-12-21
 **/
import https from './request'
/**
 * 用户列表
 **/
 export const userList=(data)=> https.get('/admin/user/list',data);
/**
 * 用户历史列表
 **/
export const userHisList=(data)=> https.get('/admin/matting_file/list',data);
/**
 * 设置用户tag
 **/
 export const setUserTag=(data)=> https.get('/admin/user/set_tags',data);
