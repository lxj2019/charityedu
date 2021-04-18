<template>
  <div class="main">
    <top-nav class="header" />
    <div class="main">
      <router-view />
    </div>

  </div>

</template>

<script>

import TopNav from './components/common/header/TopNav'
import 'view-design/dist/styles/iview.css'

export default {
  name: 'App',
  components: {
    TopNav
  },

  data: () => ({
    //
  })
}
</script>
<style scoped>
 .header {
   position: sticky;
 }
 .main {
   height: 100%;
 }

</style>
