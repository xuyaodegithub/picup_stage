<template>
    <div class="index">
        <div class="seach" v-show="subName==='orderList'">
            <label>用户ID：</label>
            <el-input v-model="userId" placeholder="请输入用户ID" @keydown.native.enter="initData(1)"></el-input>
            <el-button type="primary" icon="el-icon-search" style="margin-left: 15px" @click="initData(1)">搜索</el-button>
        </div>
        <transition name="slide-fade">
            <keep-alive>
                <component :is="subName" @to-parse="changSubName" :loading="loading" :itemMsg="item"></component>
            </keep-alive>
        </transition>
        <div class="blcokSize" v-show="subName==='orderList'">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="page"
                    :page-sizes="[10, 20, 30, 50]"
                    :page-size="rows"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="userOrderList.total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import orderList from './components/orderList.vue'
    import {mapGetters, mapActions} from 'vuex'
    export default {
        name: "index",
        data() {
            return {
                options: [
                    {label: '全部', val: -1},
                    {label: '已上架', val: 1},
                    {label: '未上架', val: 0},
                ],
                page: 1,
                rows: 20,
                subName: 'orderList',
                item: {},
                loading:false,
                userId:'',
            }
        },
        computed: {
            ...mapGetters( [
                'userOrderList'
            ] ),
        },
        components: {
            orderList
        },
        methods: {
            ...mapActions( [
                'userOrderListAction'
            ] ),
            handleSizeChange(val) {
                this.rows=val
                this.initData()
            },
            handleCurrentChange(val) {
                this.page=val
                this.initData()
            },
            changSubName(val) {
                this.item = val.row
                this.subName = val.title
            },
           async initData(k){
                if(k){
                    this.page=1;
                    this.rows=20;
                }
                const data={page:this.page,pageSize:this.rows,userId:this.userId};
                this.userOrderListAction(data)
            },
        },
        mounted() {
            this.initData()
        }
    }
</script>

<style scoped lang="scss">
    .index {
        .seach .el-input {
            width: 160px;
            margin-right: 30px;
        }

        .el-table {
            margin-top: 25px;
        }

        .blcokSize {
            text-align: right;
            margin: 15px 0;
        }
    }
</style>
