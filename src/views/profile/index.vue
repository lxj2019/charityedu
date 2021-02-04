<template>
  <div class="profileBox">
    <div class="profile-left ">
      <profile-menu />
    </div>
    <div class="profile-right ">
      <keep-alive>
        <router-view class="show" />
      </keep-alive>
    </div>

  </div>

</template>

<script>
import ProfileMenu from './ProfileMenu'
// import ProfileShow from "./ProfileShow/ProfileShow";
export default {
  name: 'Profile',
  components: {
    ProfileMenu
  }
}
</script>

<style scoped>
  .profileBox{
    overflow: hidden;
    width: 1020px;
    height: 100%;
    border: 1px solid #e1e2e5;
    box-shadow: 0 2px 4px rgba(0,0,0,.14);
    margin:50px auto;
    background: #fafafa;
    border-radius: 4px;
  }
.profile-left{
  float: left;
  width: 150px;
  width: 15%;
  height: 100%;
  /* display: inline-block; */
  /* margin-right: 5px; */
  /*display: inline-block;*/
  /* box-shadow:0px 0px 2px 1px rgba(0,0,0,.1); */
}
  .profile-right{
    float: left;
    /* padding: 10px; */
    /* width: 829px; */
    border-left: 1px solid #ddd;
    width: 85%;
    background-color: #fff;

  }
  /*.show{*/
  /*width: 100%;*/
  /*  height: 100%;*/
  /*}*/

</style>
