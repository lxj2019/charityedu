<template>
  <div @click="enter()">
    <work-common class="works"
    :workWidth="'145px'"
          :workHeight="'180px'"
     placement="top" :works="works">
      <!--      /*左下角底部:作者名称和头像*/-->
      <div class="author" slot="bottom-left">
        <img class="avatar" :src="works.img" alt="用户头像" ><span>{{works.teachername}}</span>
      </div>
      <!--      右下角底部：“审核状态”-->
      <div  slot="bottom-right">
        <span >{{works.checkstate}}</span>
      </div>

      <!--      左上角：评分状态-->
      <span class="time" slot="top-left">{{works.commentState}}</span>
    </work-common>
  </div>

</template>

<script>
  import WorkCommon from "./WorkCommon";
  export default {
    name: "CheckWorks",
    props:['works'],
    components:{
      WorkCommon
    },
    methods:{
      enter(){
        this.$router.push({
          name:'video',
          params: {
          work:this.works.src
      }
    })
    }
    }
  }
</script>

<style scoped>
  /*底部:作者名称和头像*/
  .author .avatar{
    width: 25px;
    height: 25px;
    vertical-align: middle;
  }
  .author span {
    font-size: 12px;
    color: #999999;
  }
</style>
