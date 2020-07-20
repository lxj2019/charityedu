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
import 'view-design/dist/styles/iview.css'

export default {
  name: 'App',
  components: {
    TopNav
  },

  data: () => ({
    //
  }),
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
