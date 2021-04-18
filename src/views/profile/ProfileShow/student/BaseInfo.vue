<template>
  <div class="upload-box">
    <h2>作品管理</h2>
    <h3>视频状态：<span /></h3>
    <div class="inline" />
    <h2>基本信息</h2>
    <!--    作品封面设置模块-->
    <div>
      <h3>作品封面设置  <span>  （格式jpeg、png，文件大小≤5MB，建议尺寸≥1146*717，最低尺寸≥960*600）</span></h3>
      <div class="face-box">
        <!--        shadow类标签鼠标移到封面盒子后展示-->
        <div class="shadow" />
        <!--        <span class="cancel_btn" @click="delFun()"></span>-->
        <input id="face-input" ref="files1" type="file" accept="image/jpeg, image/jpg, image/png" @change="uploadFile">
        <img id="showIdFaceSrc" :src="works.img" alt="点击上传封面">
      </div>
    </div>

    <h3>类型</h3>
    <DropdownShow />
    <div />

    <h3>作品标题</h3>

    <Input v-model="works.title" style="width: 250px" min="5" max="20" placeholder="请输入标题" /></Input>

    <h3>作品简介</h3>
    <Input v-model="works.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请简短描述你的作品..." /></Input>

    <Button class="save">保存修改</Button>
  </div>

</template>
<script>
import { Upload, Icon, FormItem, Input, Button } from 'view-design'
import DropdownShow from '@/components/common/header/DropdownShow'
export default {
  name: 'BaseInfo',
  components: {
    Upload, Icon, DropdownShow, FormItem, Input, Button
  },
  data() {
    return {
      works: {
        img: 'http://img.zcool.cn/community/0385362581077efa84a0d304ffc21b2.jpg',
        title: '',
        summary: ''
      },
      hh: {

      }
    }
  },
  methods: {
    uploadFile(event) {
      const _this = this
      if (!event || !window.FileReader) return // 看支持不支持FileReader
      console.log(event.target.files)
      const reader = new FileReader()
      reader.readAsDataURL(event.target.files[0]) // 这里是最关键的一步，转换就在这里（参数必须是blob对象）
      reader.onloadend = function () {
        _this.works.img = this.result
        console.log(_this.works.img)
      }
    }
    // delFun() {
    //   if (this.src1) {
    //     this.src1 = "";
    //     this.$refs.files.value = ""; //这里清空input的value 不然不可以选择相同的文件
    //   }
    // }
  }

}
</script>

<style scoped>
  .upload-box{
    margin: 10px 32px;
  }
  h2{
    display: block;
    padding: 20px 0;
    color: #222222;
    font-size: 18px;
  }
  h3{
    padding: 20px 0;
    color: #101010;
    font-size: 14px;
    font-weight: 500;
  }
  h3 span{
    color: #6D757A;
    font-size: 10px;
    font-weight: 400;
  }
  .inline{
    padding:32px 0 0;
    border-bottom: 1px solid rgba(0,0,0,.1);
  }

  .face-box{
    position: relative;
    width: 200px;
    height: 150px;

  }

  .face-box img{
    position: absolute;
    width: 100%;
    height: 100%;
  }
  #face-input{
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    z-index: 1;
  }
  .shadow {
    display: none;
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: 1;
    background: rgba(0, 0, 0, .4);
  }
  .face-box:hover .shadow{
    display: block;
  }

  .save{
    height: 30px;
    width: 200px;
    margin: 30px 0;
    color: #3399ff;
  }
</style>
