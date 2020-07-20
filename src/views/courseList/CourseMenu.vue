<template>
  <div class="box">
    <Menu :theme="theme2" class="navbar"  accordion style="width: 180px">
      <Submenu class="submenu" v-for="(sort,xIndex) in list" :name="xIndex" >
        <template slot="title">
          <Icon type="ios-paper" />
          {{sort.listname}}
        </template>
        <MenuItem class="menu-item"
                  :name="xIndex-yIndex"
                  v-for="(item,yIndex) in sort.list"
                  @click.native="itemClick([xIndex,yIndex])">
          {{item.listname}}</MenuItem>
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
  import { Menu,MenuItem,Radio,RadioGroup,Submenu,Icon,Row,MenuGroup} from 'view-design'

  export default {
    name: "CourseMenu",
    components: {
      Menu,
      MenuItem,
      Radio,
      RadioGroup,
      Submenu,
      MenuGroup,
      Row,
      Icon
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
      itemClick(item){
        console.log(item);
        this.$emit('setIndex',item)
      }
    }

  }
</script>

<style scoped>
  /*导航菜单宽度*/
  .navbar{
    width: 140px;
    text-align: center;
    padding-left:0px;
    font-size: 12px;
  }
  /*子菜单宽度*/
  .submenu{
    width:180px ;
    padding: 0px !important ;
  }
  .menu-item{
    font-size: 12px;
    padding: 10px 0!important ;
  }

</style>

