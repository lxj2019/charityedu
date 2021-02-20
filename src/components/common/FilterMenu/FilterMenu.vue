<template>
  <!--  筛选菜单封装-->
  <div class="menu-wrapper">
    <a
      v-for="(item,index) in list"
      :key="index"
      class="item"
      :class="{isActive: currentIndex===index}"
      @click="isActive(index)"
    >
      <slot :name="item" /></a>
    <slot />
    <div class="inline" />
  </div>
</template>

<script>
export default {
  name: 'FilterMenu',
  data() {
    return {
      list: ['first', 'second', 'third', 'forth'],
      currentIndex: 0
    }
  },
  methods: {
    isActive(index) {
      this.currentIndex = index
    }
  }
}
</script>

<style scoped>
  .menu-wrapper{
    display: inline-block;
    width:100%;
    height:50px;
    line-height: 50px;
    color: #999 ;
    font-size: 13px;
    border-bottom: 1px solid rgba(0,0,0,.1);
  }
  .item{
    margin: 0 20px;
  }
  .isActive{
    color: #777;
  }

  .inline{
    /* padding:10px 0 0; */

  }

</style>
