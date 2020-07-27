<template>
    <div class="course-box w">
      <div>
        <course-menu
          :list="book.list"
          class="course-menu" @setIndex="getIndex"></course-menu>
      </div>
      <div class="course-list">
<!--        应用封装好的”筛选菜单“组件-->
        <filter-menu>
          <span slot="first">全部</span>
          <span slot="second"@click="sort('applaudnum')">最多点赞</span>
          <span slot="third" @click="sort('worksClickNum')">最多播放</span>
          <span slot="forth" @click="sort('publishtime')">最近发布</span>
        </filter-menu>

        <public-works class="course-list-works"
          :works="item" v-for="item in booksList"></public-works>
      </div>
    </div>

</template>

<script>
// import ProfileShow from "../profile/ProfileShow/ProfileShow";
// import ProfileMenu from "../profile/ProfileMenu";
import FilterMenu from "../../components/common/FilterMenu/FilterMenu";
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
        book:{
        bookname:"三年级上册",
        knowledgeid: 1,
          list:[
            {
               listname:"二元一次方程",
               knowledgeid: 2,
               order:1,
              list:[
            {listname:"概念",
              list:[
                {
                  worksId:101,
                  worktitle: '一元二次方程',
                  teachername: '汪涵',
                  img:"https://edu-image.nosdn.127.net/F355766D26A19A259FD020126628FD36.png",
                  src:"112",
                  type:"video",
                  publishtime:"2020.2.30 11:35",
                  applaudnum:100,
                  worksClickNum:150,
                  commentnum:20
                },{
                  worksId:102,
                  worktitle: '勾股定理',
                  teachername: '汪涵',
                  img:"https://edu-image.nosdn.127.net/F355766D26A19A259FD020126628FD36.png",
                  src:"112",
                  type:"video",
                  publishtime:"2020.1.20 11:35",
                  applaudnum:1050,
                  worksClickNum:140,
                  commentnum:80
                },{
                  worksId:101,
                  worktitle: '高数',
                  teachername: '汪涵',
                  img:"https://edu-image.nosdn.127.net/F355766D26A19A259FD020126628FD36.png",
                  src:"112",
                  type:"video",
                  publishtime:"2420.1.30 11:35",
                  applaudnum:1007,
                  worksClickNum:1540,
                  commentnum:24
                },{
                  worksId:101,
                  worktitle: '高数fdfdfdfdfdfdfdfd发动机发的链接发链接',
                  teachername: '汪涵',
                  img:"https://edu-image.nosdn.127.net/F355766D26A19A259FD020126628FD36.png",
                  src:"112",
                  type:"video",
                  publishtime:"2020.1.30 1:35",
                  applaudnum:1040,
                  worksClickNum:140,
                  commentnum:20
                },{
                  worksId:101,
                  worktitle: '高数',
                  teachername: '汪涵',
                  img:"https://edu-image.nosdn.127.net/F355766D26A19A259FD020126628FD36.png",
                  src:"112",
                  type:"video",
                  publishtime:"2020.7.30 11:35",
                  applaudnum:1070,
                  worksClickNum:1540,
                  commentnum:200
                },{
                  worksId:101,
                  worktitle: '高数',
                  teachername: '汪涵',
                  img:"https://edu-image.nosdn.127.net/F355766D26A19A259FD020126628FD36.png",
                  src:"112",
                  type:"video",
                  publishtime:"2030.1.30 11:35",
                  applaudnum:1000,
                  worksClickNum:1530,
                  commentnum:20
                },{
                  worksId:101,
                  worktitle: '高数',
                  teachername: '汪涵',
                  img:"https://edu-image.nosdn.127.net/F355766D26A19A259FD020126628FD36.png",
                  src:"112",
                  type:"video",
                  publishtime:"2020.1.30 11:37",
                  applaudnum:100,
                  worksClickNum:150,
                  commentnum:20
                },{
                  worksId:101,
                  worktitle: '计算机组成原理',
                  teachername: '汪涵',
                  img:"https://edu-image.nosdn.127.net/F355766D26A19A259FD020126628FD36.png",
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
                  worktitle: '一元二次方程',
                  teachername: '汪涵',
                  img:"https://edu-image.nosdn.127.net/F355766D26A19A259FD020126628FD36.png",
                  src:"112",
                  type:"video",
                  publishtime:"2020.2.30 11:35",
                  applaudnum:100,
                  worksClickNum:150,
                  commentnum:20
                },{
                  worksId:102,
                  worktitle: '勾股定理',
                  teachername: '汪涵',
                  img:"https://edu-image.nosdn.127.net/F355766D26A19A259FD020126628FD36.png",
                  src:"112",
                  type:"video",
                  publishtime:"2020.1.20 11:35",
                  applaudnum:1050,
                  worksClickNum:140,
                  commentnum:80
                },{
                  worksId:101,
                  worktitle: '高数',
                  teachername: '汪涵',
                  img:"https://edu-image.nosdn.127.net/F355766D26A19A259FD020126628FD36.png",
                  src:"112",
                  type:"video",
                  publishtime:"2420.1.30 11:35",
                  applaudnum:1007,
                  worksClickNum:1540,
                  commentnum:24
                },{
                  worksId:101,
                  worktitle: '高数fdfdfdfdfdfdfdfd发动机发的链接发链接',
                  teachername: '汪涵',
                  img:"https://edu-image.nosdn.127.net/F355766D26A19A259FD020126628FD36.png",
                  src:"112",
                  type:"video",
                  publishtime:"2020.1.30 1:35",
                  applaudnum:1040,
                  worksClickNum:140,
                  commentnum:20
                },{
                  worksId:101,
                  worktitle: '高数',
                  teachername: '汪涵',
                  img:"https://edu-image.nosdn.127.net/F355766D26A19A259FD020126628FD36.png",
                  src:"112",
                  type:"video",
                  publishtime:"2020.7.30 11:35",
                  applaudnum:1070,
                  worksClickNum:1540,
                  commentnum:200
                },{
                  worksId:101,
                  worktitle: '高数',
                  teachername: '汪涵',
                  img:"https://edu-image.nosdn.127.net/F355766D26A19A259FD020126628FD36.png",
                  src:"112",
                  type:"video",
                  publishtime:"2030.1.30 11:35",
                  applaudnum:1000,
                  worksClickNum:1530,
                  commentnum:20
                },{
                  worksId:101,
                  worktitle: '高数',
                  teachername: '汪涵',
                  img:"https://edu-image.nosdn.127.net/F355766D26A19A259FD020126628FD36.png",
                  src:"112",
                  type:"video",
                  publishtime:"2020.1.30 11:37",
                  applaudnum:100,
                  worksClickNum:150,
                  commentnum:20
                },{
                  worksId:101,
                  worktitle: '计算机组成原理',
                  teachername: '汪涵',
                  img:"https://edu-image.nosdn.127.net/F355766D26A19A259FD020126628FD36.png",
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
                    worktitle: '一元二次方程',
                    teachername: '汪涵',
                    img:"https://edu-image.nosdn.127.net/F355766D26A19A259FD020126628FD36.png",
                    src:"112",
                    type:"video",
                    publishtime:"2020.2.30 11:35",
                    applaudnum:100,
                    worksClickNum:150,
                    commentnum:20
                  },{
                    worksId:102,
                    worktitle: '勾股定理',
                    teachername: '汪涵',
                    img:"https://edu-image.nosdn.127.net/F355766D26A19A259FD020126628FD36.png",
                    src:"112",
                    type:"video",
                    publishtime:"2020.1.20 11:35",
                    applaudnum:1050,
                    worksClickNum:140,
                    commentnum:80
                  },{
                    worksId:101,
                    worktitle: '高数',
                    teachername: '汪涵',
                    img:"https://edu-image.nosdn.127.net/F355766D26A19A259FD020126628FD36.png",
                    src:"112",
                    type:"video",
                    publishtime:"2420.1.30 11:35",
                    applaudnum:1007,
                    worksClickNum:1540,
                    commentnum:24
                  },{
                    worksId:101,
                    worktitle: '高数fdfdfdfdfdfdfdfd发动机发的链接发链接',
                    teachername: '汪涵',
                    img:"https://edu-image.nosdn.127.net/F355766D26A19A259FD020126628FD36.png",
                    src:"112",
                    type:"video",
                    publishtime:"2020.1.30 1:35",
                    applaudnum:1040,
                    worksClickNum:140,
                    commentnum:20
                  },{
                    worksId:101,
                    worktitle: '高数',
                    teachername: '汪涵',
                    img:"https://edu-image.nosdn.127.net/F355766D26A19A259FD020126628FD36.png",
                    src:"112",
                    type:"video",
                    publishtime:"2020.7.30 11:35",
                    applaudnum:1070,
                    worksClickNum:1540,
                    commentnum:200
                  },{
                    worksId:101,
                    worktitle: '高数',
                    teachername: '汪涵',
                    img:"https://edu-image.nosdn.127.net/F355766D26A19A259FD020126628FD36.png",
                    src:"112",
                    type:"video",
                    publishtime:"2030.1.30 11:35",
                    applaudnum:1000,
                    worksClickNum:1530,
                    commentnum:20
                  },{
                    worksId:101,
                    worktitle: '高数',
                    teachername: '汪涵',
                    img:"https://edu-image.nosdn.127.net/F355766D26A19A259FD020126628FD36.png",
                    src:"112",
                    type:"video",
                    publishtime:"2020.1.30 11:37",
                    applaudnum:100,
                    worksClickNum:150,
                    commentnum:20
                  },{
                    worksId:101,
                    worktitle: '计算机组成原理',
                    teachername: '汪涵',
                    img:"https://edu-image.nosdn.127.net/F355766D26A19A259FD020126628FD36.png",
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
                    worktitle: '一元二次方程',
                    teachername: '汪涵',
                    img:"https://edu-image.nosdn.127.net/F355766D26A19A259FD020126628FD36.png",
                    src:"112",
                    type:"video",
                    publishtime:"2020.2.30 11:35",
                    applaudnum:100,
                    worksClickNum:150,
                    commentnum:20
                  },{
                    worksId:102,
                    worktitle: '勾股定理',
                    teachername: '汪涵',
                    img:"https://edu-image.nosdn.127.net/F355766D26A19A259FD020126628FD36.png",
                    src:"112",
                    type:"video",
                    publishtime:"2020.1.20 11:35",
                    applaudnum:1050,
                    worksClickNum:140,
                    commentnum:80
                  },{
                    worksId:101,
                    worktitle: '高数',
                    teachername: '汪涵',
                    img:"https://edu-image.nosdn.127.net/F355766D26A19A259FD020126628FD36.png",
                    src:"112",
                    type:"video",
                    publishtime:"2420.1.30 11:35",
                    applaudnum:1007,
                    worksClickNum:1540,
                    commentnum:24
                  },{
                    worksId:101,
                    worktitle: '高数fdfdfdfdfdfdfdfd发动机发的链接发链接',
                    teachername: '汪涵',
                    img:"https://edu-image.nosdn.127.net/F355766D26A19A259FD020126628FD36.png",
                    src:"112",
                    type:"video",
                    publishtime:"2020.1.30 1:35",
                    applaudnum:1040,
                    worksClickNum:140,
                    commentnum:20
                  },{
                    worksId:101,
                    worktitle: '高数',
                    teachername: '汪涵',
                    img:"https://edu-image.nosdn.127.net/F355766D26A19A259FD020126628FD36.png",
                    src:"112",
                    type:"video",
                    publishtime:"2020.7.30 11:35",
                    applaudnum:1070,
                    worksClickNum:1540,
                    commentnum:200
                  },{
                    worksId:101,
                    worktitle: '高数',
                    teachername: '汪涵',
                    img:"https://edu-image.nosdn.127.net/F355766D26A19A259FD020126628FD36.png",
                    src:"112",
                    type:"video",
                    publishtime:"2030.1.30 11:35",
                    applaudnum:1000,
                    worksClickNum:1530,
                    commentnum:20
                  },{
                    worksId:101,
                    worktitle: '高数',
                    teachername: '汪涵',
                    img:"https://edu-image.nosdn.127.net/F355766D26A19A259FD020126628FD36.png",
                    src:"112",
                    type:"video",
                    publishtime:"2020.1.30 11:37",
                    applaudnum:100,
                    worksClickNum:150,
                    commentnum:20
                  },{
                    worksId:101,
                    worktitle: '计算机组成原理',
                    teachername: '汪涵',
                    img:"https://edu-image.nosdn.127.net/F355766D26A19A259FD020126628FD36.png",
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
      }
    },
    computed:{
      booksList(){
        return this.book.list[this.xIndex].list[this.yIndex].list
      }
    },
    methods:{
      getIndex(item){
        console.log(item);
        this.xIndex=item[0]
        this.yIndex=item[1]
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
    position: relative;
    margin:50px auto;
    padding: 0;
    border-bottom: none;
    /*box-shadow:0px 0px 2px 1px rgba(0,0,0,.1);*/
    /*width: 900px;*/
  }
  .course-menu{
    float: left;
    height: 500px;
    display: inline-block;

    /*margin-right: -1px;*/
    /*display: inline-block;*/
    box-shadow:0px 0px 2px 1px rgba(0,0,0,.1);
  }
  .course-list{
    float: left;
    display: inline-block;
    position: absolute;
    padding: 10px;
    box-shadow:0px 0px 2px 1px rgba(0,0,0,.1);
    margin-bottom: 100px;
  }
  /*.show{*/
  /*width: 100%;*/
  /*  height: 100%;*/
  /*}*/
  .course-list-works{
    position: relative;
    float: left;
    padding:5px;
    flex: 1;
    /*当动画效果变大时，才不会撑开盒子*/
    box-sizing: border-box;
  }
</style>
