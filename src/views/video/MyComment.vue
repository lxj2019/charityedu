<template>
  <div class="my-comment clear-fix">
    <div class="user-face"><img src="@/assets/img/pic.jpg" alt=""></div>
    <div class="text-area">
      <Input type="textarea" v-model="content" :autosize="{minRows: 2,maxRows: 5}" placeholder="请发表友善的评论..."/>
    </div>
    <div class="publish">
      <Button @click="addMessage">发表评论</Button>
    </div>
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
    components:{

    },
    methods:{
      addMessage(){
        if(this.content!=''){
          addMessage({
          worksid:1,
          content:this.content
        }).then(res=>{
          this.$Message.success(res.data.message)
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
    height: 100px;
    margin: 10px;
    line-height: 100px;
    border-bottom: 1px solid rgba(0,0,0,.1);
  }
  .user-face{
    display: inline-block;
    float: left;
    padding:20px 0;
    width: 10%;
    height: 100%;
  }
  .user-face img{
    width: 100%;
  }
  .text-area{
    float: left;
    display: inline-block;
    width: 400px;
    padding: 0 20px;
    /*display: inline-block;*/
  }
  .publish{
    display: inline-block;
    float: left;
    width: 100px;
    height: 100px;
    padding: 15px;
    line-height: 60px;
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
