<template :loginM="loginM" :userInfo="userInfo">
	<div class="login-container">
		<h2>软件部点菜系统</h2>
		<input type="text" placeholder="用户名" v-model="username">
		<input type="password" placeholder="密码" v-model="psw">
		<button v-on:click="login" class="login">登录</button>
	</div>
</template>

<script>
	export default {
		name: 'app',
		props:['loginM','userInfo'],
		data(){
			return {
				username:"",
				psw:"123456"
			}
		},
		methods:{
			login(){
				let _this = this,loginResult = false;
				this.userInfo.forEach(user=>{
					console.log(user.username)
					if(user.username === _this.username && user.psw == _this.psw ){
						loginResult = user.username;
					}
				});
				if(loginResult){
					this.loginM(loginResult);
				}else{
					alert('用户名或密码错误');
				}

			}
		}
	}
</script>

<style>
	*{
		margin:0;padding: 0;
	}
	body{
		background: rgba(0, 0, 0, 0.1);
	}
	.login-container{
		background: rgba(0, 0, 0, 0.28);
		width: 400px;
		margin:200px auto;
		box-shadow: 0 3px 18px 8px rgba(38, 24, 24, 0.25);
		overflow: hidden;
	}
	h2{
		color: #fff;
		font-size: 30px;
		text-align: center;
		font-style: normal;
		padding: 20px 0; 
	}
	input{
		width: 300px;
		height: 40px;
		margin: 20px auto;
		display: block;
		text-indent: 20px;
	}
	button.login{
		width: 300px;
		height: 40px;
		display: block;
		margin: 20px auto;
		background: rgba(0, 188, 212, 0.54);
		color: #fff;
		padding: 10px 20px;
		border: none;
		outline: none;
		cursor: pointer;
		font-size: 16px;
		letter-spacing: 4px;
	}
</style>