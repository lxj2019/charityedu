<template>
    <div class="course-box w">
      <div class="course-menu">
        <div class="menu-title">
         <i class="el-icon-reading"></i>
         <span style="margin-left:10px">课程列表</span> 
        </div>
        <course-menu
           @setIndex="getIndex">
        </course-menu>
      </div>
      <div class="course-list">
<!--        应用封装好的”筛选菜单“组件-->
        <filter-menu class="course-filter">
          <span slot="first">全部</span>
          <span slot="second" @click="sort('applaudnum')">最多点赞</span>
          <span slot="third" @click="sort('worksClickNum')">最多播放</span>
          <span slot="forth" @click="sort('publishtime')">最近发布</span>
          <Input class="work-search" search placeholder="查找作品名称"
          @on-search="searchWorkList" 
          v-model="searchInfo" />
        </filter-menu>
        <div>
        <div class="course-wrapper" v-if="workList.length!=0">
          <public-works
          :workWidth="'200px'"
          :workHeight="'230px'"
          @click.native="enter(item)"
          class="course-list-works" 
          :works="item" 
          v-for="(item,index) in workList"
          :key="index"></public-works>  
        </div>
          <div v-if="workList.length==0"
          class="no-works">
            <p>暂无作品！</p>
          </div>
          <Page :total="workTotals"
          style="float:right"
          @on-change="changePagenum"
          show-elevator />
      </div>
      </div>
    </div>

</template>

<script>
// import ProfileShow from "../profile/ProfileShow/ProfileShow";
import {adminWorkList,searchAdminWorkList} from '@/api/getData'
import FilterMenu from "./FilterMenu";
import CourseMenu from "./CourseMenu";
import PublicWorks from "../../components/common/works/PublicWorks";
  export default {
    name: "CourseList",
    components:{
      CourseMenu,FilterMenu,PublicWorks
    },
    data(){
      return{
        xIndex:0,
        yIndex:0,
        pagenum :1,
        searchInfo:'',
        workTotals:10,
        bookname:"三年级上册",
        knowledgeid: 1,
        workList:[],
        worksList:[
            {
               listname:"二元一次方程",
               knowledgeid: 2,
               order:1,
              list:[
            {listname:"概念",
              list:[
                {
                  worksId:101,
                  worksTitle: '一元二次方程',
                  teachername: '汪涵',
                  worksImg:"https://edu-image.nosdn.127.net/F355766D26A19A259FD020126628FD36.png",
                  src:"112",
                  type:"video",
                  publishtime:"2020.2.30 11:35",
                  applaudnum:100,
                  worksClickNum:150,
                  commentnum:20
                },{
                  worksId:102,
                  worksTitle: '勾股定理',
                  teachername: '汪涵',
                  worksImg:"https://edu-image.nosdn.127.net/F355766D26A19A259FD020126628FD36.png",
                  src:"112",
                  type:"video",
                  publishtime:"2020.1.20 11:35",
                  applaudnum:1050,
                  worksClickNum:140,
                  commentnum:80
                },{
                  worksId:101,
                  worksTitle: '高数',
                  teachername: '汪涵',
                  worksImg:"https://edu-image.nosdn.127.net/F355766D26A19A259FD020126628FD36.png",
                  src:"112",
                  type:"video",
                  publishtime:"2420.1.30 11:35",
                  applaudnum:1007,
                  worksClickNum:1540,
                  commentnum:24
                },{
                  worksId:101,
                  worksTitle: '高数fdfdfdfdfdfdfdfd发动机发的链接发链接',
                  teachername: '汪涵',
                  worksImg:"https://edu-image.nosdn.127.net/F355766D26A19A259FD020126628FD36.png",
                  src:"112",
                  type:"video",
                  publishtime:"2020.1.30 1:35",
                  applaudnum:1040,
                  worksClickNum:140,
                  commentnum:20
                },{
                  worksId:101,
                  worksTitle: '高数',
                  teachername: '汪涵',
                  worksImg:"https://edu-image.nosdn.127.net/F355766D26A19A259FD020126628FD36.png",
                  src:"112",
                  type:"video",
                  publishtime:"2020.7.30 11:35",
                  applaudnum:1070,
                  worksClickNum:1540,
                  commentnum:200
                },{
                  worksId:101,
                  worksTitle: '高数',
                  teachername: '汪涵',
                  worksImg:"https://edu-image.nosdn.127.net/F355766D26A19A259FD020126628FD36.png",
                  src:"112",
                  type:"video",
                  publishtime:"2030.1.30 11:35",
                  applaudnum:1000,
                  worksClickNum:1530,
                  commentnum:20
                },{
                  worksId:101,
                  worksTitle: '高数',
                  teachername: '汪涵',
                  worksImg:"https://edu-image.nosdn.127.net/F355766D26A19A259FD020126628FD36.png",
                  src:"112",
                  type:"video",
                  publishtime:"2020.1.30 11:37",
                  applaudnum:100,
                  worksClickNum:150,
                  commentnum:20
                },{
                  worksId:101,
                  worksTitle: '计算机组成原理',
                  teachername: '汪涵',
                  worksImg:"https://edu-image.nosdn.127.net/F355766D26A19A259FD020126628FD36.png",
                  src:"112",
                  type:"video",
                  publishtime:"2060.1.30 11:35",
                  applaudnum:1085,
                  worksClickNum:158,
                  commentnum:20
                }
              ],
              knowledgeid: 4,order:1},
            {listname:"习题解析",
              list:[
                {
                  worksId:101,
                  worksTitle: '一元二次方程',
                  teachername: '汪涵',
                  worksImg:"https://edu-image.nosdn.127.net/F355766D26A19A259FD020126628FD36.png",
                  src:"112",
                  type:"video",
                  publishtime:"2020.2.30 11:35",
                  applaudnum:100,
                  worksClickNum:150,
                  commentnum:20
                },{
                  worksId:102,
                  worksTitle: '勾股定理',
                  teachername: '汪涵',
                  worksImg:"https://edu-image.nosdn.127.net/F355766D26A19A259FD020126628FD36.png",
                  src:"112",
                  type:"video",
                  publishtime:"2020.1.20 11:35",
                  applaudnum:1050,
                  worksClickNum:140,
                  commentnum:80
                },{
                  worksId:101,
                  worksTitle: '高数',
                  teachername: '汪涵',
                  worksImg:"https://edu-image.nosdn.127.net/F355766D26A19A259FD020126628FD36.png",
                  src:"112",
                  type:"video",
                  publishtime:"2420.1.30 11:35",
                  applaudnum:1007,
                  worksClickNum:1540,
                  commentnum:24
                },{
                  worksId:101,
                  worksTitle: '高数fdfdfdfdfdfdfdfd发动机发的链接发链接',
                  teachername: '汪涵',
                  worksImg:"https://edu-image.nosdn.127.net/F355766D26A19A259FD020126628FD36.png",
                  src:"112",
                  type:"video",
                  publishtime:"2020.1.30 1:35",
                  applaudnum:1040,
                  worksClickNum:140,
                  commentnum:20
                },{
                  worksId:101,
                  worksTitle: '高数',
                  teachername: '汪涵',
                  worksImg:"https://edu-image.nosdn.127.net/F355766D26A19A259FD020126628FD36.png",
                  src:"112",
                  type:"video",
                  publishtime:"2020.7.30 11:35",
                  applaudnum:1070,
                  worksClickNum:1540,
                  commentnum:200
                },{
                  worksId:101,
                  worksTitle: '高数',
                  teachername: '汪涵',
                  worksImg:"https://edu-image.nosdn.127.net/F355766D26A19A259FD020126628FD36.png",
                  src:"112",
                  type:"video",
                  publishtime:"2030.1.30 11:35",
                  applaudnum:1000,
                  worksClickNum:1530,
                  commentnum:20
                },{
                  worksId:101,
                  worksTitle: '高数',
                  teachername: '汪涵',
                  worksImg:"https://edu-image.nosdn.127.net/F355766D26A19A259FD020126628FD36.png",
                  src:"112",
                  type:"video",
                  publishtime:"2020.1.30 11:37",
                  applaudnum:100,
                  worksClickNum:150,
                  commentnum:20
                },{
                  worksId:101,
                  worksTitle: '计算机组成原理',
                  teachername: '汪涵',
                  worksImg:"https://edu-image.nosdn.127.net/F355766D26A19A259FD020126628FD36.png",
                  src:"112",
                  type:"video",
                  publishtime:"2060.1.30 11:35",
                  applaudnum:1085,
                  worksClickNum:158,
                  commentnum:20
                }
              ],
              knowledgeid: 5,order:2}
          ]
             },
            {
              listname:"二元二次方程",
              knowledgeid: 3,
              order:2,
              list:[
              {listname:"概念",
                list:[
                  {
                    worksId:101,
                    worksTitle: '一元二次方程',
                    teachername: '汪涵',
                    worksImg:"https://edu-image.nosdn.127.net/F355766D26A19A259FD020126628FD36.png",
                    src:"112",
                    type:"video",
                    publishtime:"2020.2.30 11:35",
                    applaudnum:100,
                    worksClickNum:150,
                    commentnum:20
                  },{
                    worksId:102,
                    worksTitle: '勾股定理',
                    teachername: '汪涵',
                    worksImg:"https://edu-image.nosdn.127.net/F355766D26A19A259FD020126628FD36.png",
                    src:"112",
                    type:"video",
                    publishtime:"2020.1.20 11:35",
                    applaudnum:1050,
                    worksClickNum:140,
                    commentnum:80
                  },{
                    worksId:101,
                    worksTitle: '高数',
                    teachername: '汪涵',
                    worksImg:"https://edu-image.nosdn.127.net/F355766D26A19A259FD020126628FD36.png",
                    src:"112",
                    type:"video",
                    publishtime:"2420.1.30 11:35",
                    applaudnum:1007,
                    worksClickNum:1540,
                    commentnum:24
                  },{
                    worksId:101,
                    worksTitle: '高数fdfdfdfdfdfdfdfd发动机发的链接发链接',
                    teachername: '汪涵',
                    worksImg:"https://edu-image.nosdn.127.net/F355766D26A19A259FD020126628FD36.png",
                    src:"112",
                    type:"video",
                    publishtime:"2020.1.30 1:35",
                    applaudnum:1040,
                    worksClickNum:140,
                    commentnum:20
                  },{
                    worksId:101,
                    worksTitle: '高数',
                    teachername: '汪涵',
                    worksImg:"https://edu-image.nosdn.127.net/F355766D26A19A259FD020126628FD36.png",
                    src:"112",
                    type:"video",
                    publishtime:"2020.7.30 11:35",
                    applaudnum:1070,
                    worksClickNum:1540,
                    commentnum:200
                  },{
                    worksId:101,
                    worksTitle: '高数',
                    teachername: '汪涵',
                    worksImg:"https://edu-image.nosdn.127.net/F355766D26A19A259FD020126628FD36.png",
                    src:"112",
                    type:"video",
                    publishtime:"2030.1.30 11:35",
                    applaudnum:1000,
                    worksClickNum:1530,
                    commentnum:20
                  },{
                    worksId:101,
                    worksTitle: '高数',
                    teachername: '汪涵',
                    worksImg:"https://edu-image.nosdn.127.net/F355766D26A19A259FD020126628FD36.png",
                    src:"112",
                    type:"video",
                    publishtime:"2020.1.30 11:37",
                    applaudnum:100,
                    worksClickNum:150,
                    commentnum:20
                  },{
                    worksId:101,
                    worksTitle: '计算机组成原理',
                    teachername: '汪涵',
                    worksImg:"https://edu-image.nosdn.127.net/F355766D26A19A259FD020126628FD36.png",
                    src:"112",
                    type:"video",
                    publishtime:"2060.1.30 11:35",
                    applaudnum:1085,
                    worksClickNum:158,
                    commentnum:20
                  }
                ],
                knowledgeid: 6,order:1},
              {listname:"习题解析",
                list:[
                  {
                    worksId:101,
                    worksTitle: '一元二次方程',
                    teachername: '汪涵',
                    worksImg:"https://edu-image.nosdn.127.net/F355766D26A19A259FD020126628FD36.png",
                    src:"112",
                    type:"video",
                    publishtime:"2020.2.30 11:35",
                    applaudnum:100,
                    worksClickNum:150,
                    commentnum:20
                  },{
                    worksId:102,
                    worksTitle: '勾股定理',
                    teachername: '汪涵',
                    worksImg:"https://edu-image.nosdn.127.net/F355766D26A19A259FD020126628FD36.png",
                    src:"112",
                    type:"video",
                    publishtime:"2020.1.20 11:35",
                    applaudnum:1050,
                    worksClickNum:140,
                    commentnum:80
                  },{
                    worksId:101,
                    worksTitle: '高数',
                    teachername: '汪涵',
                    worksImg:"https://edu-image.nosdn.127.net/F355766D26A19A259FD020126628FD36.png",
                    src:"112",
                    type:"video",
                    publishtime:"2420.1.30 11:35",
                    applaudnum:1007,
                    worksClickNum:1540,
                    commentnum:24
                  },{
                    worksId:101,
                    worksTitle: '高数fdfdfdfdfdfdfdfd发动机发的链接发链接',
                    teachername: '汪涵',
                    worksImg:"https://edu-image.nosdn.127.net/F355766D26A19A259FD020126628FD36.png",
                    src:"112",
                    type:"video",
                    publishtime:"2020.1.30 1:35",
                    applaudnum:1040,
                    worksClickNum:140,
                    commentnum:20
                  },{
                    worksId:101,
                    worksTitle: '高数',
                    teachername: '汪涵',
                    worksImg:"https://edu-image.nosdn.127.net/F355766D26A19A259FD020126628FD36.png",
                    src:"112",
                    type:"video",
                    publishtime:"2020.7.30 11:35",
                    applaudnum:1070,
                    worksClickNum:1540,
                    commentnum:200
                  },{
                    worksId:101,
                    worksTitle: '高数',
                    teachername: '汪涵',
                    worksImg:"https://edu-image.nosdn.127.net/F355766D26A19A259FD020126628FD36.png",
                    src:"112",
                    type:"video",
                    publishtime:"2030.1.30 11:35",
                    applaudnum:1000,
                    worksClickNum:1530,
                    commentnum:20
                  },{
                    worksId:101,
                    worksTitle: '高数',
                    teachername: '汪涵',
                    worksImg:"https://edu-image.nosdn.127.net/F355766D26A19A259FD020126628FD36.png",
                    src:"112",
                    type:"video",
                    publishtime:"2020.1.30 11:37",
                    applaudnum:100,
                    worksClickNum:150,
                    commentnum:20
                  },{
                    worksId:101,
                    worksTitle: '计算机组成原理',
                    teachername: '汪涵',
                    worksImg:"https://edu-image.nosdn.127.net/F355766D26A19A259FD020126628FD36.png",
                    src:"112",
                    type:"video",
                    publishtime:"2060.1.30 11:35",
                    applaudnum:1085,
                    worksClickNum:158,
                    commentnum:20
                  }
                ],
                knowledgeid: 7,order:2}]}
           ]
        }
    },
    computed:{
      // booksList(){
      //   return this.book.list[this.xIndex].list[this.yIndex].list
      // }
    },
    created(){
      this.userWorkList()
    },
    methods:{
      getIndex(item){
        console.log(item);
        this.xIndex=item[0]
        this.yIndex=item[1]
      },
      enter(work){
        // this.$router.push('/assessCheck/'+this.works.src)
        this.$router.push({
          name:'video',
          params: {
          id:work.worksId
        }
      })
      },
      searchWorkList(){
        searchAdminWorkList({
          content:this.searchInfo,
          pagenum:this.pagenum
        }).then(res=>{
          if(res.data.code == 200){
            this.workTotals  = res.data.data.total
            this.workList = res.data.data.managerWorks
          }
        })
      },
      userWorkList(){
        adminWorkList({
          pagenum :1
        }).then(res=>{
          console.log(res)
          if(res.data.code == 200){
            this.workTotals  = res.data.data.total
            this.workList = res.data.data.managerWorks
          }
        })
      },
      changePagenum(val){
        this.pagenum = val
        this.userWorkList()
      },
      sort(type){                     // 排序
        this.order = !this.order;		// 更改为 升序或降序
        this.sortType = type;
        this.booksList.sort(this.compare(type));
        // 调用下面 compare 方法 并传值
      },
      compare(attr){                  // 排序方法
        let that = this;
        return function(a,b){
          let val1 = a[attr];
          let val2 = b[attr];
          if(that.order){               //升序
            if(that.sortType == 'publishtime'){            // 如果是时间就转换成时间格式
              return new Date(val2.replace(/-/,'/')) - new Date(val1.replace(/-/,'/'));
            }else{
              return val2 - val1;
            }
          }else{                          //降序
            if(that.sortType == 'publishtime'){
              return new Date(val1.replace(/-/,'/')) - new Date(val2.replace(/-/,'/'));
            }else{
              return val1 - val2;
            }
          }
        }
      },

    }
  }



</script>

<style scoped>
  .course-box{
    display: flex;
    justify-content: space-between;
    margin:50px auto;
  }
  .course-filter{
    position: relative;
    margin-bottom: 15px;
  }
  .work-search{
  
    display: inline-block;
    position: absolute;
    width:250px;
    transform: translateY(-50%);
    right: 10px;
    top:50%;
  }
  .course-menu{
    width:200px;
    height: 500px;
    /*display: inline-block;*/
    margin-right: 10px;
  }
  .menu-title{
    width: 100%;
    height: 55px;
    color:#fff;
    font-size: 14px;
    text-align: center;
    line-height: 55px;
    background-color: #409EFF;
    margin-bottom: 15px;
  }

  .course-list{
    flex:1;
    
  }
  .course-wrapper{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between ;
    align-content:space-around;
    width: 100%;
    height: 100%;  
  }
  .course-list-works{
    position: relative;
    /* margin-right: 12px; */
    margin-bottom: 20px;
    /* padding:5px; */
    /* flex: 1;   */
    /*当动画效果变大时，才不会撑开盒子*/
    box-sizing: border-box;
  }
   .no-works{
    width: 100%;
    height: 200px;
    text-align: center;
    color:steelblue;
    font-size: 16px;
  }
</style>
