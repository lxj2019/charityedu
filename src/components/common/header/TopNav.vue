<template>
  <div class="top-nav">
    <div class="w">
    <div class="logo"><h1>惠师惠学</h1></div>
      <router-link to="/home">首页</router-link>

      <auto-search class="search"></auto-search>
<!--      判断是否是登陆状态，已登陆则显示头像和名称，点击名称即可进入个人信息界面-->
      <!-- <span v-if="isLogin" class="profile">
        <img src="@/assets/img/pic.jpg" alt="个人头像">
        <router-link to="/Profile" title="个人信息">{{$store.state.userInfo.userName}}</router-link> -->
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
             <DropdownItem> <a @click="logout()">注销</a></DropdownItem>
        </DropdownMenu>
    </Dropdown>
<!--      未登陆就显示 未登陆和注册选项-->
      <span v-else class="profile">
          <router-link  to="/Login">您还未登陆，请先登陆</router-link>
          <router-link  to="/register" >注册</router-link>
      </span>
      <div class="drop">
        <dropdown-show></dropdown-show>
      </div>
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
        let comfile = confirm('注销后该账号后将影响使用，请再次确认是否注销？')
        if(comfile){
         this.$store.dispatch('user/logout')
         .then(res => {
            // console.log(res.data);
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
  .top-nav a{
    color: #666666;
  }
  .top-nav a:hover{
    color: blue;
  }
  .logo{
    float: left;
    height: 60px;
    margin-right:20px;
  }
  .logo h1{
    margin: 0;
  }
   .search{
    position: absolute;
    display: inline-block;
    left: 50%;
     top:50%;
     margin-top: -15px;
  }
  .profile{
    position: absolute;

    top: 0;
    left:68%
  }
  .profile img{
    width: 32px;
    border-radius: 16px;
    vertical-align: middle;
    cursor: pointer;
  }
  .profile a{
    padding: 0px 10px;
    font-size: 12px;
  }
  dropdown-show{
  float: left;
  }
  .drop{

    float: right;
    z-index: 9;
  }



</style>
