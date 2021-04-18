<template>
  <div class="work-container">
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
      <div class="info">
        <span class="state">状态说明：</span>
        <span v-for="(item,key,index) in stateOptions" :key="index" class="item">
          <Icon :style="{color:item.color}" size="25" :type="item.icon" />{{ key }}
          <!-- <Tag type="border" color="default">{{ key }}</Tag> -->
        </span>
      </div>
      <!-- <div v-if="workList.length!=0" class="works-wrapper clearfix">
        <work-common
          v-for="(item,index) in workList"
          :key="index"
          class="card"
          :type="item.type"
          :title="item.worksTitle"
          :image="item.worksImg"
          :card-style="{ width:'178px'}"
          @click-image="clickCard(item.worksId)"
          @click-title="clickCard(item.worksId)"
        >
          <div slot="bottom-right">
            <el-dropdown slot="bottom-right" placement="top" class="more">
              <Icon class="icon" :type="stateOptions[item.checkState].icon || 'md-warning'" size="25" :style="{color:stateOptions[item.checkState].color}" :title="item.checkState" />
              <el-dropdown-menu slot="dropdown" class="dropdown-menu">
                <el-dropdown-item @click.native="deleteWork(item.worksId)"><Icon type="ios-trash-outline" />删除</el-dropdown-item>
                <el-dropdown-item divided @click.native="clickEdit(item)"><Icon type="ios-trash-outline" />编辑</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </work-common>
      </div> -->

      <div v-for="(item,index) in workList" :key="index" class="work-card">
        <image-cropper class="work-img" :fixed-width="170" :fixed-number="[16,9]" :img-url="item.worksImg" @on-change="updateImg($event,item.worksId)" />
        <div class="work-info">
          <p class="title">{{ item.worksTitle }}</p>
          <p class="time">投稿时间：<span>2021/21/31 20:22:11</span></p>
          <p v-if="item.worksHeat" class="icon-bar">
            <span class="icon-box">
              <Icon class="icon" type="md-thumbs-up" />
              {{ item.worksHeat.applaudNum | transForm }}
            </span>
            <span class="icon-box">
              <Icon class="icon" type="md-heart" />
              {{ item.worksHeat.collectNum | transForm }}</span>
            <span class="icon-box">
              <Icon class="icon" type="md-star" />
              {{ item.worksHeat.collectNum | transForm }}</span>
          </p>
        </div>
        <div class="button-bar">
          <Button :disabled="item.checkState != '审核通过'" :title="item.checkState != '审核通过'? '未审核通过不能编辑':'编辑'" icon="ios-create-outline" @click="clickEdit(item)">修改</Button>
          <Button icon="ios-trash-outline" @click="deleteWork(item.worksId)">删除</Button>
        </div>
        <Icon class="state-icon" :type="stateOptions[item.checkState].icon || 'md-warning'" size="25" :style="{color:stateOptions[item.checkState].color}" :title="item.checkState" />
      </div>
      <div
        v-if="workList.length==0"
        class="no-works"
      >
        <Icon class="icon" type="ios-folder-open-outline" />
        <span>暂无作品</span>
      </div>
    </div>
    <Page
      :total="workTotals"
      style="float:right;margin:20px"
      show-total
      show-elevator
      @on-change="changePagenum"
    />
    <update-modal :is-visible.sync="modalVisible" :works-id="worksId" />
  </div>
</template>

<script>
// import WorkCommon from '@/components/common/works/WorkCommon'
import FilterMenu from '@/components/common/FilterMenu/FilterMenu'
import { myWorksList, deleteMyWork, updateWorkImg } from '@/api/teacher/worksManage'
import imageCropper from '@/components/common/upload/imageCropper'
import UpdateModal from './UpdateModal.vue'
// import workList from '@/works.js'
export default {
  name: 'MyClass',
  components: {
    FilterMenu,
    // WorkCommon,
    UpdateModal,
    imageCropper
  },
  filters: {
    transForm(num) {
      if (num >= 10000000) return (num / 10000000).toFixed(1) + 'kw'
      if (num >= 10000) return (num / 10000).toFixed(1) + 'w'
      if (num >= 1000) return (num / 1000).toFixed(1) + 'k'
      return num
    }
  },
  data() {
    return {
      pagenum: 1,
      searchInfo: '',
      workTotals: 0,
      workList: [],
      modalVisible: false,
      worksId: 0,
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
    clickEdit(item) {
      // console.log(item)
      this.worksId = item.worksId
      this.modalVisible = true
      // this.$router.push({
      //   path: '/teacher/upload',
      //   query: {
      //     id,
      //     type: 'edit'
      //   }
      // })
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
        this.workTotals = res.data.data.length
        this.workList = res.data.data
      })
    },
    // 修改作品封面
    updateImg(data, workId) {
      const worksImg = new window.File([data], `${new Date().getTime()}.png`, { type: data.type })
      const formData = new FormData()
      this.worksImg = data.worksImg
      this.workId = workId
      console.log(worksImg, workId)
      formData.append('img', worksImg)
      // formData.append('workId', workId)
      console.log(formData)
      updateWorkImg({ workId }, formData).then(res => {
        this.$Message.success('封面修改成功')
      }).catch(() => {
        setTimeout(() => {
          // this.$router.go(0)
        }, 200)
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
<style lang="scss" scoped>
  .work-container {
    display: relative;
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
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
  }
 .info {
    width: 100%;
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
    background-color: #ffffff;
    margin-top: 10px;
    font-size: 13px;
    color: #000;
    .item:not(:last-child){
      margin-right: 15px;
    }
    .icon {
      display: inline;
    }
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
  .work-card {
    position: relative;
    width: 100%;
    padding: 20px 0;
    border-bottom: 1px solid rgba(0, 0, 0, .1);
    &:last-child {
      border-bottom: none;
    }
    .work-img {
      display: inline-block;
      margin-right: 20px;
    }
    .work-info {
      padding-top:5px;
      display: inline-block;
      vertical-align: top;
      height: 100%;
      color: #666;
      .title {
        margin-bottom: 8px;
        font-size: 16px;
        color: #212121;
        cursor: pointer;
        &:hover {
          color: skyblue
        }
      }
      .time {
        margin: 10px 0;
        color: #505050;
        font-size: 14px;
        span {
         color: #888;
        }
      }
      .icon-bar {
        color: #999;
        .icon-box {
          display: inline-block;
          overflow: hidden;
          white-space: nowrap;
          // text-overflow: ellipsis;
          width: 60px;
          margin-right: 10px;
          font-size: 12px;
          .icon {
          font-size: 18px;
        }
        }
      }
    }
    .button-bar {
      position: absolute;
      right: 0;
      top:50%;
      transform: translateY(-50%);
      button {
        margin-right: 10px
      }
    }
    .state-icon {
      position: absolute;
      right: 0;
      top: 20px;
    }
  }
</style>
