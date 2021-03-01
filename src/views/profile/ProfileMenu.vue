<template>
  <div class="box">
    <div class="menu-bar">
      <span class="menu-title">个人中心</span>
      <ul>
        <li
          v-for="(item,index) in menu"
          :key="index"
          :class="{on: activeMenu === `/profile/${item.path}`}"
          @click="selectMenu(item)"
        >
          <Icon class=" icon" :type="item.iconType" />
          <span>{{ item.text }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ProfileMenu',
  data() {
    return {
      menu: [
        {
          icon: '',
          iconType: 'ios-contact-outline',
          text: '个人资料',
          path: 'personalInfo'
        },
        {
          icon: '',
          iconType: 'ios-image-outline',
          text: '我的头像',
          path: 'avatar'
        },
        {
          icon: '',
          iconType: 'ios-bookmarks-outline',
          text: '我的收藏',
          path: 'myCollections'
        },
        {
          icon: '',
          text: '我的成就',
          iconType: 'ios-ribbon-outline',
          // "ios-trophy-outline"
          path: 'achievements'
        },
        {
          icon: '',
          iconType: 'ios-lock-outline',
          text: '修改密码',
          path: 'modify-password'
        },
        {
          icon: '',
          iconType: 'ios-book-outline',
          text: '我的课堂',
          path: 'myClass'
        },
        {
          icon: '',
          iconType: 'ios-cloud-upload-outline',
          text: '作品上传',
          path: 'workUpload'
        },
        {
          icon: '',
          iconType: 'ios-create-outline',
          text: '作品审核',

          path: 'workCheck'
        },
        {
          icon: '',
          icontype: 'ios-images-outline',
          text: '轮播图管理',
          path: 'loopManage'
        }
      ]
    }
  },
  computed: {
    // 返回当前路径，使当前选中的菜单高亮
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    }
  },
  methods: {
    selectMenu(item) {
      this.$router.push(`/profile/${item.path}`)
    }
  }
}
</script>

<style scoped>
  .menu-title{
    display: block;
    width: 100%;
    height: 50px;
    text-align: center;
    line-height: 50px;
    font-size: 14px;
    color: #99a2aa;
    cursor: default;
    border-bottom: 1px solid #e1e2e5;
  }
  .menu-bar ul {
    list-style-type: none;
    /*border:1px solid rgba(0,0,0,.01);*/
    margin-left: 0px;
    margin-top: 0px;
    padding: 0;
    height: 100%;
  }

  .menu-bar ul li {
    width:100%;
    height: 48px;
    line-height: 48px;
  }
  .menu-bar ul li a{
    width:100%;
    height: 100%;
  }
  .menu-bar ul li .icon {
    display:inline-block;
    vertical-align: middle;
    color: rgb(195, 195, 195);
    line-height: 48px;
    font-size: 20px;
    font-weight: 600;
    margin:0 15px 0 25px;
  }
  .menu-bar ul li span{
    font-size: 14px;
        color: #222;
  }
  .menu-bar ul li:hover{
    cursor: pointer;
    background-color:#e1e4ea
  }
  .menu-bar ul .on:hover{
     background-color: rgb(0, 161, 215);
  }
  .menu-bar ul  .on{
    background-color: rgb(0, 161, 215);
    color: white ;
  }
  .menu-bar ul  .on .icon{
    color: white ;
  }
  .menu-bar ul  .on span{
    color: white ;
  }
</style>
