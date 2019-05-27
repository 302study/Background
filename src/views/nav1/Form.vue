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
			<el-select v-model="form.type" placeholder="请选择商品种类">
				<el-option label="手机" value="shanghai"></el-option>
				<el-option label="手机" value="beijing"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="商品主图">
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


		<el-form-item label="描述" >
			<simditor
					:options="options"
					@change="change">
			</simditor>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="submit2">立即创建</el-button>
			<el-button @click.native.prevent>取消</el-button>
		</el-form-item>
	</el-form>



</template>

<script>
	import Simditor from '../../components/simditor'
	export default {

		data() {
			return {
				form: {
					name: '',
					type: '',
					subtitle: '',
					price: '',
					delivery: false,
					stock: '',
					detail: '',

				},

				content:'',
				options: {
					placeHolder: 'this is placeHolder',
					toolbarFloat: false,
					toolbar: ['title', 'bold', 'italic', 'underline', 'strikethrough', 'fontScale', 'color', '|', 'ol', 'ul', 'blockquote', 'code', 'table', '|', 'link', 'image', 'hr', '|', 'indent', 'outdent', 'alignment',
					],
					pasteImage: true,
					upload: {
						url: '/manage/product/richtext_img_upload', //文件上传的接口地址
						params: null, //键值对,指定文件上传接口的额外参数,上传的时候随文件一起提交
						fileKey: 'file', //服务器端获取文件数据的参数名
						connectionCount: 3,
						leaveConfirm: '正在上传文件'
					}
				},

			}
		},
		components: {
			Simditor
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
			submit2: function (res) {
				console.log(this.infoForm);
				console.log(this.form.detail);
				let that = this
				this.$refs.upload.submit();
			},

			// 图片上传成功后，后台返回图片的路径
			onSuccess: function (res) {
				// console.log(res);
				if (res.status == 200) {
					this.imgUrl = res.data.imgUrl;
				}
			},
			change(val){
				console.log(val)  //以html格式获取simditor的正文内容
			},


		}
			}

</script>
