<template>
  <div class="pdf-wrapper">
    <el-scrollbar id="aa" :style="{width: pdfWidth + 'px',height: pdfHeight + 'px'}">
      <pdf
        ref="pdf"
        :style="{width: totalWidth + 'px'}"
        :src="pdfSrc"
        :page="page"
        :rotate="rotate"
        @password="password"
        @progress="loadedRatio = $event"
        @error="error"
        @num-pages="numPages = $event"
        @link-clicked="page = $event"
      />
    </el-scrollbar>
    <div class="progress-box">
      <span>作品加载进度：</span>
      <Progress class="progress" :stroke-color="['#108ee9', '#87d068']" :percent="Math.floor(loadedRatio * 100)" :stroke-width="20" text-inside />
    </div>
    <div class="work-controll">
      <span>共 {{ numPages || 0 }} 页</span><Page :current.sync="page" :total="numPages" :page-size="1" size="small" show-elevator />
      <!-- <Button class="pdf-btn" size="small" type="dashed" titlesuccess="逆时针旋转" @click="rotate -= 90">&#x27F2;</Button> -->
      <Button class="pdf-btn" size="small" type="info" title="顺时针旋转" icon="md-refresh" @click="rotate += 90" />
      <Button class="pdf-btn" size="small" type="success" title="缩小" icon="ios-contract" @click="addWidth -= 50" />
      <Button class="pdf-btn" size="small" type="primary" title="放大" icon="md-resize" @click="addWidth += 50" />
      <Button class="pdf-btn" size="smaell" type="error" title="全屏" icon="ios-expand" @click="modal = true" />
      <Button class="pdf-btn" type="warning" size="small" title="打印" icon="ios-print-outline" @click="$refs.pdf.print()" />
    </div>
    <Spin v-if="loadedRatio > 0 && loadedRatio < 1" size="large" fix>
      <Icon type="ios-loading" size="25" class="demo-spin-icon-load" />
      <Progress :stroke-color="['#108ee9', '#87d068']" class="parogress" style="width: 300px" :percent="Math.floor(loadedRatio * 100)" :stroke-width="20" text-inside />
      <div>正在拼命加载中......</div>
    </Spin>
    <Modal v-model="modal" fullscreen title="可按esc退出全屏">
      <div class="full-screen">
        <pdf
          ref="fullPdf"
          :src="pdfSrc"
          class="full-pdf"
          :style="{width: fullscreenWidth + 'px'}"
          :page="page"
          :rotate="rotate"
          @password="password"
          @progress="loadedRatio = $event"
          @error="error"
          @num-pages="numPages = $event"
          @link-clicked="page = $event"
        />
      </div>
      <div slot="footer" class="modal-foot">
        <div class="progress-bar">
          <span>作品加载进度：</span> <Progress class="progress" :stroke-color="['#108ee9', '#87d068']" :percent="Math.floor(loadedRatio * 100)" :stroke-width="20" text-inside />
        </div>
        <div class="btn-bar">
          <span>共 {{ numPages }} 页</span>
          <Page :current.sync="page" :total="numPages" :page-size="1" size="small" show-elevator />
          <!-- <Button class="pdf-btn" size="small" type="dashed" titlesuccess="逆时针旋转" @click="rotate -= 90">&#x27F2;</Button> -->
          <Button class="btn" type="info" title="顺时针旋转" icon="md-refresh" @click="rotate += 90" />
          <Button class="btn" type="success" title="缩小" icon="ios-contract" @click="fullscreenWidth -= 50" />
          <Button class="btn" type="primary" title="放大" icon="md-resize" @click="fullscreenWidth += 50" />
          <Button class="btn" type="error" title="退出全屏" icon="ios-expand" @click="modal = false" />
          <!-- <Button class="pdf-btn" type="info" size="small" title="打印" icon="ios-print-outline" @click="$refs.pdf.print()" /> -->
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import pdf from 'vue-pdf'
export default {
  name: 'PDFComm',
  components: {
    pdf
  },
  props: {
    pdfSrc: {
      type: String,
      default: 'http://image.cache.timepack.cn/nodejs.pdf'
    },
    pdfHeight: {
      type: Number,
      default() {
        return document.documentElement.clientHeight - 115
      }
    },
    pdfWidth: {
      type: Number,
      default: 550
    }
  },
  data () {
    return {
      fullscreenWidth: document.documentElement.clientWidth - 800,
      modal: false,
      loadedRatio: 0,
      page: 1,
      addWidth: 0,
      fullscreen: false,
      numPages: 0,
      rotate: 0
    }
  },
  computed: {
    totalWidth() {
      console.log(typeof this.pdfWidth, typeof this.addWidth)
      return this.pdfWidth + this.addWidth
    }
  },
  watch: {
    loadedRatio(val) {
      this.$emit('progress', val)
    }
  },
  methods: {
    password: function(updatePassword, reason) {
      updatePassword(prompt('password is "test"'))
    },
    // pdf加载失败
    error: function(err) {
      console.log(err)
    },
    // 打印pdf文本内容
    logContent() {
      this.$refs.pdf.pdf.forEachPage(function(page) {
        return page.getTextContent()
          .then(function(content) {
            var text = content.items.map(item => item.str)
            console.log(text)
          })
      })
    },
    // 全屏
    screen() {
      // let element = document.documentElement;//设置后就是我们平时的整个页面全屏效果
      const element = document.getElementById('aa')// 设置后就是   id==con_lf_top_div 的容器全屏
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen()
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen()
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen()
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen()
        }
      }
      this.fullscreen = !this.fullscreen
    }
  }
}
</script>

<style>
.pdf-wrapper .el-scrollbar__wrap{
    overflow-x: hidden;
  }
</style>

<style lang="scss" scoped>
.pdf-wrapper {
  position: relative;
}
.demo-spin-icon-load{
  margin-bottom: 20px;
  animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
    from { transform: rotate(0deg);}
    50%  { transform: rotate(180deg);}
    to   { transform: rotate(360deg);}
}
.parogress {
  width: 100%;
  display: block;
}
.work-controll {
  padding-top: 5px;
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
.progress-box {
  padding:10px 0;
  color:#000
}
.progress-box  .progress{
  width: 50%;
}
.full-screen {
  width: 100%;
  height: 100%;
  .full-pdf {
    margin:auto;
    // display: inline-block;
  }
}
.modal-foot {
  width: 100%;
  align-items: center;
  .progress-bar {
    float: left;
    .progress {
      width: 300px;
      display: inline-block;
    }
  }
  .btn-bar {
    float:right;
    display: flex;
    align-items: center;
    .btn {
      margin:0px 10px;
    }
  }
}
</style>
