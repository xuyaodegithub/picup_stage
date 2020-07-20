<template>
    <div class="asild">
        <div class="open">
            <a href="http://www.picup.shop" target="_blank">
                <img src="@/assets/images/sureLogo.png" v-show="!isCollapse" style="display: block;width: 65%;margin:0 auto"/>
                <img src="@/assets/images/logo_p.jpg" v-show="isCollapse" style="display: block;width: 40px;margin:0 auto;border-radius: 10px"/>
            </a>
        </div>
        <el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" active-text-color="#53A8FF" unique-opened router text-color="#888C8B"
                 :collapse="isCollapse" background-color="#171A23">
            <el-submenu :index="item.path" v-for="(item,idx) in routes" :key="idx">
                <template slot="title">
                    <i :class="item.meta.icon"></i>
                    <span slot="title">{{item.meta.name}}</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item :index="itemson.path | patchAdd(item.path)" v-for="(itemson,key) in item.children" :key="key">{{itemson.meta.name}}</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
    // fade/zoom 等
    import 'element-ui/lib/theme-chalk/base.css';
    // collapse 展开折叠
    import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
    import {mapGetters} from 'vuex'
    export default {
        name: "asild",
        data() {
            return {
                isCollapse: false
            }
        },
        filters:{
            patchAdd(item,val){
                if(val=='/')return `/${item}`
                else return `${val}/${item}`
            },
        },
        computed: {
            ...mapGetters(['sellerInfo']),
            routes() {
                return this.$router.options.routes.filter(item=>(item.meta.role ? (!item.meta.hidden && item.meta.role===this.sellerInfo.role) : !item.meta.hidden))
            },
        },
        components:{
            [CollapseTransition.name]:CollapseTransition
        },
        methods: {
            handleOpen(key, keyPath) {
                // console.log( key, keyPath );
            },
            handleClose(key, keyPath) {
                // console.log( key, keyPath );
            }
        },
        mounted() {
            this.$root.eventHub.$on('openAuto',(v)=>{this.isCollapse=!this.isCollapse})
        }
    }
</script>

<style scoped lang="scss">
.asild{
   .open {
       font-size: 28px;
       color: #333;
       text-align: center;
       position: relative;
       padding: 20px 0;
   }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }
    .el-menu-vertical-demo i{
        color: #606266;
    }
    .el-menu{
        border: none;
    }
}
</style>
