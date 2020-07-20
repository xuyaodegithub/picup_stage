<template>
    <div class="v_popover">
        <div class="v_title flex a-i">
            <span class="title">用户标签</span><i class="el-icon-close cu" @click="popoverAlert"></i>
        </div>
        <div class="v-content">
            <div class="table-head">
                <div class="tags">
                    <el-tag
                            v-for="(item,idx) in tags"
                            :key="idx"
                            closable
                            size="medium"
                            @close="handleClose(item)"
                            effect="plain">
                        {{ item }}
                    </el-tag>
                    <el-input
                            class="input-new-tag"
                            v-if="inputVisible"
                            v-model="inputValue"
                            ref="saveTagInput"
                            size="small"
                            style=" display: inline-block;height: 28px;line-height: 28px;width: 100px"
                            @keyup.enter.native="handleInputConfirm"
                            @blur="handleInputConfirm"
                    >
                    </el-input>
                    <el-button v-else class="button-new-tag" size="mini" @click="showInput"
                               style="height: 28px;line-height: 28px;padding: 0 15px;">新增标签
                    </el-button>
                </div>
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
                tags: [],
                inputVisible: false,
                inputValue: ''
            }
        },
        computed: {
            ...mapGetters( [
                'popoverAlive'
            ] )
        },
        methods: {
            ...mapActions( [
                'popoverAlert', 'setUserTagAction'
            ] ),
            handleClose(tag) {
                this.tags.splice( this.tags.indexOf( tag ), 1 );
            },

            showInput() {
                this.inputVisible = true;
                this.$nextTick( _ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                } );
            },

            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (inputValue) {
                    this.tags.push( inputValue );
                }
                this.inputVisible = false;
                this.inputValue = '';
            },
            save() {
                const data = {
                    userId: this.popoverAlive.information.id,
                    tags: this.tags.join( ',' )
                }
                this.setUserTagAction( data )
                this.popoverAlert()
            }
        },
        mounted() {
            this.tags = this.popoverAlive.information.tags ? this.popoverAlive.information.tags.split( ',' ) : [];
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

            .el-tag {
                margin: 0 10px 10px 0;
            }

            .head-item {
                margin: 15px auto;
                width: 90%;

                span {
                    margin-right: 15px;
                }
            }

            & > .el-button {
                display: block;
                width: 100px;
                margin: 25px auto 0;
            }
        }
    }
</style>
