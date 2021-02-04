<template>
  <div>
    <div class="comment-box clear-fix">
      <div class="user-face"><img :src="comment.commentatorImg" alt="用户头像"></div>
      <div class="comment-info">
        <a class="user">{{ comment.commentatorName }}</a>
        <p class="text">{{ comment.context }}</p>
        <div class="information"><span>{{ comment.applaudnum }}</span></div>
        <div class="time"> {{ comment.commentatorTime | formatDate }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from '@/utils/date'
export default {
  name: 'CommentBox',
  filters: {
    formatDate(time) {
      const date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd  hh:mm:ss')
    }
  },
  props: {
    comment: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
}
</script>

<style scoped>
  .comment-box{
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgba(0,0,0,.1);
    box-sizing: content-box;
  }
  .user-face{
    width: 60px;
    display: inline-block;

  }
  .user-face img{
    width: 100%;
    border-radius: 40px;
  }
  .comment-info{
    position: relative;
    flex:1;
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
