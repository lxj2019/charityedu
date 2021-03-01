<template>
  <!-- <Button @click="screen">全屏</Button> -->
  <div class="check-container">
    <!--    视频-->
    <div v-if="work.type==='video'" class="video-wrapper">
      <video-show
        class="video"
        :works-link="work.worksLink"
      />
    </div>
    <div v-else class="pdf-wrapper">
      <PDF-comm
        :pdf-height="pdfHeight"
        :pdf-width="750"
        :pdf-src="work.worksLink"
        @progress="loadedRatio = $event"
      />
    </div>
    <div class="work-detail">
      <Card :bordered="true" dis-hover>
        <h2 slot="title" class="card-title">
          <Icon type="ios-bookmarks-outline" />
          作品信息
        </h2>
        <a slot="extra" href="#" @click.prevent="download(worksId)">
          <Icon type="md-download" />
          下架作品
        </a>
        <ul>
          <!-- <li class="work-info">
            <span class="title">加载进度：</span>
            <div class="value">
              <Progress :stroke-color="['#108ee9', '#87d068']" :percent="Math.floor(loadedRatio * 100)" :stroke-width="20" text-inside />
            </div>
          </li> -->
          <li v-for="(item,index) in list" :key="index" class="work-info">
            <span class="title" size="medium" color="primary"> {{ item.name }} </span>
            <div class="value">{{ work[item.value] }}</div>
          </li>
        </ul>
      </Card>
      <Card :bordered="true" dis-hover>
        <h2 slot="title" class="card-title">
          <Icon type="ios-bookmarks-outline" />
          作品审核
        </h2>
        <span slot="extra" class="state" @click.prevent="changeLimit">
          <Icon :type="stateOptions[work.checkState]" size="25" />
          {{ work.checkState }}
        </span>
        <Form ref="formInline" :model="checkForm" class="checkForm" :label-width="80">
          <FormItem prop="num" label="评分">
            <InputNumber v-model="checkForm.num" :max="100" :min="0" placeholder="百分制" />
          </FormItem>
          <FormItem prop="text" label="评语">
            <Input v-model="checkForm.text" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入评语....." />
          </FormItem>
          <FormItem v-if="work.checkState==='未审核'">
            <Button type="primary" @click="chenck(100)">通过</Button>
            <Button style="margin-left: 8px" @click="chenck(3)">不通过</Button>
          </FormItem>
        </Form>
      </Card>
    </div>
  </div>
</template>
<script>
// import pdf from 'vue-pdf'
import VideoShow from '@/components/common/VideoShow'
import { check, downWork } from '@/api/admin.js'
import { getUnCheckWorkInfo } from '@/api/work.js'
import PDFComm from '@/components/common/PDFComm'

export default {
  name: 'Check',
  components: {
    VideoShow, PDFComm
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.worksId = Number(to.params.id)
      vm.getWorkInfo(vm.worksId)
    })
  },

  data () {
    return {
      work: {},
      pdfHeight: 500,
      loadedRatio: 0,
      checkForm: {
        num: 0,
        text: ''
      },
      stateOptions: {
        作品失效: 'md-sad',
        审核通过: 'ios-checkmark-circle-outline',
        未通过: 'ios-close-circle-outline',
        未审核: 'ios-create-outline'
      },
      checkState: {
        审核通过: 100,
        未审核: 1
      },
      list: [
        {
          name: '标题：',
          value: 'worksTitle'
        },
        {
          name: '作者：',
          value: 'teacherName'
        },
        {
          name: '类型：',
          value: 'type'
        },
        {
          name: '发布时间：',
          value: 'publicTime'
        },
        // {
        //   name: '分类：',
        //   value: 'nodj、学习、 高中'
        // },

        {
          name: '简介：',
          value: 'worksIntroduction'
        }
      ]

    }
  },
  created() {
    this.pdfHeight = document.documentElement.clientHeight - 200
    window.onresize = () => {
      this.pdfHeight = document.documentElement.clientHeight - 200
    }
  },
  methods: {
    // 根据worksid，获取作品详细信息
    getWorkInfo(worksid, callback) {
      getUnCheckWorkInfo({ worksid }).then(res => {
        this.work = res.data.data
        this.worksCount = res.data.data.worksCount
        if (typeof callback === 'function') {
          callback()
        }
      })
    },
    // 审核作品
    chenck (checkCode) {
      console.log(typeof checkCode)
      check({
        checkCode,
        worksId: this.work.worksId
      }).then(res => {
        this.$Message.success('审核通过')
        this.getWorkInfo(this.worksId)
      })
    },
    download(worksId) {
      downWork({ worksId }).then(res => {
        console.log(res)
      })
    }
  }
}
</script>
<style>

.checkForm .ivu-form-item {
  margin-bottom: 12px;
}
</style>
<style scoped>
.check-container {
  padding: 10px;
  display: flex;
}
.work-detail {
  flex:1;
}
.pdf-wrapper {
  flex:1.4;
  position: relative;
  height: 600px
}

.video-wrapper {
  flex: 1;
  margin-right: 5px
}
.work-info {
  display: flex;
  padding: 8px;
  align-items:center;/*垂直居中*/
}
.card-title {
  font-size: 20;
  color: #000;
  font-weight: normal;
}
.state {
  color:cornflowerblue
}
 .work-info .title {
  flex: 20%;
  font-size: 15px;
  color: #333;
  font-weight: 600;
}
 .work-info .value {
  flex: 80%;
  padding:5px;
  background-color:#F7F7F7;
  font-size: 14px;
  font-weight: normal;
  color:#000;
  border-radius: 5px;
  /* overflow:auto; */
}

.checkForm {
  padding: 0;
  margin: 0
}
</style>
