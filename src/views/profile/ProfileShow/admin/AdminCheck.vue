<template>
  <div class="collectBox">
<!--    重用筛选导航组件-->
    <filter-menu class="top">
      <span slot="first" @click="listShow=list">全部作品</span>
      <span slot="second" @click="select('commentState')">已评分/未评分</span>
      <span slot="third" @click="select('checkstate')"> 已审核/未审核</span>
    </filter-menu>
<!--    应用封装好的”审核作品“组件-->
    <div class="collect" >
      <check-works class="collection-works" :works="item" v-for="item in listShow"></check-works>
    </div>
  </div>
</template>

<script>
  import CheckWorks from "../../../../components/common/works/CheckWorks";
  import FilterMenu from "../FilterMenu/FilterMenu";

  export default {
    name: "MyClass",
    components:{
      FilterMenu,
      CheckWorks
    },
    data(){
      return{
        list:[
          {worktitle:"二元一次方程",teachername:"鲁信",
          img:"https://edu-image.nosdn.127.net/F355766D26A19A259FD020126628FD36.png",
          src:"112",type:"video",commentState:"已评分",checkstate:"已审核通过"},
          {worktitle:"六元一次方程",teachername:"鲁信",
            img:"https://edu-image.nosdn.127.net/F355766D26A19A259FD020126628FD36.png",
            src:"112",type:"video",commentState:"未评分",checkstate:"未审核通过"},
      {worktitle:"六元一次方程",teachername:"鲁信",
        img:"https://edu-image.nosdn.127.net/F355766D26A19A259FD020126628FD36.png",
        src:"112",type:"video",commentState:"未评分",checkstate:"已审核通过"},
          {worktitle:"六元一次方程",teachername:"鲁信",
            img:"https://edu-image.nosdn.127.net/F355766D26A19A259FD020126628FD36.png",
            src:"112",type:"video",commentState:"未评分",checkstate:"未审核通过"},
          {worktitle:"六元一次方程",teachername:"鲁信",
            img:"https://edu-image.nosdn.127.net/F355766D26A19A259FD020126628FD36.png",
            src:"112",type:"video",commentState:"已评分",checkstate:"已审核通过"}
            ],
        listShow:[],
      }

    },
    methods: {
      sort(type) {                     // 排序
        this.listShow = this.list;
        this.order = !this.order;		// 更改为 升序或降序
        this.sortType = type;
        this.listShow.sort(this.compare(type));
        // 调用下面 compare 方法 并传值
      },
      compare(attr) {                  // 排序方法
        let that = this;
        return function (a, b) {
          let val1 = a[attr];
          let val2 = b[attr];
          if (that.order) {               //升序
            if (that.sortType == 'publishtime') {            // 如果是时间就转换成时间格式
              return new Date(val2.replace(/-/, '/')) - new Date(val1.replace(/-/, '/'));
            } else {
              return val2 - val1;
            }
          } else {                          //降序
            if (that.sortType == 'publishtime') {
              return new Date(val1.replace(/-/, '/')) - new Date(val2.replace(/-/, '/'));
            } else {
              return val1 - val2;
            }
          }
        }
      },

      select(type) {
        if(type=='checkstate')
          this.listShow = this.list.filter((item)=>{
            return item.checkstate=='已审核通过'
          })
        else this.listShow = this.list.filter((item)=>{
          return item.commentState=='已评分'
        })
      },
    },
    mounted() {
      this.listShow=this.list
    }
  }
</script>

<style scoped>
  .collectBox{
    width:100%;
    height: 100%;
  }
  .collect{

    /*display: flex;*/
    /*justify-content: space-around;*/
    /*width: 100%;*/

    /*flex-wrap: wrap;*/
    /*overflow: auto;*/
    /*margin: 20px;*/
  }
  .collection-works{
    position: relative;
    float: left;
    padding:5px;
    flex: 1;
    /*当动画效果变大时，才不会撑开盒子*/
    box-sizing: border-box;
  }

</style>
