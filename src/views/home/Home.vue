<template>
<div>
  <div class="menu w">
    <div class="menuLeft">
      <nav-bar :list="subjectlist"></nav-bar>
    </div>
    <div class="menuRight">
      <carousel></carousel>
    </div>
  </div>
  <div>
    <Recommend></Recommend>
  </div>

<!--  <div>{{window.localStorage.getItem(Use)}}</div>-->
</div>

</template>

<script>
  import NavBar from "./nav/NavBar";
  import Carousel from "../../components/common/Carousel";
  import Login from "../login/Login";
  import Recommend from "./Recommend";
  export default {
    name: "Home",
    components:{
      NavBar,
      Login,
      Carousel,
      Recommend
    },
    data(){
      return{
        theme2: 'light',
        subjectlist:[
          {title: "上册", list:["数学","英语","语文"]},
          {title: "下册", list:["数学","英语","语文"]},
        ],

        loopimg:[
          {img:"http://loaclhost:8080/charityedu/source/1.jpg",src:"112",type:"video"},
          {img:"http://loaclhost:8080/charityedu/source/2.jpg",src:"113",type:"article"}
        ],
        videolist:[
          {applaudnum:"100",username:"阿晨",src:"113",
            userimg:"http://loaclhost:8080/charityedu/source/1.jpg",
            videoimg:"http://loaclhost:8080/charityedu/source/1.jpg",title:"二次函数"},
          {applaudnum:"100",username:"阿晨",src:"113",
            userimg:"http://loaclhost:8080/charityedu/source/1.jpg",
            videoimg:"http://loaclhost:8080/charityedu/source/1.jpg",title:"二次函数"}
        ]
        }
      },
    created() {

    },
    mounted() {

    }
  }
</script>

<style scoped>
  .menu{
    height: 400px;
  }
  .menuLeft{
    margin-top: 10px;
    float: left;

  }
  .menuRight{
    float: left;
    width: 700px;
    height: 350px;
    margin-left: 10px;
  }

</style>
