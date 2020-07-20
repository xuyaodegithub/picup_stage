<template>
    <div class="vhead">
        <div class="top flex a-i">
            <i :class="isCollapse ? 'el-icon-s-unfold': 'el-icon-s-fold'" class="cu" @click="openThis"></i>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/user' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item v-for="(item,index) in nowRoutes" :key="index">{{item.meta.name}}
                </el-breadcrumb-item>
            </el-breadcrumb>
            <div class="user flex a-i">
<!--                <el-badge :value="1" class="item" :max="99">-->
<!--                    <i class="el-icon-s-comment cu" @click="centerDialogVisible=true"></i>&lt;!&ndash;系统消息&ndash;&gt;-->
<!--                </el-badge>-->
<!--                <el-dropdown @command="handleCommand" placement="bottom-start">-->
                  <span class="el-dropdown-link flex a-i">
                    <el-avatar size="medium"
                               class="cu"
                               src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
                      <div class="score">
                        <span class="demonstration"> {{sellerInfo.mobile}}</span>
                        <el-rate v-model="score" :max="4" disabled disabled-void-color="#979797"></el-rate>
                    </div>

                  </span>
<!--                    <el-dropdown-menu slot="dropdown">-->
<!--                        <el-dropdown-item :command="1">个人权限</el-dropdown-item>-->
<!--                        <el-dropdown-item :command="0">退出</el-dropdown-item>-->
<!--                    </el-dropdown-menu>-->
<!--                </el-dropdown>-->
            </div>

        </div>
        <!--        <el-scrollbar style="height: 100%;overflow-y: hidden;white-space: nowrap">-->
        <div class="bom">
            <el-tag
                    class="cu"
                    :class="{active : tag.path===$route.fullPath.split('?')[0]}"
                    size="small"
                    :key="idx"
                    v-for="(tag,idx) in tags"
                    @click="chengTag(tag)"
                    closable
                    @close="handleClose(tag,idx)">
                {{tag.meta.name}}
            </el-tag>
        </div>
        <!--        </el-scrollbar>-->
        <el-dialog
                title="消息标题"
                :visible.sync="centerDialogVisible"
                :close-on-click-modal="false"
                width="30%"
                center>
            <div class="content">
                <span>需要注意的是内容是默认不居中的</span>
                <span slot="footer" class="dialog-footer">
            </span>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import {removeToken} from "../../utils/auth";
    import { mapActions,mapGetters } from 'vuex'
    export default {
        name: "vhead",
        data() {
            return {
                isCollapse: false,
                tags: [],
                score: 3,
                centerDialogVisible:false
            }
        },
        watch: {
            $route: {
                handler(n, o) {
                    // console.log(n,this.$route)
                    const t = this.tags.some( item => item.path === n.path )
                    if (!t) this.tags.push( n )
                },
                immediate: true,
                // deep:true
            },
        },
        computed: {
            ...mapGetters([
                'sellerInfo'
            ]),
            nowRoutes() {
                // console.log( this.$route.fullPath, '..............' )
                return this.$route.matched
            }
        },
        methods: {
            ...mapActions([

            ]),
            openThis() {
                this.isCollapse = !this.isCollapse
                this.$root.eventHub.$emit( 'openAuto', true )
            },
            chengTag(route) {
                if (route.path === this.$route.fullPath) return;
                else this.$router.replace( route.path )
            },
            handleClose(tag, idx) {
                this.tags.splice( idx, 1 )
                if (tag.path === this.$route.fullPath && this.tags.length > 0) this.$router.replace( this.tags[this.tags.length - 1].path )
                else if (tag.path === this.$route.fullPath && this.tags.length < 1) this.$router.replace( '/' )
            },
            handleCommand(command) {
                if (!command) {
                    removeToken();
                    this.$router.replace( '/login' )
                }
            }
        },
        mounted() {

        }
    }
</script>

<style scoped lang="scss">
    .vhead {
        .top {
            box-shadow: 0 1px 1px #999;
            padding: 10px;

            .el-dropdown-link {
                cursor: pointer;
                color: #409EFF;
            }

            .el-icon-arrow-down {
                font-size: 12px;
            }

            .user {
                margin-left: auto;

                .item {
                    margin-right: 35px;

                    i {
                        margin: 0;
                        color: $to;
                        font-size: 32px;
                    }
                }
            }

            .score {
                margin: 0 50px 0 15px;
            }
        }

        i {
            margin-right: 20px;
            display: inline-block;
            color: #333;
            font-size: 28px;
        }

        .bom {
            padding: 4px 10px;
            /*height: 24px;*/
            overflow-x: scroll;
            white-space: nowrap;

            .el-tag {
                margin-right: 10px;
            }

            .el-tag.active:before {
                content: '';
                display: inline-block;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background-color: $to;
            }
        }
    }

</style>
