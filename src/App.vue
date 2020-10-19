<template>
<div>
  <top-nav></top-nav>
  <div class="main">
    <router-view></router-view>
  </div>

</div>

</template>

<script>

import TopNav from "./components/common/header/TopNav";
import 'view-design/dist/styles/iview.css';

export default {
  name: 'App',
  components: {
    TopNav
  },
    created() {
    
    // 在页面加载时读取sessionStorage
    if (sessionStorage.getItem('store')) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))))
    }
    // 在页面刷新时将store保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(this.$store.state))
    })
  },

  data: () => ({
    //
  })
};
</script>
<style scoped>
  @import "./assets/css/base.css";

  a{
    color: #666;
  }
  /*.v-application ul, .v-application ol {*/
  /*  padding-left: 0px!important;*/
  /*}*/
</style>
