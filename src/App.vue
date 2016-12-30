<template>
  <div id="app">
    <login v-if="isLogin === false" :loginM="loginM" :userInfo="userInfo"></login>
    <orderDish v-else-if="isChoose === false " :chooseM="chooseM" :dishInfo="dishInfo" :usernameOrder="usernameOrder"></orderDish>
    <p v-else-if="isChoose === true && isAllChoose === false">等待其他用户选择</p>
    <voteDish v-else-if="isVote === false && isAllChoose === true" :voteM="voteM" :voteDishInfo="voteDishInfo" :usernameOrder="usernameOrder"></voteDish>
    <p v-else-if="isVote === true && isAllVote === false">等待其他用户投票</p>
    <orderResult v-else-if="isVote === true && isAllVote === true" :voteDishResultInfo="voteDishResultInfo"></orderResult>
  </div>
</template>

<script>
  import login from './components/login';
  import orderDish from './components/orderDish'
  import voteDish from './components/voteDish'
import orderResult from './components/orderResult'
  export default {
    name: 'app',
    data(){
      return {
        usernameOrder:"",
        isLogin:false,
        isChoose:false,
        isAllChoose:false,
        isVote:false,
        isAllVote:false,
        userInfo:[],
        dishInfo:[],
        voteDishInfo:[],
        voteDishResultInfo:[1,2]
      }
    },
    components: {
      login,
      orderDish,
      voteDish,
      orderResult
    },
    created(){
      let _this = this;
      fetch('http://192.168.1.140:3333/api/userinfo').then(response=>response.json()).then(data=>{
        _this.userInfo = data.data;
      }).catch(function(e) {
        console.log(e);
      });//请求用户信息

      fetch('http://192.168.1.140:3333/api/dishinfo').then(response=>response.json()).then(data=>{
        _this.dishInfo = data.data;
      }).catch(function(e) {
      });//请求菜单信息

      fetch('http://192.168.1.140:3333/api/votedish').then(response=>response.json()).then(data=>{
        _this.voteDishInfo = data.data;
      }).catch(function(e) {
      });//请求投票菜单信息


      fetch('http://192.168.1.140:3333/api/votedishresult').then(response=>response.json()).then(data=>{
           

        _this.voteDishResultInfo = data.data;
      }).catch();//请求投票结果

    },
    methods:{
      loginM(name){
        this.usernameOrder = name;
        this.isLogin = true;
        let _this = this;
        this.userInfo.forEach(function(item){//登录之后 判断之前是否有过选择菜单 投票
          if(item.username === name && item.isChoose ){
            _this.isChoose = true;
            _this.isAllChooseM();
            console.log(item.username === name && item.isVote)
          }
          if(item.username === name && item.isVote){
           _this.isVote = true;
           _this.isAllVoteM();
          
         }
       })
      },//登录
      chooseM(name,chooseInfo){
        let chooseBody={
          data:chooseInfo,
          username:name
        }

        fetch('http://192.168.1.140:3333/api/choosedishinfo',
          {method:'post',
          headers: {'Content-Type':'application/json'},
          cache:false,
          body:JSON.stringify(chooseBody)
        }).then(response=>response.json()).then(data=>{
         this.isChoose = true;
         this.isAllChooseM()

        }).catch(function(e) {alert('err')});//将选择的菜肴保存



      },//选择菜肴
      voteM(name,voteInfo){
        let voteBody={
          data:voteInfo,
          username:name
        }
        console.log(voteBody)
        fetch('http://192.168.1.140:3333/api/votodishinfo',
          {method:'post',
          headers: {'Content-Type':'application/json'},
          cache:false,
          body:JSON.stringify(voteBody)
        }).then(response=>response.json()).then(data=>{
         this.isVote = true;
         this.isAllVote();

        }).catch(e=>{console.log(e)});//将投票的菜肴保存
      },//评选菜肴
      isAllChooseM(){
        fetch('http://192.168.1.140:3333/api/isallchoosedish').then(response=>response.json()).then(data=>{
         if(!data.status){
          this.isAllChoose = true
        }else{
          console.log(data.message)
          alert(data.message)
        }
      }).catch(function(e) {
        console.log('http://192.168.1.140:3333/api/isallchoosedish');
      });//请求菜单信息
      },//获取是否用户全部选择了菜肴
      isAllVoteM(){
        let _this = this;
        fetch('http://192.168.1.140:3333/api/isallvotedish').then(response=>response.json()).then(data=>{
         if(!data.status){
          this.isAllVote = true;
          
        }else{
          console.log(data.message)
          alert(data.message)
        }
      }).catch(function(e) {
        console.log(e);
      });
      },//获取是否用户全部投票
    }
  }
</script>

<style></style>