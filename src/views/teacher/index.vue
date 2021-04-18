<template>
  <div class="teacher-container">
    <Row :gutter="16">
      <Menu class="menu-container" mode="horizontal" theme="light" :active-name="activeMenu">
        <MenuItem name="/teacher/works-manager" to="/teacher/works-manager">
          <Icon type="ios-paper" />
          作品管理
        </MenuItem>
        <MenuItem name="/teacher/upload" to="/teacher/upload">
          <Icon type="ios-people" />
          作品投稿
        </MenuItem>
        <MenuItem name="4">
          <Icon type="ios-construct" />
          综合设置
        </MenuItem>
      </Menu>
    </Row>
    <Row>
      <!-- <div class="main-container"> -->
      <el-scrollbar wrap-class="scrollbar-wrapper">
        <transition name="fade-transform" mode="out-in">
          <router-view />
        </transition>
      </el-scrollbar>
    </Row>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  computed: {
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    }
  }
}
</script>
<style lang="scss" scoped>
.teacher-container {
  position: relative;
  width: 1100px;
  margin: 20px auto 0;
  padding: 10px 72px;
  min-height: 100%;
  background-color: #fff;
}
.menu-container {
  display: block;
  margin-bottom: 10px;
}
.main-container {
  width: 100%;
  height: 100%;
}
</style>
