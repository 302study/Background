<template>
	<el-form ref="form" :model="form" label-width="80px" @submit.prevent="onSubmit" style="margin:20px;width:60%;min-width:600px;">
		<el-form-item label="商品名称">
			<el-input v-model="form.name"></el-input>
		</el-form-item>
		<el-form-item label="副标题">
			<el-input v-model="form.subtitle"></el-input>
		</el-form-item>
		<el-form-item label="商品价格">
			<el-input v-model="form.price"></el-input>
		</el-form-item>
		<el-form-item label="商品库存">
			<el-input v-model="form.stock"></el-input>
		</el-form-item>
		<el-form-item label="商品种类">
			<treeselect
					name="demo"
					:multiple="false"
					:searchable="true"
					:open-on-click="true"
					:disable-branch-nodes="true"
					:options="options"
					:limit="3"
					:max-height="200"
					v-model="form.categoryId"
			/>
		</el-form-item>
		<el-form-item label="商品主图">
			<el-upload
					action="uploadHead"
					list-type="picture-card"
					:on-preview="handlePictureCardPreview"
					:data="this.form"
					:on-success="handleAvatarSuccess"
					:auto-upload="true"
					:http-request="myUpload"
					ref="upload"
					:on-remove="handleRemove">
				<i class="el-icon-plus"></i>
			</el-upload>
			<el-dialog :visible.sync="dialogVisible">
				<img width="100%" :src="dialogImageUrl" alt="">
			</el-dialog>
		</el-form-item>
		<el-form-item>
			<Editor @input="handelIncrease"></Editor>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="submit2">立即创建</el-button>
			<el-button @click.native.prevent>取消</el-button>
		</el-form-item>
	</el-form>



</template>

<script>
	import {uploadImage} from '../../api/api'
	import {getProducType} from '../../api/api'
	import {addProduct} from '../../api/api';
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
					name: '',
                    type:'',
					subtitle: '',
					price: '',
					delivery: false,
					mainImage:'',
					subImages:[],
					stock: '',
					detail: '',
					detail:'',
					categoryId: null,
				},

				// define options
				options: [],
				dialogImageUrl: '',
				dialogVisible: false
			}
		},
				computed: {//实时计算
					loading() {
						return this.$store.state.loading;
					},

				},

				methods: {
					handleRemove(file, fileList) {
						for(var i = 0;i<this.form.subImages.length;i=i+1){
							if(this.form.subImages[i]==file.name){
								this.$delete(this.form.subImages,i)
							}
						}
						if(this.form.mainImage==file.name){
							this.form.mainImage="";

						}
					},
					handlePictureCardPreview(file) {
						this.dialogImageUrl = file.url;
						this.dialogVisible = true;
					},
					// 点击保存按钮上传图片
					submit2: function (res) {
						this.form.mainImage=this.form.subImages[0]
						this.$delete(this.form.subImages,0)
						let sub=JSON.stringify(this.form.subImages)
						let parm=this.qs.stringify({
							categoryId:this.form.categoryId,
							name:this.form.name,
							subtitle:this.form.subtitle,
							mainImage:this.form.mainImage,
							subImages:sub,
							price:this.form.price,
							stock:this.form.stock,
							detail:this.form.detail,
							status:2,

						});

						addProduct(parm).then(res => {
							console.log(res.status)
							if(res.status===10001){
								alert(res.msg)
							}
						});
					},
					myUpload(content) {
						let formData = new FormData();
						formData.append('file',content.file); // 'file[]' 代表数组 其中`file`是可变的

						uploadImage(formData).then(res=>{

							if (res.status == 10001) {
								this.imgUrl = res.data.imgUrl;
							}
							this.form.subImages.push(res.data.url);
							console.log(this.form.subImages)
						}).catch(err=>{
							console.log(err)
						})
					},
					// 图片上传成功后，后台返回图片的路径
					onSuccess: function (res) {
						// console.log(res);
						if (res.status == 200) {
							this.imgUrl = res.data.imgUrl;
						}
					},
					handleAvatarSuccess(res) {
						this.form.subImages.push(res.data.url);
						console.log(this.form.subImages)
					},
					handelIncrease(step) {
						this.form.detail=step
						console.log("step",this.form.detail)
					},


					getalltype() {
						let parm=this.qs.stringify({
							categoryId:'0'
						});
						getProducType(parm).then(res => {
							let data=[]
							data=res.data
							data.sort()
							let count=0;
							this.options=(data)
							data.forEach((item) => {
								let temp= {
									id: '',
									label: '',
									parentid:'0',
									children: [],
								}

								temp.id=item.id
								temp.label=item.name

								let parm=this.qs.stringify({
									categoryId:temp.id
								});

								getProducType(parm).then(res => {

									console.log(this.options[count].name+"的子目录是"+res.data[0].name)
									let data=[]
									data=res.data

									data.forEach((data) => {
										let temp = {
											id: '',
											label: '',
										}
										temp.id=data.id
										temp.label=data.name
										for(var i=0;i<this.options.length;i++)
										{
											if(item.name==this.options[i].name){
												this.options[i].children.push(temp)
											}
										}

									})

									count=count+1;
								})
							});

						});
					},

				},
		mounted() {
			this.getalltype();
		}


	}

</script>
