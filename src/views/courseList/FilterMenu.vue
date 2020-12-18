<template>
<!--  筛选菜单封装-->
  <div class="filter-box">
    <div class="item" v-for="(item,index) in list"
      :key="index"
       :class="{isActive: currentIndex===index}"
       @click="isActive(index)">
      <slot :name="item" ></slot>
      </div>
      <slot></slot>
    <!-- <div class="inline"></div> -->
  </div>
  
</template>

<script>
  export default {
    name: "FilterMenu",
    data(){
      return{
        list:['first','second','third','forth'],
        currentIndex:0
      }
    },
    methods:{
      isActive(index){
        return this.currentIndex = index
      }
    }
  }
</script>

<style scoped>
  .filter-box{
    height: 55px;;
    background-color: #fff;
    line-height: 55px;
  } 
  .item{
    width: 100px;
    height: 100%;
    text-align: center;
    display: inline-block;
    color: #999 ;
    font-size: 13px;
    cursor: pointer;
    padding:0 20px
  }
  .isActive{
    color: #409EFF;
    /* border-bottom:2px solid #409EFF; */
  }

  .inline{
    padding:10px 0 0;
    border-bottom: 1px solid rgba(0,0,0,.1);
  }

</style>
