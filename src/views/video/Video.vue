<template>
<div class="box">
<!--  左边视频与评论区-->
  <div class="video-left">
<!--    视频信息区-->
    <div class="video-info">
      <h1>{{video.title}}</h1>
      <div><span>{{video.type}}</span><span>{{video.publicTime}}</span></div>
      <div><span>{{video.applaudnum}}播放</span><span>未经作者授权，禁止转载</span></div>
    </div>
<!--    视频-->
    <video-show :src="video.src"></video-show>

<!--    点赞收藏-->
    <div class="praise-box">
    <div class="praise">
      <div><span class="icon"></span>{{video.applaudnum}}</div>
      <div><span class="icon"></span>{{video.applaudnum}}</div>
      <div><span class="icon"></span>{{video.applaudnum}}</div>
    </div>
      <div class="line"></div>
    </div>
<!--    视频简介-->
    <div class="summary">
      {{video.summary}}
    </div>
    <div class="line"></div>

<!--    评论区-->
    <div class="comment">
    <h2>评论区：</h2>
      <filter-menu>
        <span slot="first" @click="sort('time',true)">按时间排序</span>
        <span slot="second"  @click="sort('applaudnum',false)">按热度排序</span>
      </filter-menu>
<!--      我的评论-->
      <my-comment></my-comment>

<!--      他人评论区-->
     <comment-box  v-for="item in video.commentlist" :comment="item"></comment-box>
    </div>
  </div>
<!--  右边推荐区-->
  <div class="video-right">

  </div>
  {{$route.params.id}}
</div>
</template>

<script>
  import {Input} from 'view-design'
  import FilterMenu from "../profile/ProfileShow/FilterMenu/FilterMenu";
  import CommentBox from "./CommentBox";
  import VideoShow from "./VideoShow";
  import MyComment from "./MyComment";
  export default {
    name: "Video",
    components:{
      FilterMenu,Input,CommentBox,VideoShow,MyComment
    },
    data(){
      return{
        video:{
          type:'数学',
          title:'二元一次方程知识点讲解',
          publicTime:'2020-1-1 20:12:03',
          applaudnum:1000,
          worksClickNum:150,
          collectionsNum:5,
          commentnum:20,
          summary:' 附近的浪费了进了房间的积分的奖励费德勒。\n' +
            '      地方的房价立刻搭街坊了解到了警方了解到大幅降低警方了解到解决的方法的垃圾分类',
          src:'https://dss0.bdstatic.com/-0U0bnSm1A5BphGlnYG/cae-legoup-video-target/a3a51fd0-9b04-4ca8-ba79-a70d7a0e371a.mp4',
          commentlist:
            [
            {
              userName:'张三',
              img:'@/assets/img/pic.jpg',
              applaudnum:120,
              content:'老师讲的很好',
              time:'2020-09-05 23:21'
            },
            {
              userName:'张三',
              img:'@/assets/img/pic.jpg',
              applaudnum:7,
              content:'就这？',
              time:'2020-11-05 23:21'
            },
            {
              userName:'张三',
              img:'@/assets/img/pic.jpg',
              applaudnum:15700,
              content:'谢谢老师',
              time:'2020-08-05 23:21'
            },
            {
              userName:'张三',
              img:'@/assets/img/pic.jpg',
              applaudnum:1001,
              content:'讲得很好，点赞了',
              time:'2020-02-05 23:21'
            },
            {
              userName:'张三',
              img:'@/assets/img/pic.jpg',
              applaudnum:1080,
              content:'老师辛苦了',
              time:'2020-02-04 23:21'
            },

          ]
        },
        order:true,
      }
    },
      methods: {
        sort(type,isTime){                     // 排序
          this.order = !this.order;		// 更改为 升序或降序
          this.sortType = type;
          this.video.commentlist.sort(this.compare(type,isTime));
          // 调用下面 compare 方法 并传值
        },
        compare(attr,isTime){                  // 排序方法
          let that = this;
          return function(a,b){
            let val1 = a[attr];
            let val2 = b[attr];
            if(that.order){               //升序
              if(isTime){            // 如果是时间就转换成时间格式
                return new Date(val2.replace(/-/,'/')) - new Date(val1.replace(/-/,'/'));
              }else{
                return val2 - val1;
              }
            }else{                          //降序
              if(isTime){
                return new Date(val1.replace(/-/,'/')) - new Date(val2.replace(/-/,'/'));
              }else{
                return val1 - val2;
              }
            }
          }
        },
      },
  }
</script>

<style scoped>
  .box{
    width: 900px;
    margin:20px auto;
  }
.video-left{
  position: relative;
  float: left;
  width: 70%;
  height: 800px;
  /*background-color: pink;*/
}
.video-info span{
  font-size: 11px;
  color: #999999;
  line-height: 1.15;
  margin: 11px 11px 11px 0;
}
.video-left h1{
  font-size: 18px;
  font-weight: 500;
  color: #212121;
  margin-bottom: 10px;
}

.video-right{
  float: right;
  width: 26%;
  height: 500px;
  background-color: pink;
 }
.praise-box{
  height: 60px;
  padding: 12px 0;
  /*font-family: icomoon;*/
  font-size: 14px;
}
  .praise-box div{
    display: inline-block;
    margin-right: 50px;;
  }
.praise span{
  font-family: icomoon;
  font-size: 18px;
}
.icon:hover{
  color: red;
}
  .line{
    padding:10px 0 0;
    border-bottom: 1px solid rgba(0,0,0,.1);
  }
  .summary{
    padding: 20px 0;
    font-size: 12px;
  }
/*评论区*/

  .comment h2{
    /*display: block;*/
    padding: 15px;
    font-size: 18px;
    font-weight: 500;;
  }


</style>
