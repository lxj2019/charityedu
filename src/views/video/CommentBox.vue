<template>
  <div>
    <div class="comment-box clear-fix">
      <div class="user-face"><img src="@/assets/img/pic.jpg" alt=""></div>
      <div class="comment-info">
        <a class="user">{{comment.userName}}</a>
        <p class="text">{{comment.content}}</p>
        <div class="information"><span>{{comment.applaudnum}}</span></div>
        <div class="time"> {{comment.time}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "CommentBox",
    props:['comment']
  }
</script>

<style scoped>
  .comment-box{

    vertical-align: middle;
    border-bottom: 1px solid rgba(0,0,0,.1);
    box-sizing: content-box;
  }
  .user-face{
   width: 10%;
    display: inline-block;

  }
  .user-face img{
    width: 100%;
    border-radius: 40px;
  }
  .comment-info{
    position: relative;
    width: 80%;
    margin-left: 20px;
   padding: 22px 0 14px;
    display: inline-block;
  }
  .user{
    display: inline-block;
    font-size: 11px;
    color: #6D757A;
  }
  .text{
    font-size: 14px;
    color: #222222;

  }
  .information{
    width: 85%;
    height: 20px;
  }
   span{
    font-family: icomoon;
     color: #99A2AA;
     font-size: 12px;
  }
  .time{
    position: absolute;
    right: 0;
    bottom: 0;
    font-size: 12px;
    font-family: icomoon;
    color: #99A2AA;

  }
</style>
