<template>

	<div class="container">
		<div class="row row-centered">
			<div class="well col-md-6 col-centered">
				<h2>欢迎登录</h2>

				<div class="input-group input-group-md">
					<span class="input-group-addon" id="sizing-addon"><i class="glyphicon glyphicon-user" aria-hidden="true"></i></span>
					<input type="text" class="form-control" v-model="username"  placeholder="请输入用户名"/>
				</div>
				<div class="input-group input-group-md">
					<span class="input-group-addon" id="sizing-addon1"><i class="glyphicon glyphicon-lock"></i></span>
					<input type="password" class="form-control" v-model="password"  placeholder="请输入密码"/>
				</div>
				<br/>
				<button type="submit" class="btn btn-success btn-block" @click="getdata">登录</button>

			</div>
		</div>
	</div>

</template>



<script type="es6">
	export default {
		name: "mytest",
		data(){
			return{
				meassage:"hello",
				username:"",
				password: ""

			}

		},

		methods:{
			getdata:function () {
				let config = {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}
				let postData =this.qs.stringify({
					username: this.username,
					password: this.password

				})
				this.axios.post('/user/login',postData,config)
						.then((res) => {
							if(res.data.status=='10001'){
								alert("登陆成功！")
								this.$router.push({
									name: 'newtest',
									// name: 'mallList',
									query: {
										username: this.username
									}
								})

							}
						})
			}
		},
	}


</script>


<style type="text/css">
	#vue{
		color: green;
		font-size: 28px;
	}
	/*web background*/
	.container{
		display:table;
		height:100%;
	}

	.row{
		display: table-cell;
		vertical-align: middle;
	}
	/* centered columns styles */
	.row-centered {
		text-align:center;
	}
	.col-centered {
		display:inline-block;
		float:none;
		text-align:left;
		margin-right:-10px;
		margin-top: 15%;
	}

</style>
