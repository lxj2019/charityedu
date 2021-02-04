<template>
  <div class="collectBox">
    <!--    重用筛选导航组件-->
    <filter-menu class="top">
      <span slot="first" @click="listShow=list">全部作品</span>
      <span slot="second" @click="select('commentState')">已评分/未评分</span>
      <span slot="third" @click="select('checkstate')"> 已审核/未审核</span>
      <Input
        v-model="searchInfo"
        class="work-search"
        search
        placeholder="查找作品名称"
        @on-search="searchWorkList"
      />
    </filter-menu>
    <!--    应用封装好的”审核作品“组件-->
    <div class="works-wrapper">
      <div v-for="(item,index) in workList" :key="index" class="collect" @click="enter(item)">
        <work-common
          :work-width="'155px'"
          :work-height="'190px'"
          class="collection-works"
          placement="top"
          :works="item"
        >
          <!--      /*左下角底部:作者名称和头像*/-->
          <div slot="bottom-left" class="author">
            <img class="avatar" :src="item.worksImg" alt="用户头像"><span>{{ item.teacherName }}</span>
          </div>
          <!--      右下角底部：“审核状态”-->
          <div slot="bottom-right">
            <span>{{ item.checkState }}</span>
          </div>
          <!--      左上角：评分状态-->
          <span slot="top-left" class="time">{{ item.commentState }}</span>
        </work-common>
      </div>
    </div>
    <Page
      :total="workTotals"
      style="float:right;margin:20px"
      show-total
      show-elevator
      @on-change="changePagenum"
    />
  </div>
</template>

<script>
import WorkCommon from '@/components/common/works/WorkCommon'
import FilterMenu from '@/components/common/FilterMenu/FilterMenu'
import { adminWorkList, searchAdminWorkList } from '@/api/getData'

export default {
  name: 'MyClass',
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
    enter(work) {
      // this.$router.push('/assessCheck/'+this.works.src)
      this.$router.push({
        name: 'video',
        params: {
          id: work.worksId
        }
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
  .works-wrapper{
    width: 100%;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding-left: 10px;
  }

  .collection-works{
    margin:10px 6px;
    flex: 1;
    /*当动画效果变大时，才不会撑开盒子*/
    /* box-sizing: border-box; */
  }
 .author .avatar{
    width: 25px;
    height: 25px;
    border-radius: 12px;
    vertical-align: middle;
  }
  .author span {
    font-size: 12px;
    color: #999999;
  }
</style>
