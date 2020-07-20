<template>
  <div class="profileBox ">
    <div class="profile-left ">
      <profile-menu></profile-menu>
    </div>
    <div class="profile-right ">
     <router-view class="show"></router-view>
    </div>

  </div>

</template>

<script>
import ProfileShow from "./ProfileShow/ProfileShow";
  import ProfileMenu from "./ProfileMenu";
  export default {
      name: "Profile",
    components:{
      ProfileMenu,
      ProfileShow,
    }
  }
</script>

<style scoped>
  .profileBox{
    position: relative;
    margin:50px auto;
    padding: 0;
    border-bottom: none;
    /*box-shadow:0px 0px 2px 1px rgba(0,0,0,.1);*/
    width: 1020px;
  }
.profile-left{
  float: left;
  width: 15%;
  height: 500px;
  display: inline-block;
  margin-right: 5px;
  /*display: inline-block;*/
  box-shadow:0px 0px 2px 1px rgba(0,0,0,.1);
}
  .profile-right{
    float: left;
    display: inline-block;
    position: absolute;
    padding: 10px;
    box-shadow:0px 0px 2px 1px rgba(0,0,0,.1);
    width: 85%;
    margin-bottom: 100px;
  }
  /*.show{*/
  /*width: 100%;*/
  /*  height: 100%;*/
  /*}*/

</style>
