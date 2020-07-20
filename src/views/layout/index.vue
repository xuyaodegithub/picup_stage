<template>
    <el-container>
        <el-aside width="auto">
            <el-scrollbar style="height: 100%;overflow-x: hidden;">
                <v-asild/>
            </el-scrollbar>
        </el-aside>
        <el-container>
            <el-header height="auto">
                <v-haed/>
            </el-header>
            <el-main>
                <keep-alive :exclude="['FF']">
                    <router-view/>
                </keep-alive>
                <transition name="slide-fade">
                    <v-popover v-if="popoverAlive.openOrclose" v-drag></v-popover>
                </transition>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import vHaed from './vhead'
    import vAsild from './vasild'
    import vPopover from '@/components/popover'
    import {mapActions, mapGetters} from 'vuex'

    export default {
        name: "index",
        data() {
            return {}
        },
        computed: {
            ...mapGetters( [
                'popoverAlive'
            ] ),
            routes() {
                return this.$router.options.routes
            }
        },
        methods:{

        },
        components: {
            vHaed, vAsild, vPopover
        },
        mounted() {
        }
    }
</script>

<style scoped lang="scss">
    .el-header, .el-footer {
        color: #333;
        background-color: #C6E2FF;
        padding: 0;
    }

    .el-aside {
        color: #333;
        text-align: center;
        height: 100%;
        background-color: #171A23;
    }

    .el-main {
        color: #333;
        background-color: #EEF0F3;
    }

    .el-container {
        height: 100%;
    }
</style>
