<template>
    <div class="index">
        <div class="seach" v-show="subName==='userList'">
            <label>用户标签：</label>
            <el-input v-model="sellerTag" placeholder="请输入用户标签" @keydown.native.enter="initData(1)"></el-input>
            <label>用户ID：</label>
            <el-input v-model="userId" placeholder="请输入用户ID" @keydown.native.enter="initData(1)"></el-input>
            <label>用户手机号：</label>
            <el-input v-model="mobile" placeholder="请输入用户手机号" @keydown.native.enter="initData(1)"></el-input>
<!--            <label>上下架状态：</label>-->
<!--            <el-select v-model="type" placeholder="请选择" size="mini">-->
<!--                <el-option-->
<!--                        v-for="(item,idx) in options"-->
<!--                        :key="idx"-->
<!--                        :label="item.label"-->
<!--                        :value="item.val">-->
<!--                </el-option>-->
<!--            </el-select>-->
            <el-button type="primary" icon="el-icon-search" style="margin-left: 15px" @click="initData(1)">搜索</el-button>
        </div>
        <transition name="slide-fade">
            <keep-alive>
                <component :is="subName" @to-parse="changSubName" :loading="loading" :itemMsg="item"></component>
            </keep-alive>
        </transition>
        <div class="blcokSize" v-show="subName==='userList'">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="page"
                    :page-sizes="[10, 20, 30, 50]"
                    :page-size="rows"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="userList.total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import userList from './components/userList.vue'
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
                subName: 'userList',
                item: {},
                loading:false,
                sellerTag:'',
                userId:'',
                mobile:'',
            }
        },
        computed: {
            ...mapGetters( [
                'userList'
            ] ),
        },
        components: {
            userList
        },
        methods: {
            ...mapActions( [
                'userListAction'
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
                const data={page:this.page,pageSize:this.rows,tag:this.sellerTag,userId:this.userId,mobile:this.mobile};
                this.userListAction(data)
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
