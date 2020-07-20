<template>
  <div>
    <works-item class="works"  placement="top" :works="works">
      <!--      /*左下角底部:作者名称和头像*/-->
      <div class="author" slot="bottom-left">
        <img class="avatar" :src="works.img" alt="用户头像" ><span>{{works.teachername}}</span>
      </div>
      <!--      左上角：收藏时间-->
<!--      <span class="time" slot="top-left">发布于{{works.publishtime}}</span>-->
<!--      右下角:点赞数与播放数-->
      <div class="comment" slot="bottom-right">
        <span></span><span>{{works.applaudnum}}</span> <span></span><span>{{works.worksClickNum}}</span>
      </div>
    </works-item>
  </div>

</template>

<script>
  import WorksItem from "./WorksItem";
  export default {
    name: "PublicWorks",
    props:['works'],
    components:{
      WorksItem
    }
  }
</script>

<style scoped>
  /*底部:作者名称和头像*/
  .author .avatar{
    width: 25px;
    height: 25px;
    border-radius: 12px;
    vertical-align: middle;
  }
  .author span {
    font-size: 12px;
    color: #999999;
  }
  .comment{
    font-family: icomoon;
    font-size: 10px;
    line-height: 20px;
    /*margin-bottom: 70px;*/
    /*color: white;*/
    color: #e3666691
  }

</style>
