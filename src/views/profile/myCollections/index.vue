<template>
  <div class="collectBox">
    <!--    重用筛选导航组件-->
    <filter-menu class="top">
      <span slot="first" @click="listShow=list">全部收藏</span>
      <span slot="second" @click="select('commentState')">最近收藏</span>
      <span slot="third" @click="select('checkstate')">最多播放</span>
      <Input
        v-model="searchInfo"
        class="work-search"
        search
        placeholder="根据作品名称查找"
        @on-search="searchWorkList"
      />
    </filter-menu>
    <div class="course-container">
      <div v-if="workList.length!=0" class="course-wrapper clear-fix">
        <work-common
          v-for="(item,index) in workList"
          :key="index"
          class="card"
          :type="item.type"
          :title="item.worksTitle"
          :image="item.worksImg"
          :card-style="{ width:'160px'}"
          @click-image="clickCard(item.id)"
          @click-title="clickCard(item.id)"
        >
          <div slot="bottom-left" class="teacher">
            <img class="avatar" :src="item.worksImg" alt="头像">
            <span :title="item.worksTitle">{{ item.worksTitle }}</span>
          </div>
        </work-common>
        <Page
          :total="workTotals"
          style="float:right;margin:20px"
          show-total
          show-elevator
          @on-change="changePagenum"
        />
      </div>
      <div
        v-if="workList.length==0"
        class="no-works"
      >
        <Icon class="icon" type="ios-folder-open-outline" />
        <span>空空如也</span>
      </div>
    </div>
  </div>
</template>

<script>
import WorkCommon from '@/components/common/works/WorkCommon'
import FilterMenu from '@/components/common/FilterMenu/FilterMenu'
import { adminWorkList, searchAdminWorkList } from '@/api/getData'
// import workList from '@/works.js'
export default {
  name: 'MyCollections',
  components: {
    FilterMenu,
    WorkCommon
  },
  data() {
    return {
      pagenum: 1,
      searchInfo: '',
      workTotals: 0,
      workList: [],
      listShow: []
    }
  },
  mounted() {
    // this.listShow=this.list
    this.getWorkList()
  },
  methods: {
    clickCard(id) {
      this.$router.push({
        name: 'work',
        params: { id }
      })
    },
    getWorkList() {
      adminWorkList({
        pagenum: this.pagenum
      }).then(res => {
        // console.log(res)
        this.workTotals = res.data.data.total
        this.workList = res.data.data.managerWorks
      })
    },
    searchWorkList() {
      searchAdminWorkList({
        content: this.searchInfo,
        pagenum: this.pagenum
      }).then(res => {
        this.workTotals = res.data.data.total
        this.workList = res.data.data.managerWorks
      })
    },
    // 页码改变的回调，返回改变后的页码
    changePagenum(val) {
      this.pagenum = val
      this.getWorkList()
    },
    sort(type) { // 排序
      this.listShow = this.list
      // 更改为 升序或降序
      this.order = !this.order
      this.sortType = type
      this.listShow.sort(this.compare(type))
      // 调用下面 compare 方法 并传值
    },
    compare(attr) { // 排序方法
      const that = this
      return function(a, b) {
        const val1 = a[attr]
        const val2 = b[attr]
        if (that.order) { // 升序
          if (that.sortType === 'publishtime') { // 如果是时间就转换成时间格式
            return new Date(val2.replace(/-/, '/')) - new Date(val1.replace(/-/, '/'))
          } else {
            return val2 - val1
          }
        } else { // 降序
          if (that.sortType === 'publishtime') {
            return new Date(val1.replace(/-/, '/')) - new Date(val2.replace(/-/, '/'))
          } else {
            return val1 - val2
          }
        }
      }
    },

    select(type) {
      if (type === 'checkstate') {
        this.listShow = this.list.filter((item) => {
          return item.checkstate === '已审核通过'
        })
      } else {
        this.listShow = this.list.filter((item) => {
          return item.commentState === '已评分'
        })
      }
    }
  }
}
</script>

<style scoped>
  .collectBox{
    width:100%;
    height: 100%;
  }
  .top{
    position: relative;
  }
  .work-search{
    display: inline-block;
    position: absolute;
    width:250px;
    transform: translateY(-50%);
    right: 10px;
    top:50%;
  }
 .course-wrapper {
    width: 100%;
    height: 100%;
    padding-left: 12px;
  }
  .card {
    float:left;
    margin-right: 10px;
    margin-bottom: 20px;
    box-sizing: border-box;
  }
  .teacher {
    height: 30px;
    overflow: hidden;
    line-height: 30px;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .teacher .avatar{
    width:25px;
    height: 25px;
    vertical-align: top;
    border-radius: 50%;
  }
  .teacher span {
    display: inline;
    margin-left: 5px;
    font-size: 12px;
    font-weight: 100;
  }
  .no-works {
    width: 100%;
    text-align: center;
    color:skyblue;
    font-size: 20px;
  }
  .no-works .icon {
    margin-top:100px;
    display: block;
    font-size: 80px;
  }
</style>
