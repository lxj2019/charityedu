<template>
  <div class="w">
    <div class="check-container">
      <el-scrollbar :style="{width: '550px',height: pdfHeight + 'px'}">
        <div class="pdf-wrapper" style="width: 550px">
          <pdf
            v-if="show"
            ref="pdf"
            style="width: 500px"
            src="http://image.cache.timepack.cn/nodejs.pdf"
            :page="page"
            :rotate="rotate"
            @password="password"
            @progress="loadedRatio = $event"
            @error="error"
            @num-pages="numPages = $event"
            @link-clicked="page = $event"
          />
          <Spin v-if="loadedRatio > 0 && loadedRatio < 1" size="large" fix />
        <!-- </Spin> -->
        </div>
      </el-scrollbar>
      <div class="work-detail">
        <Card :bordered="false" dis-hover>
          <h2 slot="title">
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
          <div class="work-controll">
            <span>共 {{ numPages }} 页</span><Page :current.sync="page" :total="numPages" :page-size="1" size="small" show-elevator />
            <Button class="pdf-btn" size="small" type="dashed" title="逆时针旋转" @click="rotate -= 90">&#x27F2;</Button>
            <Button class="pdf-btn" size="small" type="dashed" title="顺时针旋转" @click="rotate += 90">&#x27F3;</Button>
            <Button class="pdf-btn" type="info" size="small" title="打印" icon="ios-print-outline" @click="$refs.pdf.print()" />
          </div>
        </Card>
        <Card :bordered="false" dis-hover>
          <h2 slot="title">
            <Icon type="ios-bookmarks-outline" />
            作品审核
          </h2>
          <a slot="extra" href="#" @click.prevent="changeLimit">
            <Icon type="ios-create-outline" />
            已审核
          </a>

        </Card>
      </div>

    </div>
  </div>
</template>
<script>
import pdf from 'vue-pdf'

export default {
  components: {
    pdf: pdf
  },
  data () {
    return {
      show: true,
      pdfHeight: 0,
      spinShow: true,
      src: '',
      loadedRatio: 0,
      page: 1,
      numPages: 0,
      rotate: 0,
      list: [
        {
          name: '标题：',
          value: 'nodeJs 开发指南'
        },
        {
          name: '简介：',
          value: '房间里看电视剧李开复监考老fsdfdsfjskdjflkldsjfjlfjlsjjflkdsjlfjsldjfljsdlkfj师大家发链接'
        },
        {
          name: '发布时间：',
          value: '2021:02:50'
        },
        {
          name: '分类：',
          value: 'nodj、学习、 高中'
        },
        {
          name: '类型：',
          value: 'PPT'
        }
      ]

    }
  },
  created() {
    this.pdfHeight = document.documentElement.clientHeight - 85
    window.onresize = () => {
      this.pdfHeight = document.documentElement.clientHeight - 85
    }
  },
  methods: {
    password: function(updatePassword, reason) {
      updatePassword(prompt('password is "test"'))
    },
    error: function(err) {
      console.log(err)
    },
    logContent() {
      this.$refs.pdf.pdf.forEachPage(function(page) {
        return page.getTextContent()
          .then(function(content) {
            var text = content.items.map(item => item.str)
            console.log(text)
          })
      })
    }
  }
}
</script>
<style>
.check-container .el-scrollbar__wrap{
    overflow-x: hidden;
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
  /* width: 600px; */
  position: relative;

}
.work-info {
  display: flex;
  padding: 6px;
  align-items:center;/*垂直居中*/
}
 .work-info .title {
  flex: 20%;
  font-size: 16px;
  font-weight: bold;
}
 .work-info .value {
  flex: 80%;
  padding:5px;
  background-color:#F7F7F7;
  font-size: 13px;
  font-weight: bold;
  color:#555;
  border-radius: 5px;
  /* overflow:auto; */
}
.work-controll {
  padding: 10px;
  display: flex;
  align-items:center;/*垂直居中*/
}
.pdf-btn {
  width: 30px;
  height: 30px;
  margin-left: 15px;
  /* cursor: pointer; */
  border-radius: 50%;
}
</style>
