<template>
  <div class="top-nav">
    <div class="w">
    <div class="logo"><h1>惠师惠学</h1></div>
      <router-link to="/home">首页</router-link>
<!--      <div class="search">-->
<!--        <Input search placeholder="搜索知识点" />-->
<!--&lt;!&ndash;        <Input search enter-button placeholder="Enter something..." />&ndash;&gt;-->
<!--&lt;!&ndash;        <Input search enter-button="Search" placeholder="Enter something..." />&ndash;&gt;-->
<!--      </div>-->
      <auto-search class="search"></auto-search>
      <span v-if="isLogin" class="profile">
        <img src="@/assets/img/pic.jpg" alt="个人头像">
        <router-link to="/Profile" title="个人信息">{{$store.state.userInfo.userName}}</router-link>
<!--        <Dropdown>-->
<!--        <a href="">{{$store.state.userInfo.username}}-->
<!--            <Icon type="arrow-down-b"></Icon>-->
<!--        </a>-->
<!--        <Dropdown-menu slot="list">-->
<!--            <Dropdown-item>个人信息</Dropdown-item>-->
<!--            <Dropdown-item>退出登陆</Dropdown-item>-->
<!--        </Dropdown-menu>-->
<!--        </Dropdown>-->
        <a href="" @click="outLogin">退出登陆</a>
        <a href="" @click.prevent="logout">注销</a>
      </span>
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
  import {Input} from 'view-design'
  import DropdownShow from "./DropdownShow";
  import {request} from "../../../network/request"
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
      Input, DropdownShow,AutoSearch

    },
    computed: {
      isLogin() {
        return Boolean(this.$store.state.Token)
      }
    },
    methods: {
      outLogin() {
        localStorage.removeItem('Token')
        this.$Message.success('账号已退出登陆！');
        this.$router.go(0);
      },
      logout() {
        let comfile = confirm('注销后该账号将不能使用，请再次确认是否注销？')
        if(comfile){
          request({
            method: 'get',
            url: '/charityedu/logout',
          }).then(res => {
            console.log(res.data.code);
            if(res.data.code==200){
              this.$Message.success('注销成功');
              localStorage.removeItem('Token')
              this.$router.replace('/home')
            }

           else this.$Message.error('注销失败')
          }).catch(err=>{
            console.log(err);
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
