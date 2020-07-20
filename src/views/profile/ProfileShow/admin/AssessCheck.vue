<template>
  <div class="box">
    <!--  左边视频与评论区-->
    <div class="video-left">
      <!--    视频信息区-->
      <div class="video-info">
        <h1>{{video.title}}</h1>
        <div><span>{{video.type}}</span><span>{{video.publicTime}}</span></div>
<!--        <div><span>{{video.applaudnum}}播放</span><span>未经作者授权，禁止转载</span></div>-->
      </div>
      <!--    视频-->
      <video-show :src="video.src"></video-show>
      <!--    视频简介-->
      <div class="summary">
        {{video.summary}}
      </div>
      <div class="line"></div>
      <!--  右边打分审核区-->
    </div>
    <div class="video-right">
      <div class="teacher-info">
        <img src="@/assets/img/pic.jpg" alt="">
        <h2>{{video.teacherName}}</h2>
      </div>
      <div class="assess"></div>

    </div>
  </div>
</template>

<script>
  import VideoShow from "../../../video/VideoShow";
  export default {
    name: "AssessCheck",
    components:{
      VideoShow
    },
    data(){
      return{
        score:0,
        video:{
          type:'数学',
          title:'妹子为了阻止男的跳楼当场告白！【阅片无数动漫篇01】\n',
          teacherName:'汪涵',
          publicTime:'2020-1-1 20:12:03',
          applaudnum:1000,
          worksClickNum:150,
          collectionsNum:5,
          commentnum:20,
          summary:' 附近的浪费了进了房间的积分的奖励费德勒。\n' +
            '      地方的房价立刻搭街坊了解到了警方了解到大幅降低警方了解到解决的方法的垃圾分类',
          src:'https://dss0.bdstatic.com/-0U0bnSm1A5BphGlnYG/cae-legoup-video-target/a3a51fd0-9b04-4ca8-ba79-a70d7a0e371a.mp4',
        },
      }
    }
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

  .line{
    padding:10px 0 0;
    border-bottom: 1px solid rgba(0,0,0,.1);
  }
  .summary{
    padding: 20px 0;
    font-size: 12px;
  }
/*右边打分审核区*/
  .video-right{
    float: right;
    width: 26%;
    height: 500px;
    background-color: pink;
    text-align: center;
  }
  .teacher-info{
    height: 100px;
  }
  .teacher-info img{
    width: 50px;
    border-radius: 25px;
  }

</style>
