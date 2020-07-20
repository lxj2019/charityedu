<template>
<div class="box">
  <div class="menu-bar">
    <ul>
      <li v-for="(item,index) in menu" >
        <router-link :to='"/profile/"+item.path' active-class="active">{{item.icon}}
        {{item.text}}</router-link>
      </li>
    </ul>
  </div>
</div>
  </template>
  <script>

    export default {
      name: "ProfileMenu",
      data () {
        return {
          menu:[
            {
              icon:'',
              text:'个人资料',
              path:'personalInfo'
            },
            {
              icon:'',
              text:'我的收藏',
              path:'collections'
            },
            {
              icon:'',
              text:'我的成就',
              path:'achievements'
            },
            {
              icon:'',
              text:'修改密码',
              path:'modifyPwd'
            },
            {
              icon:'',
              text:'我的课堂',
              path:'myClass'
            },
            {
              icon:'',
              text: '上传视频',
              path:'uploadWorks'
            },
            {
              icon:'',
              text: '作品审核',
              path:'checkWorks'
            }
          ]
        }
      }
    }
  </script>


<style scoped>

  .menu-bar ul {
    list-style-type: none;
    /*border:1px solid rgba(0,0,0,.01);*/
    margin-left: 0px;
    margin-top: 0px;
    padding: 0;
    height: 100%;

  }
  .menu-bar ul li {
    font-family: 'icomoon';
    margin: 0px;
  }

  .menu-bar ul li a {
    display: block;
    color: #222222;
    line-height: 44px;
    font-size: 12px;
    text-align: center;
    padding:0 20px;
  }
  .menu-bar ul li a:hover{
    background-color: rgba(0,0,255,.05);
  }

  .active{
    background-color: rgb(0, 161, 215);
    color: white !important;
  }

</style>
