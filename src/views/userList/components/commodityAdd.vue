<template>
    <div class="add">
        <el-form ref="form" :model="form" label-width="150px">
            <el-form-item label="颜色：">
                <div class="flex f-w">
                    <div  v-for="(tag,idx) in form.colorList" :key="idx" class="colorItem">
                        <el-tag
                                closable
                                size="small"
                                class="cu"
                                disable-transitions
                                @click="changeThis(1,idx)"
                                @close="handleClose(1,idx,tag)">
                            {{tag.name}}
                        </el-tag>
                        <img :src="tag.img" alt="" style="display: block;width: 60px;height: 60px;">
                    </div>
                    <i class="el-icon-plus cu" style="font-size: 24px;color: #21a9e8;" @click="skuMene(1)"></i>
                </div>
            </el-form-item>
            <el-form-item label="尺码：">
                <div class="flex f-w">
                    <el-tag
                            v-for="(tag,idx) in form.sizeList"
                            :key="idx"
                            closable
                            size="small"
                            class="cu"
                            disable-transitions
                            @click="changeThis(2,idx)"
                            @close="handleClose(2,idx,tag)">
                        {{tag.name}}
                    </el-tag>
                    <i class="el-icon-plus cu" style="font-size: 24px;color: #21a9e8;" @click="skuMene(2)"></i>
                </div>
            </el-form-item>
            <el-form-item label="已下架SKU：">
                <div class="flex f-w">
                    <el-tag
                            v-for="(tag,idx) in form.lowerList"
                            :key="idx"
                            closable
                            size="small"
                            class="cu"
                            disable-transitions
                            @close="handleClose(3,idx,tag)">
                        {{tag.attr_color_name}}{{tag.attr_size_name ? `/${tag.attr_size_name}` : ''}}
                    </el-tag>
                    <i class="el-icon-plus cu" style="font-size: 24px;color: #21a9e8;" @click="skuMene(3)"></i>
                </div>
            </el-form-item>
        </el-form>
        <div class="saveBtn">
            <el-button type="primary" size="medium" style="display: block;margin: 0 auto;width: 80px"
                       @click="$emit( 'to-parse', {title: 'commodityList', row:''} )">保存
            </el-button>
        </div>
        <el-dialog
                :visible.sync="centerDialogVisible"
                :close-on-click-modal="false"
                width="25%"
                :title="dialogTitle"
                center>
            <div class="content">
                <div class="one" v-show="dialogType===1">
                    <div class="flex a-i"><label>颜色:</label>
                        <el-input v-model="color" placeholder="请输入颜色"></el-input>
                    </div>
                    <div class="flex a-i"><label>图片:</label>
                        <el-upload
                                action="http://www.17huo.com/index.php?mod=api/Product&code=uploadSkuImage"
                                name="file"
                                class="avatar-uploader"
                                :show-file-list="false"
                                :before-upload="beforImg"
                                :on-success="afterupload">
                            <img :src="imgUrl" alt="" v-if="imgUrl!=0 && imgUrl" style="width: 80px;height: 80px;margin-right: 15px;"
                                 class="avatar tra">
                            <i :class="loading ? 'el-icon-loading' : 'el-icon-plus'"
                               class="el-icon-plus avatar-uploader-icon" v-else></i>
                        </el-upload>
                    </div>
                </div>
                <div class="two" v-show="dialogType===2">
                    <div class="flex a-i"><label>尺寸:</label>
                        <el-input v-model="size" placeholder="请输入尺寸"></el-input>
                    </div>
                </div>
                <div class="three" v-show="dialogType===3">
                    <div class="flex">
                        <label>颜色:</label>
                        <div>
                            <el-tag
                                    v-for="(tag,idx) in form.colorList"
                                    :key="idx"
                                    size="small"
                                    class="cu"
                                    :class="{'active' : selectIdx.cIdx===idx}"
                                    @click="selectCs(1,idx)">
                                {{tag.name}}
                            </el-tag>
                        </div>
                    </div>
                    <div class="flex">
                        <label>尺寸:</label>
                        <div>
                            <el-tag
                                    v-for="(tag,idx) in form.sizeList"
                                    :key="idx"
                                    size="small"
                                    class="cu"
                                    :class="{'active' : selectIdx.sIdx===idx}"
                                    @click="selectCs(2,idx)">
                                {{tag.name}}
                            </el-tag>
                        </div>
                    </div>
                </div>
                <el-button type="primary" style="display:block;margin:20px auto 0;" @click="saveSku">保存</el-button>
            </div>
        </el-dialog>
    </div>

</template>

<script>
    import {skuMsgss, colorEdir, sizeEdir, deleteSku, addOffsaleSku, deleteOffsaleSku} from "@/apis/product"

    export default {
        name: "add",
        props: {
            itemMsg: Object
        },
        data() {
            return {
                form: {
                    colorList: [],
                    sizeList: [],
                    lowerList: [{name: 'l', id: '', image: ''}, {name: 'xl', id: '', image: ''}, {
                        name: 'xxl',
                        id: '',
                        image: ''
                    }],
                },
                centerDialogVisible: false,
                dialogType: 0,
                imgUrl: '',
                color: '',
                loading: false,
                size: '',
                itemIdx: -1,
                selectIdx: {cIdx: -1, sIdx: -1}
            }
        },
        computed: {
            dialogTitle() {
                if (this.dialogType === 1) return '颜色管理';
                else if (this.dialogType === 2) return '尺寸管理';
                else if (this.dialogType === 3) return '下架管理';
            }
        },
        methods: {
            skuMene(k) {
                this.dialogType = k;
                this.itemIdx = -1;
                this.centerDialogVisible = true;
                this.color = '';
                this.imgUrl = '';
                this.size = '';
                this.selectIdx = {cIdx: -1, sIdx: -1};
            },
            changeThis(k, idx) {
                this.dialogType = k;
                this.itemIdx = idx;
                this.centerDialogVisible = true;
                if (k === 1) {
                    this.color = this.form.colorList[idx].name
                    this.imgUrl = this.form.colorList[idx].img
                } else if (k === 2) this.size = this.form.sizeList[idx].name
            },
            beforImg(file) {
                // console.log( file )
                this.loading = true
            },
            afterupload(response, file, fileList) {
                if (!response.code) {
                    this.imgUrl = response.data
                    this.loading = false
                }
            },
            handleClose(k, idx, tag) {
                this.$confirm( '确定要删除此sku么, 是否继续?', '提示', {
                    showClose: false,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                } ).then( () => {
                    // this.$message({type: 'success',message: '删除成功!'});
                    if ([1, 2].includes( k )) {
                        deleteSku( {attr_id: tag.id} ).then( res => {
                            if (!res.code) {
                                this.$message({type: 'success',message: '删除成功!'});
                                if (k === 1) this.form.colorList.splice( idx, 1 );
                                else this.form.sizeList.splice( idx, 1 );
                            }
                        } )
                    } else {
                        deleteOffsaleSku( {offsale_id: tag.id} ).then( res => {
                            if (!res.code) {
                                this.$message({type: 'success',message: '删除成功!'});
                                this.form.lowerList.splice( idx, 1 );
                            }
                        } )
                    }
                } ).catch( () => {

                } );

            },
            initSkuMsg() {
                skuMsgss( {pid: this.itemMsg.id} ).then( res => {
                    if (!res.code) {
                        this.form.colorList = res.data.colors;
                        this.form.sizeList = res.data.sizes;
                        this.form.lowerList = res.data.offsale_sku_list;
                    }
                } )
            },
            saveSku() {
                if (this.dialogType === 1) {
                    if (!this.color || !this.imgUrl) {
                        this.$message( {type: 'warning', message: '颜色或图片不可为空'} );
                        return;
                    }
                    const data = {
                        pid: this.itemMsg.id,
                        color: this.color,
                        img: this.imgUrl,
                        attr_id: this.itemIdx > -1 ? this.form.colorList[this.itemIdx].id : ''
                    }
                    colorEdir( data ).then( res => {
                        if (!res.code) {
                            this.$message( {type: 'success', message: '操作成功'} );
                            this.initSkuMsg();
                        }
                    } )
                } else if (this.dialogType === 2) {
                    if (!this.size) {
                        this.$message( {type: 'warning', message: '尺寸不可为空'} );
                        return;
                    }
                    const data = {
                        pid: this.itemMsg.id,
                        size: this.size,
                        attr_id: this.itemIdx > -1 ? this.form.sizeList[this.itemIdx].id : ''
                    }
                    sizeEdir( data ).then( res => {
                        if (!res.code) {
                            this.$message( {type: 'success', message: '操作成功'} );
                            this.initSkuMsg();
                        }
                    } )
                } else {
                    if (this.selectIdx.cIdx < 0 && this.selectIdx.sIdx < 0) {
                        this.$message( {type: 'warning', message: '请先选择规格'} )
                        return;
                    }
                    const data = {
                        pid: this.itemMsg.id,
                        attr_color_id: this.selectIdx.cIdx < 0 ? '' : this.form.colorList[this.selectIdx.cIdx].id,
                        attr_size_id: this.selectIdx.sIdx < 0 ? '' : this.form.sizeList[this.selectIdx.sIdx].id,
                    }
                    addOffsaleSku( data ).then( res => {
                        this.$message( {type: 'success', message: '操作成功'} );
                        this.initSkuMsg();
                    } )
                }
                this.centerDialogVisible = false;
            },
            selectCs(k, idx) {
                if (k === 1 && idx === this.selectIdx.cIdx) this.selectIdx.cIdx = -1;
                else if (k === 2 && idx === this.selectIdx.sIdx) this.selectIdx.sIdx = -1;
                else k === 1 ? this.selectIdx.cIdx = idx : this.selectIdx.sIdx = idx;
            },
        },
        activated() {
            this.initSkuMsg()
        },
        deactivated() {
        }
    }
</script>

<style scoped lang="scss">
    .add {
        .el-form {
            background-color: #fff;
            padding: 60px 0;

            .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
                margin-bottom: 40px;
            }
            .colorItem{
                margin-right: 15px;
            }
        }

        .saveBtn {
            background-color: #fff;
            padding: 40px 0;
        }

        .el-tag {
            margin: 0 10px 10px 0;
        }

        .el-dialog__header {
            background-color: #B3D8FF;
        }

        .content {
            padding: 10px;

            .flex {
                margin-bottom: 10px;

                label {
                    margin-right: 20px;
                    width: 80px;
                    text-align: right;
                }

                .el-input {
                    width: 50%;
                }
            }

            .active {
                background-color: #409EFF;
                color: #fff;
            }

            .avatar-uploader .el-upload {
                border: 1px dashed #d9d9d9;
                border-radius: 6px;
                cursor: pointer;
                position: relative;
                overflow: hidden;
            }

            .avatar-uploader .el-upload:hover {
                border-color: #409EFF;
            }

            .avatar-uploader-icon {
                font-size: 28px;
                color: #8c939d;
                width: 80px;
                height: 80px;
                line-height: 80px;
                text-align: center;
            }

            .avatar {
                width: 178px;
                height: 178px;
                display: block;
            }
        }
    }
</style>
