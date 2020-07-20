<template>
  <div>
    <a class="item" v-for="(item,index) in list"
       :class="{isActive: currentIndex===index}"
       @click="isActive(index)">
      <slot :name="item" ></slot></a>
    <div class="inline"></div>
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
  .item{
    display: inline-block;
    color: #999 ;
    font-size: 12px;
    margin:0px 20px ;
  }
  .isActive{
    color: #000;
  }

  .inline{
    padding:10px 0 0;
    border-bottom: 1px solid rgba(0,0,0,.1);
  }

</style>
