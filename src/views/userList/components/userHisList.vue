<template>
    <div class="list">
        <el-table
                :data="userHisList.list"
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
                    <span style="margin-left: 10px" v-else-if="item.field==='matting_type'">{{scope.row[item.field] | filterType}}</span>
                    <span style="margin-left: 10px" v-else-if="item.field==='user_id'">{{scope.row[item.field] ? scope.row[item.field] : '游客'}}</span>
                    <span style="margin-left: 10px" v-else-if="['original_image','matting_image'].includes(item.field)">
                       <el-image
                               style="width: 100px; height: 100px"
                               :src="`${scope.row[item.field]}?x-oss-process=style/200`"
                               lazy
                               :preview-src-list="[`${scope.row['original_image']}`,`${scope.row['matting_image']}`]"
                               fit="contain"></el-image>
                    </span>
                    <span style="margin-left: 10px" v-else>{{scope.row[item.field]}}</span>
                </template>
            </el-table-column>
<!--            <el-table-column label="操作">-->
<!--                <template slot-scope="scope">-->
<!--                    <el-button-->
<!--                            size="mini"-->
<!--                            type="text"-->
<!--                            @click="handleEdit(scope.$index, scope.row)">编辑标签-->
<!--                    </el-button>-->
<!--                </template>-->
<!--            </el-table-column>-->
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
                    {name: '用户ID', width: '', field: 'user_id'},
                    {name: '抠图时间', width: '', field: 'created_at'},
                    {name: 'IP', width: '', field: 'ip'},
                    {name: '原图', width: '', field: 'original_image'},
                    {name: '预览图', width: '', field: 'matting_image'},
                    {name: '抠图类型', width: '', field: 'matting_type'},
                    // {name: '获取途径', width: '', field: 'preview_matting_image'},
                    {name: '抠图状态', width: '', field: 'status'},
                ],
            }
        },
        filters: {
            filterType(type){
                const a=['通用抠图','人像抠图','物体抠图','头像抠图','一键美化','图片修复']
                return a[type]
            }
        },
        computed:{
            ...mapGetters([
                'userHisList'
            ])
        },
        methods: {
            ...mapActions([
                'popoverAlert','userHisListAction'
            ]),
            handleEdit(index, row) {
               this.popoverAlert(['vTags',row])
            },
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
