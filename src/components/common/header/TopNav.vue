<template>
  <div class="top-nav">
    <div class="w">
      <div class="logo"><h1>惠师惠学</h1></div>
      <router-link to="/home">首页</router-link>
      <!--       已登陆状态才会显示退出登陆和注销两个选项-->
      <Dropdown v-if="isLogin" class="profile">
        <a>
          <img :src="avatar" alt="头像">
          <span> {{ name }}</span>
        </a>
        <DropdownMenu slot="list">
          <DropdownItem>
            <router-link to="/Profile" title="个人信息">
              个人信息
            </router-link></DropdownItem>
          <DropdownItem> <a @click="logout()">退出登陆</a></DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <!--      未登陆就显示 登陆按钮-->
      <span v-if="!isLogin" class="profile">
        <Button type="primary" size="small" to="/login">登陆</Button>
      </span>
      <div class="drop">
        <dropdown-show />
      </div>
      <auto-search class="search" />
      <!--      判断是否是登陆状态，已登陆则显示头像和名称，点击名称即可进入个人信息界面-->
      <!-- <span v-if="isLogin" class="profile">
        <img src="@/assets/img/pic.jpg" alt="个人头像">
        <router-link to="/Profile" title="个人信息">{{$store.state.userInfo.userName}}</router-link> -->
    </div>

  </div>
<!--        <router-link :to="'/profile/'+user.name"  class="profile">个人信息</router-link>-->
</template>

<script>
import { mapGetters } from 'vuex'
import DropdownShow from './DropdownShow'
import AutoSearch from './AutoSearch'

export default {
  name: 'TopNav',
  components: {
    AutoSearch, DropdownShow
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'token'
    ]),
    isLogin() {
      return Boolean(this.$store.getters.token)
    }
  },
  methods: {
    logout() {
      const comfile = confirm('退出登陆后将影响使用，请再次确认是否退出？')
      if (comfile) {
        this.$store.dispatch('user/logout')
          .then(res => {
            this.$Message.success(res.data.message)
            console.log('退出登陆')
            localStorage.removeItem('Token')
            // this.$router.replace('/home')
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
