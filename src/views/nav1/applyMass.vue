<template>

    <section >

        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.name" placeholder="社团名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="getMassbyName">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="jump_addMass">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>



        <!--列表-->
        <el-table :data="tempList" highlight-current-row v-loading="listLoading" style="width: 100%;"
                  :default-sort="{prop: 'date', order: 'descending'}">
            <el-table-column type="selection" min-width="5%">
            </el-table-column>
            <el-table-column type="index" min-width="5%">
            </el-table-column>
            <el-table-column  :show-overflow-tooltip="true" prop="massName" label="社团名称" min-width="15%" class="fold" sortable>
            </el-table-column>
            <el-table-column :show-overflow-tooltip="true" prop="userName" label="用户姓名" min-width="15%" sortable>
            </el-table-column>
            <el-table-column prop="createDate" label="开始日期" min-width="11.25%" sortable>
            </el-table-column>
            <el-table-column label="操作" min-width="25%">
                <template slot-scope="scope">

                    <el-button size="small" @click="handleEdit(scope.row,1)">同意</el-button>
                    <el-button size="small" @click="handleEdit(scope.row,2)">拒绝</el-button>

                </template>
            </el-table-column>
        </el-table>


        <!--&lt;!&ndash;工具条&ndash;&gt;-->
        <!--<el-col :span="24" class="toolbar">-->
        <!--<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>-->
        <!--<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">-->
        <!--</el-pagination>-->
        <!--</el-col>-->
        <div class="paginationClass">
            <el-pagination
                    @size-change="handleSizeChange1"
                    @current-change="handleCurrentChange1" :current-page="currentPage"
                    :page-sizes="[10, 20, 50, 100]"
                    :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </div>
    </section>

</template>

<script>

    import { getAllMassApply} from '../../api/api';
    import { updateMassApply} from '../../api/api';
    export default {
        inject:['reload'],
        data() {
            return {
                tempList:[],
                filters: {
                    name: ''
                },
                products: [],
                total: 0,
                page: 1,
                listLoading: false,
                sels: [],//列表选中列
                filters: {
                    ellipsis (value) {
                        if (!value) return ''
                        if (value.length > 8) {
                            return value.slice(0,8) + '...'
                        }
                        return value
                    }
                },
                currentPage:1, //初始页
                pageSize:10,    //    每页的数据
            }
        },

        methods: {
            handleCurrentChange(val) {
                this.page = val;
                this.getAllMassApply();
            },
            //获取社团列表
            getAllMassApply() {
                let para = {
                    page: this.page,
                    name: this.filters.name
                };
                this.listLoading = true;
                //NProgress.start();
                getAllMassApply(para).then((res) => {
                    this.products = res.data.data;
                    this.currentChangePage(this.products,this.currentPage)
                    this.listLoading = false;
                    //NProgress.done();
                });
            },
            //工具栏查询函数
            getMassbyName() {
                let para=this.qs.stringify({
                    name:this.filters.name
                });
                this.listLoading = true;
                selectMassByName(para).then((res) => {
                    this.products = res.data;
                    this.currentChangePage(this.products,this.currentPage)
                    this.listLoading = false;
                });
            },
            handleSizeChange1: function(pageSize) { // 每页条数切换
                this.pageSize = pageSize
                this.handleCurrentChange1(this.currentPage);
            },
            handleCurrentChange1: function(currentPage) {//页码切换
                this.currentPage = currentPage
                this.currentChangePage(this.products,currentPage)

            },
            //分页方法（重点）
            currentChangePage(list,currentPage) {
                let from = (currentPage - 1) * this.pageSize;
                let to = currentPage * this.pageSize;
                this.tempList = [];
                for (; from < to; from++) {
                    if (list[from]) {
                        this.tempList.push(list[from]);
                    }
                }
            },
            handleEdit(row,state){
                console.log(state);
                let para = {
                    id:row.id,
                    massId: row.massId,
                    userId: row.userId,
                    status: state
                };
                updateMassApply(para).then((res) => {

                    if(state==1)alert("已同意");
                    if(state==2)alert("已拒绝");
                    this.reload();
                });

            },
            jump_addMass(){
                this.$router.push({ path:'/addMass'  })

            }
        },

        mounted() {
            this.getAllMassApply();

        }
    }

</script>

<style scoped>
    .containner{
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }



    .fold{
        width: 30px;
        display: -webkit-box; /*作为弹性伸缩盒子模型显示*/
        -webkit-line-clamp: 2; /*显示的行数；如果要设置2行加...则设置为2*/
        overflow: hidden;
        text-overflow: ellipsis; /* 溢出用省略号*/
        /*! autoprefixer: off */
        -webkit-box-orient: vertical;/*伸缩盒子的子元素排列：从上到下*/
        /* autoprefixer: on */

    }
</style>