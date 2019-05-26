<template>
	<el-form ref="form" :model="form" label-width="80px" @submit.prevent="onSubmit" style="margin:20px;width:60%;min-width:600px;">
		<el-form-item label="活动名称">
			<el-input v-model="form.name"></el-input>
		</el-form-item>
		<el-form-item label="活动区域">
			<el-select v-model="form.region" placeholder="请选择活动区域">
				<el-option label="区域一" value="shanghai"></el-option>
				<el-option label="区域二" value="beijing"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item >
			<el-upload
					action="/api/manage/product/upload"
					list-type="picture-card"
					:on-preview="handlePictureCardPreview"
					:data="this.form"
					:auto-upload="false"
					ref="upload"
					:on-remove="handleRemove">
				<i class="el-icon-plus"></i>
			</el-upload>
			<el-dialog :visible.sync="dialogVisible">
				<img width="100%" :src="dialogImageUrl" alt="">
			</el-dialog>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="submit2">立即创建</el-button>
			<el-button @click.native.prevent>取消</el-button>
		</el-form-item>
	</el-form>



</template>

<script>

	export default {
		data() {
			return {
				form: {
					name: '',
					region: '22222222222',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				},
				uploadData: {
					das:this.form
				},
				file:'',
				dialogImageUrl: '',
				dialogVisible: false,
				imgUrl:'',
				userId: '',
				uid:'',
			}
		},
		computed: {//实时计算
			loading(){
				return this.$store.state.loading;
			},
		},
		methods: {
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
			// 点击保存按钮上传图片
			submit2:function(res){
				let that = this
				that.formData = new FormData()
				that.formData.append('name', that.form.name)
				this.$refs.upload.submit();
			},

			// 图片上传成功后，后台返回图片的路径
			onSuccess:function(res){
				// console.log(res);
				if(res.status==200){
					this.imgUrl=res.data.imgUrl;

				}
			},


			}

	}

</script>
