<template>

  <!-- 精品推荐模块 -->
  <div class="box w">
    <div class="tb">
      <h3>精品推荐</h3>
      <a href="#">查看更多</a>
    </div>
    <div class="recommod">

      <public-works class="works" v-for="item in videoList" :works="item"></public-works>
    </div>
  </div>
</template>

<script>
  import PublicWorks from "../../components/common/works/PublicWorks";
  export default {
    name: "Recommend",
    components:{
      PublicWorks
    },
    data(){
      return{
        videoList:[
          {
            teachername:'张三',
            src:'https://edu-image.nosdn.127.net/F355766D26A19A259FD020126628FD36.png',
            worktitle:"二元一次方程",
            img:'https://edu-image.nosdn.127.net/F7BB32A310F74992D384167EA2496590.png?imageView&quality=100&thumbnail=230y130&type=webp',
            applaudnum:"100",
          },
          {
            teachername:'张三',
            src:'https://edu-image.nosdn.127.net/F355766D26A19A259FD020126628FD36.png',
            worktitle:"二元一次方程等级分类等级法律纠纷",
            img:'https://edu-image.nosdn.127.net/401b122428424831adc9991bd6904be5.png?imageView&quality=100&thumbnail=230y130&type=webp',
            applaudnum:"100",
          },
          {
            teachername:'张三',
            src:'https://edu-image.nosdn.127.net/F355766D26A19A259FD020126628FD36.png',
            worktitle:"二元一次方程",
            img:'https://edu-image.nosdn.127.net/F355766D26A19A259FD020126628FD36.png',
            applaudnum:"100",
          },
          {
            teachername:'张三',
            src:'https://edu-image.nosdn.127.net/F355766D26A19A259FD020126628FD36.png',
            worktitle:"二元一次方程",
            img:'https://edu-image.nosdn.127.net/A053A9F610CFF234D4798181D2E94112.png?imageView&quality=100&thumbnail=230y130&type=webp',
            applaudnum:"100",
          },
          {
            teachername:'张三',
            src:'https://edu-image.nosdn.127.net/F355766D26A19A259FD020126628FD36.png',
            worktitle:"二元一次方程",
            img:'https://edu-image.nosdn.127.net/8e3d4b6bf1c7411e86ea637d093f84c2.png?imageView&quality=100&thumbnail=230y130&type=webp',
            applaudnum:"100",
          },
        ]
      }
    }
  }
</script>

<style scoped>
  .box{
    margin-bottom: 100px;
  }
  .box .tb {
    height: 42px;
  }

  .box .tb h3 {
    float: left;
    font-size: 18px;
    font-weight: 300;
  }

  .box .tb a {
    float: right;
    margin-right: 20px;
    font-size: 12px;
    color: #a5a5a5
  }
  .recommod{
    display: flex;
    justify-content: space-between;
  }


</style>
