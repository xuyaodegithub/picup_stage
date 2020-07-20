import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/layout'
import { getToken } from "../utils/auth";
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
Vue.use( VueRouter )

const routes = [
    {
        path: '/login',
        name: '登录',
        component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.vue'),
        meta: {icon: '', name: '登录',hidden:true}
    },
    {path: '/404', component: () => import(/* webpackChunkName: "404" */'@/views/404'), meta: {icon: '', name: '404',hidden:true}},
    {
        path: '/',
        name: 'home',
        component: Home,
        redirect: '/login',
        meta: {icon: 'el-icon-user-solid', name: '用户信息',hidden:true},
    },
    {
        path: '/user',
        name: '用户管理',
        component: Home,
        redirect: '/user/index',
        meta: {icon: 'el-icon-s-finance', name: '用户管理'},
        children: [
            {
                path: 'index',
                name: '用户列表',
                component: () => import(/* webpackChunkName: "product" */ '@/views/userList/index.vue'),
                meta: {name: '用户列表', icon: 'el-icon-office-building'}
            },
            {
                path: 'hisList',
                name: '抠图历史',
                component: () => import(/* webpackChunkName: "product" */ '@/views/userList/userHisList.vue'),
                meta: {name: '抠图历史', icon: 'el-icon-office-building'}
            },
        ]
    },
]

const router = new VueRouter( {
    scrollBehavior: (to, from, savedPosition) => {
        if (savedPosition) {
            return savedPosition
        }
    },
    routes
} )
const whiteList=['/login']
router.beforeEach( (to, from, next) => {
    NProgress.start()
    document.title = to.name;
    // if(getToken()){
    //     if(to.path==='/login'){
    //         next({path: '/'})
    //     }else next()
    // } else{
    //     if (whiteList.includes(to.path)) {
    //         next()
    //     } else {
    //         next({path: `/login`})
    //     }
    // }
    next()
} )
router.afterEach((to,from)=>{
    NProgress.done()
})
export default router
