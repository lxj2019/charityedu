<template>
  <div>
    <Modal v-model="cropperVisible" title="更换图片" width="1000px" @on-ok="submit">
      <div class="cropper-content">
        <div class="cropper-box">
          <div class="cropper">
            <vue-cropper
              ref="cropper"
              auto-crop
              :img="img"
              :fixed="true"
              :fixed-number="fixedNumber"
              :info-true="true"
              :center-box="true"
              mode="100%"
              min-crop-box-width="100px"
              @realTime="realTime"
            />
          </div>
          <!--底部操作工具按钮-->
          <div class="footer-btn">
            <div class="scope-btn">
              <label class="btn" @click="clickChangeImg">选择封面</label>
              <input id="uploads" ref="uploadImg" type="file" :hidden="true" accept="image/png, image/jpeg, image/gif, image/jpg" @change="selectImg($event)">
              <Button size="small" icon="el-icon-zoom-in" @click="changeScale(1)">放大</Button>
              <Button size="small" icon="el-icon-zoom-out" @click="changeScale(-1)">缩小</Button>
              <Button size="small" @click="rotateLeft">↺ 左旋转</Button>
              <Button size="small" @click="rotateRight">↻ 右旋转</Button>
            </div>
            <!-- <div class="upload-btn">
              <Button size="small" type="success" @click="submit()">上传封面 <i class="el-icon-upload" /></Button>
            </div> -->
          </div>
        </div>
        <!--预览效果图-->
        <div class="show-preview">
          <div :style="previewStyle" class="preview">
            <div :style="previews.div">
              <img :src="previews.url" :style="previews.img">
            </div>
          </div>
        </div>
      </div>
    </Modal>
    <div class="face-box" :style="{width: fixedWidth + 'px',height: fixedWidth / fixedNumber[0] * fixedNumber[1]+ 'px'}">
      <div
        v-if="currentImg==''"
        class="face-empty"
        title="未选中图片"
        @click="cropperVisible = true"
      >
        <Icon class="icon" :size="50" type="ios-add" />
      </div>
      <div v-else class="img-box" @mouseout="isShow=false" @mouseover="isShow=true">
        <img
          :style="{width: fixedWidth + 'px',height: fixedWidth / fixedNumber[0] * fixedNumber[1]+ 'px'}"
          :src="currentImg"
          class="img"
        >
        <div v-show="isShow" class="btn-bar" @click.stop="cropperVisible = true">
          点击修改图片
        </div>
      </div>

    </div>
  </div>

</template>

<script>
import { VueCropper } from 'vue-cropper'

export default {
  name: 'CropperImage',
  components: {
    VueCropper
  },
  props: {
    // 图片地址
    imgUrl: {
      type: String,
      default: ''
    },
    // 固定图片的宽度
    fixedWidth: {
      type: [Number, String],
      default: 270
    },
    // 截图框的宽高比例
    fixedNumber: {
      type: Array,
      default: () =>
        [16, 9]
    }
  },
  data() {
    return {
      name: this.Name,
      isShow: false,
      previews: {},
      currentImg: this.imgUrl,
      cropperVisible: false,
      previewStyle: {},
      img: this.imgUrl,

      option: {
        img: '', // 裁剪图片的地址
        outputSize: 1, // 裁剪生成图片的质量(可选0.1 - 1)
        outputType: 'jpeg', // 裁剪生成图片的格式（jpeg || png || webp）
        info: true, // 图片大小信息
        canScale: true, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 230, // 默认生成截图框宽度
        autoCropHeight: 150, // 默认生成截图框高度
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [16, 9], // 截图框的宽高比例
        full: false, // false按原比例裁切图片，不失真
        fixedBox: true, // 固定截图框大小，不允许改变
        canMove: false, // 上传图片是否可以移动
        canMoveBox: true, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: false, // 截图框是否被限制在图片里面
        height: true, // 是否按照设备的dpr 输出等比例图片
        infoTrue: false, // true为展示真实输出图片宽高，false展示看到的截图框宽高
        maxImgSize: 3000, // 限制图片最大宽度和高度
        enlarge: 1, // 图片根据截图框输出比例倍数
        mode: '230px 150px' // 图片默认渲染方式
      }
    }
  },
  watch: {
    cropperVisible(val) {
      if (val) {
        console.log(this.previews)
      }
    }
  },
  methods: {
    clickChangeImg() {
      this.$refs.uploadImg.click()
    },
    // 初始化函数
    imgLoad (msg) {
      console.log('工具初始化函数=====' + msg)
    },
    // 图片缩放
    changeScale (num) {
      num = num || 1
      this.$refs.cropper.changeScale(num)
    },
    // 向左旋转
    rotateLeft () {
      this.$refs.cropper.rotateLeft()
    },
    // 向右旋转
    rotateRight () {
      this.$refs.cropper.rotateRight()
    },
    // 实时预览函数
    realTime (data) {
      this.previewStyle = {
        width: data.w + 'px',
        height: data.h + 'px',
        overflow: 'hidden',
        margin: '0',
        zoom: this.fixedWidth / data.w,
        'border-radius': '5px',
        cursor: 'pointer'
      }
      this.previews = data
    },
    // 选择图片
    selectImg (e) {
      // console.log(e)
      const file = e.target.files[0]
      if (!/\.(jpg|jpeg|png|JPG|PNG)$/.test(e.target.value)) {
        this.$message({
          message: '图片类型要求：jpeg、jpg、png',
          type: 'error'
        })
        return false
      }
      // 转化为blob
      const reader = new FileReader()
      reader.onload = (e) => {
        let data
        if (typeof e.target.result === 'object') {
          data = window.URL.createObjectURL(new Blob([e.target.result]))
        } else {
          data = e.target.result
        }
        console.log(data)
        this.img = data
        this.$refs.uploadImg.value = ''
      }
      // 转化为base64
      // reader.readAsDataURL(file)
      reader.readAsArrayBuffer(file)
    },

    submit() {
      this.$refs.cropper.getCropBlob(data => {
        this.currentImg = window.URL.createObjectURL(data)
        this.$emit('on-change', data)
        // this.dialogVisible = false
      })
    },
    // 上传图片
    uploadImg (type) {
      const _this = this
      if (type === 'blob') {
        // 获取截图的blob数据
        this.$refs.cropper.getCropBlob(async (data) => {
          const formData = new FormData()
          formData.append('file', data, 'DX.jpg')
          // 调用axios上传
          const { data: res } = await _this.$http.post('/api/file/imgUpload', formData)
          if (res.code === 200) {
            _this.$message({
              message: res.msg,
              type: 'success'
            })
            const data = res.data.replace('[', '').replace(']', '').split(',')
            const imgInfo = {
              name: _this.Name,
              url: data[0]
            }
            _this.$emit('uploadImgSuccess', imgInfo)
          } else {
            _this.$message({
              message: '文件服务异常，请联系管理员！',
              type: 'error'
            })
          }
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.cropper-content{
  display: flex;
  display: -webkit-flex;
  justify-content: flex-end;
  .cropper-box{
    flex: 1;
    width: 100%;
    .cropper{
      width: auto;
      height: 300px;
    }
  }

  .show-preview{
    flex: 1;
    display: flex;
    justify-content: center;
    .preview{
      overflow: hidden;
      border:1px solid #67c23a;
      background: #cccccc;
    }
  }
}
.face-box {
  position: relative;
  .img-box {
    position: relative;
    width: 100%;
    height: 100%;
    .img {
      border-radius: 8px;
    }
    .btn-bar {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 25px;
      z-index: 1000;
      text-align: center;
      line-height: 25px;
      color:#fff;
      font-size: 14px;
      cursor: pointer;
      background-color: rgb(0,0,0,0.5) ;
    }
  }
  .face-empty {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    border: 2px dashed rgba(0, 0, 0, .3);
    cursor: pointer;
    border-radius: 5px;
    &:hover .icon {
      color: skyblue
    }
  }
}
.footer-btn{
  margin-top: 30px;
  display: flex;
  justify-content: flex-end;
  .scope-btn{
    display: flex;
    justify-content: space-between;
    padding-right: 10px;
  }
  .upload-btn{
    flex: 1;
    -webkit-flex: 1;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
  }
  .btn {
    outline: none;
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    -webkit-appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: 0;
    -webkit-transition: .1s;
    transition: .1s;
    font-weight: 500;
    padding: 8px 15px;
    font-size: 12px;
    border-radius: 3px;
    color: #fff;
    background-color: #409EFF;
    border-color: #409EFF;
    margin-right: 10px;
  }
}

</style>

