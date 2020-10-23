<template>
  <div class="top-nav">
    <div class="w">
    <div class="logo"><h1>惠师惠学</h1></div>
      <router-link to="/home">首页</router-link>
      <!--       已登陆状态才会显示退出登陆和注销两个选项-->
    <Dropdown v-if="isLogin"  class="profile">
        <a href="javascript:void(0)">
          <img :src="$store.getters.avatar" alt="头像">
          <span> {{$store.getters.userName}}</span>
        </a>
        <DropdownMenu slot="list">
            <DropdownItem>
              <router-link to="/Profile" title="个人信息">
              个人信息
              </router-link></DropdownItem>
            <DropdownItem> <a @click="logout()">退出登陆</a></DropdownItem>
        </DropdownMenu>
    </Dropdown>
<!--      未登陆就显示 未登陆和注册选项-->
      <span v-else class="profile">
          <Button type="primary"
          size='small'
           to="/Login">登陆</Button>
          <!-- <router-link  to="/register" >注册</router-link> -->
      </span>
      <div class="drop">
        <dropdown-show></dropdown-show>
      </div>
      <auto-search class="search"></auto-search>
<!--      判断是否是登陆状态，已登陆则显示头像和名称，点击名称即可进入个人信息界面-->
      <!-- <span v-if="isLogin" class="profile">
        <img src="@/assets/img/pic.jpg" alt="个人头像">
        <router-link to="/Profile" title="个人信息">{{$store.state.userInfo.userName}}</router-link> -->


    </div>

  </div>
<!--        <router-link :to="'/profile/'+user.name"  class="profile">个人信息</router-link>-->
</template>


<script>
  import {Input,DropdownMenu,DropdownItem,Dropdown} from 'view-design'
  import DropdownShow from "./DropdownShow";
  import {request} from "../../../network/request"
  import {logout,getUserInfo} from "@/api/user"
  import AutoSearch from "./AutoSearch";


  export default {
    name: "TopNav",
    data() {
      return {
        user: {
          name: 'lxj'
        },

      }
    },
    components: {
      Input, DropdownShow,AutoSearch,DropdownMenu,DropdownItem,Dropdown

    },
    created(){
         this.$store.dispatch('user/getUserImg')     
          console.log(this.$store.getters)      
    },
    computed: {
      isLogin() {
       
        return Boolean(this.$store.getters.token)
      }
    },
    methods: {
      // outLogin() {
      //   logout().then(res=>{
      //     localStorage.removeItem('Token')
      //   this.$Message.success('账号已退出登陆！');
      //   this.$router.go(0);
      //   }).catch(err=>{
      //   this.$Message.error(err.message);
      //   })
      // },
      logout() {
        let comfile = confirm('退出登陆后将影响使用，请再次确认是否退出？')
        if(comfile){
         this.$store.dispatch('user/logout')
         .then(res => {
            console.log(res.data); 
            if(res.data.code=200)  
              this.$Message.success('注销成功');
              // localStorage.removeItem('Token')
              this.$router.replace('/home')
          })
        }

      }
    }
  }
</script>

<style scoped>
  .top-nav {
    position: relative;
    top: 0;
    height: 60px;
    line-height: 60px;
    /*border-bottom: 1px solid rgba(0,0,0,0.1);*/
    box-shadow: 0px 1px 5px 1px rgba(0,0,0,.1);
    color: #666666 ;
    background-color: #fff;
  }

  .logo{
    float: left;
    height: 60px;
    margin-right:20px;
  }
  .logo h1{
    margin: 0;
  }
    .drop{
    margin-right: 200px;
    float: right;
    z-index: 9;
  }
   .search{
    float: right;
    margin-top: 13px;
  
    display: inline-block;
  }
  .profile{
    float: right;
  }
  .profile img{
    width: 32px;
    border-radius: 16px;
    vertical-align: middle;
    cursor: pointer;
  }
  .profile a{
    padding:0 10px;
    font-size: 12px;
  }




</style>
