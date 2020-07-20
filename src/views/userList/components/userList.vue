<template>
    <div class="list">
        <el-table
                :data="userList.list"
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
                    <span style="margin-left: 10px" v-else>{{scope.row[item.field] ? scope.row[item.field] : '暂无' }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="text"
                            @click="handleEdit(scope.$index, scope.row)">编辑标签
                    </el-button>
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
    import { UpperDPro,deleteProduct } from "@/apis/product"
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
                    {name: '用户ID', width: '100', field: 'id'},
                    {name: '用户邮箱', width: '', field: 'email'},
                    {name: '手机号', width: '', field: 'mobile'},
                    {name: 'IP', width: '', field: 'ip'},
                    {name: '注册时间', width: '', field: 'created_at'},
                    {name: '用户标签', width: '', field: 'tags'},
                ],
            }
        },
        filters: {},
        computed:{
            ...mapGetters([
                'userList'
            ])
        },
        methods: {
            ...mapActions([
                'popoverAlert','userListAction'
            ]),
            handleEdit(index, row) {
               this.popoverAlert(['vTags',row])
            },
            getHisList(index, row){
                this.$router.push(`/user/hisList?userId=${row.id}`)
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
