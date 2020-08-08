<template>
    <div class="list">
        <el-table
                :data="userOrderList.list"
                style="width: 100%"
                tooltip-effect="light"
                :header-cell-style="{color:'#333','fontWeight':'600'}"
                v-loading="loading">
            <el-table-column
                    v-for="(item,idx) in tableHead"
                    :key="idx"
                    :label="item.name"
                    show-overflow-tooltip
                    :width="item.width">
                <template slot-scope="scope">
                    <span style="margin-left: 10px" v-if="item.field==='created_at'">{{scope.row[item.field] | changeTime(1)}}</span>
                    <span style="margin-left: 10px" v-else-if="item.field==='product_type'">{{scope.row[item.field]===3 ? '包月' : '永久'}}</span>
                    <span style="margin-left: 10px" v-else>{{scope.row[item.field] }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="text"
                            @click="getHisList(scope.$index, scope.row)">查看抠图历史
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>

</template>

<script>
    import { mapActions,mapGetters } from 'vuex'
    export default {
        name: "list",
        props: {
            tableData: Array,
            loading:Boolean
        },
        data() {
            return {
                tableHead: [
                    {name: '用户ID', width: '', field: 'user_id'},
                    {name: '下单时间', width: '', field: 'created_at'},
                    {name: '价格', width: '', field: 'price'},
                    {name: '类型', width: '', field: 'product_type'},
                    {name: '来源', width: '', field: 'source'},
                ],
            }
        },
        filters: {},
        computed:{
            ...mapGetters([
                'userOrderList'
            ])
        },
        methods: {
            ...mapActions([
                'popoverAlert','userOrderListAction'
            ]),
            handleEdit(index, row) {
               this.popoverAlert(['vTags',row])
            },
            getHisList(index, row){
                this.$router.push(`/user/hisList?userId=${row.user_id}`)
            }
        }
    }
</script>

<style scoped lang="scss">
    .list {
        .seach .el-input {
            width: 160px;
            margin-right: 30px;
        }

        .el-table {
            margin-top: 25px;
        }

        .blcokSize {
            text-align: right;
            margin-top: 15px;
        }
    }
    .skus > div{
        font-size: 12px;
        text-align: center;
        width: 30%;
        .te{
            color: #e82255;
        }
        img{
            display: block;
            width: 100%;
        }
        &:nth-child(3n+2){
            margin: 0 8px;
        }
    }
</style>
