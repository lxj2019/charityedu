<template>
  <!--  教师上传视频模块-->
  <div>
    <filter-menu>
      <span slot="first">上传视频</span>
    </filter-menu>
    <div class="upload-box">
      <h2>文件上传</h2>
      <upload-file @updateServerId="updateServerId" />
      <div class="inline" />

      <h2>基本信息</h2>
      <!--    作品封面设置模块-->
      <div>
        <h3>作品封面设置  <span>  （格式jpeg、png，文件大小≤5MB，建议尺寸≥1146*717，最低尺寸≥960*600）</span></h3>
        <upload-image @updateImg="updateImg" />
      </div>
      <h3>类型</h3>
      <el-cascader
        v-model="value"
        :options="options"
      />
      <!-- <DropdownShow ></DropdownShow> -->
      <div />

      <h3>作品标题</h3>

      <Input v-model="workTitle" style="width: 250px" min="5" max="20" placeholder="请输入标题" />

      <h3>作品简介</h3>
      <Input v-model="introduction" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请简短描述你的作品..." />
      <Button class="save" @click="up()">提交审核</Button>
    </div>
  </div>
</template>
<script>
import FilterMenu from '@/components/common/FilterMenu/FilterMenu'
import UploadFile from '@/components/common/upload/UploadFile'
import UploadImage from '@/components/common/upload/UploadImage'
import { uploadWork } from '@/api/upload'
import options from './tree.js'
export default {
  name: 'UploadWorks',
  components: {
    FilterMenu, UploadFile, UploadImage
  },
  data() {
    return {
      value: [],
      options: options,
      worksImg: null,
      serverId: '',
      workTitle: '',
      introduction: '',
      knowledgeId: 111
    }
  },
  created() {
    console.log(options)
  },
  methods: {
    uploadFile(event) {
      const _this = this
      if (!event || !window.FileReader) return // 看支持不支持FileReader
      console.log(event.target.files)
      const reader = new FileReader()
      reader.readAsDataURL(event.target.files[0]) // 这里是最关键的一步，转换就在这里（参数必须是blob对象）
      reader.onloadend = function() {
        _this.works.img = this.result
        console.log(_this.works.img)
      }
    },
    updateServerId(value) {
      this.serverId = value
      console.log(this.serverId)
    },
    updateImg(value) {
      // console.log(value);
      this.worksImg = value
      console.log(this.worksImg)
    },
    up() {
      if (this.worksImg != null && this.serverId !== '' && this.knowledgeId !== '' && this.workTitle !== '' && this.introduction !== '') {
        const formData = new FormData()
        formData.append('worksImg', this.worksImg)
        formData.append('serverId', this.serverId)
        formData.append('title', this.workTitle)
        formData.append('knowledgeId', this.knowledgeId)
        formData.append('introduction', this.introduction)
        // request({
        //    url: "/filedeal/new",
        //    data: formData,
        //    method:'post'
        // })
        uploadWork(formData)
          .then(res => {
            console.log(res)
            this.$Message.success(res.data.message)
          }).catch(err => {
            console.log(err)
          })
      } else {
        if (this.serverId === '') this.$Message.error('请上传作品！')
        if (this.worksImg === null) this.$Message.error('请上传作品图片！')
        if (this.workTitle === '') this.$Message.error('请输入作品标题')
        if (this.knowledgeId === null) this.$Message.error('请选择知识点！')
        //  this.$Message.error('请将上传信息填写完整')
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
    margin: 10px 20px;
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
