<template>
  <div class="my-comment clear-fix">
   <img class="avatar"  :src="$store.getters.avatar" alt="用户头像">
    <!-- <div class="text-area"> -->
      <el-input class="text-area" type="textarea" v-model="content" :rows="3" resize=none  placeholder="请发表友善的评论..."/>
    <!-- </div> -->
    <!-- <div class="publish"> -->
      <Button class="publish" @click="addMessage">发表评论</Button>
    <!-- </div> -->
  </div>
</template>

<script>

  import {addMessage} from "@/api/video"

  export default {
    name: "MyComment",
    data(){
      return{
        content:''
      }
    },
    props:{
      workId:{
        type:Number
      }
    },
    components:{
      
    },
    methods:{
      addMessage(){
        if(this.content!=''){
          addMessage({
          worksid:this.workId,
          content:this.content
        }).then(res=>{
          this.$Message.success(res.data.message)
          this.$emit('getComments')
        })
        }else{
          this.$Message.error("评论不能为空！")
        }
       
      }
    }
  }
</script>

<style scoped>
  .my-comment{
    display: flex;
    justify-content: space-around;
    align-items:center;
    height: 100px;
    margin: 10px;
    line-height: 100px;
    border-bottom: 1px solid rgba(0,0,0,.1);
  }
  
  .avatar {
    height:60px;
    border-radius: 30px;
  }
  .text-area{
    flex:1;
    margin: 0 20px;

  }
  .publish{
    width: 80px;
    height: 80px;
    background-color: rgba(50, 50, 255, .7);
    font-size: 13px;
    text-align: center;
    color: #fff;
  }
  .publish Button{
    color: white;
    width: 100%;
    height: 100%;
    text-align: center;
    font-size: 11px;
    background-color: #3399ff;
  }
</style>
