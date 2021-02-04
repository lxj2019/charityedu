<template>
<!--  教师我的课堂：“作品卡”封装 在WorkCommon上增加点赞评论数，和发表时间-->
  <div>
    <work-common  :works="works">
      <!--      /*左下角底部:点赞数和评论*/-->
      <div class="comment" slot="bottom-left">
        <span></span><span>{{works.applaudnum}}</span> <span></span><span>{{works.worksClickNum}}</span>
      </div>
      <!--      右下角底部：“审核状态”-->
      <div  slot="bottom-right">
        <span >{{works.checkstate}}</span>
      </div>
      <!--      左上角：收藏时间-->
      <span class="time" slot="top-left">发表于{{works.publishtime}}</span>
    </work-common>
  </div>

</template>

<script>
  import WorkCommon from "./WorkCommon";
  export default {
    name: "TeacherWorks",
    props:['works'],
    components:{
      WorkCommon
    },

    data(){
      return{
      }
    }
  }
</script>

<style scoped>

  .comment{
    font-family: icomoon;
    font-size: 10px;
    line-height: 20px;
    /*margin-bottom: 70px;*/
    /*color: white;*/
    color: #ff5777;
    /*color: #fff;*/
  }

  .time{
    font-size: 10px;
    color: #000;
  }


</style>
