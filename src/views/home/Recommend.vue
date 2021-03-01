<template>

  <!-- 精品推荐模块 -->
  <div class="box w">
    <div class="tb">
      <h3>精品推荐</h3>
      <a href="#">查看更多</a>
    </div>
    <div class="recommod">
      <div v-if="workList.length!=0" class="works-wrapper">
        <work-common
          v-for="(item,index) in workList"
          :key="index"
          class="card"
          :type="item.type"
          :title="item.worksTitle"
          :image="item.worksImg"
          :card-style="{ width:'230px'}"
          @click-image="clickCard(item.worksId)"
          @click-title="clickCard(item.worksId)"
        >
          <div slot="bottom-left" class="teacher">
            <Avatar :src="item.worksImg" shape="circle" size="small" />
            <span :title="item.worksTitle">{{ item.teacherName }}</span>
          </div>
        </work-common>
      </div>
      <div
        v-if="workList.length==0"
        else
        class="no-works"
      >
        <p>暂无作品！</p>
      </div>
    </div>
  </div>
</template>

<script>
import WorkCommon from '@/components/common/works/WorkCommon'
import { userWorkList } from '@/api/getData'
export default {
  name: 'Recommend',
  components: {
    WorkCommon
  },
  data() {
    return {
      workList: []
    }
  },

  created() {
    this.getRecommendWorks()
  },
  methods: {
    clickCard(id) {
      this.$router.push({
        name: 'work',
        params: { id }
      })
    },
    getRecommendWorks() {
      userWorkList({
        pagenum: 1
      }).then(res => {
        console.log(res)
        if (res.data.code === 200) {
          // this.workTotals  = res.data.data.total
          this.workList = res.data.data.usersWorks
          console.log(this.WorkList)
          // this.worksCount = res.data.data.worksHeat
        }
      })
    },
    enter(work) {
      this.$router.push({
        name: 'work',
        params: {
          id: work.worksId
        }
      })
    }
  }

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
  .works-wrapper {
    width: 100%;
    height: 400px;
    padding-left: 12px;
    padding-top: 5px;
  }
  .card {
    float:left;
    margin-right: 20px;
    margin-bottom: 20px;
    box-sizing: border-box;
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
