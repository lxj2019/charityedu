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
    <div class="works-container">
      <div class="info">
        <!-- <Icon type="md-checkmark-circle-outline" />：审核通过
        <Icon type="ios-checkmark-titlecircle-outline" />：审核通过 -->
        <span class="state">审核状态：</span>
        <span v-for="(item,key,index) in stateOptions" :key="index" class="item">
          <Icon :style="{color:item.color}" size="25" :type="item.icon" />{{ key }}
          <!-- <Tag type="border" color="default">{{ key }}</Tag> -->
        </span>
      </div>
      <div v-if="workList.length!=0" class="works-wrapper clearfix">
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
          <!--      右下角底部：“审核状态”-->
          <!--      右下角底部：“下拉菜单”-->
          <el-dropdown slot="bottom-right" placement="top" class="more">
            <Icon class="icon" :type="stateOptions[item.checkState].icon || 'md-warning'" size="25" :style="{color:stateOptions[item.checkState].color}" :title="item.checkState" />
            <el-dropdown-menu slot="dropdown" class="dropdown-menu">
              <el-dropdown-item @click.native="deleteWork(item.worksId)"><Icon type="ios-trash-outline" />删除</el-dropdown-item>
              <el-dropdown-item divided>投诉</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <!--      左上角：评分状态-->
          <!-- <Icon type="md-checkmark-circle-outline" />
          <Icon type="ios-checkmark-circle-outline" />
          <Icon type="ios-checkmark" />
          <Icon type="ios-close-circle-outline" />
          <Icon type="ios-cog-outline" />
          <Icon type="ios-create-outline" />
          <Icon type="md-sad" /> -->
          <span slot="top-left" class="time">{{ item.commentState }}</span>
        </work-common>
      </div>
      <div
        v-else
        class="no-works"
      >
        <!-- ..........<Icon type="ios-plane-outline" /> -->
        <Icon type="ios-book-outline" />
        <span>暂无作品！</span>
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
import { adminWorkList, searchAdminWorkList, deleteWork } from '@/api/admin'
import workList from '@/works.js'
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
      workList: workList,
      listShow: [],
      stateOptions: {
        作品失效: {
          icon: 'md-sad',
          color: 'red'
        },
        审核通过: {
          icon: 'ios-checkmark-circle-outline',
          color: 'blue'
        },
        未通过: {
          icon: 'ios-close-circle-outline',
          color: 'red'
        },
        未审核: {
          icon: 'ios-create-outline',
          color: 'red'
        },
        不明错误: {
          icon: 'md-warning',
          color: 'red'
        }
      }
    }
  },
  mounted() {
    // this.listShow=this.list
    this.getWorkList()
  },
  methods: {
    clickCard(id) {
      console.log(id)
      this.$router.push({
        name: '作品审核',
        params: { id }
      })
    },
    deleteWork(worksId) {
      this.$Modal.confirm({
        title: '警告',
        content: '<p>确定删除该作品吗？</p>',
        onOk: () => {
          deleteWork({ worksId }).then(res => {
            this.$Message.success('删除作品成功!')
            this.getWorkList()
          })
        },
        onCancel: () => {
          this.$Message.info('已取消删除')
        }
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

<style lang="scss" scoped>

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
  .info {
    width: 100%;
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
    background-color: #ffffff;
    margin-top: 10px;
    font-size: 15px;
    .item:not(:last-child){
      margin-right: 15px;
    }
    .icon {
      display: inline;
    }
  }
 .works-wrapper {
    width: 100%;
    height: 400px;
    padding-left: 12px;
    padding-top: 5px;
  }
  .card {
    float:left;
    margin-right: 10px;
    margin-bottom: 20px;
    box-sizing: border-box;
  }
   .no-works{
    width: 100%;
    height: 400px;
    line-height: 400px;
    text-align: center;
    font-size: 25px;
    color:#999
  }
  .teacher {
    height: 25px;
    overflow: hidden;
    line-height: 20px;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .teacher span {
    margin-right: 5px;
    font-size: 12px;
  }
</style>
