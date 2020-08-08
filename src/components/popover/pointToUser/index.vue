<template>
    <div class="v_popover">
        <div class="v_title flex a-i">
            <span class="title">赠送点数</span><i class="el-icon-close cu" @click="popoverAlert"></i>
        </div>
        <div class="v-content">
            <div class="table-head">
                <div class="head-item flex"><label>数量：</label><el-input v-model="points" placeholder="请输入赠送数量" type="number"></el-input></div>
                <div class="head-item flex"><label>赠送说明：</label><el-input v-model="comment" placeholder="请输入赠送说明" type="textarea" :autosize="{ minRows: 2, maxRows: 3 }"></el-input></div>
                <!--                <div class="head-item"><span>产品价格：</span><el-input v-model="price" placeholder="请输入内容"></el-input></div>-->
            </div>
            <el-button type="primary" @click="save">保存</el-button>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    export default {
        name: "index",
        data() {
            return {
                points:'',
                comment:'关注赠送！',
                // price:'',
            }
        },
        computed:{
            ...mapGetters([
                'popoverAlive'
            ])
        },
        methods: {
            ...mapActions( [
                'popoverAlert','giveUserPointsAction'
            ] ),
            save(){
                if(!this.points || !this.comment){
                    this.$message({type:'warning',message:'请先完善信息'})
                    return;
                }
                const data={
                    userId:this.popoverAlive.information,
                    points:this.points,
                    comment:this.comment
                }
                this.giveUserPointsAction(data)
            }
        },
        mounted() {
        }
    }
</script>

<style scoped lang="scss">
    .v_popover {
        width: 600px;
        background-color: #F0FAFF;
        border: 1px solid #90CCE8;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        overflow: hidden;

        .v_title {
            height: 40px;
            line-height: 40px;
            background: #F0FAFF;
            font-size: 14px;
            border-bottom: 1px solid #C5E2F0;
            justify-content: space-between;
        }

        .v_title .title {
            margin-left: 15px;
            font-weight: bold;
        }

        .v_title i {
            color: #A1C1E2;
            font-size: 14px;
            margin-right: 12px;
        }

        .v-content {
            padding: 20px 12.5px;
            .head-item{
                margin: 15px auto;
                width: 90%;
                .el-textarea,.el-input{
                    flex: 1;
                }
            }
            .el-button{
                display: block;
                width: 100px;
                margin: 25px auto 0;
            }
            label{
               min-width: 80px;
            }
        }
    }
</style>
