<template :voteM="voteM">
	<div class="vote-dish-container">
		<ul class="vote-dish">
			<dish-item v-for="(item,i) in voteDishData" :dishInfo="item" :voteDishMethod="voteDish" :key="item.name" :i="i" :voteDishResultData="voteDishResultData"></dish-item>
		</ul>
		<button @click="submitVoteResult" class="vote">投完了</button>
	</div>
</template>
<script>
	var DishItem={
		props:['dishInfo','voteDishMethod',"i","voteDishResultData"],
		data(){
			return {
				isActive:false
			}
		},
		template:'<li v-on:click="voteDish(dishInfo,i)" :class="{active:isActive}"><p class="dish-name">{{dishInfo.name}}</p><p class="dish-price">￥{{dishInfo.price}} <i>ok</i></p></li>',
		methods:{
			voteDish(dishInfo,i){
				this.isActive = (! this.isActive ) && this.voteDishResultData.length <4;
				this.voteDishMethod(dishInfo,i);//通过触发父组件的方法 来添加菜肴
			}
		}
	}
	export default {
		name: 'voteDishContainer',
		props:["voteM",'voteDishInfo','usernameOrder'],
		data(){
			return {
				username:this.usernameOrder,
				voteDishData:this.voteDishInfo,
				voteDishResultData:[]
			}
		},

		components:{
			"dish-item":DishItem
			
		},
		methods:{
			voteDish(dishInfo){
				var isHave = false,id = NaN;
					for(var i=0;i<this.voteDishResultData.length;i++){
						if(this.voteDishResultData[i].name === dishInfo.name){
							 isHave = true; id = i;
						}
					}//是否有选择重复的菜肴
					if((!isHave || this.voteDishResultData.length ===0) && this.voteDishResultData.length < 4){
						this.voteDishResultData.push(dishInfo);
					}else if(isHave){
						this.voteDishResultData.splice(id,1);
					}
					console.log(this.voteDishResultData)
				
			},
			submitVoteResult(){
				if(this.voteDishResultData.length === 0 ){
					alert('你还未选择投票目标哦！')
				}else{
					this.voteM(this.usernameOrder,this.voteDishResultData)
					console.log(this.voteDishResultData)
				}
				
			}
		}
	}
</script>
<style>
	*{
		margin:0;padding: 0;box-sizing:border-box;list-style: none;
	}
	body{
		background: rgba(0, 0, 0, 0.1);
	}
	.vote-dish-container{
		background: rgba(0, 0, 0, 0.28);
		width: 800px;
		height: 600px;
		margin:150px auto;
		box-shadow: 0 3px 18px 8px rgba(38, 24, 24, 0.25);
		border:1px solid red;
		position: relative;
	}
	.vote-dish{
		width: 100%;
	}
	.vote-dish li{
		width: 250px;
		float: left;
		margin:6px;
	}
	li{
		
		height: 80px;
		margin-bottom: 10px;
		border:1px solid #f76120;
		cursor: pointer;
	}
	li i{
		display: none;
		float: right;
		padding: 0 6px;
		font-style: normal;
		font-size: 16px;
	}
	li.active i{
		display: inline-block;
	}
	.dish-name{
		height: 40px;
		line-height: 40px;
		text-align: center;
		border-bottom: 1px solid rgba(0, 0, 0, 0.48);
		font-size: 16px;
		color: #666;
	}
	.dish-price{
		height: 40px;
		line-height: 40px;
		text-align: left;
		font-size: 22px;
		color: #f76120;
	}
	button.vote{
		position: absolute;
		bottom: 60px;
		left: 50%;
		margin-left: -150px;
		width: 300px;
		height: 40px;
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