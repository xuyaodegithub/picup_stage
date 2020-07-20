<template>
    <div class="index">
        <div class="seach" v-show="subName==='userHisListSub'">
            <label>用户ID：</label>
            <el-input v-model="userId" placeholder="请输入用户ID" @keydown.native.enter="initData(1)"></el-input>
            <label>图片处理类型：</label>
            <el-select v-model="mattingType" placeholder="请选择" size="mini">
                <el-option
                        v-for="(item,idx) in options"
                        :key="idx"
                        :label="item.label"
                        :value="item.type">
                </el-option>
            </el-select>
            <el-button type="primary" icon="el-icon-search" style="margin-left: 15px" @click="initData(1)">搜索</el-button>
        </div>
        <transition name="slide-fade">
            <keep-alive>
                <component :is="subName" @to-parse="changSubName" :loading="loading" :itemMsg="item"></component>
            </keep-alive>
        </transition>
        <div class="blcokSize" v-show="subName==='userHisListSub'">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="page"
                    :page-sizes="[10, 20, 30, 50]"
                    :page-size="rows"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="userHisList.total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import userHisListSub from './components/userHisList.vue'
    import {mapGetters, mapActions} from 'vuex'
    export default {
        name: "index",
        data() {
            return {
                options: [
                    {label: '全部', type: 0},
                    {label: '人像抠图', type: 1},
                    {label: '物体抠图', type: 2},
                    {label: '头像抠图', type: 3},
                    {label: '一键美化', type: 4},
                    {label: '图片修复', type: 5},
                ],
                mattingType:0,
                userId:'',
                page: 1,
                rows: 20,
                subName: 'userHisListSub',
                item: {},
                loading:false,
                sellerTag:''
            }
        },
        computed: {
            ...mapGetters( [
                'userHisList'
            ] ),
        },
        components: {
            userHisListSub
        },
        methods: {
            ...mapActions( [
                'userHisListAction'
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
                const data={page:this.page,pageSize:this.rows,mattingType:this.mattingType,userId:this.userId};
                this.userHisListAction(data)
            },
        },
        activated(){
            if(this.$route.query.userId){
                this.userId=this.$route.query.userId;
                this.mattingType=0;
                this.initData(1)
            }
        },
        mounted() {
            // console.log(this.$route.query.userId)
            if(!this.$route.query.userId)this.initData();
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
