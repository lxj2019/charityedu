<template>
  <section class="app-main">
    <el-scrollbar wrap-class="scrollbar-wrapper" style="height:100%">
      <transition name="fade-transform" mode="out-in">
        <router-view :key="key" />
      </transition>
    </el-scrollbar>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  background-color: #fff;
  border-left: 1px solid #efe3e5;
  height: calc(100vh - 100px);
  width: 100%;
  position: relative;
  overflow: hidden;
}
.fixed-header+.app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
.scrollbar-wrapper {
  overflow-x: hidden;
}
</style>
