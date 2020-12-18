<template>
  <div>
    <div v-bind:class="['card',works.type=='ppt' ? 'ppt' : 'video']"
      :style="cardWidth">
      <div class="img-box" :style="bgImg"
      >
      <div class="imgBox-bottom"><slot name="img-leftBottom"></slot></div>
      <!-- <img class="img" :src="works.worksImg" alt="封面"> -->
      </div>
      <div class="card-info">
      <div class="worktitlebox">
        <h4>{{works.worksTitle}}</h4>
      </div>
       <div  class="bottom-left"><slot name="bottom-left"> </slot></div>
        <div class="bottom-right"><slot name="bottom-right"></slot></div>
        <div class="top-left" > <slot name="top-left"></slot></div>
      </div>  
    </div>
  </div>
</template>

<script>
  export default {
    name: "WorksItem",
    props:{
      works:{
        type:Object
      },
      workWidth:{
        type:String,
        default:'200px'
      },
       workHeight:{
        type:String,
        default:'230px'
      },
    },
    data(){
      return{
      
      }
    },
    computed:{
      cardWidth(){
        return {
          width:this.workWidth,
          height:this.workHeight
        }
      },
      bgImg(){
        let url=this.works.worksImg
        let bgUrl = "backgroundImage:"+`url('${url}')`
        return  bgUrl
      }
    },
    methods:{
      enter(){

      }
    }
  }
</script>

<style scoped>
  .card {
    position: relative;
    
    /* height: 250px; */
    background-color: #fff;
    cursor: pointer;
    transition: 0.3s;
    font-size: 12px;
    z-index: 1;
     border-radius: 4px;
     transition:all ease-in 0.2s; 
    /* box-shadow: 0 6px 10px 0 rgba(95,101,105,.15);  */

  }
  .img-box{
    position: relative;
    width: 100%;
    height: 50%;
    border-radius: 4px;
    background: no-repeat center/100%;
  }
  .imgBox-bottom{
    position: absolute;
    left:10px;
    bottom: 0;
    color:#fff;
    font-size: 13px;
  }
  /*鼠标移动到作品组件上的动画效果：微微放大且有阴影*/
  .card:hover{
     /* box-shadow:1px 1px 5px 1px rgba(0,0,0,.3); */
    box-shadow: 0 4px 16px 0 rgba(0,0,0,0.12);
     /* transform:translate(0px,-2px); */
    /*-ms-transform:translate(0px,-1px); !* IE 9 *!*/
    /*-webkit-transform:translate(0px,-1px); !* Safari and Chrome *!*/
    z-index: 0;
  }
  .card::before{
    /* content: 'PPT'; */
    position: absolute;
    top: 6px;
    right: -6px;
    width: 38px;
    height: 23px;
    color: #fff;
    background: no-repeat center/100%;
    z-index: 1;
  }
  .ppt::before{
    content: 'PPT';
  }
  .video::before{
    content: '视频';
  }
  .card img {
    width: 100%;
    height: 110px;
    /* border-radius: 10px 10px 0 0; */
  }
  
  .card-info{
    padding: 10px;
  }
  .worktitlebox{

      line-height:20px;
      font:12px  Hiragino Sans GB,Microsoft YaHei,Arial,sans-serif;
      font-size: 14px;
      color:#07111B;
      height: 38px;
      overflow:hidden
    }
  /* .worktitlebox h4:hover{
    
    color: b;
  } */
  .bottom-left{
    position: absolute;
    bottom: 5px;
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
    bottom: 2px;
  }

</style>
