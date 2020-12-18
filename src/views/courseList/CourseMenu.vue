<template>
  <div class="box">
    <el-menu default-active="home" 
						 class="el-menu-vertical-demo"
						 style="min-height: 100%; width: 100%"
						 background-color="#fff" 
						 text-color="#555"
             
						 active-text-color="#fff"
              router>
		<el-menu-item  index="home">
				<i class="el-icon-menu"></i>
				<span>一元二次方程</span></el-menu-item>
      
			<menu-tree :data="menuList"></menu-tree>
		</el-menu>
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
  import MenuTree from './MenuTree'

  export default {
    name: "CourseMenu",
    components: {
        MenuTree
    },
    props:["list"],
    data() {
      return {
        menuList:[
          {
          menuId:1,
          menuName:"一元二次方程",
          sonMenuList:[{
            menuId:3,
           menuName:"概述",
           sonMenuList:[]
          },{
            menuId:4,
           menuName:"习题",
           sonMenuList:[]
          }]
        },
        {
          menuId:2,
          menuName:"一元二次方程",
          sonMenuList:[{
          menuId:5,
          menuName:"概述",
          sonMenuList:[]
          },{
          menuId:6,
          menuName:"习题",
          sonMenuList:[]
          }]
        }
        ],
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
      itemClick(item){
        console.log(item);
        this.$emit('setIndex',item)
      }
    }

  }
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    /* width: 200px; */
    min-height: 400px;
	}
	.el-menu-vertical-demo{
	  transition:	width  .05s;
	}
  .el-menu-item.is-active{
    background-color: #409EFF !important;
  }
  /*导航菜单宽度*/
  .navbar{
    /* width: 140px; */
    /* text-align: center; */
    /* padding-left:0px; */
    /* font-size: 12px; */
  }
  /*子菜单宽度*/
  .submenu{
    /* width:180px ; */
    /* padding: 0px !important ; */
  }
  .menu-item{
    /* font-size: 12px; */
    /* padding: 10px 0!important ; */
  }

</style>

