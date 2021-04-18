<template>
  <div class="top-nav">
    <div class="w navbar">
      <h1 class="logo">惠师惠学</h1>
      <router-link to="/home">首页</router-link>
      <!--       已登陆状态才会显示退出登陆和注销两个选项-->
      <div class="profile">
        <Dropdown v-if="token">
          <!-- <img :src="avatar" alt="头像"> -->
          <Avatar :src="avatar" />
          <span> {{ name }}</span>
          <DropdownMenu slot="list" @on-click="$router.push('/Profile')">
            <DropdownItem @click.native="$router.push('/Profile')">个人信息</DropdownItem>
            <DropdownItem @click.native="$router.push('/manage')">管理员入口</DropdownItem>
            <DropdownItem @click.native="$router.push('/teacher')">教师入口</DropdownItem>
            <DropdownItem @click.native="logout()"> 退出登陆</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <!--      未登陆就显示 登陆按钮-->
        <span v-else>
          <Button type="primary" size="small" to="/login">登陆</Button>
        </span>
      </div>

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
    ])
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

<style lang="scss" scoped>
  .top-nav {
    display: absolute;
    width: 100%;
    height: 60px;
    line-height: 60px;
    z-index: 1000;
    /*border-bottom: 1px solid rgba(0,0,0,0.1);*/
    box-shadow: 0px 1px 5px 1px rgba(0,0,0,.1);
    color: #666666 ;
    background-color: #fff;
  }
  .navbar {
    width: 100%;
    height: 100%;
    position: relative;
    .logo {
      width:100px;
      display: inline-block;
      margin-right: 20px;
      text-shadow: 5px 5px 5px skyblue;
      font-size: 24px;
      font-style: oblique;
      font-weight: normal;
      cursor: pointer;
      &:hover {
        transform: rotateY(360deg);
        -webkit-transform:rotateY(360deg); /* Safari and Chrome */
        transition:  2s linear;
      }
    }
    .profile {
      position: absolute;
      display: inline-block;
      right: 10px;
      width: 100px;
    }
    .drop {
      display: inline-block;
    }
    .search{
      display: inline-block;
    }
  }

</style>
