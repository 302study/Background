<template>
	<el-form ref="form" :model="form" label-width="80px" @submit.prevent="onSubmit" style="margin:20px;width:60%;min-width:600px;">
		<el-form-item label="活动名称">
			<el-input v-model="form.name"></el-input>
		</el-form-item>
		<el-form-item label="活动社团">
			<treeselect
					name="demo"
					:multiple="false"
					:searchable="true"
					:open-on-click="true"
					:disable-branch-nodes="true"
					:options="options"
					:max-height="200"
					v-model="form.massId"
			/>
		</el-form-item>
		<el-form-item label="参与人数">
			<el-input type="number" v-model="form.participantsNumber"></el-input>
		</el-form-item>
		<el-form-item label="活动日期">
			<el-date-picker
					v-model="date"
					type="daterange"
					range-separator="至"
					start-placeholder="开始日期"
					end-placeholder="结束日期"
					value-format=" yyyy-MM-dd HH:mm:ss">
			</el-date-picker>
		</el-form-item>
		<el-form-item label="优先级">
			<el-input type="number" v-model="form.priority"></el-input>
		</el-form-item>

		<el-form-item label="活动介绍">
			<Editor v-bind:vvalue="form.content" @input="handelIncrease"></Editor>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="submit2">立即创建</el-button>
			<el-button @click.native.prevent>取消</el-button>
		</el-form-item>
	</el-form>



</template>

<script>
	import {getAllMass,getActivityDetail} from '../../api/api'
	import {updateAcvitity} from '../../api/api'
	import Editor from "@/components/Editor";
	// import the component
	import Treeselect from '@riophae/vue-treeselect'
	// import the styles
	import '@riophae/vue-treeselect/dist/vue-treeselect.css'
	export default {
		components: {
			Editor,
			Treeselect ,
		},
		data() {
			return {
				form: {
					id:'',
					name: '',
					massId:'',
					participantsNumber:'',
					startDate:'',
					endDate:'',
					content:'',
					priority:'',
				},
				fileList:[],
				// define options
				options: [ {
					id: '',
					label: '',
				}, ],
				dialogImageUrl: '',
				textd:'',
				dialogVisible: false,
				date:'',
			}
		},
		computed: {//实时计算
			loading() {
				return this.$store.state.loading;
			},
		},


		methods: {
			submit2: function (res) {
				this.form.startDate=this.date[0];
				this.form.startDate.setHours(this.form.startDate.getHours() + 8);
				this.form.endDate=this.date[1];
				this.form.endDate.setHours(this.form.endDate.getHours() + 8);
				let parm=this.qs.stringify({
					id:this.form.id,
					name:this.form.name,
					massId:this.form.massId,
					participantsNumber:this.form.participantsNumber,
					startDate:this.form.startDate,
					endDate:this.form.endDate,
					content:this.form.content,
					priority:this.form.priority
				});
				updateAcvitity(parm).then(res => {
					if(res.status===51){
						alert(res.msg)
						this.$router.push({
							path: '/activity',
						})
					}
				});
			},
			handelIncrease(step) {
				this.form.content=step

			},
			getParams(){
				let id=this.qs.stringify({
					id : sessionStorage.getItem("activityId"),
				});
				getActivityDetail(id).then((res) => {
					this.form=res.data;
					let date=[
					];
					date.push(this.getDate(this.form.startDate));
					date.push(this.getDate(this.form.endDate));
					this.date=date;

					getAllMass().then(res => {
						let data=[];
						data=res.data.data;
						data.forEach((item) => {
							let temp= {
								id: '',
								name: '',
								parentid:'0',
								children: [],
							};
							temp.id=item.id;
							temp.name=item.name;
							temp=this.normalizer(temp);
							this.options.push(temp);
						});
					});
				});
			},
			normalizer(node){
				//去掉children=[]的children属性
				if(node.children && !node.children.length){
					delete node.children;
				}
				return {
					id: node.id,
					label:node.name,
					children:node.children
				}
			},
			getDate(strDate) {
				var dependedVal=strDate;
//根据日期字符串转换成日期
				var regEx = new RegExp("\\-","gi");
				dependedVal=dependedVal.replace(regEx,"/");
				var milliseconds=Date.parse(dependedVal);
				var dependedDate=new Date();
				dependedDate.setTime(milliseconds);

				return dependedDate
			} ,
		},
		mounted() {
			this.getParams();
		},
	}

</script>
