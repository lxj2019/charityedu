<template>
  <div class="course-box w">
    <div class="course-menu">
      <div class="menu-title">
        <i class="el-icon-reading" />
        <span style="margin-left:10px">课程列表</span>
      </div>
      <course-menu
        @setIndex="getIndex"
      />
    </div>
    <div class="course-list">
      <!--        应用封装好的”筛选菜单“组件-->
      <filter-menu class="course-filter">
        <span slot="first">全部</span>
        <span slot="second" @click="sort('applaudnum')">最多点赞</span>
        <span slot="third" @click="sort('worksClickNum')">最多播放</span>
        <span slot="forth" @click="sort('publishtime')">最近发布</span>
        <Input
          v-model="searchInfo"
          class="work-search"
          search
          placeholder="查找作品名称"
          @on-search="searchWorkList"
        />
      </filter-menu>
      <div>
        <div v-if="workList.length!=0" class="works-wrapper clearfix">
          <work-common
            v-for="(item,index) in workList"
            :key="index"
            class="card"
            :type="item.type"
            :title="item.worksTitle"
            :image="item.worksImg"
            @click-image="clickCard(item.worksId)"
            @click-title="clickCard(item.worksId)"
          >
            <div slot="bottom-left" class="teacher">
              <Avatar :src="item.worksImg" shape="circle" size="small" />
              <span :title="item.worksTitle">{{ item.worksTitle }}</span>
            </div>
            <!--      右下角底部：“下拉菜单”-->
            <el-dropdown slot="bottom-right" placement="top" class="more">
              <Icon class="icon" size="20" type="ios-cog-outline" />
              <el-dropdown-menu slot="dropdown" class="dropdown-menu">
                <el-dropdown-item>不感兴趣</el-dropdown-item>
                <el-dropdown-item divided>投诉</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </work-common>
        </div>
        <div
          v-if="workList.length==0"
          class="no-works"
        >
          <p>暂无作品！</p>
        </div>
        <Page
          :total="workTotals"
          style="float:right"
          show-elevator
          @on-change="changePagenum"
        />
      </div>
    </div>
  </div>

</template>

<script>
import { userWorkList, searchUserWorkList } from '@/api/getData'
import FilterMenu from './FilterMenu'
import CourseMenu from './CourseMenu'
import WorkCommon from '@/components/common/works/WorkCommon.vue'
// import workList from '@/works.js'
export default {
  name: 'CourseList',
  components: {
    CourseMenu, FilterMenu, WorkCommon
  },
  data() {
    return {
      xIndex: 0,
      yIndex: 0,
      pagenum: 1,
      searchInfo: '',
      workTotals: 10,
      bookname: '三年级上册',
      knowledgeid: 1,
      workList: []
    }
  },
  computed: {
    // booksList(){
    //   return this.book.list[this.xIndex].list[this.yIndex].list
    // }
  },
  created() {
    this.userWorkList()
    // this.workList = res.data.data.managerWorks
  },
  methods: {
    clickCard(id) {
      console.log(id)
      this.$router.push({
        name: 'work',
        params: {
          id
        }
      })
    },
    getIndex(item) {
      this.xIndex = item[0]
      this.yIndex = item[1]
    },
    searchWorkList() {
      searchUserWorkList({
        content: this.searchInfo,
        pagenum: this.pagenum
      }).then(res => {
        this.workTotals = res.data.data.total
        this.workList = res.data.data.usersWorks
      })
    },
    userWorkList() {
      userWorkList({
        pagenum: 1
      }).then(res => {
        this.workTotals = res.data.data.total
        this.workList = res.data.data.usersWorks
      })
    },
    changePagenum(val) {
      this.pagenum = val
      this.userWorkList()
    },
    sort(type) { // 排序
      this.order = !this.order// 更改为 升序或降序
      this.sortType = type
      this.booksList.sort(this.compare(type))
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
    }
  }
}

</script>
<style>
.ivu-select-dropdown {
  /* position:relative !important;
  top: 0  !important;
  left:0  !important;
  padding: 5px;
  z-index: 1000  !important; */
}
/* .ivu-dropdown-menu .dropdown-menu{
  margin:0;
  z-index: 100;

} */
/* ivu-select-dropdown {
  position: abs;

} */
</style>
<style lang="scss" scoped>
  .course-box{
    display: flex;
    justify-content: space-between;
    margin:50px auto;
  }
  .course-filter{
    position: relative;
    margin-bottom: 15px;
  }
  .work-search{
    display: inline-block;
    position: absolute;
    width:250px;
    transform: translateY(-50%);
    right: 10px;
    top:50%;
  }
  .course-menu{
    width:200px;
    height: 500px;
    /*display: inline-block;*/
    margin-right: 10px;
  }
  .menu-title{
    width: 100%;
    height: 55px;
    color:#fff;
    font-size: 14px;
    text-align: center;
    line-height: 55px;
    background-color: #409EFF;
    margin-bottom: 15px;
  }

  .course-list{
    flex:1;

  }
  .works-wrapper {
    width: 100%;
    height: 100%;
  }
  .card {
    float:left;
    margin-right: 12px;
    margin-bottom: 20px;
    box-sizing: border-box;
  }
   .no-works{
    width: 100%;
    height: 200px;
    text-align: center;
    color:steelblue;
    font-size: 16px;
  }
  .teacher {
    height: 30px;
    overflow: hidden;
    line-height: 30px;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .teacher span {
    margin-right: 5px;
    font-size: 12px;
  }
  .more {
    .icon {
      color: #aaa
    }
  }
</style>
