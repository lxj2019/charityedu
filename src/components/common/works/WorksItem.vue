<template>
  <div>
    <div class="content" @click="enter()">
      <img class="img" :src="works.img" alt="封面"><br/>
      <div class="worktitlebox">
        <h4>{{works.worktitle}}</h4>
      </div>
       <div  class="bottom-left"><slot name="bottom-left"> </slot></div>
        <div class="bottom-right"><slot  name="bottom-right"></slot></div>
        <div  class="top-left" > <slot name="top-left"></slot></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "WorksItem",
    props:['works'],
    data(){
      return{
      }
    },
    methods:{
      enter(){
        this.$router.push('/video/'+this.works.src)
      }
    }
  }
</script>

<style scoped>
  .content {
    position: relative;
    width: 200px;
    /*height: 190px;*/
    background-color: #fff;
    cursor: pointer;
    border: 1px solid rgba(0,0,0,.1);
    border-radius: 12px;
    transition: 0.3s;
    font-size: 12px;
    z-index: 1;
  }
  /*鼠标移动到作品组件上的动画效果：微微放大且有阴影*/
  .content:hover{
      box-shadow:1px 1px 5px 1px rgba(0,0,0,.1);
    /*  transform:translate(0px,-1px);*/
    /*-ms-transform:translate(0px,-1px); !* IE 9 *!*/
    /*-webkit-transform:translate(0px,-1px); !* Safari and Chrome *!*/
    z-index: 0;
  }
  .content img {
    width: 100%;
    height: 100%;
  }
  .worktitlebox{
      margin-left: 10px;
      margin-right: 10px;
      font-size: 12px;
      height: 65px;
    }
  .worktitlebox h4:hover{
    color: red;
  }
  .bottom-left{
    position: absolute;
    bottom: 0;
    left:10px;
  }
  .top-left{
    position: absolute;
    left: 0;
    top: 0;
  }
  .bottom-right{
    position: absolute;
    right: 0;
    bottom: 0;
  }

</style>
