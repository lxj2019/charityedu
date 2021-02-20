<template>
  <div class="box">
    <!--  左边视频与评论区-->
    <div class="work-left">
      <!--    视频信息区-->
      <div class="work-info">
        <h1 class="work-title">{{ work.worksTitle }}</h1>
        <!-- <div><span>{{work.type}}</span><span>{{work.publicTime}}</span></div> -->
        {{ work.worksLink }}
        <p><span>{{ worksCount.worksClickNum }}播放</span><span>未经作者授权，禁止转载</span></p>
      </div>
      <!--    视频-->
      <video-show
        v-if="false"
        :works-link="work.worksLink"
        class="work-show"
      />

      <button @click="getNumPages('http://image.cache.timepack.cn/nodejs.pdf')">加载</button>
      {{ load }}
      <el-scrollbar style="height: 500px">
        <pdf
          :src="pdfSrc"
          class="pdf-container"
          :page="currentPage"
          @num-pages="pageTotalNum=$event"
          @page-loaded="currentPage=$event"
          @loaded="loadPdfHandler"
          @error="pdfError($event)"
          @progress="load = $event"
        />
      </el-scrollbar>
      {{ currentPage }} / {{ pageTotalNum }}<Page size="small" show-elevator />
      <div class="arrow">
        <span class="turn" :class="{grey: currentPage==1}" @click="prePage">Preview</span>

        <span class="turn" :class="{grey: currentPage==pageTotalNum}" @click="nextPage">Next</span>
      </div>
      <!--    点赞收藏-->
      <div class="praise-box">
        <span class="icon-box">
          <Icon
            class="icon"
            :class="{active:work.like}"
            type="md-thumbs-up"
            @click="addLike"
          />
          <span>{{ worksCount.applaudNum }}</span></span>
        <span class="icon-box"><Icon
          class="icon"
          :class="{active:work.collect}"
          type="md-heart"
          @click="collect"
        />{{ worksCount.applaudNum }}</span>
        <span class="icon-box"><Icon class="icon" type="md-star" />{{ worksCount.applaudNum }}</span>
      </div>
      <!--    视频简介-->
      <div class="summary">
        {{ work.worksIntroduction }}
      </div>
      <div class="line" />

      <!--    评论区-->
      <div class="comment">
        <h2>评论区：</h2>
        <filter-menu>
          <span slot="first" @click="sort('time',true)">按时间排序</span>
          <span slot="second" @click="sort('applaudnum',false)">按热度排序</span>
        </filter-menu>
        <!--      我的评论-->
        <my-comment :work-id="worksId" @getComments="getComments" />

        <!--      他人评论区-->
        <comment-box v-for="(item,index) in commentlist" :key="index" :comment="item" />
      </div>
      </pdf></div>
    <!--  右边推荐区-->
    <div class="video-right" />
  </div>
</template>

<script>

import { getComments, addLike, addClick, collect, getUnreviewedWorkInfo } from '@/api/video'
import FilterMenu from '@/components/common/FilterMenu/FilterMenu'
import CommentBox from './CommentBox'
import VideoShow from './VideoShow'
import MyComment from './MyComment'
import pdf from 'vue-pdf'
export default {
  name: 'Work',
  components: {
    FilterMenu, CommentBox, VideoShow, MyComment, pdf
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.worksId = Number(to.params.id)
      // getWorkInfo(vm.worksId, () => {
      //   vm.getComments(vm.worksId)
      //   vm.addClick(vm.worksId)
      // })
    })
  },
  data() {
    return {
      work: {},
      commentlist: [],
      worksId: 0,
      worksCount: {},
      order: true,
      pdfSrc: 'http://image.cache.timepack.cn/nodejs.pdf',
      load: 0,
      currentPage: 0, // pdf文件页码
      pageTotalNum: 0 // pdf文件总页数
      // src: '' // pdf文件地址ddn.com/TFT%E6%98%BE%E7%A4%BA%E6%8E%A8%E5%B9%BF%E8%B5%84%E6%96%99PPT%E5%88%9D%E7%A8%BF-20201125.pptx'
    }
  },
  computed: {
    src() {
      const url = 'http://view.officeapps.live.com/op/view.aspx?src=' + `${encodeURI('http://47.112.148.42:8443/charityedu/works/ppt/dacfce78bf7f3e3ab8a6989374c911f4.pptx')}`
      console.log(url)
      return 'http://view.officeapps.live.com/op/view.aspx?src=' + `${encodeURI('http://47.112.148.42:8443/charityedu/works/ppt/dacfce78bf7f3e3ab8a6989374c911f4.pptx')}`
    }
  },
  created() {
    // this.getNumPages('http://image.cache.timepack.cn/nodejs.pdf')
  },
  mounted() {
    //  this.addClick()

  },
  methods: {
    abc(e) {
      console.log(e)
    },
    getNumPages(url) {
      console.log('gg')
      var loadingTask = pdf.createLoadingTask(url)
      loadingTask.promise.then((pdf) => {
        console.log(pdf)
        this.pdfSrc = loadingTask
        this.pageTotalNum = pdf.numPages
      }).catch((err) => {
        console.error('pdf加载失败', err)
      })
    },
    // 上一页函数，
    prePage() {
      let page = this.currentPage
      page = page > 1 ? page - 1 : this.pageTotalNum
      this.currentPage = page
    },
    // 下一页函数
    nextPage() {
      let page = this.currentPage
      page = page < this.pageTotalNum ? page + 1 : 1
      this.currentPage = page
    },
    getWorkInfo(worksid, callback) {
      getUnreviewedWorkInfo({ worksid }).then(res => {
        if (res.data.code === 200) {
          this.work = res.data.data
          this.worksCount = res.data.data.worksCount
          if (typeof callback === 'function') {
            callback()
          }
        }
      })
    },

    // pdf加载时
    loadPdfHandler (e) {
      console.log(e)
      this.currentPage = 1 // 加载的时候先加载第一页
    },
    // 加载失败
    pdfError(error) {
      console.error(error)
    },

    // 点赞
    addLike() {
      addLike({ worksId: this.work.worksId }).then(res => {
        this.getWorkInfo()
        this.$Message.success(res.data.message)
      })
    },
    // 收藏作品
    collect() {
      collect({
        worksId: this.work.worksId
      }).then(res => {
        if (res.data.code === 200) {
          this.getWorkInfo(this.worksId)
          this.$Message.success(res.data.message)
        }
      })
    },
    // 增加播放量
    addClick(worksId) {
      setTimeout(() => {
        addClick({ worksId }).then(res => {
          console.log('播放量+1')
        })
      }, 10000)
    },
    getComments(worksid) {
      getComments({
        worksid,
        pagenum: 1
      }).then(res => {
        // console.log(res)
        this.commentlist = res.data.data.comments
      })
    },
    sort(type, isTime) { // 排序
      this.order = !this.order// 更改为 升序或降序
      this.sortType = type
      this.work.commentlist.sort(this.compare(type, isTime))
      // 调用下面 compare 方法 并传值
    },
    compare(attr, isTime) { // 排序方法
      const that = this
      return function(a, b) {
        const val1 = a[attr]
        const val2 = b[attr]
        if (that.order) { // 升序
          if (isTime) { // 如果是时间就转换成时间格式
            return new Date(val2.replace(/-/, '/')) - new Date(val1.replace(/-/, '/'))
          } else {
            return val2 - val1
          }
        } else { // 降序
          if (isTime) {
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

<style scoped>
.box{
  width: 1000px;
  margin:20px auto;
}
.work-left{
  position: relative;
  float: left;
  width: 70%;
  height: 800px;
  /*background-color: pink;*/
}
.work-info span{
  font-size: 12px;
  color: #999999;
  line-height: 1.15;
  margin: 11px 11px 11px 0;
}
.work-left .work-title{
  font-size: 18px;
  font-weight: 500;
  color: #212121;
  margin-bottom: 5px;
}
.work-show{
  margin-top: 15px;
}
.pdf-container {
}
.video-right{
  float: right;
  width: 26%;
  height: 500px;
  background-color: pink;
 }
.praise-box{
  height: 60px;
  line-height: 60px;
  border-bottom: 1px solid rgba(0,0,0,.1);;
}

.icon-box {
  display: flex;
  /* align-items: center; */
  vertical-align: middle;
  display: inline-block;
  margin-right: 8px;
  width: 100px;
  font-size: 14px;
  color:#505050;
  /* height: 30px; */
}
.icon {
  font-size: 30px;
  margin-right: 5px;
  cursor: pointer;
}
.icon:hover{
  color: #00A1d6;

}
  .active{
    color: #00A1d6;
  }
  .line{
    padding:10px 0 0;
    border-bottom: 1px solid rgba(0,0,0,.1);
  }
  .summary{
    padding: 20px 0;
    font-size: 12px;
  }
/*评论区*/

  .comment h2{
    /*display: block;*/
    padding: 15px;
    font-size: 18px;
    font-weight: 500;;
  }

</style>
