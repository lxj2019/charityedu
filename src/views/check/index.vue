<template>
  <div class="w">
    <!-- <Button @click="screen">全屏</Button> -->
    <div class="check-container">
      <!--    视频-->
      <div v-if="false" class="video-wrapper">
        <video-show
          class="video"
          :works-link="work.worksLink"
        />
      </div>
      <div v-if="true" class="pdf-wrapper">
        <PDF-comm
          :pdf-height="pdfHeight"
          pdf-width="550px"
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
          <a slot="extra" href="#" @click.prevent="changeLimit">
            <Icon type="md-code" />
            详细信息
          </a>
          <ul>
            <li class="work-info">
              <span class="title">加载进度：</span>
              <div class="value">
                <Progress :stroke-color="['#108ee9', '#87d068']" :percent="Math.floor(loadedRatio * 100)" :stroke-width="20" text-inside />
              </div>
            </li>
            <li v-for="(item,index) in list" :key="index" class="work-info">
              <span class="title" size="medium" color="primary"> {{ item.name }} </span>
              <div class="value">{{ item.value }}</div>
            </li>
          </ul>
        </Card>
        <Card :bordered="true" dis-hover>
          <h2 slot="title" class="card-title">
            <Icon type="ios-bookmarks-outline" />
            作品审核
          </h2>
          <a slot="extra" href="#" @click.prevent="changeLimit">
            <Icon type="ios-create-outline" />
            已审核
          </a>
          <Form ref="formInline" :model="checkForm" class="checkForm" :label-width="80">
            <FormItem prop="num" label="评分">
              <InputNumber v-model="checkForm.num" :max="100" :min="0" placeholder="百分制" />
            </FormItem>
            <FormItem prop="text" label="评语">
              <Input v-model="checkForm.text" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入评语....." />
            </FormItem>
            <FormItem>
              <Button type="primary">通过</Button>
              <Button style="margin-left: 8px">不通过</Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    </div>
  </div>
</template>
<script>
// import pdf from 'vue-pdf'
import VideoShow from '@/components/common/VideoShow'
import { check } from '@/api/admin.js'
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
      pdfHeight: '500px',
      loadedRatio: 0,
      checkForm: {
        num: 0,
        text: ''
      },
      list: [
        {
          name: '标题：',
          value: 'worksTitle'
        },
        {
          name: '作者：',
          value: 'author'
        },
        {
          name: '类型：',
          value: 'type'
        },
        {
          name: '发布时间：',
          value: '2021:02:50'
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
    this.pdfHeight = document.documentElement.clientHeight - 115 + 'px'
    window.onresize = () => {
      this.pdfHeight = document.documentElement.clientHeight - 85 + 'px'
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
      check({
        checkCode,
        worksId: this.work.worksId
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
  padding-top: 6px;
  display: flex;
}
.work-detail {
  flex:1;
}
.pdf-wrapper {
  flex:1.3;
  position: relative;
  height: 600px
}

.video-wrapper {
  flex: 1;
  margin-right: 5px
}
.work-info {
  display: flex;
  padding: 10px;
  align-items:center;/*垂直居中*/
}
.card-title {
  font-size: 20;
  color: #000;
  font-weight: normal;
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
