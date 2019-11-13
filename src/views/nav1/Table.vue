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
			<el-table-column  :show-overflow-tooltip="true" prop="name" label="社团名称" min-width="15%" class="fold" sortable>
			</el-table-column>
			<el-table-column :show-overflow-tooltip="true" prop="number" label="人数" min-width="15%" sortable>
			</el-table-column>
			<el-table-column prop="leader" label="团长" min-width="15%" sortable>
			</el-table-column>
            <el-table-column prop="state" label="状态" min-width="15%" sortable>
                <template slot-scope="scope">
                    <span>{{scope.row.state===0?'已上架':"未上架"}}</span>
                    <!-- <span v-if=‘scope.row.state==0‘>关闭</span> -->
                </template>
            </el-table-column>
			<el-table-column prop="priority" label="优先级" min-width="15%" sortable>
			</el-table-column>
			<el-table-column label="操作" min-width="25%">
				<template slot-scope="scope">
                    <el-button type="primary" size="small" @click="handleDel(scope.$index, scope.row,0)" v-if="scope.row.state===2">上架</el-button>
                    <el-button type="primary" size="small" @click="handleDel(scope.$index, scope.row,2)" v-if="scope.row.state===0">下架</el-button>
					<el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
					<el-button type="danger" size="small" v-if="scope.row.state===2" @click="handleDel(scope.$index, scope.row,1)">删除</el-button>

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

	import { getAllMass,selectMassByName} from '../../api/api';
	import { editMass} from '../../api/api';
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
				this.getAllMass();
			},
			//获取社团列表
			getAllMass() {
				let para = {
					page: this.page,
					name: this.filters.name
				};
				this.listLoading = true;
				//NProgress.start();
				getAllMass(para).then((res) => {
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
            handleEdit(row){
				sessionStorage.setItem("massId",row.id);
                this.$router.push({
                    path: '/editMass',
                })
            },
			handleDel(index,row,state){
				let off=this.qs.stringify({
					id:row.id,
					state:state
				})
                editMass(off).then((res) => {
					if(state===0)alert("上架成功");
                    if(state===1)alert("删除成功");
                    if(state===2)alert("下架成功");
					this.reload();
				});
			},
			jump_addMass(){
				this.$router.push({ path:'/addMass'  })

			}
		},

		mounted() {
			this.getAllMass();

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