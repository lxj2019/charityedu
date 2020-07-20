<template>
<div>
  <router-view></router-view>
</div>
</template>

<script>
  import PersonalInfo from "./PersonalInfo";
  export default {
    name: "ProfileShow",
    components:{
      PersonalInfo,
    }
  }
</script>

<style scoped>



</style>
