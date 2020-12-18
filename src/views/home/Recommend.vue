<template>

  <!-- 精品推荐模块 -->
  <div class="box w">
    <div class="tb">
      <h3>精品推荐</h3>
      <a href="#">查看更多</a>
    </div>
    <div class="recommod">
        <div class="course-wrapper" v-if="workList.length!=0">
          <public-works 
          @click.native="enter(item)"
          class="course-list-works" 
          :works="item" 
          v-for="(item,index) in workList"
          :key="index"></public-works>  
        </div>
          <div else class="no-works"
          v-if="workList.length==0">
            <p>暂无作品！</p>
          </div>
    </div>
  </div>
</template>

<script>
  import PublicWorks from "../../components/common/works/PublicWorks";
  import {adminWorkList} from '@/api/getData'  
  export default {
    name: "Recommend",
    components:{
      PublicWorks
    },
    data(){
      return{
        workList:[],
      }
    },

    created(){
      this.getRecommendWorks()
    },
    methods:{
      getRecommendWorks(){
        adminWorkList({
          pagenum :1
        }).then(res=>{
          console.log(res)
          if(res.data.code == 200){
            // this.workTotals  = res.data.data.total
            this.workList = res.data.data.managerWorks
            this.worksCount = res.data.data.worksCount
          }
        })
      },
      enter(work){
        this.$router.push({
          name:'video',
          params: {
          id:work.worksId
        }
      })
      }
    },
    
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
    width: 100%;
    /* background-color: #fff; */
  }
  .course-wrapper{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  .course-list-works{
    margin-bottom: 15px;
  }
  .no-works{
    width: 100%;
    height: 200px;
    text-align: center;
    color:steelblue;
    font-size: 16px;
  }


</style>
