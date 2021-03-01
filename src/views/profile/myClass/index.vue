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
        placeholder="根据作品名称查找"
        @on-search="searchWorkList"
      />
    </filter-menu>
    <div class="works-container">
      <div class="icon-box">
        <!-- <Icon type="md-checkmark-circle-outline" />：审核通过
        <Icon type="ios-checkmark-titlecircle-outline" />：审核通过 -->
        <span class="title">状态说明：</span>
        <Icon class="icon" size="25" type="ios-checkmark-circle-outline" /><Tag type="border" color="default">审核通过</Tag>、
        <Icon class="icon" style="color:#bf3553;font-weight:bold" size="25" type="ios-close-circle-outline" /><Tag type="border" color="default">未通过</Tag>、
        <Icon class="icon" size="25" type="ios-create-outline" /><Tag type="border" color="default">未审核</Tag>、
        <Icon class="icon" size="25" type="md-sad" /><Tag type="border" color="default">作品失效</Tag>、
        <Icon class="icon" size="25" type="md-warning" /><Tag type="border" color="default">不明错误</Tag>
      </div>
      <div v-if="workList.length!=0" class="works-wrapper clearfix">
        <work-common
          v-for="(item,index) in workList"
          :key="index"
          class="card"
          :type="item.type"
          :title="item.worksTitle"
          :image="item.worksImg"
          :card-style="{ width:'160px'}"
          @click-image="clickCard(item.worksId)"
          @click-title="clickCard(item.worksId)"
        >
          <!--      右下角底部：“审核状态”-->
          <div slot="bottom-right">
            <el-dropdown slot="bottom-right" placement="top" class="more">
              <Icon :type="stateOptions[item.checkState] || 'md-warning'" size="25" style="color:#aaa" :title="item.checkState" />
              <el-dropdown-menu slot="dropdown" class="dropdown-menu">
                <el-dropdown-item @click.native="deleteWork(item.worksId)"><Icon type="ios-trash-outline" />删除</el-dropdown-item>
                <el-dropdown-item divided><Icon type="ios-trash-outline" />投诉</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>

        </work-common>
        <!-- <Page
          :total="workTotals"
          style="float:right;margin:20px"
          show-total
          show-elevator
          @on-change="changePagenum"
        /> -->
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
import { myWorksList, deleteMyWork } from '@/api/myWork'
// import workList from '@/works.js'
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
      listShow: [],
      stateOptions: {
        作品失效: 'md-sad',
        审核通过: 'ios-checkmark-circle-outline',
        未通过: 'ios-close-circle-outline',
        未审核: 'ios-create-outline'
      }
    }
  },
  mounted() {
    // this.listShow=this.list
    this.getWorkList()
  },
  methods: {
    deleteWork(worksId) {
      this.$Modal.confirm({
        title: '警告',
        content: '<p>确定删除该作品吗？</p>',
        onOk: () => {
          deleteMyWork({ worksId }).then(res => {
            this.$Message.success('删除作品成功!')
            this.getWorkList()
          })
        },
        onCancel: () => {
          this.$Message.info('已取消删除')
        }
      })
    },
    clickCard(id) {
      this.$router.push({
        name: 'work',
        params: { id }
      })
    },
    deleteMyWork(worksId) {
      deleteMyWork({ worksId }).then(res => {
        this.getWorkList()
        this.$Message.success('删除成功')
      })
    },
    getWorkList() {
      myWorksList({
        pagenum: this.pagenum
      }).then(res => {
        // console.log(res)
        this.workTotals = res.data.data.total
        this.workList = res.data.data
      })
    },
    searchWorkList() {
      // searchAdminWorkList({
      //   content: this.searchInfo,
      //   pagenum: this.pagenum
      // }).then(res => {
      //   this.workTotals = res.data.data.total
      //   this.workList = res.data.data.managerWorks
      // })
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
<style>
.ivu-dropdown-menu .dropdown-menu{
  margin:0;
  z-index: 100;

}
ivu-select-dropdown {
  position: abs;

}
</style>
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
 .works-wrapper {
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
  .icon-box {
    padding: 0 0 20px 20px;
  }
  .icon-box .title {
    color: rgb(0, 0, 0);
    font-size:13px
  }
  .icon-box Tag {
    vertical-align: top;
  }
  .no-works {
    width: 100%;
    height: 100%;
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
