<template>
	<div class="order-dish-container">
		<ul class="choose-dish">
			<dish-item v-for="(item,i) in dish" :dishInfo="item" :addDishMethod="addDish" :key="item.name" :i="i"></dish-item>
		</ul>
		<dish-panel :dishPitchInfo="dishPitch" :dish="dish" :submitDish="submitDish"></dish-panel>
	</div>
</template>

<script>
	var DishItem={
		props:['dishInfo','addDishMethod',"i"],
		template:'<li v-on:click="addDish(dishInfo,i)"><p class="dish-name">{{dishInfo.name}}</p><p class="dish-price">￥{{dishInfo.price}}</p></li>',
		methods:{
			addDish(dishInfo,i){
				this.addDishMethod(dishInfo,i);//通过触发父组件的方法 来添加菜肴
			}
		}
	}

	var DishPanel={
		props:['dishPitchInfo','dish','submitDish'],
		template:'<div class="dish-panel"><ul><li v-for="(item,i) in dishPitchInfo" :key="item.name" v-on:click="removeDish(item,i)"><p class="dish-name">{{item.name}}</p><p class="dish-price">￥{{item.price}}</p></li></ul><button class="choose" @click="submitDish">选好了，去提交</button></div>',
		methods:{
			removeDish(dishInfo,i){
				this.dish.push(dishInfo);
				this.dishPitchInfo.splice(i,1);//删除选择的菜 添加列表的菜
			}
		}
	}
	export default {
		name: 'controlCenter',
		props:["chooseM","dishInfo",'usernameOrder'],
		data(){
			return {
				username:this.usernameOrder,
				dish:this.dishInfo,
				dishPitch:[]
			}
		},

		components:{
			"dish-item":DishItem,
			"dish-panel":DishPanel
		},
		created(){
			console.log(this.usernameOrder)
		},
		methods:{
			addDish(dishInfo,id){
				var _this = this;
				if(this.dishPitch.length < 4 && this.dishPitch.length !== 0){//已经有过选择的菜肴
					var isHave = false
					for(var i=0;i<this.dishPitch.length;i++){
						if(this.dishPitch[i].name === dishInfo.name){
							return isHave = true;
						}
					}//是否有选择重复的菜肴
					if(!isHave){
						this.dishPitch.push(dishInfo);
						var s= this.dish.splice(id,1);
					}
					
				}else if(this.dishPitch.length === 0 ){//第一次选择菜肴
					this.dishPitch.push(dishInfo);
					var s = this.dish.splice(id,1);
				}
			},
			submitDish(){
				if(this.dishPitch.length === 0 ){
					alert('你还未选择菜肴哦！')
				}else{
					this.chooseM(this.usernameOrder,this.dishPitch);
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
	.order-dish-container{
		background: rgba(0, 0, 0, 0.28);
		width: 800px;
		height: 600px;
		margin:150px auto;
		box-shadow: 0 3px 18px 8px rgba(38, 24, 24, 0.25);
	}
	.choose-dish{
		width: 250px;
		height: 100%;
		overflow: hidden;
		float: left;
		border-right: 1px solid rgba(0, 0, 0, 0.48)
	}
	.dish-panel{
		width: 550px;
		height: 100%;
		overflow: hidden;
		float: left;
		position: relative;
	}
	.dish-panel li{
		width: 200px;
		float: left;
		margin: 30px;
	}
	li{
		width: 100%;
		height: 80px;
		margin-bottom: 10px;
		border:1px solid #f76120;
		cursor: pointer;
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
	button.choose{
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