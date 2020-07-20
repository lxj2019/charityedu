<template>
  <div class="box">
    <Menu :theme="theme2" class="navbar"  accordion style="width: 160px;">
      <Submenu class="submenu" v-for="sort in list" :name="sort.title" >
        <template slot="title">
          <Icon type="ios-paper" />
          {{sort.title}}
        </template>
        <MenuItem class="menu-item" :name="item" v-for="item in sort.list" @click.native="push(item)">{{item}}</MenuItem>
      </Submenu>
    </Menu>
    <br>
<!--    <p>Change theme</p>-->
<!--   <div>-->
<!--     <RadioGroup v-model="theme2">-->
<!--       <Radio label="light"></Radio>-->
<!--       <Radio label="dark"></Radio>-->
<!--     </RadioGroup>-->
<!--   </div>-->

  </div>
</template>
<script>
  import { Menu,MenuItem,Submenu,Icon,} from 'view-design'

  export default {
    name: "NavBar",
    components: {
      Menu, MenuItem, Submenu,Icon
    },
    props:["list"],
    data() {
      return {
        theme2: 'light',
        subjectlist:["一年级上册数学","一年级下册数学","一年级上册语文"],
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
    methods:{
      push(item){
        this.$router.push('/courseList/'+item)
      }
    }

  }
</script>

<style scoped>
  /*导航菜单宽度*/
  .navbar{
    width: 140px;
    padding-left: 0px!important;

  }
  /*子菜单宽度*/
  .submenu{

  }
  .menu-item{
    padding-left: 0;
  }

</style>

