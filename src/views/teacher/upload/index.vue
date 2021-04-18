<template>
  <!--  教师上传视频模块-->
  <div class="upload-container">
    <div class="upload-box">
      <Spin v-if="loading" fix>
        <Icon type="ios-loading" size="18" class="demo-spin-icon-load" />
        <div>作品正在提交中，请稍等...</div>
      </Spin>
      <h2>文件上传</h2>
      <upload-file upload-url="upload" @updateServerId="updateServerId" />
      <div class="inline" />

      <h2>基本信息</h2>
      <!--    作品封面设置模块-->
      <div>
        <h3>作品封面设置  <span>  （格式jpeg、png，文件大小≤5MB，建议尺寸≥1146*717，最低尺寸≥960*600）</span></h3>
        <image-cropper :fixed-width="270" :fixed-number="[16,9]" @on-change="getImg" />
        <!-- <upload-image :visible.sync="cropperVisible" @updateImg="updateImg" /> -->
      </div>
      <h2>类型</h2>
      <Cascader
        v-model="value"
        :data="options"
        :change-on-select="true"
        :load-data="loadData"
        style="width: 500px"
      />
      <!-- <el-select
        v-model="value"
        class="cmb-select"
        v-bind="{ clearable: true, multiple: true }"
        placeholder="请选择知识点类型"
        @change="search"
      >
        <cmb-tree-option
          :options="content.options"
          v-bind="(content.tree || {}).props"
          :show-checkbox="content.props && content.props.multiple"
          check-strictly
          highlight-current
          check-on-click-node
          v-on="(content.tree || {}).listeners"
        />
      </el-select> -->
      <h2>作品标题</h2>

      <Input v-model="workTitle" style="width: 250px" min="1" max="20" placeholder="请输入标题" />

      <h2>作品简介</h2>
      <Input v-model="introduction" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请简短描述你的作品..." />
      <Button class="save" @click="up()">提交审核</Button>
    </div>
  </div>
</template>
<script>
import { getWorkInfo } from '@/api/work'
import UploadFile from '@/components/common/upload/UploadFile'
import { getChildList, getRootList } from '@/api/knowledge/manage'
import imageCropper from '@/components/common/upload/imageCropper'
import { uploadWork } from '@/api/upload'

export default {
  name: 'TeacherUpload',
  components: {
    UploadFile, imageCropper
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.query.id && to.query.type === 'edit') {
        vm.workId = to.query.id
        vm.operation = 'edit'
        vm.getWorkInfo(to.query.id)
      } else {
        vm.operation = 'add'
      }
    })
  },
  data() {
    return {
      operation: 'add',
      value: [],
      cropperVisible: false,
      options: [],
      // 作品信息
      workId: '',
      serverId: '',
      workTitle: '',
      introduction: '',
      knowledgeId: 111,
      worksImg: null,
      loading: false,

      // 封面变量
      imgWidth: 270,
      imgHeight: 150,
      imgUrl: ''
    }
  },
  created() {
    this.getRootList()
  },
  methods: {
    /** 获取作品信息 */
    getWorkInfo(worksid, callback) {
      getWorkInfo({ worksid }).then(res => {
        this.work = res.data.data
        this.worksCount = this.work.worksHeat
        this.workTitle = this.work.worksTitle
        this.imgUrl = this.work.teacherImgLink
        this.introduction = this.work.worksIntroduction

        if (typeof callback === 'function') {
          callback()
        }
      })
    },
    /** 遍历知识点 */
    bl(list) {
      list.forEach(item => {
        item.label = item.knowledgeName
        item.value = item.knowledgeId
        if (item.children && item.children.length !== 0) {
          this.bl(item.children)
        }
      })
    },
    /** 加载知识点 */
    loadData(item, callback) {
      item.loading = true
      getChildList({
        knowledgeid: item.knowledgeId
      }).then(res => {
        const data = res.data.data.children
        this.bl(data)
        item.children = data
        item.loading = false
        callback()
      })
    },
    /** 获取知识点类型 */
    getRootList() {
      getRootList().then(res => {
        const list = res.data.data.books
        this.options = list.map(item => {
          item.children = []
          item.loading = false
          item.label = item.knowledgeName
          item.value = item.knowledgeId
          return item
        })
        // console.log(this.options)
      })
    },
    getImg(data) {
      this.imgUrl = window.URL.createObjectURL(data)
      this.worksImg = new window.File([data], `${new Date().getTime()}.png`, { type: data.type })
      // console.log(this.worksImg, data)
    },
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
    },
    up() {
      if (this.worksImg != null && this.serverId !== '' && this.value.length !== 0 && this.workTitle !== '' && this.introduction !== '') {
        this.loading = true
        const formData = new FormData()
        formData.append('worksImg', this.worksImg)
        formData.append('serverId', this.serverId)
        formData.append('title', this.workTitle)
        formData.append('knowledgeId', this.value.pop())
        formData.append('introduction', this.introduction)
        console.log(formData)
        uploadWork(formData)
          .then(res => {
            this.loading = false
            this.$Message.success(res.data.message)
          }).catch(err => {
            console.log(err)
            this.loading = false
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
  .upload-container {
    position: relative;
    width: 100%;
  }
  .upload-box{
    /* width: 600px; */
    margin: 0 auto;
  }
  .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
  }
  @keyframes ani-demo-spin {
      from { transform: rotate(0deg);}
      50%  { transform: rotate(180deg);}
      to   { transform: rotate(360deg);}
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
  .face-box {
    cursor: pointer
  }
  .face-empty{
    display: table-cell;
    text-align: center;
    vertical-align: middle;
    border: 2px dashed rgba(0, 0, 0, .3);
  }
  .face-empty:hover .icon {
    color: skyblue
  }

  .save{
    height: 30px;
    width: 200px;
    margin: 30px 0;
    color: #3399ff;
  }
</style>
