<template>
	<div class="order-result">
		<ul class="result-dish">
			<dish-item v-for="(item,i) in v" :dishInfo="item" :key="item.name"></dish-item>
		</ul>
	</div>
</template>
<script>
	var DishItem={
		props:['dishInfo'],
		template:'<li><p class="dish-name">{{dishInfo.name}}</p><p class="dish-price">￥{{dishInfo.price}} <i>{{dishInfo.times}}</i></p></li>'
	}
	export default {
		name:'orderResult',
		props:["voteDishResultInfo"],
		components:{
			DishItem
		},
		data(){
			return {
				v:this.voteDishResultInfo
			}
		},
		created(){
			console.log(this.v)
		}
	}
</script>

<style>
	.order-result{
		background: rgba(0, 0, 0, 0.28);
		width: 800px;
		height: 600px;
		margin:150px auto;
		box-shadow: 0 3px 18px 8px rgba(38, 24, 24, 0.25);
	}
	.result-dish{
		width: 100%;
		height: 100%;
		overflow: hidden;
		float: left;
		border-right: 1px solid rgba(0, 0, 0, 0.48)
	}
	.result-dish li{
		width: 200px;
		float: left;
		margin: 30px;
	}
	.result-dish li i{
		display: block;
	}
</style>